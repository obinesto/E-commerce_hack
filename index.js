// navbar logic
document.addEventListener("DOMContentLoaded", function () {
  var icon1 = document.getElementById("toggle1");
  var icon2 = document.getElementById("toggle2");
  const arrowDowns = document.querySelectorAll(".arrow-down i");

  if (!icon1 || !icon2) return;


  icon1.addEventListener("click", function () {
    icon1.style.display = "none";

    document.querySelector('.nav-links2').style.display = 'block'
    icon2.style.display = "block";
  });

  icon2.addEventListener("click", function () {
    icon2.style.display = "none"
    document.querySelector('.nav-links2').style.display = 'none';

    icon1.style.display = "block"
  });

  // Close the mobile menu when resizing up to desktop widths
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      var mobileNav = document.querySelector('.nav-links2');
      if (mobileNav) mobileNav.style.display = '';
      icon2.style.display = '';
      icon1.style.display = '';
    }
  });

  arrowDowns.forEach(arrowDown => {
    arrowDown.addEventListener('click', function () {
      arrowDown.classList.toggle('fa-angle-down');
      arrowDown.classList.toggle('fa-angle-up');

      const content2a = document.getElementById('dropdown-content2a');
      const content2b = document.getElementById('dropdown-content2b');

      if (arrowDown.classList.contains('fa-angle-down')) {
        content2a.style.display = 'none'
        content2b.style.display = 'none'
      } else if (arrowDown.classList.contains('dropA') & arrowDown.classList.contains('fa-angle-up')) {
        content2a.style.display = 'block';
        content2b.style.display = 'none';
      } else if (arrowDown.classList.contains('dropB') & arrowDown.classList.contains('fa-angle-up')) {
        content2a.style.display = 'none';
        content2b.style.display = 'block';
      }
    });
  });
})




document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  if (!searchInput || !searchButton) return;

  // Resolve site-root-relative targets from any page depth.
  const depth = Math.max(0, window.location.pathname.split('/').filter(Boolean).length - 1);
  const rootPrefix = '../'.repeat(depth);
  const naira = '₦';

  const panel = document.createElement('div');
  panel.className = 'handleSearchResults';
  panel.hidden = true;
  document.body.appendChild(panel);

  function positionPanel() {
    const bar = searchInput.closest('.search-bar') || searchInput;
    const rect = bar.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width * 2, 280), 420);
    panel.style.width = width + 'px';
    panel.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)) + 'px';
    panel.style.top = (rect.bottom + 8) + 'px';
  }

  function hidePanel() {
    panel.hidden = true;
    panel.innerHTML = '';
  }

  function searchProducts(rawQuery) {
    const query = (rawQuery || '').trim().toLowerCase();
    if (!query) {
      hidePanel();
      return;
    }
    const catalog = (typeof getStoreCatalog === 'function') ? getStoreCatalog() : [];
    const filtered = catalog.filter(product => product && product.name && product.name.toLowerCase().includes(query));
    positionPanel();
    panel.hidden = false;
    if (!filtered.length) {
      panel.innerHTML = '<p class="search-empty">No products found. Try "iphone", "ipad" or "mac".</p>';
      return;
    }
    const shown = filtered.slice(0, 8);
    panel.innerHTML = `<div class="search-head"><span>${filtered.length} result${filtered.length === 1 ? '' : 's'}</span><button type="button" class="search-close" aria-label="Close search results">×</button></div>` +
      shown.map(product => `
        <div class="search-result-item">
          <a href="${rootPrefix}pages/public/collections/collections.html?id=${product.id}">
            <img src="${storeImg(product.image)}" alt="${product.name}" loading="lazy">
            <span class="search-meta">
              <span class="search-name">${product.name}</span>
              <span class="search-price">${naira}${product.price}</span>
            </span>
          </a>
        </div>`).join('') +
      (filtered.length > shown.length ? `<p class="search-more">+${filtered.length - shown.length} more — keep typing to narrow down</p>` : '');
    panel.querySelector('.search-close').addEventListener('click', hidePanel);
  }

  searchInput.addEventListener('input', function () {
    searchProducts(searchInput.value);
  });

  // Event listener for the search button
  searchButton.addEventListener('click', function () {
    searchProducts(searchInput.value);
    searchInput.focus();
  });

  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      hidePanel();
      searchInput.blur();
    }
  });

  document.addEventListener('click', function (event) {
    if (!panel.hidden && !panel.contains(event.target) && event.target !== searchInput && !searchButton.contains(event.target)) {
      hidePanel();
    }
  });

  window.addEventListener('resize', function () {
    if (!panel.hidden) positionPanel();
  });
});

// check login status
document.addEventListener('DOMContentLoaded', () => {
  const getProfile = JSON.parse(localStorage.getItem('createProfile'));
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  if (isLoggedIn || isAdminLoggedIn) {
    const userAccount = document.querySelector('.user-account');
    const userStates = document.querySelector('.handleUserStates');
    if (!userAccount || !userStates) return;
    userAccount.style.display = 'none';

    const displayName = (isLoggedIn && getProfile && getProfile.firstName) ? getProfile.firstName : 'Admin';
    const profileAccount = document.createElement('div');
    profileAccount.className = 'profileAccount';
    profileAccount.innerHTML = `<span>Hi <span class="profileAccountName">${displayName}</span></span>`;
    userStates.appendChild(profileAccount);

    // Notification count is per account (keyed by email) and counts unread
    // messages only; admins have no inbox badge.
    if (!isAdminLoggedIn) {
      const accountEmail = (isLoggedIn && getProfile) ? getProfile.email : '';
      const unreadCount = getUserMessages(accountEmail).filter(msg => msg && msg.read !== true).length;
      if (unreadCount > 0) {
        const messageCount = document.createElement('div')
        messageCount.className = 'user-msg-count'
        messageCount.textContent = unreadCount
        profileAccount.appendChild(messageCount)
      }
    }

    profileAccount.addEventListener('click', () => {
      if (isAdminLoggedIn) {
        handleAdminDashboard();
        return;
      }
      if (/pages\/member\/member\.html$/.test(window.location.pathname)) {
        window.location.reload();
      } else {
        handleProfile();
      }
    });
  }
});

function handleAdminDashboard() {
  const prefix = (typeof storeRootPrefix === 'function') ? storeRootPrefix() : '';
  window.location.href = prefix + 'pages/admin/admin.html';
}

function handleProfile() {
  const prefix = (typeof storeRootPrefix === 'function') ? storeRootPrefix() : '';
  window.location.href = prefix + 'pages/member/member.html';
}

// Function to update the item count in the circle
function updateItemCount() {
  const itemCountCircle = document.getElementById('item-count-circle');
  if (!itemCountCircle) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  itemCountCircle.textContent = itemCount;
}

// Call the function on page load to set the initial count
document.addEventListener('DOMContentLoaded', updateItemCount);

// Footer copy logic
document.addEventListener("DOMContentLoaded", () => {
  const copyYear = document.getElementById("copyright-year")
  if (copyYear) copyYear.innerText = new Date().getFullYear()
})

// Hide floating contact buttons while the footer is on screen
document.addEventListener("DOMContentLoaded", () => {
  const floats = document.querySelectorAll('.whatsapp-float, .call-float');
  const footer = document.querySelector('footer');
  if (!floats.length || !footer || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    const hide = entries.some(entry => entry.isIntersecting);
    floats.forEach(el => { el.style.display = hide ? 'none' : ''; });
  }, { threshold: 0 });
  observer.observe(footer);
})




