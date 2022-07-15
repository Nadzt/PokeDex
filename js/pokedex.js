// variables for form and the card sections
const form = document.getElementById("form");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

const background = document.getElementsByClassName("card__header")[0];
const image = document.getElementsByClassName("card__image")[0];
const pokemonName = document.getElementsByClassName("card__name")[0];
const pokemonNum = document.getElementsByClassName("card__number")[0];
const typesDiv = document.getElementsByClassName("card__types")[0];
const nextBtnText = document.getElementsByClassName("card__links-num");
const previousImg = document.getElementsByClassName("card__previous-img")[0];
const nextImg = document.getElementsByClassName("card__next-img")[0]; 
const pokemonHeight = document.getElementsByClassName("card__measure--text")[1];
const pokemonWeight = document.getElementsByClassName("card__measure--text")[3];
const pokemonItem = document.getElementsByClassName("card__held-icon")[0];
const pokemonStatsNums = document.getElementsByClassName("card__stat--num");
const pokemonStatsBars = document.getElementsByClassName("card__stat--bar-fill");

// Current Pokemon Displayed 
let pokemon;

//artwork options
const pokemonArt = document.getElementsByClassName("card__side-link");

// Type colors for backgrounds
const colors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

// Start the app with Bulbasaur displayed
window.onload =  async (event) => {
    pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
    displayPokemon(pokemon.data);

    // initiate Artwork buttons functionality
    for(let i = 0 ; i < pokemonArt.length; i++ ){
        pokemonArt[i].addEventListener("click", (e)=> {
            switch (i) {
                case 0:
                    image.src = pokemon.sprites.other["official-artwork"].front_default;
                    break;
                case 1:
                    image.src = pokemon.sprites.versions["generation-i"]["red-blue"].front_transparent;
                    break;
                case 2:
                    image.src = pokemon.sprites.versions["generation-ii"]["gold"].front_transparent;
                    break;
                case 3:
                    image.src = pokemon.sprites.versions["generation-iii"]["ruby-sapphire"].front_default;
                    break;
                case 4:
                    image.src = pokemon.sprites.versions["generation-iv"]["diamond-pearl"].front_default;
                    break;
                case 5:
                    image.src = pokemon.sprites.versions["generation-v"]["black-white"].front_default;
                    break;
                case 6:
                    image.src = pokemon.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default;
                    break;
                case 7:
                    image.src = pokemon.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default;
                    break;
            }
        });
    };

}

// prevents form input, sets value to random pkmn if empty
form.addEventListener("submit", async (event) => {

    event.preventDefault();

    pokemon = form.elements.pokemon.value.toLowerCase().replace(" ", "");

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(function(response) {
        displayPokemon(response.data)
    })
    .catch( async function(error) {
        pokemon = Math.floor(Math.random() * 686 + 1);
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then( function(response) {
            displayPokemon(response.data)
        })
    });
});

// Bottom buttons
previousBtn.addEventListener("click", async (event) => {

    event.preventDefault();

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`)
    .then(function(response) {
        displayPokemon(response.data)
    })
});

nextBtn.addEventListener("click", async (event) => {

    event.preventDefault();

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`)
    .then(function(response) {
        displayPokemon(response.data)
    })
});





