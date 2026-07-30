import { PlaceItem, PlacePeriod, TravelMode, TripDay } from "./types";

const GOOGLE_SEARCH = "https://www.google.com/maps/search/?api=1";
const MAX_PLACES_PER_ROUTE = 5;

export type RouteSection = {
  url: string;
  mode: TravelMode;
  places: PlaceItem[];
};

function clean(value: string | undefined): string {
  return (value || "").trim();
}

function validPlaces(places: PlaceItem[] | undefined): PlaceItem[] {
  return (places || []).filter((place) => clean(place.name) || clean(place.address));
}

function placeQuery(place: PlaceItem): string {
  const name = clean(place.name);
  const address = clean(place.address);

  if (name && address) return `${name}, ${address}`;
  return address || name;
}

export function createPlaceMapUrl(place: PlaceItem): string {
  const query = placeQuery(place);
  if (!query) return "";
  return `${GOOGLE_SEARCH}&query=${encodeURIComponent(query)}`;
}

function modeForLeg(destination: PlaceItem, origin: PlaceItem): TravelMode {
  return destination.travelMode || origin.travelMode || "walking";
}

function createSingleDirectionsUrl(
  places: PlaceItem[],
  mode: TravelMode
): string {
  if (places.length === 0) return "";
  if (places.length === 1) return createPlaceMapUrl(places[0]);

  const origin = placeQuery(places[0]);
  const destination = placeQuery(places[places.length - 1]);
  if (!origin || !destination) return "";

  const waypoints = places.slice(1, -1).map(placeQuery).filter(Boolean);
  const params = new URLSearchParams({
    api: "1",
    origin,
    destination,
    travelmode: mode,
  });

  if (waypoints.length > 0) {
    params.set("waypoints", waypoints.join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * Google Maps directions URLs support one travel mode per URL and become
 * unreliable on mobile with many waypoints. This function therefore splits
 * an itinerary whenever the transport mode changes or the route reaches the
 * safe waypoint limit. The boundary place is repeated so no leg disappears.
 */
export function createDirectionsSections(
  input: PlaceItem[] | undefined
): RouteSection[] {
  const places = validPlaces(input);
  if (places.length === 0) return [];
  if (places.length === 1) {
    return [
      {
        url: createPlaceMapUrl(places[0]),
        mode: places[0].travelMode || "walking",
        places,
      },
    ];
  }

  const sections: RouteSection[] = [];
  let sectionStart = 0;
  let sectionMode = modeForLeg(places[1], places[0]);

  for (let legEnd = 1; legEnd < places.length; legEnd += 1) {
    const legMode = modeForLeg(places[legEnd], places[legEnd - 1]);
    const sectionPlaceCount = legEnd - sectionStart + 1;
    const modeChanged = legMode !== sectionMode;
    const reachedLimit = sectionPlaceCount > MAX_PLACES_PER_ROUTE;

    if (modeChanged || reachedLimit) {
      const sectionPlaces = places.slice(sectionStart, legEnd);
      if (sectionPlaces.length > 0) {
        const url = createSingleDirectionsUrl(sectionPlaces, sectionMode);
        if (url) sections.push({ url, mode: sectionMode, places: sectionPlaces });
      }
      sectionStart = legEnd - 1;
      sectionMode = legMode;
    }
  }

  const finalPlaces = places.slice(sectionStart);
  const finalUrl = createSingleDirectionsUrl(finalPlaces, sectionMode);
  if (finalUrl) sections.push({ url: finalUrl, mode: sectionMode, places: finalPlaces });

  return sections;
}

export function createDirectionsUrls(places: PlaceItem[] | undefined): string[] {
  return createDirectionsSections(places).map((section) => section.url);
}

/** Backward-compatible helper that returns the first generated route URL. */
export function createDirectionsUrl(places: PlaceItem[] | undefined): string {
  return createDirectionsUrls(places)[0] || "";
}

export function placesForPeriod(
  places: PlaceItem[] | undefined,
  period: PlacePeriod
): PlaceItem[] {
  return validPlaces(places).filter((place) => place.period === period);
}

export function routeFromPlaces(places: PlaceItem[] | undefined): string {
  return validPlaces(places)
    .map((place) => clean(place.name) || clean(place.address))
    .filter(Boolean)
    .join(" → ");
}

export function syncDayFromPlaces(day: TripDay): TripDay {
  const places = day.places || [];
  if (places.length === 0) return day;

  return {
    ...day,
    route: routeFromPlaces(places),
    // Legacy static URLs are cleared so edited place data remains the source
    // of truth in both the editor and the public itinerary view.
    mapUrl: "",
    morningMapUrl: "",
    afternoonMapUrl: "",
  };
}
