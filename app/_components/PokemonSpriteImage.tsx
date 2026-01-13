"use client";

import { useState } from "react";
import Image from "next/image";

const PokemonSpriteImage = ({ poke }) => {
  const [exists, setExists] = useState(true);

  const id = poke.url.split("/")[6];
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <>
      {exists && (
        <Image
          src={src}
          alt={poke.name}
          width={75}
          height={75}
          onError={() => setExists(false)}
        />
      )}
    </>
  );
};

export default PokemonSpriteImage;