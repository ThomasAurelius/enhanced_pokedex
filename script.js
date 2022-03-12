const pokeContainer = document.getElementById('poke-container')
const pokemonCount = 150
const colors = {
   fire: '#d82b34',
   grass: '#1ad148',
	electric: '#FCF7DE',
   rock: '#d5d5d4',
	water: '#DEF3FD',   
   bug: '#f8d5a3',
   ghost: '#999',
   poison: '#837ad6',
	ground: '#f4e7da',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
   fairy: '#fceaff',
   normal: '#F5F5F5',
	flying: '#30aae2',
	fighting: '#E6E0D4',
	steel: '#979595',
   ice: '#6eb8e9'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
   for(let i = 1; i <= pokemonCount; i++) {
      await getPokemon(i)
   }
}

const getPokemon = async (id) => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`
   const res = await fetch(url)
   const data = await res.json()
   createPokemonCard(data)
}

const createPokemonCard = (pokemon) => {
   const pokemonEl = document.createElement('div')
   pokemonEl.classList.add('pokemon')
   
   const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

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
    
   console.log(type, type2)

   const color = colors[type]
   const color2 = colors[type2]

   pokemonEl.style.backgroundImage = `linear-gradient(${color2}, ${color})`
  


   const pokemonInnerHTML = `
    <div class="img-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="">
   </div>
   <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${poke_type}</span><br></small>
   </div>
   `

   pokemonEl.innerHTML = pokemonInnerHTML

   pokeContainer.appendChild(pokemonEl)
}
fetchPokemons()