export interface Player {
  id: number
  name: string
  firstname?: string
  lastname?: string
  age?: number
  birth: Birth
  nationality?: string
  height?: string
  weight?: string
  number?: number
  position?: string
  photo: string
}

export interface Birth {
  date?: string
  place?: string
  country?: string
}