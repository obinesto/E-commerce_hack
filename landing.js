// navbar logic
document.addEventListener("DOMContentLoaded", function () {
  var icon1 = document.getElementById("toggle1");
  var icon2 = document.getElementById("toggle2");
  const arrowDowns = document.querySelectorAll(".arrow-down i");


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


var Products = [
  {
    "id": 23,
    "image": "assets/images/ipad/apple-ipad-pro-12.9-m22022-modelwi-ficellular-512gb-space-gray.jpg",
    "name": "Apple Ipad 512gb (gray)",
    "price": "1,602,000",
    "beforeprice": "1,780,000",
    "discountprice": "-10%",
    "quantity": 1
  },
  {
    "id": 14,
    "image": "assets/images/iphone/15/apple-iphone-15-pro-max-256gb-nano-sim-blue-titanium.jpg",
    "name": "Apple IPhone 15 Pro Max 256gb (nano-sim blue titanium)",
    "price": "1,890,090",
    "beforeprice": "2,100,100",
    "discountprice": "-10%",
    "quantity": 1
  },
  {
    "id": 37,
    "image": "assets/images/accessories/protection/apple-iphone-15-pro-max-finewoven-case-with-magsafe-taupe.webp",
    "name": "Magsafe protection case (Brown)",
    "price": "34,200",
    "beforeprice": "38,000",
    "discountprice": "-10%",
    "quantity": 1
  },
  {
    "id": 20,
    "image": "assets/images/mac/apple-macbook-pro-16.2-32gb-1tb-10-cores-m1-max-silver.jpg",
    "name": "Apple MacBook Pro 32gbRAM 1tbROM (10-cores, silver)",
    "price": "1,602,000",
    "beforeprice": "1,780,000",
    "discountprice": "-10%",
    "quantity": 1
  }
];


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
    const filtered = Products.filter(product => product.name.toLowerCase().includes(query));
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
          <a href="${rootPrefix}pages/collections/collections.html?id=${product.id}">
            <img src="${rootPrefix}${product.image}" alt="${product.name}" loading="lazy">
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
    if (!panel.hidden && !panel.contains(event.target) && event.target !== searchInput && event.target !== searchButton) {
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

  if (isLoggedIn) {
    document.querySelector('.user-account').style.display = 'none';

    const profileAccount = document.createElement('div');
    profileAccount.className = 'profileAccount';
    profileAccount.innerHTML = `<span>Hi <span class="profileAccountName">${getProfile.firstName}</span></span>`;
    const messages = JSON.parse(localStorage.getItem('messages'))
    const messageCount = document.createElement('div')
    messageCount.className = 'user-msg-count'
    messageCount.textContent = messages.length

    document.querySelector('.handleUserStates').appendChild(profileAccount);
    profileAccount.appendChild(messageCount)

    profileAccount.addEventListener('click', () => {
      if (window.location.pathname === 'member_area/mprofile.html') {
        window.location.reload();
      } else {
        handleProfile();
      }
    });
  }
});

function handleProfile() {
  window.location.href = '/member_area/mprofile.html';
}

// Function to update the item count in the circle
function updateItemCount() {
  const itemCountCircle = document.getElementById('item-count-circle');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  itemCountCircle.textContent = itemCount;
}

// Call the function on page load to set the initial count
document.addEventListener('DOMContentLoaded', updateItemCount);

// Footer copy logic
document.addEventListener("DOMContentLoaded", () => {
  const copyYear = document.getElementById("copyright-year")
  copyYear.innerText = new Date().getFullYear()
})




