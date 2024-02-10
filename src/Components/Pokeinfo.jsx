import React from "react";

const Pokeinfo = ({ data }) => {

    return (
        <>
            {
                (!data) ? "" : (
                    <>
                        <div class="infoCard">
                            <h1>{data.name}</h1>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                            <div className="abilities">
                                {
                                    data.abilities.map(poke => {
                                        return (
                                            <>
                                                <div className="group">
                                                    <h2>{poke.ability.name}</h2>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className="base-stat">
                                {
                                    data.stats.map(poke => {
                                        let statName = poke.stat.name;
                                        // Check if the stat name is "hp", "attack", or "speed"
                                        if (statName === "hp") {
                                            statName = "HP"; // Change "hp" to "HP"
                                        } else if (statName === "attack") {
                                            statName = "Attack"; // Change "attack" to "Attack"
                                        } else if (statName === "speed") {
                                            statName = "Speed"; // Change "speed" to "Speed"
                                        } else if (statName === "defense") {
                                            statName = "Defense"; // Change "defense" to "Defense"
                                        }
                                        // Check if the stat name is "special-attack" or "special-defense"
                                        else if (statName === "special-attack" || statName === "special-defense") {
                                            // Replace the hyphen with a space and display as "Special Attack" or "Special Defense" accordingly
                                            statName = statName.replace("-", " ");
                                            statName = statName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "); // Capitalize each word
                                        }
                                        return (
                                            <h3>{statName}: {poke.base_stat}</h3>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}
export default Pokeinfo