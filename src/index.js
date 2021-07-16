import { createItem } from "./components/item.js";

function capitalizePokemonName(name) {
    return name.charAt('0').toUpperCase() + name.slice(1);
}

function loadSpotlightItem() {
    const spotlightItem = document.querySelector("#spotlight-item .item");
    const item = createItem("../assets/masterball.svg", "", [250, 250]);
    spotlightItem.parentNode.replaceChild(item, spotlightItem);
}

function loadAdsItems(number_of_items = 3) {
    const adsContainer = document.querySelector("#more-items");
    for (let i = 0; i < number_of_items; ++i) {
        // https://pokeapi.co/api/v2/pokemon/1 -- Pokemon info
        // https://pokeres.bastionbot.org/images/pokemon/1.png -- Pokemon image

        const pokemonId = Math.floor(Math.random() * 150 + 1)
        const pokemonInfoURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        const pokemonImageURL = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`

        const pokemonInfo = fetch(pokemonInfoURL)
            .then(response => response.json())
            .then(function(pokemonInfo) {
                console.log(pokemonInfo);
                const description = capitalizePokemonName(pokemonInfo['name']);
                const item = createItem(pokemonImageURL, description);
                adsContainer.appendChild(item);
            })
            .catch(error => {
                const description = "Item could not be loaded :(";
                const item = createItem("https://placeholder.pics/svg/300/DEDEDE/555555/item", description);
                adsContainer.appendChild(item);
                console.log(error);
            });
    }
}

loadSpotlightItem();
loadAdsItems();