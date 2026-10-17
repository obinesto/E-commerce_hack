document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('account-form');
    if (!form) return;
    const notice = document.getElementById('member-notice');
    const dialog = document.getElementById('member-action-dialog');
    const links = [...document.querySelectorAll('.member-nav [data-section]')];
    const fields = Object.fromEntries(['first-name', 'last-name', 'email', 'password'].map(id => [id, document.getElementById(id)]));
    const currency = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 });
    let profile;
    let orders = [];
    let messages = [];
    let pendingAction = null;

    function showNotice(message, kind = 'success') {
        notice.textContent = message;
        notice.dataset.kind = kind;
        notice.hidden = false;
    }
    function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }
    function refreshIcons() {
        if (window.feather) window.feather.replace();
    }
    function sameEmail(first, second) {
        return typeof first === 'string' && typeof second === 'string' && first.trim().toLowerCase() === second.trim().toLowerCase();
    }
    function readList(key) {
        const value = JSON.parse(localStorage.getItem(key) || '[]');
        if (!Array.isArray(value)) throw new Error('Invalid saved list');
        return value;
    }
    function readAccounts() {
        const value = JSON.parse(localStorage.getItem('users') || '[]');
        if (Array.isArray(value)) return value;
        // Earlier account edits stored a single user object instead of an array.
        if (value && typeof value.email === 'string') return [value];
        throw new Error('Invalid saved accounts');
    }
    function writeValues(values) {
        const previous = Object.fromEntries(Object.keys(values).map(key => [key, localStorage.getItem(key)]));
        try {
            for (const [key, value] of Object.entries(values)) {
                if (value === null) localStorage.removeItem(key);
                else localStorage.setItem(key, value);
            }
        } catch (error) {
            for (const [key, value] of Object.entries(previous)) {
                try {
                    if (value === null) localStorage.removeItem(key);
                    else localStorage.setItem(key, value);
                } catch { /* Keep the original write failure for the caller. */ }
            }
            throw error;
        }
    }
    function emptyState(text, shop = false) {
        const node = element('div', 'member-empty');
        node.append(element('p', '', text));
        if (shop) {
            const link = element('a', '', 'Explore products');
            link.href = '../../index.html';
            node.append(link);
        }
        return node;
    }
    function renderIdentity() {
        document.getElementById('member-name').textContent = [profile.firstName, profile.lastName].filter(Boolean).join(' ');
        document.getElementById('member-email').textContent = profile.email;
        fields['first-name'].value = profile.firstName || '';
        fields['last-name'].value = profile.lastName || '';
        fields.email.value = profile.email || '';
        fields.password.value = '';
        document.querySelectorAll('.profileAccountName').forEach(node => { node.textContent = profile.firstName; });
    }
    function formatPrice(value) {
        const amount = Number(String(value).replace(/,/g, ''));
        return Number.isFinite(amount) ? currency.format(amount) : 'Price unavailable';
    }
    function renderOrder(order) {
        const card = element('article', 'member-order');
        const header = element('div', 'member-order-header');
        header.append(element('h4', '', 'Order #' + order.orderId), element('span', 'member-status', order.status || 'Order placed'));
        card.append(header);
        for (const item of Array.isArray(order.cart) ? order.cart : []) {
            const row = element('div', 'member-order-item');
            const image = element('img');
            if (item.image) image.src = typeof storeImg === 'function' ? storeImg(item.image) : item.image;
            else image.hidden = true;
            image.alt = '';
            image.loading = 'lazy';
            image.addEventListener('error', () => { image.hidden = true; }, { once: true });
            const body = element('div');
            body.append(element('h5', '', item.name), element('p', '', 'Quantity: ' + item.quantity), element('p', '', 'Unit price: ' + formatPrice(item.price)));
            row.append(image, body);
            card.append(row);
        }
        const details = element('details');
        details.append(element('summary', '', 'View order details'));
        const data = element('dl');
        for (const [key, label] of Object.entries({ customerName: 'Name', customerEmail: 'Email', customerAddress: 'Address', customerCountry: 'Country', customerState: 'State', customerCity: 'City', customerPhone: 'Phone', customerAlternatePhone: 'Alternate phone', paymentMethod: 'Payment method', transactionReference: 'Transaction reference' })) {
            if (order[key] !== undefined && order[key] !== null && order[key] !== '') data.append(element('dt', '', label), element('dd', '', order[key]));
        }
        details.append(data);
        card.append(details);
        return card;
    }
    function renderOrders() {
        const mine = profile ? orders.filter(order => order && sameEmail(order.customerEmail, profile.email)) : [];
        const ongoing = [];
        const delivered = [];
        for (const order of mine.slice().reverse()) {
            (String(order.status).toLowerCase() === 'delivered' ? delivered : ongoing).push(renderOrder(order));
        }
        document.getElementById('ongoing-count').textContent = ongoing.length;
        document.getElementById('delivered-count').textContent = delivered.length;
        document.getElementById('orders-count').textContent = mine.length;
        document.getElementById('ongoing-orders').replaceChildren(...(ongoing.length ? ongoing : [emptyState('No ongoing orders.', true)]));
        document.getElementById('delivered-orders').replaceChildren(...(delivered.length ? delivered : [emptyState('No delivered orders yet.')]));
    }
    const isUnread = message => Boolean(message) && message.read !== true;
    function unreadMessages() { return messages.filter(isUnread); }
    function updateUnreadCounts() {
        const unread = unreadMessages();
        const sidebarBadge = document.querySelector('.inbox-count');
        if (sidebarBadge) sidebarBadge.textContent = unread.length;
        // Keep the store-wide navbar badge in step while reading here.
        const navBadge = document.querySelector('.user-msg-count');
        if (navBadge) {
            navBadge.textContent = unread.length;
            navBadge.style.display = unread.length ? '' : 'none';
        }
    }
    function markMessageRead(message) {
        if (!isUnread(message)) return;
        try {
            message.read = true;
            setUserMessages(profile.email, messages);
            updateUnreadCounts();
        } catch { /* keep the view open even if storage refuses */ }
    }
    function renderInbox() {
        const fragment = document.createDocumentFragment();
        for (const message of messages.slice().reverse()) {
            if (!message) continue;
            const card = element('article', 'member-message' + (isUnread(message) ? ' is-unread' : ''));
            const head = element('div', 'member-message-head');
            head.append(element('i', 'member-unread-dot'), element('span', 'member-message-subject', message.subject || 'Message from iHub'));
            // Intro shows the subject only; the rest sits behind the View toggle.
            const toggle = element('button', 'member-message-toggle');
            toggle.type = 'button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'View';
            head.append(toggle);
            const body = element('div', 'member-message-body');
            const when = message.createdAt
                ? new Date(message.createdAt).toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' })
                : 'Message #' + message.id;
            body.append(
                element('p', 'member-message-meta', 'From ' + (message.sender || 'iHub') + ' · ' + when),
                element('p', '', message.body || '')
            );
            card.append(head, body);
            toggle.addEventListener('click', () => {
                const open = card.classList.toggle('is-open');
                toggle.setAttribute('aria-expanded', String(open));
                toggle.textContent = open ? 'Hide' : 'View';
                if (open) markMessageRead(message);
            });
            fragment.append(card);
        }
        document.getElementById('member-messages').replaceChildren(...(fragment.childNodes.length ? [fragment] : [emptyState('No messages yet. Updates from iHub will appear here.')]));
        updateUnreadCounts();
    }
    function showSection(section, focus = false) {
        if (!links.some(link => link.dataset.section === section)) section = 'orders';
        document.querySelectorAll('.member-section').forEach(node => { node.hidden = node.id !== section; });
        links.forEach(link => {
            if (link.dataset.section === section) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
        if (focus) document.querySelector('#' + section + ' h2').focus({ preventScroll: true });
    }
    try {
        profile = JSON.parse(localStorage.getItem('createProfile'));
        if (localStorage.getItem('isLoggedIn') !== 'true' || !profile || typeof profile.email !== 'string') {
            window.location.replace('member_login.html');
            return;
        }
        profile = readAccounts().find(user => sameEmail(user.email, profile.email)) || profile;
        renderIdentity();
    } catch {
        showNotice('Your saved account could not be opened. Check your browser storage settings and reload this page.', 'error');
        document.getElementById('save-account').disabled = true;
        document.getElementById('close-account-btn').disabled = true;
    }
    try { orders = readList('orders'); } catch { showNotice('Your saved orders could not be opened. Reload the page to try again.', 'error'); }
    try { messages = getUserMessages(profile.email); } catch { showNotice('Your saved messages could not be opened. Reload the page to try again.', 'error'); }
    renderOrders();
    renderInbox();
    refreshIcons();
    showSection(window.location.hash.slice(1));
    window.addEventListener('hashchange', () => showSection(window.location.hash.slice(1), true));
    for (const input of Object.values(fields)) input.addEventListener('input', () => input.setCustomValidity(''));
    form.addEventListener('submit', event => {
        event.preventDefault();
        for (const id of ['first-name', 'last-name']) {
            if (!fields[id].value.trim()) {
                fields[id].setCustomValidity('Enter your ' + (id === 'first-name' ? 'first' : 'last') + ' name.');
                fields[id].reportValidity();
                return;
            }
        }
        if (fields.password.value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).{8,}$/.test(fields.password.value)) {
            fields.password.setCustomValidity('Use at least 8 characters, uppercase and lowercase letters, a number, and a symbol.');
            fields.password.reportValidity();
            return;
        }
        if (!form.reportValidity()) return;
        try {
            const users = readAccounts();
            const address = fields.email.value.trim().toLowerCase();
            const index = users.findIndex(user => sameEmail(user.email, profile.email));
            if (index < 0) { showNotice('Your saved account could not be found. Sign in again and retry.', 'error'); return; }
            if (users.some((user, userIndex) => userIndex !== index && sameEmail(user.email, address))) {
                fields.email.setCustomValidity('An account already uses this email address.');
                fields.email.reportValidity();
                return;
            }
            const updated = { ...users[index], firstName: fields['first-name'].value.trim(), lastName: fields['last-name'].value.trim(), email: address, password: fields.password.value || users[index].password };
            const previousEmail = profile.email;
            const updatedOrders = readList('orders').map(order => sameEmail(order.customerEmail, profile.email) ? { ...order, customerEmail: address } : order);
            users[index] = updated;
            writeValues({ users: JSON.stringify(users), createProfile: JSON.stringify(updated), userEmail: address, orders: JSON.stringify(updatedOrders) });
            if (!sameEmail(previousEmail, address)) {
                // carry the inbox over to the new email address
                setUserMessages(address, messages);
                localStorage.removeItem(userMessageKey(previousEmail));
            }
            profile = updated;
            orders = updatedOrders;
            messages = getUserMessages(address);
            renderIdentity();
            renderOrders();
            showNotice('Account details saved.');
        } catch {
            showNotice('Your changes could not be saved. Check your browser storage settings and try again.', 'error');
        }
    });
    function confirmAction(action) {
        pendingAction = action;
        const closing = action === 'close';
        document.getElementById('member-dialog-title').textContent = closing ? 'Close your account?' : 'Sign out of iHub?';
        document.getElementById('member-dialog-description').textContent = closing ? 'Your saved account and order history will be deleted from this browser. This cannot be undone.' : 'You can sign in again with your email and password.';
        document.getElementById('confirm-member-action').textContent = closing ? 'Close account' : 'Sign out';
        dialog.showModal();
    }
    document.getElementById('logout-btn').addEventListener('click', () => confirmAction('logout'));
    document.getElementById('close-account-btn').addEventListener('click', () => confirmAction('close'));
    document.getElementById('cancel-member-action').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { pendingAction = null; });
    document.getElementById('confirm-member-action').addEventListener('click', () => {
        if (!pendingAction) return;
        try {
            const closing = pendingAction === 'close';
            const changes = { isLoggedIn: null, userEmail: null, createProfile: null };
            if (closing) {
                changes.users = JSON.stringify(readAccounts().filter(user => !sameEmail(user.email, profile.email)));
                changes.orders = JSON.stringify(readList('orders').filter(order => !sameEmail(order.customerEmail, profile.email)));
                changes[userMessageKey(profile.email)] = null;
            }
            writeValues(changes);
            dialog.close();
            window.location.href = closing ? 'member_signup.html' : 'member_login.html';
        } catch {
            dialog.close();
            showNotice('This action could not be completed. Check your browser storage settings and try again.', 'error');
        }
    });
});
