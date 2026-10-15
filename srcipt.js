const nairaSymbol = '\u20A6'

var Products = [
    {
        "id": 23,
        "image": "./assets/images/ipad/apple-ipad-pro-12.9-m22022-modelwi-ficellular-512gb-space-gray.jpg",
        "name": "Apple Ipad 512gb (gray)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 1
    },
    {
        "id": 14,
        "image": "./assets/images/iphone/15/apple-iphone-15-pro-max-256gb-nano-sim-blue-titanium.jpg",
        "name": "Apple IPhone 15 Pro Max 256gb (nano-sim blue titanium)",
        "price": "1,890,090",
        "beforeprice": "2,100,100",
        "discountprice": "-10%",
        "quantity": 1
      },
      {
        "id": 37,
        "image": "./assets/images/accessories/protection/apple-iphone-15-pro-max-finewoven-case-with-magsafe-taupe.webp",
        "name": "Magsafe protection case (Brown)",
        "price": "34,200",
        "beforeprice": "38,000",
        "discountprice": "-10%",
        "quantity": 1
    },
    {
        "id": 20,
        "image": "./assets/images/mac/apple-macbook-pro-16.2-32gb-1tb-10-cores-m1-max-silver.jpg",
        "name": "Apple MacBook Pro 32gbRAM 1tbROM (10-cores, silver)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 1
    }
  ]
  
  
  document.addEventListener('DOMContentLoaded', () => {
      const productContainer = document.getElementById('product-container');
  
      Products.forEach(product => {
          const imgDiv = document.createElement('div');
          imgDiv.classList.add('img')
          imgDiv.id = `img${product.id}`
  
          const anchor = document.createElement('a');
          anchor.href = `pages/collections/collections.html?id=${product.id}`;
  
          const imgElement = document.createElement('img');
          imgElement.src = product.image;
          imgElement.alt = product.name;

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

  // iphone product array
var iphone = [
    {
        "id": 1,
        "image": "./assets/images/iphone/11/apple-iphone-11-pro-max-6.5-4gb-ram-64gb-rom-gold.jpg",
        "name": "Apple iphone 11 Pro Max 64gb (gold)",
        "price": "360,000",
        "beforeprice": "400,000",
        "discountprice": "-10%",
        "quantity": 1
    },
    {
        "id": 6,
        "image": "./assets/images/iphone/13/iphone-13-pro-max-6.7-super-retina-xdr-display-with-promotion-6gb-ram-512gb-rom-ios-15-5g-facetime-gold.jpg",
        "name": "IPhone 13 Pro Max 512gb (gold)",
        "price": "2,250,000",
        "beforeprice": "2,500,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 11,
        "image": "./assets/images/iphone/14/iphone-14-pro-max-6.7-6gb-ram-128gb-rom-deep-purple.jpg",
        "name": "IPhone 14 Pro max 128gb (purple)",
        "price": "1,800,000",
        "beforeprice": "2,000,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 13,
        "image": "./assets/images/iphone/15/apple-iphone-15-pro-128gb-nano-sim-natural-titanium-.jpg",
        "name": "Apple iphone 15 Pro 128gb (natural-titanium)",
        "price": "1,800,000",
        "beforeprice": "2,000,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container1');

    iphone.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.name;

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

var ipads = [
    {
        "id": 21,
        "image": "./assets/images/ipad/apple-ipad-9th-gen-10.2-wi-fi-cellular-256gb-space-grey.jpg",
        "name": "Apple IPad 256gb (grey)",
        "price": "1,485,000",
        "beforeprice": "1,650,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 22,
        "image": "./assets/images/ipad/Apple-IPad-Pro-12.9-M2-2022 Model-Wi-Fi-Only-128GB-Silver.jpg",
        "name": "Apple IPad 128gb (silver)",
        "price": "1,895,100",
        "beforeprice": "2,100,100",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 23,
        "image": "./assets/images/ipad/apple-ipad-pro-12.9-m22022-modelwi-ficellular-512gb-space-gray.jpg",
        "name": "Apple Ipad 512gb (gray)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 24,
        "image":"./assets/images/ipad/apple-ipad-9th-gen-10.2-wi-fi-cellular-256gb-space-grey.jpg",
        "name": "Apple ipad 256gb (gray)",
        "price": "4,386,780",
        "beforeprice": "4,874,200",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container2');

    ipads.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.name;

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

var macArray = [
    {
        "id": 17,
        "image": "./assets/images/mac/apple-13.6-macbook-air-m2-midnight-8gb-512gb.jpg",
        "name": "Macbook Air 512gb",
        "price": "450,000",
        "beforeprice": "500,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 18,
        "image": "./assets/images/mac/2024 OSX SONOMA- 2018 MACBOOK AIR 13 - 1.6GHz i5 - 16GB RAM - 256GB SSD - GRAY.webp",
        "name": "Macbook AIR 13 256gb (grey)",
        "price": "1,890,090",
        "beforeprice": "2,100,100",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },,
    {
        "id": 19,
        "image": "./assets/images/mac/apple-macbook-air-13-inch-2022-m2-8gb-256gb-ssd-8-core-gpu-space-gray.jpg",
        "name": " Apple Macbook Air 13 256gb (gray)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 20,
        "image": "./assets/images/mac/apple-macbook-pro-16.2-32gb-1tb-10-cores-m1-max-silver.jpg",
        "name": "Apple MacBook Pro 32gbRAM 1tbROM (10-cores, silver)",
        "price": "1,602,000",
        "beforeprice": "1,780,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container3');

    macArray.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.name;

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

var adapters = [
    {
        "id": 25,
        "image": "./assets/images/accessories/adapter/apple-30w-usb-c-power-adapter.webp",
        "name": "Apple-30w USB Adapter (white)",
        "price": "36,000",
        "beforeprice": "40,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 30,
        "image": "./assets/images/accessories/airpod/airpods-max-grey.webp",
        "name": "Airpod max (grey)",
        "price": "175,000",
        "beforeprice": "195,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 35,
        "image": "./assets/images/accessories/cable/lightning-to-usb-cable-2-m.webp",
        "name": "USB Charge-cable 2m (white)",
        "price": "58,500",
        "beforeprice": "65,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    },
    {
        "id": 37,
        "image": "./assets/images/accessories/protection/apple-iphone-15-pro-max-finewoven-case-with-magsafe-taupe.webp",
        "name": "Magsafe protection case (Brown)",
        "price": "34,200",
        "beforeprice": "38,000",
        "discountprice": "-10%",
        "quantity": 1,
        "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores qui sequi veritatis ex, omnis repellendus, iste quod magnam aliquam nobis esse nemo saepe id? Alias doloribus placeat harum dolorem quaerat." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container4');

    adapters.forEach(product => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('img')
        imgDiv.id = `img${product.id}`

        const anchor = document.createElement('a');
        anchor.href = `pages/collections/collections.html?id=${product.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = product.image;
        imgElement.alt = product.name;

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
  