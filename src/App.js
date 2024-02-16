import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  })

  const searchPokemon = () => {
    const capitalizedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) => {

      setPokemon({
        name: capitalizedName,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: capitalize(response.data.types[0].type.name)
      });

      setPokemonChosen(true);

    })
      .catch(() => {
        //Error case
        setPokemonChosen(false);
      });
  }

  return (
    <div className="App">

      <div className="TitleSection">
        <h1>Winnie's Pokédex App</h1>
        <div class="inputs">
          <input
            type="text"
            placeholder="Search for a Pokemon"
            onChange={(event) => {
              setPokemonName(event.target.value)
            }}
          />
          <button onClick={searchPokemon}>Search</button>
        </div>
      </div>

      {pokemonChosen &&
        <div className="DisplaySection">
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <h3>Type: {pokemon.type}</h3>
            <h3>HP: {pokemon.hp}</h3>
            <h3>Attack: {pokemon.attack}</h3>
            <h3>Defense: {pokemon.defense}</h3>
          </>
        </div>
      }
    </div >
  );
}

export default App;
