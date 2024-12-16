import type { Player } from "./player"

export interface PlayersProfiles {
  get: string
  parameters: any[]
  errors: any[]
  results: number
  paging: Paging
  response: Response[]
}

export interface Paging {
  current: number
  total: number
}

export interface Response {
  player: Player
}