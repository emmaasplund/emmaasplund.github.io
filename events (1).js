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
  // ---------- Evropa ----------
  { name: "Praha", country: "Česko", lat: 50.0755, lng: 14.4378, events: [
    { title: "Techno noc ve Vysočanech", type: "party", date: "2026-12-05", place: "Storm Club" },
    { title: "Vánoční koncert Symfonického orchestru", type: "koncert", date: "2026-12-18", place: "Rudolfinum" },
    { title: "Signal Festival", type: "festival", date: "2026-12-10", place: "Centrum Prahy" },
    { title: "Vánoční pop-up market", type: "popup", date: "2026-12-12", place: "Pražská tržnice" },
    { title: "Výstava současné fotografie", type: "vystava", date: "2026-12-01", place: "DOX" },
    { title: "Erasmus welcome party", type: "student", date: "2026-12-03", place: "Karlín" },
  ]},
  { name: "Brno", country: "Česko", lat: 49.1951, lng: 16.6068, events: [
    { title: "Indie večer", type: "koncert", date: "2026-12-04", place: "Fléda" },
    { title: "Studentský ples VUT", type: "student", date: "2026-12-11", place: "Brněnské výstaviště" },
    { title: "Street food pop-up", type: "popup", date: "2026-12-06", place: "Zelný trh" },
    { title: "Drum & bass noc", type: "party", date: "2026-12-19", place: "Booster Club" },
  ]},
  { name: "Berlín", country: "Německo", lat: 52.52, lng: 13.405, events: [
    { title: "Warehouse rave", type: "party", date: "2026-12-12", place: "Friedrichshain" },
    { title: "Berlin Art Week", type: "vystava", date: "2026-12-02", place: "Mitte" },
    { title: "Lichterfest", type: "festival", date: "2026-12-19", place: "Tempelhofer Feld" },
    { title: "Studentský open-mic", type: "student", date: "2026-12-04", place: "TU Berlin" },
    { title: "Vintage pop-up market", type: "popup", date: "2026-12-13", place: "Kreuzberg" },
  ]},
  { name: "Vídeň", country: "Rakousko", lat: 48.2082, lng: 16.3738, events: [
    { title: "Jazz v Porgy & Bess", type: "koncert", date: "2026-12-08", place: "Riemergasse" },
    { title: "Univerzitní vánoční party", type: "student", date: "2026-12-10", place: "Universität Wien" },
    { title: "Klimt – nové pohledy", type: "vystava", date: "2026-12-02", place: "Belvedere" },
  ]},
  { name: "Londýn", country: "Spojené království", lat: 51.5072, lng: -0.1276, events: [
    { title: "Winter Lights Festival", type: "festival", date: "2026-12-14", place: "Canary Wharf" },
    { title: "Pop-up vinyl fair", type: "popup", date: "2026-12-07", place: "Shoreditch" },
    { title: "Turner exhibition", type: "vystava", date: "2026-12-01", place: "Tate Britain" },
    { title: "Fresher's Winter Ball", type: "student", date: "2026-12-05", place: "Camden" },
    { title: "Garage & grime night", type: "party", date: "2026-12-12", place: "Brixton" },
  ]},
  { name: "Paříž", country: "Francie", lat: 48.8566, lng: 2.3522, events: [
    { title: "Fête des Lumières v ulicích", type: "festival", date: "2026-12-08", place: "Le Marais" },
    { title: "Koncert v Philharmonie", type: "koncert", date: "2026-12-16", place: "Philharmonie de Paris" },
    { title: "Pop-up concept store", type: "popup", date: "2026-12-04", place: "Canal Saint-Martin" },
    { title: "Impresionisté: nové objevy", type: "vystava", date: "2026-12-01", place: "Musée d'Orsay" },
    { title: "Soirée étudiante", type: "student", date: "2026-12-09", place: "Quartier Latin" },
  ]},
  { name: "Barcelona", country: "Španělsko", lat: 41.3874, lng: 2.1686, events: [
    { title: "Beach-club afterparty", type: "party", date: "2026-12-11", place: "Port Olímpic" },
    { title: "Sónar Winter Sessions", type: "festival", date: "2026-12-18", place: "Fira Gran Via" },
    { title: "Flamenco live", type: "koncert", date: "2026-12-06", place: "Palau de la Música" },
    { title: "Erasmus tapas night", type: "student", date: "2026-12-03", place: "El Raval" },
  ]},
  { name: "Řím", country: "Itálie", lat: 41.9028, lng: 12.4964, events: [
    { title: "Vánoční koncert v bazilice", type: "koncert", date: "2026-12-20", place: "Santa Maria in Trastevere" },
    { title: "Caravaggio a jeho doba", type: "vystava", date: "2026-12-02", place: "Palazzo Barberini" },
    { title: "Mercatino pop-up", type: "popup", date: "2026-12-12", place: "Piazza Navona" },
  ]},
  { name: "Amsterdam", country: "Nizozemsko", lat: 52.3676, lng: 4.9041, events: [
    { title: "Amsterdam Light Festival", type: "festival", date: "2026-12-05", place: "Grachten" },
    { title: "Warehouse techno", type: "party", date: "2026-12-12", place: "NDSM" },
    { title: "Rijksmuseum noční prohlídka", type: "vystava", date: "2026-12-09", place: "Rijksmuseum" },
    { title: "Student house party", type: "student", date: "2026-12-04", place: "UvA Campus" },
  ]},
  { name: "Stockholm", country: "Švédsko", lat: 59.3293, lng: 18.0686, events: [
    { title: "Lucia koncert", type: "koncert", date: "2026-12-13", place: "Globen" },
    { title: "Julmarknad pop-up", type: "popup", date: "2026-12-06", place: "Gamla Stan" },
    { title: "Skandinávský design", type: "vystava", date: "2026-12-01", place: "Moderna Museet" },
  ]},
  { name: "Reykjavík", country: "Island", lat: 64.1466, lng: -21.9426, events: [
    { title: "Winter Lights Festival", type: "festival", date: "2026-12-11", place: "Hallgrímskirkja" },
    { title: "Elektro večer", type: "party", date: "2026-12-19", place: "Kex Hostel" },
  ]},
  { name: "Istanbul", country: "Turecko", lat: 41.0082, lng: 28.9784, events: [
    { title: "Rooftop DJ set", type: "party", date: "2026-12-12", place: "Karaköy" },
    { title: "Současné umění Istanbulu", type: "vystava", date: "2026-12-03", place: "Istanbul Modern" },
    { title: "Bazar pop-up", type: "popup", date: "2026-12-07", place: "Kadıköy" },
  ]},
  // ---------- Severní Amerika ----------
  { name: "New York", country: "USA", lat: 40.7128, lng: -74.006, events: [
    { title: "NYE rooftop party", type: "party", date: "2026-12-31", place: "Manhattan" },
    { title: "Live at Brooklyn Steel", type: "koncert", date: "2026-12-09", place: "Brooklyn" },
    { title: "Holiday pop-up market", type: "popup", date: "2026-12-05", place: "Bryant Park" },
    { title: "Modern art retrospective", type: "vystava", date: "2026-12-02", place: "MoMA" },
    { title: "Columbia winter showcase", type: "student", date: "2026-12-10", place: "Columbia University" },
  ]},
  { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437, events: [
    { title: "Hollywood Bowl Holiday Sing-along", type: "koncert", date: "2026-12-14", place: "Hollywood Bowl" },
    { title: "Venice Beach art walk", type: "festival", date: "2026-12-06", place: "Venice" },
    { title: "Sunset pool party", type: "party", date: "2026-12-12", place: "West Hollywood" },
    { title: "UCLA Bruin Bash", type: "student", date: "2026-12-04", place: "UCLA" },
  ]},
  { name: "Chicago", country: "USA", lat: 41.8781, lng: -87.6298, events: [
    { title: "Blues night", type: "koncert", date: "2026-12-05", place: "Buddy Guy's Legends" },
    { title: "Christkindlmarket", type: "popup", date: "2026-12-01", place: "Daley Plaza" },
    { title: "Architecture exhibition", type: "vystava", date: "2026-12-08", place: "Art Institute" },
  ]},
  { name: "Toronto", country: "Kanada", lat: 43.6532, lng: -79.3832, events: [
    { title: "Toronto Light Festival", type: "festival", date: "2026-12-12", place: "Distillery District" },
    { title: "Indie showcase", type: "koncert", date: "2026-12-07", place: "Danforth Music Hall" },
    { title: "U of T Winter Formal", type: "student", date: "2026-12-11", place: "Downtown Campus" },
  ]},
  { name: "Mexico City", country: "Mexiko", lat: 19.4326, lng: -99.1332, events: [
    { title: "Posadas fiesta", type: "party", date: "2026-12-16", place: "Roma Norte" },
    { title: "Frida a její svět", type: "vystava", date: "2026-12-02", place: "Museo Frida Kahlo" },
    { title: "Mariachi festival", type: "festival", date: "2026-12-13", place: "Plaza Garibaldi" },
  ]},
  // ---------- Jižní Amerika ----------
  { name: "Rio de Janeiro", country: "Brazílie", lat: -22.9068, lng: -43.1729, events: [
    { title: "Samba na pláži", type: "koncert", date: "2026-12-12", place: "Copacabana" },
    { title: "Réveillon pre-party", type: "party", date: "2026-12-26", place: "Lapa" },
    { title: "Street art pop-up", type: "popup", date: "2026-12-05", place: "Santa Teresa" },
  ]},
  { name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816, events: [
    { title: "Tango milonga", type: "koncert", date: "2026-12-04", place: "San Telmo" },
    { title: "Bienal současného umění", type: "vystava", date: "2026-12-09", place: "MALBA" },
    { title: "Fiesta universitaria", type: "student", date: "2026-12-11", place: "Palermo" },
  ]},
  { name: "Bogotá", country: "Kolumbie", lat: 4.711, lng: -74.0721, events: [
    { title: "Festival de las Velitas", type: "festival", date: "2026-12-07", place: "La Candelaria" },
    { title: "Salsa noc", type: "party", date: "2026-12-12", place: "Zona T" },
  ]},
  // ---------- Afrika ----------
  { name: "Kapské Město", country: "Jihoafrická republika", lat: -33.9249, lng: 18.4241, events: [
    { title: "Sunset sessions", type: "koncert", date: "2026-12-06", place: "V&A Waterfront" },
    { title: "Rocking the Daisies", type: "festival", date: "2026-12-18", place: "Darling" },
    { title: "Pop-up food market", type: "popup", date: "2026-12-12", place: "Bo-Kaap" },
    { title: "UCT Summer Bash", type: "student", date: "2026-12-04", place: "University of Cape Town" },
  ]},
  { name: "Marrákeš", country: "Maroko", lat: 31.6295, lng: -7.9811, events: [
    { title: "Marrakech Biennale", type: "vystava", date: "2026-12-03", place: "Medina" },
    { title: "Gnawa hudební večer", type: "koncert", date: "2026-12-10", place: "Jemaa el-Fnaa" },
  ]},
  { name: "Lagos", country: "Nigérie", lat: 6.5244, lng: 3.3792, events: [
    { title: "Afrobeats Night", type: "party", date: "2026-12-12", place: "Victoria Island" },
    { title: "Detty December Fest", type: "festival", date: "2026-12-20", place: "Eko Atlantic" },
    { title: "Contemporary African art", type: "vystava", date: "2026-12-05", place: "Nike Art Gallery" },
  ]},
  { name: "Nairobi", country: "Keňa", lat: -1.2921, lng: 36.8219, events: [
    { title: "Nyege Nyege tour", type: "festival", date: "2026-12-14", place: "Karura Forest" },
    { title: "Rooftop sundowner", type: "party", date: "2026-12-06", place: "Westlands" },
  ]},
  // ---------- Asie ----------
  { name: "Tokio", country: "Japonsko", lat: 35.6762, lng: 139.6503, events: [
    { title: "Illumination Festival", type: "festival", date: "2026-12-15", place: "Shibuya" },
    { title: "Pop-up art kiosk", type: "popup", date: "2026-12-06", place: "Harajuku" },
    { title: "J-pop live", type: "koncert", date: "2026-12-12", place: "Budokan" },
    { title: "teamLab nová instalace", type: "vystava", date: "2026-12-01", place: "Toyosu" },
    { title: "Univerzitní nomikai", type: "student", date: "2026-12-10", place: "Waseda" },
  ]},
  { name: "Soul", country: "Jižní Korea", lat: 37.5665, lng: 126.978, events: [
    { title: "K-pop fan meeting", type: "koncert", date: "2026-12-13", place: "Olympic Hall" },
    { title: "Club night v Hongdae", type: "party", date: "2026-12-12", place: "Hongdae" },
    { title: "Pop-up cafe", type: "popup", date: "2026-12-05", place: "Seongsu-dong" },
    { title: "Yonsei Winter Festival", type: "student", date: "2026-12-09", place: "Yonsei University" },
  ]},
  { name: "Šanghaj", country: "Čína", lat: 31.2304, lng: 121.4737, events: [
    { title: "Bund Light Show", type: "festival", date: "2026-12-10", place: "The Bund" },
    { title: "Nová média ve umění", type: "vystava", date: "2026-12-04", place: "Power Station of Art" },
    { title: "Techno at Shelter", type: "party", date: "2026-12-12", place: "Shelter" },
  ]},
  { name: "Bangkok", country: "Thajsko", lat: 13.7563, lng: 100.5018, events: [
    { title: "Rooftop party", type: "party", date: "2026-12-12", place: "Sukhumvit" },
    { title: "Night market pop-up", type: "popup", date: "2026-12-05", place: "Chatuchak" },
    { title: "Bangkok Art Biennale", type: "vystava", date: "2026-12-02", place: "Wat Pho" },
  ]},
  { name: "Singapur", country: "Singapur", lat: 1.3521, lng: 103.8198, events: [
    { title: "Christmas Wonderland", type: "festival", date: "2026-12-06", place: "Gardens by the Bay" },
    { title: "Live at Marina Bay", type: "koncert", date: "2026-12-13", place: "Marina Bay Sands" },
    { title: "NUS Winter Gala", type: "student", date: "2026-12-10", place: "NUS" },
  ]},
  { name: "Dubaj", country: "Spojené arabské emiráty", lat: 25.2048, lng: 55.2708, events: [
    { title: "Rooftop brunch party", type: "party", date: "2026-12-11", place: "Downtown" },
    { title: "Dubai Shopping Festival pop-up", type: "popup", date: "2026-12-15", place: "Dubai Mall" },
    { title: "Future of Art", type: "vystava", date: "2026-12-03", place: "Alserkal Avenue" },
  ]},
  { name: "Dillí", country: "Indie", lat: 28.6139, lng: 77.209, events: [
    { title: "Sufi hudební večer", type: "koncert", date: "2026-12-09", place: "Hazrat Nizamuddin" },
    { title: "India Art Fair preview", type: "vystava", date: "2026-12-04", place: "NSIC Grounds" },
    { title: "IIT Cultural Fest", type: "student", date: "2026-12-11", place: "IIT Delhi" },
  ]},
  { name: "Mumbai", country: "Indie", lat: 19.076, lng: 72.8777, events: [
    { title: "Bollywood Night", type: "party", date: "2026-12-12", place: "Bandra" },
    { title: "Kala Ghoda Arts Festival", type: "festival", date: "2026-12-16", place: "Kala Ghoda" },
  ]},
  // ---------- Oceánie ----------
  { name: "Sydney", country: "Austrálie", lat: -33.8688, lng: 151.2093, events: [
    { title: "Opera House Summer Concert", type: "koncert", date: "2026-12-13", place: "Sydney Opera House" },
    { title: "Beach party", type: "party", date: "2026-12-12", place: "Bondi" },
    { title: "Vivid pop-up", type: "popup", date: "2026-12-05", place: "Circular Quay" },
    { title: "USYD Summer Ball", type: "student", date: "2026-12-04", place: "University of Sydney" },
  ]},
  { name: "Melbourne", country: "Austrálie", lat: -37.8136, lng: 144.9631, events: [
    { title: "Laneway art festival", type: "festival", date: "2026-12-06", place: "Hosier Lane" },
    { title: "NGV Summer exhibition", type: "vystava", date: "2026-12-01", place: "NGV" },
    { title: "Live music in Fitzroy", type: "koncert", date: "2026-12-10", place: "The Corner Hotel" },
  ]},
  { name: "Auckland", country: "Nový Zéland", lat: -36.8509, lng: 174.7645, events: [
    { title: "Christmas in the Park", type: "festival", date: "2026-12-12", place: "Auckland Domain" },
    { title: "Waterfront pop-up", type: "popup", date: "2026-12-07", place: "Viaduct Harbour" },
  ]},
];
