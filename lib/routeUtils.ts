import { PlaceItem, PlacePeriod, TravelMode, TripDay } from "./types";

const GOOGLE_SEARCH = "https://www.google.com/maps/search/?api=1";
const MAX_PLACES_PER_ROUTE = 5;

function hasLocation(place: PlaceItem): boolean {
  return Boolean(place.name.trim() || place.address.trim());
}

function placeQuery(place: PlaceItem): string {
  return [place.name.trim(), place.address.trim()].filter(Boolean).join(", ");
}

export function createPlaceMapUrl(place: PlaceItem): string {
  const query = placeQuery(place);
  return query ? `${GOOGLE_SEARCH}&query=${encodeURIComponent(query)}` : "";
}

function createSingleDirectionsUrl(
  places: PlaceItem[],
  travelMode: TravelMode
): string {
  if (places.length === 0) return "";
  if (places.length === 1) return createPlaceMapUrl(places[0]);

  const origin = placeQuery(places[0]);
  const destination = placeQuery(places[places.length - 1]);
  const waypoints = places.slice(1, -1);

  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: travelMode,
  });

  if (waypoints.length > 0) {
    params.set("waypoints", waypoints.map(placeQuery).join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * travelMode is interpreted as "the mode used to arrive at this place".
 * Therefore the leg from places[i - 1] to places[i] uses places[i].travelMode.
 * Google Maps accepts only one travel mode per directions URL, so mixed-mode
 * itineraries are split at each mode change while repeating the boundary stop.
 */
function splitByTravelMode(places: PlaceItem[]): Array<{
  places: PlaceItem[];
  mode: TravelMode;
}> {
  if (places.length < 2) return [];

  const sections: Array<{ places: PlaceItem[]; mode: TravelMode }> = [];
  let sectionStart = 0;
  let currentMode: TravelMode = places[1].travelMode || "walking";

  for (let destinationIndex = 2; destinationIndex < places.length; destinationIndex += 1) {
    const legMode = places[destinationIndex].travelMode || "walking";
    if (legMode !== currentMode) {
      sections.push({
        places: places.slice(sectionStart, destinationIndex),
        mode: currentMode,
      });
      sectionStart = destinationIndex - 1;
      currentMode = legMode;
    }
  }

  sections.push({ places: places.slice(sectionStart), mode: currentMode });
  return sections;
}

function splitLongSection(places: PlaceItem[]): PlaceItem[][] {
  if (places.length <= MAX_PLACES_PER_ROUTE) return [places];

  const chunks: PlaceItem[][] = [];
  let start = 0;

  while (start < places.length - 1) {
    const end = Math.min(start + MAX_PLACES_PER_ROUTE, places.length);
    chunks.push(places.slice(start, end));
    start = end - 1;
  }

  return chunks;
}

/**
 * Creates reliable Google Maps links from the current place order.
 * - Empty stops are ignored.
 * - One stop opens a place search.
 * - Mixed transportation modes become separate route links.
 * - Long sections are split to avoid unstable mobile waypoint handling.
 */
export function createDirectionsUrls(places: PlaceItem[]): string[] {
  const validPlaces = places.filter(hasLocation);
  if (validPlaces.length === 0) return [];
  if (validPlaces.length === 1) return [createPlaceMapUrl(validPlaces[0])];

  return splitByTravelMode(validPlaces)
    .flatMap((section) =>
      splitLongSection(section.places).map((chunk) =>
        createSingleDirectionsUrl(chunk, section.mode)
      )
    )
    .filter(Boolean);
}

/** Backward-compatible helper that returns the first generated route link. */
export function createDirectionsUrl(places: PlaceItem[]): string {
  return createDirectionsUrls(places)[0] || "";
}

export function placesForPeriod(
  places: PlaceItem[] | undefined,
  period: PlacePeriod
): PlaceItem[] {
  return (places || []).filter((place) => place.period === period && hasLocation(place));
}

export function routeFromPlaces(places: PlaceItem[] | undefined): string {
  return (places || [])
    .filter(hasLocation)
    .map((place) => place.name.trim() || place.address.trim())
    .join(" → ");
}

export function syncDayFromPlaces(day: TripDay): TripDay {
  const places = day.places || [];
  if (places.length === 0) return day;

  // Places are the single source of truth. Legacy static URL fields are kept
  // empty so an old saved link cannot override the newly generated route.
  return {
    ...day,
    route: routeFromPlaces(places),
    mapUrl: "",
    morningMapUrl: "",
    afternoonMapUrl: "",
  };
}
