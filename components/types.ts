export type Plant = {
  key: string
  name: string
  image: string
}

export type Plants = Plant[]

export type PlantsError = {
  message: string
  number: number
}
