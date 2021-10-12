var url = "https://pokeapi.co/api/v2/";

async function getPokemon() {
    var buscar = document.getElementById("busqueda").value;
    loading.style.display = 'block';
    await getPetition(3, buscar);  
}

async function getPetition(opt, parameter = "", limit = "") {
    var realUrl = "";
    switch (opt) {
        case 1:
            realUrl = url + 'pokemon?offset=' + parameter + '&limit=' + limit;
            break;

        case 2:
            realUrl = parameter;
            break;

        default:
            realUrl = url + 'pokemon/' + parameter;
            break;
    }
 
    axios.get(realUrl, {
        responseType: 'json'
      })
        .then(function(res) {
            if(res.status==200) {
                switch (opt) {
                    case 1:
                        var result = res.data.results;
                        for (let index = 0; index < result.length; index++) {
                            const elementName = result[index].name;
                            const elementUrl = result[index].url;
                            getPetition(2, elementUrl);
                        }
                        break;
            
                    case 2:
                        const elementImg = res.data.sprites.front_shiny;
                        const elementName = res.data.forms[0].name;
                        
                        if(limit != "specie"){
                            document.getElementById("tblData").insertRow(-1).innerHTML = '<td>' + elementName + '</td><td><img src="' + elementImg + '" alt="Italian Trulli"></td>';
                            getPetitionSpecie(res.data.species.url);
                        }else{
                            document.getElementById("tblDataEvo").insertRow(-1).innerHTML = '<td>' + elementName + '</td><td><img src="' + elementImg + '" alt="Italian Trulli"></td>';
                        }
                        break;
            
                    default:
                        mensaje.innerHTML = '<img src=" ' + res.data.sprites.front_shiny + '" alt="Italian Trulli" width="300" height="350">';
                        nombre.innerHTML = '<h3>' + res.data.forms[0].name + '</h3>';
                        break;
                }
            }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
          alert("Pokemon " + parameter + " no existe.");
        })
        .then(function() {
          loading.style.display = 'none';
        });
}

async function getPetitionSpecie(realUrl, action = 0) {
    axios.get(realUrl, {
        responseType: 'json'
      })
        .then(function(res) {
            if(res.status==200) {
                if (action == 1){
                    getPetition(2, res.data.varieties[0].pokemon.url, "specie");
                }else{
                    getPetitionChain(res.data.evolution_chain.url);
                }
            }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
          alert("Pokemon " + parameter + " no existe.");
        })
        .then(function() {
          loading.style.display = 'none';
        });
}

async function getPetitionChain(realUrl) {
    axios.get(realUrl, {
        responseType: 'json'
      })
        .then(function(res) {
            if(res.status==200) {
                getPetitionSpecie(res.data.chain.species.url, 1);
            }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
          alert("Pokemon " + parameter + " no existe.");
        })
        .then(function() {
          loading.style.display = 'none';
        });
}

async function getPetitionSpecie1(realUrl) {
    axios.get(realUrl, {
        responseType: 'json'
      })
        .then(function(res) {
            if(res.status==200) {
                getPetition(2,res.data.chain.species.url);
            }
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
          alert("Pokemon " + parameter + " no existe.");
        })
        .then(function() {
          loading.style.display = 'none';
        });
}

getPetition(1,"23","3");