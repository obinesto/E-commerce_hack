// iPad category page: render the iPad rail from the catalog.
const nairaSymbol = '\u20A6'
const ipads = getStoreCatalog().filter(p => p.category === 'ipad');

// ipad products render
document.addEventListener('DOMContentLoaded', () => {
    const ipadContainer = document.getElementById('ipadSeries');

    ipads.forEach(ipad => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${ipad.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${ipad.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(ipad.image);
        imgElement.alt = ipad.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = ipad.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${ipad.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${ipad.beforeprice}</s>`

        ipadContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});

