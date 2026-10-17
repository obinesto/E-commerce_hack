const nairasymbol = "\u20A6";

// Checkout page load: hide the preloader and show the discount popup.
document.addEventListener("DOMContentLoaded", function () {
    // On full load, hide the preloader and show the discount window.
    window.addEventListener("load", function () {
        // Introduce a delay before hiding the preloader and showing the main content
        setTimeout(function () {
            // Hide the preloader
            const preloader = document.getElementById("preloader");
            preloader.style.display = "none";

            // Show the main content with full opacity
            const mainContent = document.getElementById("main-content");
            mainContent.classList.add("visible");

            // Show the discount message and the overlay
            const discountMessage = document.getElementById("discount-message");
            const overlay = document.getElementById("overlay");
            discountMessage.style.display = "block";
            overlay.style.display = "block";
        }, 1000); // Delay in milliseconds (1000ms = 1 seconds)

        // Close discount message and continue to main content
        document
            .getElementById("close-discount")
            .addEventListener("click", function () {
                const discountMessage = document.getElementById("discount-message");
                const overlay = document.getElementById("overlay");
                discountMessage.style.display = "none";
                overlay.style.display = "none";

                const mainContent = document.getElementById("main-content");
                mainContent.style.opacity = "1"; // Ensure main content is fully visible
            });

        // Close discount message and continue to main content
        document
            .getElementById("close-icon")
            .addEventListener("click", function () {
                const discountMessage = document.getElementById("discount-message");
                const overlay = document.getElementById("overlay");
                discountMessage.style.display = "none";
                overlay.style.display = "none";

                const mainContent = document.getElementById("main-content");
                mainContent.style.opacity = "1"; // Ensure main content is fully visible
            });
    });
});

