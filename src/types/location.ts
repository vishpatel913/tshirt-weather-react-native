export interface Coords {
  lat: number;
  lon: number;
}

export interface Location extends Coords {
  name: string;
}
