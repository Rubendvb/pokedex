import { getPokemons } from './api.js'

const ol = document.querySelector('.pokemons')
const moreButton = document.querySelector('#loadMoreButton')

const maxRecords = 151
let limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join('')}
        </ol>
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
  `
}

function loadPokemonItems(offset, limit) {
  getPokemons(offset, limit).then((pokemonList = []) => {
    const newHtml = pokemonList
      .map((pokemon) => convertPokemonToLi(pokemon))
      .join('')

    ol.innerHTML += newHtml
  })
}

moreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset

    loadPokemonItems(offset, newLimit)

    moreButton.parentElement.removeChild(moreButton)
  } else {
    loadPokemonItems(offset, limit)
  }
})

loadPokemonItems(offset, limit)
