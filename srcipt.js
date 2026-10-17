const nairaSymbol = '\u20A6'
// Pick catalog items by id for the home page rails; bad ids are skipped.
const byIds = (...ids) => ids.map(id => findStoreProduct(id)).filter(Boolean);
const Products = byIds(23, 14, 37, 20, 1, 6, 11, 13);
const iphone = byIds(1, 6, 11, 13);
const ipads = getStoreCatalog().filter(p => p.category === 'ipad');
const macArray = getStoreCatalog().filter(p => p.category === 'mac');
const adapters = byIds(25, 30, 35, 37);

  
  
  // Render the top picks rail on the home page.
  document.addEventListener('DOMContentLoaded', () => {
      const productContainer = document.getElementById('product-container');
  
      Products.forEach(product => {
          const imgDiv = document.createElement('div');
          imgDiv.classList.add('img')
          imgDiv.id = `img${product.id}`
  
          const anchor = document.createElement('a');
          anchor.href = `pages/public/collections/collections.html?id=${product.id}`;
  
          const imgElement = document.createElement('img');
          imgElement.src = storeImg(product.image);
          imgElement.alt = product.name;

          // Shorten long product names so each rail caption stays compact.
          function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength - 3) + '...';
            } else {
                return text;
            }
        }

        const originalText = product.name ;
        const maxLength = 23; // Set the desired maximum length

        const truncatedText = truncateText(originalText, maxLength);

  
          const PDescription = document.createElement('h4')
          PDescription.innerText = truncatedText 

          const CPrice = document.createElement('h5')
          CPrice.innerHTML = `${nairaSymbol}${product.price}`
  
          const BPrice = document.createElement('h6')
          BPrice.innerHTML = `<s>${nairaSymbol}${product.beforeprice}</s>`
  
          productContainer.appendChild(imgDiv);
          anchor.appendChild(imgElement);
          imgDiv.appendChild(anchor);
          imgDiv.appendChild(PDescription)
          imgDiv.appendChild(CPrice)
          imgDiv.appendChild(BPrice)
      });
  });

  
  // Render the iPhone rail on the home page.
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container1');

    iphone.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/public/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(product.image);
        imgElement.alt = product.name;

        // Shorten long product names so each rail caption stays compact.
        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength - 3) + '...';
            } else {
                return text;
            }
        }

        const originalText = product.name ;
        const maxLength = 23; // Set the desired maximum length

        const truncatedText = truncateText(originalText, maxLength);

        const PDescription = document.createElement('h4')
        PDescription.innerText = truncatedText

        const CPrice = document.createElement('h5')
        CPrice.innerHTML = `Price:${nairaSymbol}${product.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${product.beforeprice}</s>`

        productContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});


// Render the iPad rail on the home page.
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container2');

    ipads.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/public/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(product.image);
        imgElement.alt = product.name;

        // Shorten long product names so each rail caption stays compact.
        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength - 3) + '...';
            } else {
                return text;
            }
        }

        const originalText = product.name ;
        const maxLength = 23; // Set the desired maximum length

        const truncatedText = truncateText(originalText, maxLength);

        const PDescription = document.createElement('h4')
        PDescription.innerText = truncatedText

        const CPrice = document.createElement('h5')
        CPrice.innerHTML = `Price:${nairaSymbol}${product.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${product.beforeprice}</s>`

        productContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});


// Render the Mac rail on the home page.
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container3');

    macArray.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/public/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(product.image);
        imgElement.alt = product.name;

        // Shorten long product names so each rail caption stays compact.
        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength - 3) + '...';
            } else {
                return text;
            }
        }

        const originalText = product.name ;
        const maxLength = 22; // Set the desired maximum length

        const truncatedText = truncateText(originalText, maxLength);

        const PDescription = document.createElement('h4')
        PDescription.innerText = truncatedText

        const CPrice = document.createElement('h5')
        CPrice.innerHTML = `Price:${nairaSymbol}${product.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${product.beforeprice}</s>`

        productContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});


// Render the accessories rail on the home page.
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container4');

    adapters.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/public/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(product.image);
        imgElement.alt = product.name;

        // Shorten long product names so each rail caption stays compact.
        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength - 3) + '...';
            } else {
                return text;
            }
        }

        const originalText = product.name ;
        const maxLength = 23; // Set the desired maximum length

        const truncatedText = truncateText(originalText, maxLength);

        const PDescription = document.createElement('h4')
        PDescription.innerText = truncatedText

        const CPrice = document.createElement('h5')
        CPrice.innerHTML = `Price:${nairaSymbol}${product.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${product.beforeprice}</s>`

        productContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});
  
