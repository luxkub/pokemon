import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                pokemon.map((item) => (
                    <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
                        {/* Check if sprites object exists before accessing its properties */}
                        <div className="card-content">
                            {item.sprites && item.sprites.front_default && (
                                <img className="pokemon-image" src={item.sprites.front_default} alt="" />
                            )}
                            <h2>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h2>
                        </div>
                    </div>
                ))
            )}
        </>
    );
};

export default Card;