const nairaSymbol = '\u20A6'
// Setting Global variables so that we can access them from inside the functions


if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]");
}

let products = getStoreCatalog();
let cart = JSON.parse(localStorage.getItem("cart"));


// Function to render product details
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);

    // Ensure productId is obtained correctly
    console.log('Product ID:', productId);

    // Find the product by id
    const product = products.find(p => p.id === productId);

    // Check if product is found
    console.log('Found Product:', product);

    if (product) {
        const productDetails = document.getElementById('product-details');

        productDetails.innerHTML = `
        <div class="product-details-2">
           <div class="container-img">
              <img src="${storeImg(product.image)}" alt="${product.name}">
           </div>
           <div class="product-name">
               <h2>${product.name}</h2>
             <div class='pricelist'>
               <h4 style='font-weight: 600;' class="current-price">Price:${nairaSymbol}${product.price}</h4>
               <h4 id="before-price">Before: <s>${nairaSymbol}${product.beforeprice}</s></h4>
               <h6 id="discount-percent">Discount: ${product.discountprice}</h6>
             </div>
              <button id="add-to-cart">
                <img src="../../../assets/icons/shopping-cart.svg" alt="" class="btn-cart-icon">
                Add to Cart
              </button>

              <div class="row">
                <div class="col-3">
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                    <span><i class="fa-solid fa-star" style="color: #f5b400;"></i></span>
                </div>
                <span>(verified rating)</span>
            </div>

               <div class="horizontal-line"></div>
           </div>
        
        </div>
            <h4 id="share-product">SHARE THIS PRODUCT</h4>

            <div id="social-media-share">
            <img id="twitter-share" src="../../../assets/icons/kisspng-social-media-computer-icons-tulane-university-face-drawing-vector-twitter-5ab02d6b50a397.8866567515214954033303.PNG" alt="twitter" width="40px" height="40px">
            <img id="facebook-share" src="../../../assets/icons/facebook-icon.png" alt="facebook" width="40px" height="40px">
            <img id="linkedin-share" src="../../../assets/icons/kisspng-linkedin-logo-computer-icons-business-symbol-linkedin-icon-5ab1765660baa8.1191823015215796063962.PNG" alt="linkedin" width="40px" height="40px">
            </div>
            
            <p class='description' id='product-desc'>${product.description}</p>
            <button id='desc-toggle' hidden>Read more</button>
        `;







        document.getElementById('add-to-cart').addEventListener('click', () => {
            // Implement add to cart functionality here
            addItemToCart(productId);

            Toastify({

                text: `${product.name} added to cart!`,
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();
        });

        const desc = document.getElementById('product-desc');
        const descToggle = document.getElementById('desc-toggle');
        if (desc && descToggle) {
            const fullHeight = desc.scrollHeight;
            desc.classList.add('clamped');
            if (fullHeight > desc.clientHeight + 4) {
                descToggle.hidden = false;
                descToggle.addEventListener('click', () => {
                    const clamped = desc.classList.toggle('clamped');
                    descToggle.textContent = clamped ? 'Read more' : 'Show less';
                });
            } else {
                desc.classList.remove('clamped');
            }
        }
    } else {
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
    }

    const relatedWrap = document.getElementById('related-products');
    if (relatedWrap) {
        const pool = products.filter(p => p.id !== productId);
        const start = pool.length && Number.isFinite(productId) ? Math.abs(productId) % pool.length : 0;
        const picks = [];
        for (let i = 0; i < Math.min(4, pool.length); i++) {
            picks.push(pool[(start + i) % pool.length]);
        }
        relatedWrap.innerHTML = picks.map(p => `
            <div class="related-products-img">
                <a href="collections.html?id=${p.id}">
                    <img src="${storeImg(p.image)}" alt="${p.name}" loading="lazy">
                </a>
                <h6 class="related-products-type">${p.name}</h6>
            </div>`).join('');
    }
});

// Function to add item to cart
function addItemToCart(productId) {
    let product = products.find(function (product) {
        return product.id == productId;
    });

    if (product) {
        let cartItem = cart.find(item => item.id == productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateItemCount();  // Update item count after adding to cart
    }
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


// Site search lives in landing.js (single shared implementation).

document.addEventListener('DOMContentLoaded', function () {
    // Your existing code here...

    // Function to share on social media
    function shareOnSocialMedia(platform) {
        const url = window.location.href;
        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
                break;
        }

        window.open(shareUrl, '_blank');
    }

    // Add event listeners to social media icons
    if (!document.getElementById('facebook-share')) return;
    document.getElementById('facebook-share').addEventListener('click', function () {
        shareOnSocialMedia('facebook');
    });
    document.getElementById('twitter-share').addEventListener('click', function () {
        shareOnSocialMedia('twitter');
    });
    document.getElementById('linkedin-share').addEventListener('click', function () {
        shareOnSocialMedia('linkedin');
    });
});

// Delivery fees from Lagos, updated when the location pills change.
document.addEventListener('DOMContentLoaded', () => {
    const deliveryRates = {
        'Lagos': { pickup: 640, door: 1110, minDays: 1, maxDays: 2 },
        'Ibadan': { pickup: 950, door: 1550, minDays: 2, maxDays: 3 },
        'Abeokuta': { pickup: 950, door: 1550, minDays: 2, maxDays: 3 },
        'Abuja': { pickup: 1200, door: 2100, minDays: 2, maxDays: 4 },
        'Port Harcourt': { pickup: 1350, door: 2400, minDays: 3, maxDays: 5 },
        'Benin City': { pickup: 1200, door: 2100, minDays: 3, maxDays: 5 },
        'Enugu': { pickup: 1350, door: 2400, minDays: 3, maxDays: 5 },
        'Kano': { pickup: 1500, door: 2800, minDays: 4, maxDays: 7 }
    };
    const pills = document.querySelectorAll('input[name="delivery-location"]');
    if (!pills.length) return;
    const formatNaira = n => '\u20A6 ' + n.toLocaleString('en-NG');
    const dateAfter = days => {
        const d = new Date();
        d.setDate(d.getDate() + days);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
    };
    function updateDelivery() {
        const checked = document.querySelector('input[name="delivery-location"]:checked');
        const city = checked ? checked.value : 'Lagos';
        const rate = deliveryRates[city] || deliveryRates['Lagos'];
        const pickupFee = document.getElementById('pickup-fee');
        const doorFee = document.getElementById('door-fee');
        const pickupDates = document.getElementById('pickup-dates');
        const doorDates = document.getElementById('door-dates');
        if (pickupFee) pickupFee.textContent = formatNaira(rate.pickup);
        if (doorFee) doorFee.textContent = formatNaira(rate.door);
        const range = dateAfter(rate.minDays) + ' & ' + dateAfter(rate.maxDays);
        if (pickupDates) pickupDates.textContent = range;
        if (doorDates) doorDates.textContent = range;
        document.querySelectorAll('.delivery-city').forEach(el => { el.textContent = city; });
    }
    pills.forEach(pill => pill.addEventListener('change', updateDelivery));
    updateDelivery();
});
