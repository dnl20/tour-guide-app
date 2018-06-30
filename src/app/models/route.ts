export interface Route {
  id: number | string;
  name?: string;
  country?: string;
  place?: string;
  coordinates?: number | number[];
  type?: string | string[];
  difficulty?: string;
  rating?: number | number [];
  image?: string;
}

export interface GeoData {
  latitude_dep: number;
  longitude_dep: number;
  latitude_arr: number;
  longitude_arr: number;
}
