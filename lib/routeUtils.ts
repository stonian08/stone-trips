import { PlaceItem, PlacePeriod, TravelMode, TripDay } from "./types";

const GOOGLE_DIRECTIONS = "https://www.google.com/maps/dir/?api=1";
const GOOGLE_SEARCH = "https://www.google.com/maps/search/?api=1";

function placeQuery(place: PlaceItem): string {
  return [place.name, place.address].filter(Boolean).join(", ");
}

export function createPlaceMapUrl(place: PlaceItem): string {
  return `${GOOGLE_SEARCH}&query=${encodeURIComponent(placeQuery(place))}`;
}

export function createDirectionsUrl(places: PlaceItem[]): string {
  if (places.length === 0) return "";
  if (places.length === 1) return createPlaceMapUrl(places[0]);

  const origin = placeQuery(places[0]);
  const destination = placeQuery(places[places.length - 1]);
  // Mobile browser reliability: origin + destination + at most 3 waypoints.
  const middle = places.slice(1, -1);
  const waypoints = middle.length <= 3
    ? middle
    : [middle[0], middle[Math.floor(middle.length / 2)], middle[middle.length - 1]];
  const mode: TravelMode = places[1]?.travelMode || "walking";

  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: mode,
  });

  if (waypoints.length > 0) {
    params.set("waypoints", waypoints.map(placeQuery).join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function placesForPeriod(
  places: PlaceItem[] | undefined,
  period: PlacePeriod
): PlaceItem[] {
  return (places || []).filter((place) => place.period === period);
}

export function routeFromPlaces(places: PlaceItem[] | undefined): string {
  return (places || []).map((place) => place.name).filter(Boolean).join(" → ");
}

export function syncDayFromPlaces(day: TripDay): TripDay {
  const places = day.places || [];
  if (places.length === 0) return day;

  const morning = placesForPeriod(places, "morning");
  const afternoon = placesForPeriod(places, "afternoon");

  return {
    ...day,
    route: routeFromPlaces(places),
    mapUrl: createDirectionsUrl(places),
    morningMapUrl: createDirectionsUrl(morning),
    afternoonMapUrl: createDirectionsUrl(afternoon),
  };
}
