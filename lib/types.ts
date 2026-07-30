export type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
};

export type FoodItem = {
  name: string;
  type: string;
  note: string;
  mapUrl: string;
};

export type ReservationItem = {
  name: string;
  time: string;
  code: string;
  note: string;
};

export type BudgetItem = {
  label: string;
  amount: string;
};

export type PlacePeriod = "morning" | "afternoon";
export type TravelMode = "walking" | "transit" | "driving" | "bicycling";

export type PlaceItem = {
  id: string;
  name: string;
  address: string;
  time: string;
  period: PlacePeriod;
  category: string;
  travelMode: TravelMode;
  note?: string;
};

export type TripDay = {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  summary: string;
  route: string;
  heroImage: string;
  transport: string;
  tip: string;
  highlights: string[];
  food: FoodItem[];
  reservations: ReservationItem[];
  budget: BudgetItem[];
  mapUrl: string;
  morningMapUrl?: string;
  afternoonMapUrl?: string;
  places?: PlaceItem[];
  notes: string;
  checklist: string[];
  schedule: ScheduleItem[];
};
