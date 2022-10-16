import React, { useEffect, useState } from 'react';
import PokeStats from '../PokeStats/PokeStats';

import './PokeCard.css';

const shuffle = array => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const PokeCard = () => {
  const [listOfPokemon, setListOfPokemon] = useState([]);
  const [pokemonLimit, setPokemonLimit] = useState(20);
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setPokemonLimit(pokemonLimit + 20);
    }
  };
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}`)
      .then(res => res.json())
      .then(data => setListOfPokemon(shuffle(data.results)));
  }, [pokemonLimit]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [listOfPokemon]);

  return (
    <div className='container'>
      {listOfPokemon.map(({ url }) => (
        <div key={url}>
          <PokeStats pokemon={url} />
        </div>
      ))}
    </div>
  );
};

export default PokeCard;
