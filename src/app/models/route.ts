export interface Route {
  id: number | string;
  name?: string;
  country_dep?: string;
  place_dep?: string;
  country_arr?: string;
  place_arr?: string;
  coordinates?: number | number[] | GeoData;
  type?: string | string[];
  difficulty?: string;
  rating?: number | number [];
}

export interface GeoData {
  latitude_dep: number;
  longitude_dep: number;
  latitude_arr: number;
  longitude_arr: number;
}
