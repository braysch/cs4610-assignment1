"use client";

import { useState } from "react";
import Image from "next/image";

interface Pokemon {
  url: string;
  name: string;
}

const PokemonSpriteImage = ({ poke }: { poke: Pokemon }) => {
  const [exists, setExists] = useState(true);

  const id = poke.url.split("/")[6];
  const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <>
      {exists ? (
        <>
        <Image
          src={src}
          alt={poke.name}
          width={100}
          height={100}
          onError={() => setExists(false)}
        />
        </>
      ) : 
      <>
        <Image
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}
          alt={poke.name}
          width={100}
          height={100}
        />
        </>
      }
    </>
  );
};

export default PokemonSpriteImage;