const MAX_DISTANCE_KM = 600; // jak daleko od města ještě klik počítáme
const active = new Set(Object.keys(CATEGORIES));
let selected = null;

const $name = document.getElementById("city-name");
const $sub = document.getElementById("city-sub");
const $events = document.getElementById("events");
const $filters = document.getElementById("filters");

// --- Glóbus ---
const globe = Globe()(document.getElementById("globe"))
  .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
  .backgroundColor("#0f1b2d")
  .pointsData(CITIES)
  .pointLat("lat").pointLng("lng")
  .pointColor(() => "#ffd34d")
  .pointAltitude(0.04).pointRadius(0.5)
  .pointLabel(c => `${c.name} – ${c.events.length} akcí`)
  .onPointClick(selectCity)
  .onGlobeClick(({ lat, lng }) => {
    const near = nearestCity(lat, lng);
    near ? selectCity(near.city) : showNothing(lat, lng);
  });
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.4;

function resize() {
  const box = document.getElementById("globe").getBoundingClientRect();
  globe.width(box.width).height(box.height);
}
window.addEventListener("resize", resize);
resize();

// --- Logika ---
function distanceKm(lat1, lng1, lat2, lng2) {
  const r = Math.PI / 180, R = 6371;
  const a = Math.sin((lat2 - lat1) * r / 2) ** 2 +
    Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin((lng2 - lng1) * r / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function nearestCity(lat, lng) {
  let best = null;
  for (const city of CITIES) {
    const d = distanceKm(lat, lng, city.lat, city.lng);
    if (!best || d < best.d) best = { city, d };
  }
  return best && best.d <= MAX_DISTANCE_KM ? best : null;
}

function selectCity(city) {
  selected = city;
  globe.controls().autoRotate = false;
  globe.pointOfView({ lat: city.lat, lng: city.lng, altitude: 1.6 }, 1000);
  render();
}

function showNothing(lat, lng) {
  selected = null;
  $name.textContent = "Tady nic nemáme";
  $sub.textContent = `V okruhu ${MAX_DISTANCE_KM} km kolem bodu ${lat.toFixed(1)}, ${lng.toFixed(1)} není žádné město. Zkus kliknout na žlutou značku.`;
  $events.innerHTML = "";
}

function render() {
  if (!selected) return;
  $name.textContent = selected.name;
  $sub.textContent = selected.country;
  const list = selected.events
    .filter(e => active.has(e.type))
    .sort((a, b) => a.date.localeCompare(b.date));

  $events.innerHTML = "";
  if (!list.length) {
    $events.innerHTML = '<li class="empty">Pro vybrané kategorie tu zatím nic není.</li>';
    return;
  }
  for (const e of list) {
    const cat = CATEGORIES[e.type];
    const li = document.createElement("li");
    li.className = "event";
    li.style.setProperty("--c", cat.color);
    const date = new Date(e.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" });
    li.innerHTML = `<span class="tag"></span><h2></h2><div class="meta"></div>`;
    li.querySelector(".tag").textContent = cat.label;
    li.querySelector("h2").textContent = e.title;
    li.querySelector(".meta").textContent = `${date} · ${e.place}`;
    $events.appendChild(li);
  }
}

// --- Filtry ---
for (const [key, cat] of Object.entries(CATEGORIES)) {
  const btn = document.createElement("button");
  btn.className = "chip";
  btn.type = "button";
  btn.textContent = cat.label;
  btn.style.setProperty("--c", cat.color);
  btn.setAttribute("aria-pressed", "true");
  btn.addEventListener("click", () => {
    active.has(key) ? active.delete(key) : active.add(key);
    btn.setAttribute("aria-pressed", active.has(key));
    render();
  });
  $filters.appendChild(btn);
}
