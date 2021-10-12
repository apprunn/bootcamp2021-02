//IMPORT METHODS
/*
    {localStorageKeyName,pokemonBase,getPokemon} from "./services.js"
    {chartStats} from "./chart.js"
*/
window.onload = function () {
    //ADD EventListener to controls
    var btnPrevius = document.querySelector("#previus"),
        btnNext = document.querySelector("#next"),
        btnSearch = document.querySelector("#search-btn"),
        inputSearch = document.getElementById("search-pokemon");

    btnPrevius.addEventListener('click', function () {
        const pokemonLast = getLastPokemon();
        const id_previus = pokemonLast.id == 1 ? 1 : pokemonLast.id - 1;
        searchPokemons(id_previus);
    });
    btnNext.addEventListener('click', function () {
        const pokemonLast = getLastPokemon();
        searchPokemons(pokemonLast.id + 1);
    });
    btnSearch.addEventListener('click', function () {
        const search = document.getElementById("search-pokemon").value;
        if (search.length > 0)
        searchPokemons(search.toLowerCase());
    });
    inputSearch.addEventListener('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            const search = document.getElementById("search-pokemon").value;
        if (search.length > 0)
        searchPokemons(search.toLowerCase());
        }
    });
    const pokemonLast = getLastPokemon();
    searchPokemons(pokemonLast.id);
}

//SEARCH POKEMON
const searchPokemons = (nameOrId) => {
    getPokemon(nameOrId).then((data) => {
        loadData(data);
    });
}

//SET DATA POKEMON TO VIEW HTML
const loadData = (pokemon) => {
    document.getElementById("code-pokemon").innerHTML = '# '+pokemon.id;
    document.getElementById("name-pokemon").innerHTML = pokemon.name;
    document.getElementById("description-pokemon").innerHTML = pokemon.description;
    document.getElementById("image-pokemon").src = pokemon.url_image;
    document.getElementById("weight-pokemon").innerHTML = pokemon.weight;
    document.getElementById("height-pokemon").innerHTML = pokemon.height;
    document.getElementById("type-pokemon").innerHTML = pokemon.type;
    document.getElementById("experience-pokemon").innerHTML = pokemon.experience;
    document.getElementById("abilities-pokemon").innerHTML = pokemon.abilities;
    for (let index = 0; index < pokemon.evolutions.length; index++) {
        const element = pokemon.evolutions[index];
        document.getElementById("box"+(index+1)+"-pokemon").removeAttribute ("hidden");
        document.getElementById("next"+(index+1)).style.cssText = '';
        document.getElementById("level"+(index+1)+"-pokemon").src = element.url_image;
        if(pokemon.evolutions.length==2){
            document.getElementById("box3-pokemon").setAttribute ("hidden",true);
            document.getElementById("next3").style.cssText = 'display: none';
        }
    }
    chartStats(pokemon.stats);
    saveLocalStorage(pokemon);
}

//SAVE LAST VIEW POKEMON IN LOCAL STORAGE
const saveLocalStorage=(newPokemon = null)=>{
    var pokemon = newPokemon !== null?newPokemon:pokemonBase;
    localStorage.setItem(localStorageKeyName, JSON.stringify(pokemon));
}
//GET LAST VIEW POKEMON FROM LOCAL STORAGE
const getLastPokemon = () =>{
    var pokemonLocalStorage= localStorage.getItem(localStorageKeyName),
    pokemon = pokemonLocalStorage !== null?JSON.parse(pokemonLocalStorage):pokemonBase;
    return pokemon;
}
