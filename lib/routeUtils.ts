import { PlaceItem, PlacePeriod, TravelMode, TripDay } from "./types";

const GOOGLE_SEARCH = "https://www.google.com/maps/search/?api=1";
const MAX_PLACES_PER_ROUTE = 5;

function hasLocation(place: PlaceItem): boolean {
  return Boolean(place.name.trim() || place.address.trim());
}

function placeQuery(place: PlaceItem): string {
  return [place.name.trim(), place.address.trim()].filter(Boolean).join(", ");
}

function normalizedPlaceKey(place: PlaceItem): string {
  return placeQuery(place).trim().toLocaleLowerCase();
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
 * travelMode means "the mode used to arrive at this place".
 * The leg from places[i - 1] to places[i] therefore uses places[i].travelMode.
 * Because one Google Maps directions URL supports one mode, mode changes create
 * a new section and the boundary stop is repeated to keep the route connected.
 */
function splitByTravelMode(places: PlaceItem[]): Array<{
  places: PlaceItem[];
  mode: TravelMode;
}> {
  if (places.length < 2) return [];

  const sections: Array<{ places: PlaceItem[]; mode: TravelMode }> = [];
  let sectionStart = 0;
  let currentMode: TravelMode = places[1].travelMode || "walking";

  for (
    let destinationIndex = 2;
    destinationIndex < places.length;
    destinationIndex += 1
  ) {
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
    const chunk = places.slice(start, end);

    if (chunk.length >= 2) chunks.push(chunk);
    if (end >= places.length) break;

    // Repeat only the final stop so the next map continues from that point.
    start = end - 1;
  }

  return chunks;
}

function removeConsecutiveDuplicatePlaces(places: PlaceItem[]): PlaceItem[] {
  return places.filter((place, index) => {
    if (index === 0) return true;
    return normalizedPlaceKey(place) !== normalizedPlaceKey(places[index - 1]);
  });
}

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))];
}

/**
 * Generates Google Maps links from the current place order for every DAY.
 * - Empty stops are ignored.
 * - Accidental consecutive duplicate stops are removed.
 * - Mixed transportation modes are split into connected route sections.
 * - Long sections are split with one shared boundary stop.
 * - Identical generated links are removed before rendering buttons.
 */
export function createDirectionsUrls(places: PlaceItem[]): string[] {
  const validPlaces = removeConsecutiveDuplicatePlaces(places.filter(hasLocation));
  if (validPlaces.length === 0) return [];
  if (validPlaces.length === 1) return [createPlaceMapUrl(validPlaces[0])];

  const urls = splitByTravelMode(validPlaces).flatMap((section) =>
    splitLongSection(section.places).map((chunk) =>
      createSingleDirectionsUrl(chunk, section.mode)
    )
  );

  return uniqueUrls(urls);
}

/** Backward-compatible helper that returns the first generated route link. */
export function createDirectionsUrl(places: PlaceItem[]): string {
  return createDirectionsUrls(places)[0] || "";
}

export function placesForPeriod(
  places: PlaceItem[] | undefined,
  period: PlacePeriod
): PlaceItem[] {
  return (places || []).filter(
    (place) => place.period === period && hasLocation(place)
  );
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

  // Places are the single source of truth. Old saved map fields are cleared so
  // the UI always regenerates whole/morning/afternoon maps from current places.
  return {
    ...day,
    route: routeFromPlaces(places),
    mapUrl: "",
    morningMapUrl: "",
    afternoonMapUrl: "",
  };
}
