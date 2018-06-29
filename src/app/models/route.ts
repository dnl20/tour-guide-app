export interface Route {
  id: number | string;
  name?: string;
  country?: string;
  place: string;
  coordinates?: number | number[];
  type?: string | string[];
  difficulty?: string;
  rating: number | number [];
  image?: string;
}
