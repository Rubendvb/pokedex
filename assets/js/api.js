import { Pokemon } from './pokemon-model.js'

export async function getPokemons(offset = 0, limit = 5) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    )

    if (!response.ok) {
      throw new Error('Erro ao obter os Pokemons')
    }

    const data = await response.json()
    const pokemons = data.results
    const detailReq = pokemons.map((pokemon) => getPokemonDetail(pokemon))
    const pokemonDetails = await Promise.all(detailReq)

    console.log(pokemonDetails)

    return pokemonDetails
  } catch (error) {
    console.error('Erro ao buscar os Pokemons:', error)
    throw error // Lançando o erro para tratamento em níveis superiores, se necessário
  }
}

function convertPokemonDetailClass(pokeDetail) {
  const pokemon = new Pokemon()

  const types = pokeDetail.types.map((item) => item.type.name)

  const [type] = types

  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.id
  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

async function getPokemonDetail(pokemon) {
  const res = await fetch(pokemon.url)

  const pokeJson = await res.json()

  return convertPokemonDetailClass(pokeJson)
}
