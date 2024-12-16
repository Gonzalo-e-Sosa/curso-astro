import config from "../config"
import type { PlayersProfiles } from "../models/response";

async function baseFetch<T>(url: URL): Promise<[Error, null] | [null, T]> {
  const headers = new Headers();
  headers.append("x-apisports-key", config.apiKey)
  headers.append('Accept', 'application/json')

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return [new Error("Network response was not ok"), null];
    }

    try {
      const data: T = await response.json();
      return [null, data];
    } catch (jsonError) {
      return [new Error("Failed to parse JSON", { cause: jsonError }), null];
    }
  } catch (error) {
    return [error as Error, null];
  }
}

async function getPlayers(): Promise<[Error, null] | [null, PlayersProfiles]> {
  const url = new URL(config.apiUrl + "/players/profiles")
  
  return baseFetch(url);
}

async function getPlayerById(id: string | number): Promise<[Error, null] | [null, PlayersProfiles]> {
  const url = new URL(config.apiUrl + "players/profiles")
  url.searchParams.append("player", `${id}`)
  
  return baseFetch(url)
}

function getPlayerPhotoURL(id: string | number) {
  return new URL(`${config.mediaApiUrl}${id}.png`);
} 

export default {
  getPlayers,
  getPlayerById,
  getPlayerPhotoURL
}