const displayPokemon = (pokemonData) => {
    typesDiv.innerHTML = ""; // empties to delete previous pokemon types
    pokemonItem.innerHTML = "" // resets held__item

    image.src = pokemonData.sprites.other["official-artwork"].front_default || pokemonData.sprites.front_default;
    pokemonName.innerHTML = pokemonData.name;
    pokemonNum.innerHTML = `#${pokemonData.id}`;
    pokemonHeight.innerHTML = `${(pokemonData.height / 10)}m`;
    pokemonWeight.innerHTML = `${(pokemonData.weight / 10)}kg`;


    if( pokemonData.held_items.length == 0 ){
        pokemonItem.innerHTML = "None";
    } else {
        let itemIcon = document.createElement("img");
        itemIcon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${pokemonData.held_items[0].item.name}.png`
        pokemonItem.appendChild(itemIcon);
    }

    for(let i = 0; i < pokemonData.types.length; i++) {
        // Creates the types in the card and appends them to the parent div
        let type = document.createElement("p");
        type.classList.add("card__type");
        type.innerHTML = pokemonData.types[i].type.name
        type.style.backgroundColor = `${colors[pokemonData.types[i].type.name]}`
        typesDiv.appendChild(type);
    }
    switch (pokemonData.types.length) {
        case 1:
            background.style.background = `${colors[pokemonData.types[0].type.name]}`;
            break
        case 2:
            background.style.background = `linear-gradient(to right, ${colors[pokemonData.types[0].type.name]}, ${colors[pokemonData.types[1].type.name]})`;
            break
    }

    if(pokemonData.id != 1 && pokemonData.id != 898) {
        previousImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemonData.id - 1}.png`; previousBtn.classList.remove("hidden");
        nextImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemonData.id + 1}.png`; nextBtn.classList.remove("hidden");
    } else if (pokemonData.id == 1) {
        previousImg.src = ``; previousBtn.classList.add("hidden");
        nextImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemonData.id + 1}.png`; nextBtn.classList.remove("hidden");
    } else {
        previousImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${pokemonData.id - 1}.png`; previousBtn.classList.remove("hidden");
        nextImg.src = ``; nextBtn.classList.add("hidden");
    }
    nextBtnText[0].innerHTML = `#${pokemonData.id - 1}`;
    nextBtnText[1].innerHTML = `#${pokemonData.id + 1}`;

    for(let i = 0; i < 6; i++) {
        pokemonStatsNums[i].innerHTML = pokemonData.stats[i].base_stat;
        switch (i) {
            case 0: 
                pokemonStatsBars[i].style.width = `${Math.floor( pokemonData.stats[i].base_stat * 100 / 255 )}%`;
                break
            case 1: 
                pokemonStatsBars[i].style.width = `${Math.floor( pokemonData.stats[i].base_stat * 100 / 180 )}%`;
                break
            case 2: 
                pokemonStatsBars[i].style.width = `${Math.floor( pokemonData.stats[i].base_stat * 100 / 230 )}%`;
                break
            case 3: 
                pokemonStatsBars[i].style.width = `${Math.floor( pokemonData.stats[i].base_stat * 100 / 180 )}%`;
                break
            case 4: 
                pokemonStatsBars[i].style.width = `${Math.floor( pokemonData.stats[i].base_stat * 100 / 230 )}%`;
                break
            case 5: 
                pokemonStatsBars[i].style.width = `${Math.floor( pokemonData.stats[i].base_stat * 100 / 180 )}%`;
                break
        }
    }

    // Button artwork Disables and Enables if artwork exist - might be a better option for this, but i dont know
    // a shorter version could be with Object.keys(X).length but it's confusing to look at, this is becose the API
    // works with those text names for the keys, and cant iterate with numbers
    // it 
    for(let i = 0; i < 8; i++ ) {
        switch (i) {
            case 0:
                if( pokemonData.sprites.other["official-artwork"].front_default == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 1:
                if( pokemonData.sprites.versions["generation-i"]["red-blue"].front_transparent == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 2:
                if( pokemonData.sprites.versions["generation-ii"]["gold"].front_transparent == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 3:
                if( pokemonData.sprites.versions["generation-iii"]["ruby-sapphire"].front_default == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 4:
                if( pokemonData.sprites.versions["generation-iv"]["diamond-pearl"].front_default == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 5:
                if( pokemonData.sprites.versions["generation-v"]["black-white"].front_default == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 6:
                if( pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
            case 7:
                if( pokemonData.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default == null ) { 
                    pokemonArt[i].classList.add("card__side-link-disabled"); 
                    break;
                }
                pokemonArt[i].classList.remove("card__side-link-disabled"); 
                break;
    }}

    //after displaying returns the current pkmn number to the pokemon variable
    pokemon = pokemonData;
}

// Artwork options



// move PkMn image slightly on mouse movement
// let imageParent = document.getElementsByClassName("card__image-div")[0];
// window.addEventListener("mousemove", (event) => {
//     image.style.top = `${ (imageParent.offsetHeight / 2) + (event.clientY - (window.innerHeight / 2)) / -75 }px`;
//     image.style.left = `${ (imageParent.offsetWidth / 2) + (event.clientX - (window.innerWidth / 2)) / -100 }px`;
// })
// 





// const seeds = document.getElementById("seeds")
// window.onload = async (e) => {
//     for(let i = 0; i < 898; i ++) {
//         let small = document.createElement("img");
//         small.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i + 1}.png`;
//         seeds.appendChild(small);
//     }
// }