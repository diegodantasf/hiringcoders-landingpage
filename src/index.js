import { createItem } from "./components/item.js";

function capitalizePokemonName(name) {
    return name.charAt('0').toUpperCase() + name.slice(1);
}

function loadSpotlightItem() {
    const spotlightItem = document.querySelector("#spotlight-item");
    const item = createItem("../assets/masterball.svg", "", ["calc(250px - 10vmin)", "calc(250px - 10vmin)"]);
    spotlightItem.appendChild(item);
}

function loadAdsItems(number_of_items = 3) {
    const adsContainer = document.querySelector("#more-items [items]");
    for (let i = 0; i < number_of_items; ++i) {
        // https://pokeapi.co/api/v2/pokemon/1 -- Pokemon info
        // https://pokeres.bastionbot.org/images/pokemon/1.png -- Pokemon image

        const pokemonId = Math.floor(Math.random() * 300 + 1)
        const pokemonInfoURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        const pokemonImageURL = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`

        fetch(pokemonInfoURL)
            .then(response => response.json())
            .then(function(pokemonInfo) {
                const discount = Math.floor(Math.random() * 80);
                const description = `${capitalizePokemonName(pokemonInfo['name'])}: ${discount}% OFF`;
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

function initNewsletter() {
    const form = document.querySelector("#newsletter [form]");
    const button = form.querySelector("[type=button]");

    button.onclick = function(e) {
        const text = form.querySelector("#newsletter [type=text]");
        if (text.value.length == 0) {
            return;
        }
        let emails = localStorage.getItem("emails");
        if (emails === null) {
            emails = []
        } else {
            emails = JSON.parse(emails);
        }
        let response = "Email already registered!";
        if (!emails.includes(text.value)) {
            emails.push(text.value);
            localStorage.setItem("emails", JSON.stringify(emails));
            response = "Success!";
        }
        text.value = "";
        
        this.value = response;
        this.disabled = true;
        const updateButton = function(){ 
            this.value = "Submit";
            this.disabled = false;
        }.bind(this);
        setTimeout(updateButton, 3000);
    }

    form.querySelector("#newsletter [type=text]").onkeyup = function(e) {
        if (e.key === 'Enter') {
            button.click();
        }
    }
}

initNewsletter();
loadSpotlightItem();
loadAdsItems();
