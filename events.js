// Ukázková data – nahraď vlastními nebo je načítej z API.
// date: ISO formát (RRRR-MM-DD), type: party | koncert | festival | popup | vystava | student
const CATEGORIES = {
  party:    { label: "Párty",          color: "#e0457b" },
  koncert:  { label: "Koncerty",       color: "#2f7de1" },
  festival: { label: "Festivaly",      color: "#e8a317" },
  popup:    { label: "Pop-up eventy",  color: "#12a37f" },
  vystava:  { label: "Výstavy",        color: "#8a5cd6" },
  student:  { label: "Studentské akce", color: "#e2552b" },
};

const CITIES = [
  { name: "Praha", country: "Česko", lat: 50.0755, lng: 14.4378, events: [
    { title: "Techno noc ve Vysočanech", type: "party", date: "2026-12-05", place: "Storm Club" },
    { title: "Vánoční koncert Symfonického orchestru", type: "koncert", date: "2026-12-18", place: "Rudolfinum" },
    { title: "Signal Festival", type: "festival", date: "2026-10-15", place: "Centrum Prahy" },
    { title: "Vánoční pop-up market", type: "popup", date: "2026-12-12", place: "Holešovice, Pražská tržnice" },
    { title: "Výstava současné fotografie", type: "vystava", date: "2026-12-01", place: "DOX" },
    { title: "Erasmus welcome party", type: "student", date: "2026-12-03", place: "Karlín" },
  ]},
  { name: "Brno", country: "Česko", lat: 49.1951, lng: 16.6068, events: [
    { title: "Indie večer", type: "koncert", date: "2026-12-04", place: "Fléda" },
    { title: "Studentský ples VUT", type: "student", date: "2026-12-11", place: "Brněnské výstaviště" },
    { title: "Street food pop-up", type: "popup", date: "2026-12-06", place: "Zelný trh" },
  ]},
  { name: "Berlín", country: "Německo", lat: 52.52, lng: 13.405, events: [
    { title: "Warehouse rave", type: "party", date: "2026-12-12", place: "Friedrichshain" },
    { title: "Berlin Art Week", type: "vystava", date: "2026-12-02", place: "Mitte" },
    { title: "Lichterfest", type: "festival", date: "2026-12-19", place: "Tempelhofer Feld" },
  ]},
  { name: "Vídeň", country: "Rakousko", lat: 48.2082, lng: 16.3738, events: [
    { title: "Jazz v Porgy & Bess", type: "koncert", date: "2026-12-08", place: "Riemergasse" },
    { title: "Univerzitní vánoční party", type: "student", date: "2026-12-10", place: "Universität Wien" },
  ]},
  { name: "Londýn", country: "Spojené království", lat: 51.5072, lng: -0.1276, events: [
    { title: "Winter Lights Festival", type: "festival", date: "2026-12-14", place: "Canary Wharf" },
    { title: "Pop-up vinyl fair", type: "popup", date: "2026-12-07", place: "Shoreditch" },
    { title: "Turner exhibition", type: "vystava", date: "2026-12-01", place: "Tate Britain" },
  ]},
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.006, events: [
    { title: "NYE rooftop party", type: "party", date: "2026-12-31", place: "Manhattan" },
    { title: "Live at Brooklyn Steel", type: "koncert", date: "2026-12-09", place: "Brooklyn" },
  ]},
  { name: "Tokio", country: "Japonsko", lat: 35.6762, lng: 139.6503, events: [
    { title: "Illumination Festival", type: "festival", date: "2026-12-15", place: "Shibuya" },
    { title: "Pop-up art kiosk", type: "popup", date: "2026-12-06", place: "Harajuku" },
  ]},
];
