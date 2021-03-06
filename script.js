//sets a 5 second loading screen to give time for pokemon to load.
setTimeout(function() {
  var element = document.getElementById('loader');
  element.classList += " hidden";
}, 5000);

const pokeContainer = document.getElementById('poke-container')
const pokeStatsContainer = document.getElementById('poke-stats-container')

let pokemonStart = 1
let pokemonEnd = 151

const colors = {
   fire: '#d82b34',
   fairy: '#fceaff',
   bug: '#f8d5a3',
   psychic: '#eaeda1',
   grass: '#1ad148',
	electric: '#FCF7DE',
	water: '#DEF3FD',
   poison: '#837ad6',
	ground: '#f4e7da',
	rock: '#d5d5d4',
   normal: '#F5F5F5',
	fairy: '#fceaff',
   bug: '#f8d5a3',
	poison: '#837ad6',	
	dragon: '#97b3e6',	
   normal: '#F5F5F5',
	flying: '#30aae2',
	fighting: '#E6E0D4',	
   steel: '#979595',
   ice: '#6eb8e9'   
}
const main_types = Object.keys(colors)


//show loading screen everytime a generation button gets pushed and api call is made
function showLoading() {
   document.getElementById('loader').classList.remove('hidden')
   setTimeout(function() {
   var element = document.getElementById('loader');
   element.classList += " hidden";
   }, 5000);
}

//used to update start and end API points to match pokemon generations
function updateGen(start, end) {   
   showLoading()
   while (pokeContainer.firstChild) {
        pokeContainer.removeChild(pokeContainer.firstChild);
    }
   pokemonStart = start
   pokemonEnd = end   
   fetchPokemons()
}

//API call
const getPokemon = async (id) => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`
   const res = await fetch(url)
   const data = await res.json()
   createPokemonCard(data)
}

//loops through the start and end points, calling the API call function for each, and adding event listeners.
const fetchPokemons = async () => { 
   for(let i = pokemonStart; i <= pokemonEnd; i++) {
      await getPokemon(i)
   }
   const pokemonCards = document.querySelectorAll('.pokemon')
   pokemonCards.forEach((card) => {
      card.addEventListener('click', (e) => {      
      getPokemonName(e)
      removeAllChildNodes(pokeStatsContainer)      
   })
})

//Removes the children from the DOM when changing generations
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//sets the name for the pokemonstatscard API
function getPokemonName(e) {
   pokemon_name = e.currentTarget.getAttribute('id')   
   fetchPokemonStats()   
   }
}

//create the smaller pokemon card
const createPokemonCard = (pokemon) => {
   const pokemonEl = document.createElement('div')
   pokemonEl.classList.add('pokemon')  
      
   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

   pokemonEl.setAttribute('id', name.toLowerCase())

   const id = pokemon.id.toString().padStart(3, '0')

   const poke_type = pokemon.types.map(type => type.type.name)
   
   let poke_type2 = ""
   if (poke_type[1]) {
      poke_type2 = poke_type[1]
   } else {
      poke_type2 = poke_type 
   }

   const type = main_types.find(type => poke_type[0].indexOf(type) > -1)
   const type2 = main_types.find(type => poke_type2.indexOf(type) > -1)

   const color = colors[type]
   const color2 = colors[type2]

   pokemonEl.style.backgroundImage = `linear-gradient(${color2}, ${color})`  


   const pokemonInnerHTML = `
    <div id='${name.toLowerCase()}'>
       <div class="img-container" >
         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="">
          </div>
          <div class="info">
         <span class="number">#${id}</span>
         <h3 class="name">${name}</h3>
         <small class="type">Type: <span>${poke_type}</span><br></small>
          </div>
    </div>
   `

   pokemonEl.innerHTML = pokemonInnerHTML

   pokeContainer.appendChild(pokemonEl)
   
}
fetchPokemons()


// Stats card


let pokemon_name = ""

  //API Call
const getPokemonStats = async (name) => {
   const url = `https://pokeapi.co/api/v2/pokemon/${name}`
   const res = await fetch(url)
   const data = await res.json()
   createPokemonStatCard(data)     
}

//calls the API function with the name as parameter
const fetchPokemonStats = async () => {
     await getPokemonStats(pokemon_name)
  }

  //creates the pokemon stat card
const createPokemonStatCard = (pokemon) => {
   const pokemonStatsEl = document.createElement('div')
   pokemonStatsEl.classList.add('pokemon-detail')

   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
   const ability1 = pokemon.abilities[0].ability.name[0].toUpperCase() + pokemon.abilities[0].ability.name.slice(1)
   const ability2 = pokemon.abilities[1].ability.name[0].toUpperCase() + pokemon.abilities[1].ability.name.slice(1)

   const id = pokemon.id.toString().padStart(3, '0')

   const poke_type = pokemon.types.map(type => type.type.name)
   
   let poke_type2 = ""
   if (poke_type[1]) {
      poke_type2 = poke_type[1]
   } else {
      poke_type2 = poke_type
   }

   const type = main_types.find(type => poke_type.indexOf(type) > -1)
   const type2 = main_types.find(type => poke_type2.indexOf(type) > -1)

   const color = colors[type]
   const color2 = colors[type2]

   pokemonStatsEl.style.backgroundImage = `linear-gradient(${color2}, ${color})`
   
   
   const pokemonStatsInnerHTML = `
    <div>
       <div class="img-container ">
         <img class="stats-card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="">
          </div>
          <div class="info">
         <span class="number">#${id}</span>
         <h3 class="name">${name}</h3>
         <small class="type">Type: <span>${poke_type}</span><br></small>
          </div>
    </div>
    <div>
      <div class="moves">

      <h3 class="stats">Ability 1: ${ability1}
      <h3 class="stats">Ability 2: ${ability2}
      </div>
       <div class="stats">
         <h3 class="stats">Hit Points: ${pokemon.stats[0].base_stat}
         <div class="bar">
            <div style="width:${pokemon.stats[0].base_stat}%" class="skill">${pokemon.stats[0].base_stat}</div>
         </div>
         <h3 class="stats">Attack: ${pokemon.stats[1].base_stat}
         <div class="bar">
            <div style="width:${pokemon.stats[1].base_stat}%" class="skill">${pokemon.stats[1].base_stat}</div>
         </div>
         <h3 class="stats">Defense: ${pokemon.stats[2].base_stat}
         <div class="bar">
            <div style="width:${pokemon.stats[2].base_stat}%" class="skill">${pokemon.stats[2].base_stat}</div>
         </div>
         <h3 class="stats">Special-Attack: ${pokemon.stats[3].base_stat}
         <div class="bar">
            <div style="width:${pokemon.stats[3].base_stat}%" class="skill">${pokemon.stats[3].base_stat}</div>
         </div>
         <h3 class="stats">Special-Defense: ${pokemon.stats[4].base_stat}
         <div class="bar">
            <div style="width:${pokemon.stats[4].base_stat}%" class="skill">${pokemon.stats[4].base_stat}</div>
         </div>
         <h3 class="stats">Speed: ${pokemon.stats[5].base_stat}
         <div class="bar">
            <div style="width:${pokemon.stats[5].base_stat}%" class="skill">${pokemon.stats[5].base_stat}</div>
         </div>       
       </div>
    </div>
   ` 
   
   pokemonStatsEl.innerHTML = pokemonStatsInnerHTML
   
   pokeStatsContainer.appendChild(pokemonStatsEl)
}

