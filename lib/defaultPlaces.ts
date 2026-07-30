import { PlaceItem } from "./types";

const p = (
  id: string,
  name: string,
  address: string,
  time: string,
  period: "morning" | "afternoon",
  category = "sight",
  travelMode: "walking" | "transit" | "driving" | "bicycling" = "walking",
  note = ""
): PlaceItem => ({ id, name, address, time, period, category, travelMode, note });

export const defaultPlacesByDay: Record<number, PlaceItem[]> = {
  1: [
    p("d1-p1", "Amsterdam Airport Schiphol", "Evert van de Beekstraat 202, 1118 CP Schiphol, Netherlands", "21:25", "afternoon", "airport", "transit"),
    p("d1-p2", "Amsterdam Centraal", "Stationsplein, 1012 AB Amsterdam, Netherlands", "22:50", "afternoon", "station", "transit"),
    p("d1-p3", "ibis Amsterdam Centre", "Stationsplein 49, 1012 AB Amsterdam, Netherlands", "23:20", "afternoon", "hotel", "walking"),
  ],
  2: [
    p("d2-p1", "ibis Amsterdam Centre", "Stationsplein 49, 1012 AB Amsterdam, Netherlands", "08:30", "morning", "hotel"),
    p("d2-p2", "Amsterdam Centraal", "Stationsplein, 1012 AB Amsterdam, Netherlands", "09:00", "morning", "station"),
    p("d2-p3", "Dam Square", "Dam, 1012 JS Amsterdam, Netherlands", "09:35", "morning"),
    p("d2-p4", "Royal Palace Amsterdam", "Nieuwezijds Voorburgwal 147, 1012 RJ Amsterdam, Netherlands", "10:25", "morning", "museum"),
    p("d2-p5", "Bloemenmarkt", "Singel 630, 1017 AZ Amsterdam, Netherlands", "11:35", "morning", "market"),
    p("d2-p6", "The Pantry", "Leidsekruisstraat 21, 1017 RE Amsterdam, Netherlands", "12:30", "afternoon", "restaurant", "walking"),
    p("d2-p7", "Rembrandtplein", "Rembrandtplein, 1017 CT Amsterdam, Netherlands", "14:00", "afternoon"),
    p("d2-p8", "Blue Amsterdam", "Singel 457, 1012 WP Amsterdam, Netherlands", "14:45", "afternoon", "cafe"),
    p("d2-p9", "van Wonderen Stroopwafels", "Kalverstraat 190, 1012 XH Amsterdam, Netherlands", "16:00", "afternoon", "food"),
  ],
  3: [
    p("d3-p1", "ibis Amsterdam Centre", "Stationsplein 49, 1012 AB Amsterdam, Netherlands", "08:00", "morning", "hotel", "transit"),
    p("d3-p2", "Rijksmuseum", "Museumstraat 1, 1071 XX Amsterdam, Netherlands", "09:00", "morning", "museum", "transit"),
    p("d3-p3", "The Seafood Bar Museumplein", "Van Baerlestraat 5, 1071 AL Amsterdam, Netherlands", "12:10", "morning", "restaurant"),
    p("d3-p4", "Van Gogh Museum", "Museumplein 6, 1071 DJ Amsterdam, Netherlands", "13:30", "afternoon", "museum"),
    p("d3-p5", "Moco Museum", "Honthorststraat 20, 1071 DE Amsterdam, Netherlands", "15:40", "afternoon", "museum"),
    p("d3-p6", "Inntel Hotels Amsterdam Zaandam", "Provincialeweg 102, 1506 MD Zaandam, Netherlands", "19:00", "afternoon", "hotel", "transit"),
  ],
  4: [
    p("d4-p1", "Inntel Hotels Amsterdam Zaandam", "Provincialeweg 102, 1506 MD Zaandam, Netherlands", "08:30", "morning", "hotel", "transit"),
    p("d4-p2", "Zaanse Schans", "Schansend 7, 1509 AW Zaandam, Netherlands", "10:00", "morning", "sight", "transit"),
    p("d4-p3", "De Kraai", "Kraaienest 4, 1509 AZ Zaandam, Netherlands", "13:10", "afternoon", "restaurant"),
    p("d4-p4", "Jordaan", "Noordermarkt, 1015 MV Amsterdam, Netherlands", "15:30", "afternoon", "district", "transit"),
    p("d4-p5", "Anne Frank House", "Westermarkt 20, 1016 GV Amsterdam, Netherlands", "18:00", "afternoon", "museum"),
    p("d4-p6", "Moeders", "Rozengracht 251, 1016 SX Amsterdam, Netherlands", "19:00", "afternoon", "restaurant"),
  ],
  5: [
    p("d5-p1", "DoubleTree by Hilton Amsterdam Centraal Station", "Oosterdoksstraat 4, 1011 DK Amsterdam, Netherlands", "08:30", "morning", "hotel", "transit"),
    p("d5-p2", "Mauritshuis", "Plein 29, 2511 CS Den Haag, Netherlands", "10:00", "morning", "museum", "transit"),
    p("d5-p3", "Binnenhof", "Binnenhof, 2513 AA Den Haag, Netherlands", "11:40", "morning"),
    p("d5-p4", "Depot Boijmans Van Beuningen", "Museumpark 24, 3015 CX Rotterdam, Netherlands", "15:00", "afternoon", "museum", "transit"),
    p("d5-p5", "Markthal Rotterdam", "Dominee Jan Scharpstraat 298, 3011 GZ Rotterdam, Netherlands", "16:50", "afternoon", "market", "transit"),
    p("d5-p6", "Cube Houses", "Overblaak 70, 3011 MH Rotterdam, Netherlands", "18:00", "afternoon"),
    p("d5-p7", "DoubleTree by Hilton Amsterdam Centraal Station", "Oosterdoksstraat 4, 1011 DK Amsterdam, Netherlands", "20:20", "afternoon", "hotel", "transit"),
  ],
  6: [
    p("d6-p1", "Amsterdam Centraal", "Stationsplein, 1012 AB Amsterdam, Netherlands", "07:20", "morning", "station", "transit"),
    p("d6-p2", "Brussels Central Station", "Carrefour de l'Europe 2, 1000 Brussels, Belgium", "09:30", "morning", "station", "transit"),
    p("d6-p3", "Grand Place", "Grote Markt, 1000 Brussels, Belgium", "09:45", "morning"),
    p("d6-p4", "Galeries Royales Saint-Hubert", "Galerie du Roi 5, 1000 Brussels, Belgium", "10:30", "morning"),
    p("d6-p5", "Manneken Pis", "Rue de l'Etuve 46, 1000 Brussels, Belgium", "11:10", "morning"),
    p("d6-p6", "Chez Leon", "Rue des Bouchers 18, 1000 Brussels, Belgium", "12:40", "afternoon", "restaurant"),
    p("d6-p7", "Maison Dandoy", "Rue Charles Buls 14, 1000 Brussels, Belgium", "14:00", "afternoon", "cafe"),
    p("d6-p8", "Brussels Central Station", "Carrefour de l'Europe 2, 1000 Brussels, Belgium", "16:30", "afternoon", "station"),
  ],
  7: [
    p("d7-p1", "DoubleTree by Hilton Amsterdam Centraal Station", "Oosterdoksstraat 4, 1011 DK Amsterdam, Netherlands", "08:30", "morning", "hotel", "transit"),
    p("d7-p2", "Albert Cuyp Market", "Albert Cuypstraat 1073 BD Amsterdam, Netherlands", "09:00", "morning", "market", "transit"),
    p("d7-p3", "Bloemenmarkt", "Singel 630, 1017 AZ Amsterdam, Netherlands", "10:30", "morning", "market", "transit"),
    p("d7-p4", "De 9 Straatjes", "Hartenstraat 1, 1016 BZ Amsterdam, Netherlands", "11:30", "morning", "shopping"),
    p("d7-p5", "De Bijenkorf Amsterdam", "Dam 1, 1012 JS Amsterdam, Netherlands", "14:40", "afternoon", "shopping"),
    p("d7-p6", "Dam Square", "Dam, 1012 JS Amsterdam, Netherlands", "17:10", "afternoon"),
    p("d7-p7", "Cannibale Royale", "Handboogstraat 17A, 1012 XM Amsterdam, Netherlands", "18:40", "afternoon", "restaurant"),
    p("d7-p8", "DoubleTree by Hilton Amsterdam Centraal Station", "Oosterdoksstraat 4, 1011 DK Amsterdam, Netherlands", "20:30", "afternoon", "hotel", "transit"),
  ],
  8: [
    p("d8-p1", "DoubleTree by Hilton Amsterdam Centraal Station", "Oosterdoksstraat 4, 1011 DK Amsterdam, Netherlands", "09:00", "morning", "hotel", "transit"),
    p("d8-p2", "Amsterdam Centraal", "Stationsplein, 1012 AB Amsterdam, Netherlands", "10:00", "morning", "station", "walking"),
    p("d8-p3", "Amsterdam Airport Schiphol", "Evert van de Beekstraat 202, 1118 CP Schiphol, Netherlands", "11:00", "morning", "airport", "transit"),
  ],
};
