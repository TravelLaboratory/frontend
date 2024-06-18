export interface CityInfo {
  placeId: string;
  address: string;
  city: string;
}

export interface ArticleFormData {
  title: string;
  location: CityInfo[];
  date: { from: Date; to: Date };
  expense?: number;
  travelCompanion: string;
  travelStyle: string[];
}
