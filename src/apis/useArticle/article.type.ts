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

export interface ArticleRequestFormData {
  title: string;
  location: { place_id: string; address: string; city: string }[];
  start_at: string;
  end_at: string;
  expense?: string;
  travel_companion: string;
  travel_styles?: string[];
}
