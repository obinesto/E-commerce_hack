const nairaSymbol = "\u20A6";

document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Call renderCart on page load to display items in the cart
  renderCart();

  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      const emptyRow = document.createElement("tr");
      emptyRow.className = "cart-empty-row";
      emptyRow.innerHTML = `<td colspan="5">Your cart is empty. <a href="../../index.html">Continue shopping</a></td>`;
      cartItemsContainer.appendChild(emptyRow);
    }

    cart.forEach((item) => {
      const itemTotalRaw = item.price.replace(/,/g, ""); // remove commas to aid summation
      const itemTotal = parseInt(itemTotalRaw, 10) * item.quantity;
      total += itemTotal;

      const itemRow = document.createElement("tr");
      itemRow.innerHTML = `
        <td><span class="cart-product"><img src='${item.image}' alt=''> <span>${item.name}</span></span></td>
        <td>${nairaSymbol} ${item.price}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
        </td>
        <td>${nairaSymbol} ${itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td>
          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </td>
      `;
      cartItemsContainer.appendChild(itemRow);
    });

    const totalAmountFormatted = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    cartTotalElement.innerHTML = `Total Amount: ${nairaSymbol}${totalAmountFormatted}`;
    localStorage.setItem('totalAmount', total);

   
    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const newQuantity = parseInt(event.target.value, 10);
        if (!Number.isFinite(newQuantity) || newQuantity < 1) {
          removeItemFromCart(productId);
          return;
        }
        updateQuantity(productId, newQuantity);
      });
    });

    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        removeItemFromCart(productId);
      });
    });

  }




  function addItemToCart(productId) {
    let product = products.find((product) => product.id == productId);

    if (product) {
      let cartItem = cart.find((item) => item.id == productId);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateItemCount();
    }
  }

  function removeItemFromCart(productId) {
    cart = cart.filter((item) => item.id != productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateItemCount();
  }

  function updateQuantity(productId, quantity) {
    for (let product of cart) {
      if (product.id == productId) {
        product.quantity = quantity;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateItemCount();
  }

  function getTotal() {
    let total = cart.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    return total.toFixed(2);
  }

  // Function to update the item count in the circle
  function updateItemCount() {
    const itemCountCircle = document.getElementById("item-count-circle");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    itemCountCircle.textContent = itemCount;
  }

  // Call the function on page load to set the initial count
  updateItemCount();


  // ClearCart functionality
  document.getElementById("clearcart-button").addEventListener("click", () => {
    clearCart();
  });

  function clearCart() {
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

    // Clear the cart
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();

    Toastify({

      text: "Your Cart is Cleared Successfully!",
      duration: 3000,
      gravity: "top", // `top` or `bottom`
      position: "left", 
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
      }).showToast();
  }


  // Checkout functionality
  document.getElementById('checkout-button').addEventListener('click',  function(event)  {
    event.preventDefault(); // Prevent default form submission
        handleCartcheck()
        
    
      });
    
      function handleCartcheck() {
        if (cart.length === 0) {
          Toastify({

            text: "Your cart is empty!",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "left", 
            style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();
        }
    
       else {
        
        // Check which radio button is selected
        const selectedPaymentMethod = document.querySelector('input[name="recommend"]:checked').value;
    
         // Store the selected payment method in localStorage
         localStorage.setItem('paymentMethod', selectedPaymentMethod);
    
        // Redirect to the customer details form page
        window.location.href = '../check-out/checkout.html'; // Replace with the actual URL of your form page
        };
    
    }
    
    
    


});



