const nairaSymbol = '\u20A6'
const catalogAccessories = getStoreCatalog().filter(p => p.category === 'accessories');
const adapters = catalogAccessories.filter(p => p.line === 'adapter');
const Airpods = catalogAccessories.filter(p => p.line === 'airpod');
const cables = catalogAccessories.filter(p => p.line === 'cable');
const protections = catalogAccessories.filter(p => p.line === 'protection');

// accessories array

document.addEventListener('DOMContentLoaded', () => {
    const adapterContainer = document.getElementById('adapter');

    adapters.forEach(adapter => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${adapter.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${adapter.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(adapter.image);
        imgElement.alt = adapter.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = adapter.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${adapter.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${adapter.beforeprice}</s>`

        adapterContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const airpodContainer = document.getElementById('airpod');

    Airpods.forEach(airpod => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${airpod.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${airpod.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(airpod.image);
        imgElement.alt = airpod.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = airpod.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${airpod.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${airpod.beforeprice}</s>`

        airpodContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const cableContainer = document.getElementById('cable');

    cables.forEach(cable => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${cable.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${cable.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(cable.image);
        imgElement.alt = cable.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = cable.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${cable.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${cable.beforeprice}</s>`

        cableContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const protectionContainer = document.getElementById('protection');

    protections.forEach(protection => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${protection.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${protection.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(protection.image);
        imgElement.alt = protection.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = protection.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${protection.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${protection.beforeprice}</s>`

        protectionContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});
