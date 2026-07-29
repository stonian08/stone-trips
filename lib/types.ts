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
  notes: string;
  checklist: string[];
  schedule: ScheduleItem[];
};
