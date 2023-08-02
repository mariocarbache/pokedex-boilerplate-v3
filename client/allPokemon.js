import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('/server/db');
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.name} - {pokemon.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
