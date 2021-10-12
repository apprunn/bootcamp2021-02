//pokemon-species/1
// pokemon/1
const urlPockemon = 'https://pokeapi.co/api/v2/pokemon/';


const getRandomInt = (min, max) =>{
    return Math.floor(Math.random()*(max-min))+min;
}

document.addEventListener('DOMContentLoaded', () => {
    fillName(); 
    for (let i = 1; i <= 3; i++){
        // let id = getRandomInt(1,151)
        let id = i;
        fetchData(id, i);
    }
        
     
   
})


// Crear pokemon
const fetchData = async (pkm, i) => {
    try {
        const res = await fetch(urlPockemon + pkm)
        const data = await res.json()
        fillData(data, i)
    } catch (error) {
        console.log(error)
    }
}

//fill Data
const fillData = (pokemon, id) => {
    console.log(pokemon)
    document.getElementById("ima" + id).setAttribute("src", pokemon.sprites.other.dream_world.front_default);
    document.getElementById("ima_evo_" + id).setAttribute("src", pokemon.sprites.front_default);
    document.getElementById("ima_evo_" + id+id).setAttribute("src", pokemon.sprites.front_default);

    document.getElementById("name_pkm" + id).innerHTML = `${pokemon.name}`;
    let species = pokemon.species['url']
    // console.log(species)


    fetch(species)
        .then(response => response.json())
        .then(dataPokemon => {
            // console.log(dataPokemon)
            let evolution = dataPokemon.evolution_chain['url'];

            fillEvolution(evolution);
            //  document.getElementById("ima1").setAttribute("src",dataPokemon.sprites.other.dream_world.front_default);



        })
}
//Evoluciones
const fillEvolution = (evolution) => {

    // console.log(evolution)
    fetch(evolution)
        .then(resEvolution => resEvolution.json())
        .then(dataEvolution => {

            // console.log(dataEvolution)


        })
}
var options = `<option selected>Buscar por nombre</option>`;
const fillName = () => {
    try {
        // let options = "";
        for (let i = 1; i <= 150; i++) {
            seachName(i)
            // options+=`<option value="${i}">${i}</option>\n`
        }
        // console.log(options)
        
        
    } catch (error) {
        console.log(error)
    }

    
}

const seachName = async (pkm) => {
    try {
        // let options = "";
        const res = await fetch(urlPockemon + pkm)
        const data = await res.json()
        options += `<option value="${data.id}">${data.name}</option>\n`
        document.getElementById("inputGroupSelect01").innerHTML = options;
        document.getElementById("inputGroupSelect02").innerHTML = options;
        document.getElementById("inputGroupSelect03").innerHTML = options;
    } catch (error) {
        console.log(error)
    }
}
