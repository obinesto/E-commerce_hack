const nairaSymbol = '\u20A6'
const catalogPhones = getStoreCatalog().filter(p => p.category === 'iphone');
const iphone11Array = catalogPhones.filter(p => p.line === '11');
const iphone13Array = catalogPhones.filter(p => p.line === '13');
const iphone14Array = catalogPhones.filter(p => p.line === '14');
const iphone15Array = catalogPhones.filter(p => p.line === '15');

// iphone11 product array

document.addEventListener('DOMContentLoaded', () => {
    const iphone11Container = document.getElementById('iphone11');

    iphone11Array.forEach(iphone => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${iphone.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${iphone.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(iphone.image);
        imgElement.alt = iphone.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = iphone.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${iphone.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${iphone.beforeprice}</s>`

        iphone11Container.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});


// iphone13 product Array

document.addEventListener('DOMContentLoaded', () => {
    const iphone13Container = document.getElementById('iphone13');

    iphone13Array.forEach(iphone => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${iphone.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${iphone.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(iphone.image);
        imgElement.alt = iphone.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = iphone.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${iphone.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${iphone.beforeprice}</s>`

        iphone13Container.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});


// iphone14 product array

document.addEventListener('DOMContentLoaded', () => {
    const iphone14Container = document.getElementById('iphone14');

    iphone14Array.forEach(iphone => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${iphone.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${iphone.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(iphone.image);
        imgElement.alt = iphone.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = iphone.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${iphone.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${iphone.beforeprice}</s>`

        iphone14Container.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});


// iphone15 product array

document.addEventListener('DOMContentLoaded', () => {
    const iphone15Container = document.getElementById('iphone15');

    iphone15Array.forEach(iphone => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${iphone.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${iphone.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(iphone.image);
        imgElement.alt = iphone.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = iphone.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${iphone.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${iphone.beforeprice}</s>`

        iphone15Container.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});
