import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";

const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async () => {
        setLoading(true);
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    };

    const getPokemon = async (res) => {
        const pokemonData = await Promise.all(
            res.map(async (item) => {
                const result = await axios.get(item.url);
                return result.data;
            })
        );
        // Replace state instead of concatenating 
        setPokeData(pokemonData);
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />
                </div>
                <div className="right-content">
                    <Pokeinfo data={pokeDex} />
                </div>
            </div>
            <div className="btn-group">
                {prevUrl && <button onClick={() => {
                    setPokeData([]);
                    setUrl(prevUrl);
                }}>Previous</button>}
                {nextUrl && <button onClick={() => {
                    setPokeData([]);
                    setUrl(nextUrl);
                }}>Next</button>}
            </div>
        </>
    );
};

export default Main;