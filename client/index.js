import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./Main";
import PokemonList from "./allPokemon";

const root = createRoot(document.getElementById("app"));

root.render(<><Main />
<PokemonList /></>
);
