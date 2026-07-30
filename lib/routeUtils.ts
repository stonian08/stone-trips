import { PlaceItem, PlacePeriod, TravelMode, TripDay } from "./types";

const GOOGLE_SEARCH = "https://www.google.com/maps/search/?api=1";
const MAX_PLACES_PER_ROUTE = 5;

function placeQuery(place: PlaceItem): string {
  return [place.name, place.address].filter(Boolean).join(", ");
}

export function createPlaceMapUrl(place: PlaceItem): string {
  return `${GOOGLE_SEARCH}&query=${encodeURIComponent(placeQuery(place))}`;
}

function createSingleDirectionsUrl(places: PlaceItem[]): string {
  if (places.length === 0) return "";
  if (places.length === 1) return createPlaceMapUrl(places[0]);

  const origin = placeQuery(places[0]);
  const destination = placeQuery(places[places.length - 1]);
  const waypoints = places.slice(1, -1);
  const mode: TravelMode = places[1]?.travelMode || places[0]?.travelMode || "walking";

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

/**
 * Google Maps mobile URLs become unreliable with too many waypoints.
 * Split long itineraries into linked route sections while repeating the
 * boundary place so no stop disappears from the itinerary.
 */
export function createDirectionsUrls(places: PlaceItem[]): string[] {
  const validPlaces = places.filter((place) => place.name.trim());
  if (validPlaces.length === 0) return [];
  if (validPlaces.length <= MAX_PLACES_PER_ROUTE) {
    return [createSingleDirectionsUrl(validPlaces)];
  }

  const chunks: PlaceItem[][] = [];
  let start = 0;

  while (start < validPlaces.length - 1) {
    const end = Math.min(start + MAX_PLACES_PER_ROUTE, validPlaces.length);
    chunks.push(validPlaces.slice(start, end));
    start = end - 1;
  }

  return chunks.map(createSingleDirectionsUrl).filter(Boolean);
}

/** Backward-compatible helper for places that fit in one Google Maps URL. */
export function createDirectionsUrl(places: PlaceItem[]): string {
  return createDirectionsUrls(places)[0] || "";
}

export function placesForPeriod(
  places: PlaceItem[] | undefined,
  period: PlacePeriod
): PlaceItem[] {
  return (places || []).filter((place) => place.period === period);
}

export function routeFromPlaces(places: PlaceItem[] | undefined): string {
  return (places || []).map((place) => place.name.trim()).filter(Boolean).join(" → ");
}

export function syncDayFromPlaces(day: TripDay): TripDay {
  const places = day.places || [];
  if (places.length === 0) return day;

  // Places are now the single source of truth. Legacy map URL fields are
  // cleared so an old static link can never override a newly edited route.
  return {
    ...day,
    route: routeFromPlaces(places),
    mapUrl: "",
    morningMapUrl: "",
    afternoonMapUrl: "",
  };
}
