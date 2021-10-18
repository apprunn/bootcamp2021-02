//VARIBLE GLOBALES
const url = "https://pokeapi.co/api/v2";
const urlAssets = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
const  localStorageKeyName = 'pokemon';
const pokemonBase  = {
    id : "1",
    name: "bulbasaur",
    description: "A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON",
    url_image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
};

//REQUEST TO POKEAPI
const getPokemon = async (nameOrId) => {
    const pokemonPromise = await axios.get(`${url}/pokemon/${nameOrId}`);
    const speciesPromise = await axios.get(`${url}/pokemon-species/${nameOrId}`);
    const species = speciesPromise.data;
    const evolutionsPromise = await axios.get(species.evolution_chain.url);
    const results = await axios.all([pokemonPromise,speciesPromise,evolutionsPromise])
    const resulData = results.map(v => v.data);
    const pokemon = getPokemonProfile(resulData);
    return pokemon;
}
// GET OBJECT POKEMON FROM DATA REQUEST
const getPokemonProfile=(data) => {
    return ({
        id : data[0].id,
        name: data[0].name,
        url_image: urlAssets+concatId(data[0].id)+".png",
        weight: data[0].weight,
        height: data[0].height,
        type:getDataExtrasPokemon(data[0].types,"type"),
        abilities:getDataExtrasPokemon(data[0].abilities,"ability"),
        experience:data[0].base_experience,
        description: data[1].flavor_text_entries[0].flavor_text,
        url_evolution: data[1].evolution_chain.url,
        stats:data[0].stats,
        evolutions:getEvolution(data[2].chain),
    })
}

//GET POKEMON EVOLUTIONS FROM DATA REQUEST
const getEvolution = (data)=>{
    var evolutions = [];
    var newLevel = {
        id:getIdFromUrl(data.species.url),
        name:data.species.name,
        url_image:urlAssets+concatId(getIdFromUrl(data.species.url))+".png"
    };
    evolutions.push(newLevel);
    if(data.evolves_to.length >0 ){
        newLevel = {
            id:getIdFromUrl(data.evolves_to[0].species.url),
            name:data.evolves_to[0].species.name,
            url_image:urlAssets+concatId(getIdFromUrl(data.evolves_to[0].species.url))+".png"
        };
        evolutions.push(newLevel);
        if(data.evolves_to[0].evolves_to.length >0 ){
            newLevel = {
                id:getIdFromUrl(data.evolves_to[0].evolves_to[0].species.url),
                name:data.evolves_to[0].evolves_to[0].species.name,
                url_image:urlAssets+concatId(getIdFromUrl(data.evolves_to[0].evolves_to[0].species.url))+".png"
            };
            evolutions.push(newLevel);
        }
    }
    return evolutions;
}
//GET EXTRA INFORMATION FROM POKEMON
const getDataExtrasPokemon=(data,type = null)=>{
    var dataString = "";
    type=="ability"?
    data.map((a)=>{dataString += a.ability.name+", ";}):
    data.map((a)=>{ dataString += a.type.name+", ";});
    return dataString.slice(0, -2);
}
const getIdFromUrl = (url) => {
    const id = url.replace("https://pokeapi.co/api/v2/pokemon-species/","");
    return id.slice(0, -1);
}
const concatId=(id)=>{
    return id.toString().length >= 3 ? id : id.toString().length < 2 ? "00"+id:"0"+id;
}
