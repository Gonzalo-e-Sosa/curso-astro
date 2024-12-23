import type { Player } from "@/models/player";
import { useState } from "react";
import config from "src/config";

const getFavoritePlayersFromLocalStorage = () => JSON.parse(localStorage.getItem("favorite-players") ?? "[]") as Pick<Player, "id" | "name">[];

const FavoritePlayers = () => {
  const [favoritePlayers, setFavoritePlayers] = useState(getFavoritePlayersFromLocalStorage())

  const handleDeleteFavoritePlayer = (id: number) => {
    const newFavoritePlayers = favoritePlayers.filter(player => player.id !== id);
    localStorage.setItem("favorite-players", JSON.stringify(newFavoritePlayers));
    setFavoritePlayers(newFavoritePlayers);
  }

  return <div className="grid grid-cols-2 sm:grid-cols-4">
    {favoritePlayers.map(({id, name}) => (
      <a key={id} href={`/players/${id}`}>
        <article>
          <h2>{name}</h2>
          <button onClick={() => handleDeleteFavoritePlayer(id)}>Eliminar</button>
          <img style={{ viewTransitionName: `${id}-image` }} src={`${config.mediaApiUrl}${id}.png`} alt={`Image of ${name}`} />
        </article>
      </a>
    ))}
  </div>
}

export default FavoritePlayers; 