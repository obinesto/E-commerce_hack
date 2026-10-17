// Mac category page: render the MacBook rail from the catalog.
const nairaSymbol = '\u20A6'
const macArray = getStoreCatalog().filter(p => p.category === 'mac');

// mac products render
document.addEventListener('DOMContentLoaded', () => {
    const macContainer = document.getElementById('macbookSeries');

    macArray.forEach(mac => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('iphone-img')
        imgDiv.id = `pimg${mac.id}`

        const anchor = document.createElement('a');
        anchor.href = `../collections/collections.html?id=${mac.id}`;

        const imgElement = document.createElement('img');
        imgElement.src = storeImg(mac.image);
        imgElement.alt = mac.name;

        const PDescription = document.createElement('h5')
        PDescription.innerText = mac.name

        const CPrice = document.createElement('h6')
        CPrice.innerHTML = `Price:${nairaSymbol}${mac.price}`

        const BPrice = document.createElement('h6')
        BPrice.innerHTML = `Before:<s>${nairaSymbol}${mac.beforeprice}</s>`

        macContainer.appendChild(imgDiv);
        anchor.appendChild(imgElement);
        imgDiv.appendChild(anchor);
        imgDiv.appendChild(PDescription)
        imgDiv.appendChild(CPrice)
        imgDiv.appendChild(BPrice)
    });
});