// Checkout form: summary, coupons, city-state sync, and submit routing.
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Call renderCart on page load to display items in the cart
    renderCartsummary();

    // Render the order summary rows and store the raw total.
    function renderCartsummary() {
        const cartItemsContainer = document.getElementById("shoppingcart-items");
        const cartTotalElement = document.getElementById("cart-total");
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const itemTotalRaw = item.price.replace(/,/g, ""); // remove commas to aid summation
            const itemTotal = parseInt(itemTotalRaw, 10) * item.quantity;
            total += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.className = "handleDivStyling";
            itemRow.innerHTML = `
                <p> <img src='${storeImg(item.image)}' width='40px'> ${item.name}</p>
                <hr/>
                <p> Quantity: ${item.quantity} </p>
                <hr/>
                 <p> Unit Price ₦ ${item.price}</p>
                <hr/>
               <p> Set Price: ${nairasymbol} ${itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                
            `;

            cartItemsContainer.appendChild(itemRow);
        });

        const totalAmount = (cartTotalElement.innerHTML = total
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        localStorage.removeItem("couponApplied");
        localStorage.setItem("totalAmount", totalAmount);
    }

    // Function to update the item count in the checkout Summary
    function updateItemCount() {
        const CartitemCount = document.getElementById("cart-numberofitems");
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        CartitemCount.textContent = itemCount;
    }
    updateItemCount();

    // Function to apply coupon code and deduct 10%
    function applyCouponCode(couponCode) {
        const validCouponCode = "DISCOUNT10"; // Example valid coupon code
        const discountPercentage = 10; // Discount percentage

        // Retrieve the cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedAmount = localStorage.getItem("totalAmount").replace(/,/g, "");
        const customerAmount = parseInt(storedAmount, 10);

        // Check if the coupon has already been used for the current order
        if (localStorage.getItem("couponApplied") === "true") {
            Toastify({
                text: "Coupon code has already been used for this order.",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();

            return;
        }

        if (couponCode === validCouponCode) {
            const discountAmount = (customerAmount * discountPercentage) / 100;
            const newTotalAmount = customerAmount - discountAmount;
            Toastify({
                text: `Coupon applied! ${discountPercentage}% has been deducted from your total.`,
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();

            // Save the updated total amount back to localStorage
            localStorage.setItem("totalAmount", newTotalAmount);
            localStorage.setItem("couponApplied", "true"); // Set flag indicating coupon has been applied

            // Update the total amount display
            const totalAmountElement = document.getElementById("cart-total");
            if (totalAmountElement) {
                totalAmountElement.innerHTML = `${newTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
            }
        } else {
            Toastify({
                text: "Invalid coupon code.",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();
        }
    }

    // Function to get the coupon code from the input field and apply it
    function applyCoupon() {
        const couponCode = document.getElementById("coupon-code").value.trim();
        applyCouponCode(couponCode);
    }

    // Attach event listener for applying coupon
    document
        .getElementById("apply-coupon-button")
        .addEventListener("click", applyCoupon);

    // City pills auto-fill the (read-only) state field
    const cityStateMap = {
        Lagos: "Lagos State",
        Ibadan: "Oyo State",
        Abeokuta: "Ogun State",
        Abuja: "Federal Capital Territory",
        "Port Harcourt": "Rivers State",
        "Benin City": "Edo State",
        Enugu: "Enugu State",
        Kano: "Kano State",
    };
    // Copy the chosen city's state into the read-only state field.
    function syncStateWithCity() {
        const selected = document.querySelector('input[name="city"]:checked');
        const stateInput = document.getElementById("state");
        if (selected && stateInput) {
            stateInput.value = cityStateMap[selected.value] || "";
        }
    }
    document.querySelectorAll('input[name="city"]').forEach((pill) => {
        // Sync the state whenever a city pill changes.
        pill.addEventListener("change", syncStateWithCity);
    });
    syncStateWithCity();

    // Checkout functionality
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Check if user is logged in
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
            Toastify({
                text: "Please log in to proceed with the checkout.",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();

            window.location.href = "../../../pages/member/member_login.html"; // Redirect to login page
            return;
        }

        // Stop an empty cart from reaching payment
        if (cart.length === 0) {
            Toastify({
                text: "Your cart is empty!",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();

            return;
        }

        // Process the customer details
        const customerName = document.getElementById("name").value.trim();
        const customerAddress = document.getElementById("address").value.trim();
        const customerCountry = "Nigeria";
        const selectedCity = document.querySelector('input[name="city"]:checked');
        const customerState = document.getElementById("state").value.trim();
        const customerCity = selectedCity ? selectedCity.value : "";
        const customerPhone = document.getElementById("phone").value.trim();
        const customerAlternatePhone = document
            .getElementById("altPhone")
            .value.trim();

        // Check if all required form fields are filled
        if (
            !customerName ||
            !customerAddress ||
            !customerState ||
            !customerCity ||
            !customerPhone ||
            !customerAlternatePhone
        ) {
            Toastify({
                text: "Please fill out all required fields.",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();

            return;
        }

        // Retrieve the selected payment method from localStorage
        const selectedPaymentMethod = localStorage.getItem("paymentMethod");

        // Store customer details in localStorage
        localStorage.setItem("customerName", customerName);
        localStorage.setItem("customerAddress", customerAddress);
        localStorage.setItem("customerCountry", customerCountry);
        localStorage.setItem("customerState", customerState);
        localStorage.setItem("customerCity", customerCity);
        localStorage.setItem("customerPhone", customerPhone);
        localStorage.setItem("customerAlternatePhone", customerAlternatePhone);

        // Retrieve customer Email from localStorage
        const customerEmail = localStorage.getItem("userEmail");

        // Depending on the selected payment method, route accordingly
        if (selectedPaymentMethod === "card") {
            // Redirect to Flutterwave payment platform
            makePayment();
        } else if (selectedPaymentMethod === "delivery") {
            // Handle pay on delivery option
            handlePayOnDelivery(
                customerName,
                customerEmail,
                customerAddress,
                customerCountry,
                customerState,
                customerCity,
                customerPhone,
                customerAlternatePhone,
            );
        }
    });
});

const paystackPublicKey = "pk_test_75c72b15bb57b4cc03f594976fab92cb685fcc6f";

// Build a unique Paystack reference from the clock and a random number.
function generateTransactionReference() {
    const timestamp = new Date().getTime(); // Current timestamp in milliseconds
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    return `TX-${timestamp}-${randomNumber}`;
}

const customerEmail = localStorage.getItem("userEmail");
const storedAmount = (localStorage.getItem("totalAmount") || "0").replace(
    /,/g,
    "",
);
const customerAmount = parseInt(storedAmount, 10) * 100; // Amount in kobo (10000 kobo = 100 NGN)
const customerName = localStorage.getItem("customerName");
const customerPhone = localStorage.getItem("customerPhone");
const customerReference = generateTransactionReference();

// Open the Paystack modal; on success, save the order and go to the receipt.
function makePayment() {
    const handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: customerEmail,
        amount: customerAmount,
        currency: "NGN",
        ref: customerReference,
        metadata: {
            custom_fields: [
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: customerName,
                },
                {
                    display_name: "Phone Number",
                    variable_name: "customer_phone",
                    value: customerPhone,
                },
            ],
        },
        callback: function (response) {
            // This function is called when the payment is successful
            alert("Payment successful! Transaction reference: " + response.reference);

            // Save the order after successful payment
            const orderDetailsForCard = {
                orderId: Date.now(), // Unique order ID
                customerName: customerName,
                customerEmail: customerEmail,
                customerAddress: localStorage.getItem("customerAddress"),
                customerCountry: localStorage.getItem("customerCountry"),
                customerState: localStorage.getItem("customerState"),
                customerCity: localStorage.getItem("customerCity"),
                customerPhone: customerPhone,
                customerAlternatePhone: localStorage.getItem("customerAlternatePhone"),
                paymentMethod: "Card",
                transactionReference: response.reference, // Save the transaction reference
                cart: getCartItems(), // Get items from the cart
            };
            saveOrderLocally(orderDetailsForCard);
            localStorage.setItem("currentOrderId", orderDetailsForCard.orderId); // Save current order ID

            const newUpdatedMessage = {
                id: "Order ID:" + " " + orderDetailsForCard.orderId + " " + "Paid",
                sender: "Admin",
                subject: "Congratulations your order has been shipped!",
                body: "Thank you for purchasing our product, your order has been shipped successfully, you will get a message from our admin when the product arrive our pickup station close to your address!",
            };

            storeUserMessage(customerEmail, newUpdatedMessage);

            clearCart();

            window.location.href = "../confirmation/confirmation.html"; // Redirect to confirmation page
        },
        onClose: function () {
            // This function is called when the user closes the payment modal without completing the payment
            Toastify({
                text: "Payment process was not completed.",
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "left",
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();
        },
    });

    // Open the Paystack payment modal
    handler.openIframe();
}

// fuction that create orders and save orders to local storage
function savPaideOrderLocally(orderDetailsForCard) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetailsForCard);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Function to handle Pay on Delivery option
function handlePayOnDelivery(
    name,
    email,
    address,
    country,
    state,
    city,
    phone,
    alternatePhone,
) {
    const orderDetails = {
        orderId: Date.now(), // Unique order ID
        customerName: name,
        customerEmail: email,
        customerAddress: address,
        customerCountry: country,
        customerState: state,
        customerCity: city,
        customerPhone: phone,
        customerAlternatePhone: alternatePhone,
        paymentMethod: "Pay on Delivery",
        cart: getCartItems(), // Get items from the cart
    };
    saveOrderLocally(orderDetails);
    localStorage.setItem("currentOrderId", orderDetails.orderId); // Save current order ID

    const newUpdatedMsg = {
        id: "Order ID:" + " " + orderDetails.orderId + " " + "Pending-Payment",
        sender: "Admin",
        subject: "Congratulations your order has been shipped!",
        body: "Hello, we reecived your order... you have chosen to pay on delivery, kindly get your money ready... your order has been shipped successfully, you will get a message from our admin when the product arrive our pickup station close to your address!",
    };

    storeUserMessage(email, newUpdatedMsg);

    clearCart();

    window.location.href = "../confirmation/confirmation.html"; // Redirect to confirmation page
}

// fuction that create orders and save orders to local storage
function saveOrderLocally(orderDetails) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderDetails);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Read the current cart from local storage.
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Remove the cart from local storage.
function clearCart() {
    localStorage.removeItem("cart");
}
