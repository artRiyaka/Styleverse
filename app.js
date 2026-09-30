const DEMO_ID = "member";
const DEMO_PASS = "atelier";
const CLOSET_KEY = "styleverse-closet";

const SAMPLE = [
  { id: "t1", name: "Ivory silk blouse", category: "Tops", color: "Ivory", hex: "#f3eee4", season: "All", formality: 3, warmth: 1 },
  { id: "t2", name: "Black merino knit", category: "Tops", color: "Black", hex: "#1c1722", season: "Cold", formality: 2, warmth: 4 },
  { id: "t3", name: "White cotton shirt", category: "Tops", color: "White", hex: "#f7f5f2", season: "Warm", formality: 3, warmth: 1 },
  { id: "t4", name: "Charcoal turtleneck", category: "Tops", color: "Charcoal", hex: "#3a3544", season: "Cold", formality: 3, warmth: 4 },
  { id: "t5", name: "Blush camisole", category: "Tops", color: "Blush", hex: "#e7cfc6", season: "Warm", formality: 2, warmth: 0 },
  { id: "b1", name: "Tailored black trousers", category: "Bottoms", color: "Black", hex: "#16131c", season: "All", formality: 4, warmth: 2 },
  { id: "b2", name: "Ivory wide-leg trousers", category: "Bottoms", color: "Ivory", hex: "#efe8dc", season: "Warm", formality: 3, warmth: 1 },
  { id: "b3", name: "Indigo denim", category: "Bottoms", color: "Indigo", hex: "#2c3a55", season: "All", formality: 1, warmth: 2 },
  { id: "b4", name: "Stone pleated skirt", category: "Bottoms", color: "Stone", hex: "#cfc3b4", season: "All", formality: 3, warmth: 1 },
  { id: "d1", name: "Black silk column dress", category: "Dresses", color: "Black", hex: "#14111a", season: "All", formality: 5, warmth: 1 },
  { id: "d2", name: "Olive shirt dress", category: "Dresses", color: "Olive", hex: "#5d6148", season: "Warm", formality: 2, warmth: 1 },
  { id: "o1", name: "Camel coat", category: "Outerwear", color: "Camel", hex: "#b08968", season: "Cold", formality: 3, warmth: 4 },
  { id: "o2", name: "Black leather jacket", category: "Outerwear", color: "Black", hex: "#2a242c", season: "All", formality: 2, warmth: 2 },
  { id: "s1", name: "Black leather pumps", category: "Shoes", color: "Black", hex: "#1a161c", season: "All", formality: 5, warmth: 1 },
  { id: "s2", name: "White leather sneakers", category: "Shoes", color: "White", hex: "#f4f1ec", season: "All", formality: 1, warmth: 1 },
  { id: "s3", name: "Tan loafers", category: "Shoes", color: "Tan", hex: "#c4a574", season: "All", formality: 3, warmth: 1 },
  { id: "a1", name: "Gold hoop earrings", category: "Accessories", color: "Gold", hex: "#d4b483", season: "All", formality: 3, warmth: 0 },
  { id: "a2", name: "Ivory silk scarf", category: "Accessories", color: "Ivory", hex: "#f6f1e8", season: "All", formality: 2, warmth: 1 }
];

const LINK_HITS = [
  { test: /trench/i, name: "Stone trench coat", category: "Outerwear", color: "Stone", hex: "#b7a89a", season: "Cold", formality: 3, warmth: 3 },
  { test: /heel|pump/i, name: "Black leather pumps", category: "Shoes", color: "Black", hex: "#1a161c", season: "All", formality: 5, warmth: 1 },
  { test: /sneaker/i, name: "White leather sneakers", category: "Shoes", color: "White", hex: "#f4f1ec", season: "All", formality: 1, warmth: 1 },
  { test: /coat/i, name: "Camel coat", category: "Outerwear", color: "Camel", hex: "#b08968", season: "Cold", formality: 4, warmth: 4 }
];

const COLORS = [
  ["Ivory", "#f3eee4"],
  ["Black", "#1c1722"],
  ["White", "#f7f5f2"],
  ["Blush", "#e7cfc6"],
  ["Camel", "#b08968"],
  ["Olive", "#5d6148"],
  ["Indigo", "#2c3a55"],
  ["Gold", "#d4b483"]
];

const MOODS = {
  Effortless: ["Ivory", "Black", "White", "Stone", "Camel", "Tan", "Charcoal"],
  Bold: ["Black", "Olive", "Indigo"],
  Soft: ["Blush", "Ivory", "Stone", "Gold"],
  Editorial: ["Olive", "Camel", "Black", "Ivory"]
};

const EVENTS = {
  2: { title: "Client presentation", occasion: "Office", dress: "Smart casual", temp: 16, sky: "Cloudy" },
  3: { title: "Working session", occasion: "Office", dress: "Smart casual", temp: 18, sky: "Clear" },
  4: { title: "Dinner in the city", occasion: "Dinner", dress: "Smart casual", temp: 14, sky: "Clear" },
  6: { title: "Garden wedding", occasion: "Wedding", dress: "Formal", temp: 21, sky: "Bright" },
  0: { title: "Late brunch", occasion: "Weekend", dress: "Casual", temp: 19, sky: "Bright" }
};

const CLIMATES = [
  { test: /marrakech|lisbon|rome|miami|los angeles/i, band: "mild", note: "Mild days, light layers." },
  { test: /reykjav|oslo|chicago|new york|london|paris/i, band: "cold", note: "Cooler air, a coat earns its place." },
  { test: /dubai|bangkok|singapore|lagos/i, band: "warm", note: "Warm weather, leave the heavy knits." }
];

const COPY = {
  closet: ["Closet", "Everything you own"],
  week: ["Week", "Dressed before it starts"],
  pack: ["Packing", "Pack less. Wear more."],
  style: ["Stylist", "Outfits from what you own"]
};

const state = {
  filter: "All",
  query: "",
  wardrobe: loadCloset(),
  dayIndex: 0,
  salt: 1,
  week: [],
  looks: {},
  packed: {}
};

const $ = (id) => document.getElementById(id);

function loadCloset() {
  try {
    const saved = JSON.parse(localStorage.getItem(CLOSET_KEY) || "null");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (err) {
    /* keep the sample closet */
  }
  return SAMPLE.map((item) => ({ ...item }));
}

function saveCloset() {
  localStorage.setItem(CLOSET_KEY, JSON.stringify(state.wardrobe));
}

function hash(value) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function startOfWeek(date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const shift = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + shift);
  copy.setHours(12, 0, 0, 0);
  return copy;
}

function buildWeek() {
  const monday = startOfWeek(new Date());
  const today = new Date();
  state.week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const plan = EVENTS[date.getDay()] || { title: "", occasion: "Weekend", dress: "Casual", temp: 17, sky: "Clear" };
    return {
      key: date.toISOString().slice(0, 10),
      weekday: date.toLocaleDateString(undefined, { weekday: "short" }),
      day: date.getDate(),
      today: date.toDateString() === today.toDateString(),
      ...plan,
      open: !plan.title
    };
  });
  const todayIndex = state.week.findIndex((day) => day.today);
  state.dayIndex = todayIndex >= 0 ? todayIndex : 0;
  state.looks = {};
  state.week.forEach((day, index) => {
    state.looks[day.key] = compose({
      occasion: day.occasion,
      dress: day.dress,
      mood: day.dress === "Formal" ? "Editorial" : "Effortless",
      temp: day.temp,
      salt: index + 1
    });
  });
}

function bandFor(temp) {
  if (temp <= 12) return "cold";
  if (temp >= 22) return "warm";
  return "mild";
}

function formalityFor(dress, occasion) {
  if (dress === "Formal" || occasion === "Wedding") return 5;
  if (dress === "Casual" || occasion === "Weekend") return 1;
  if (occasion === "Travel") return 2;
  return 3;
}

function compose(options) {
  const ctx = {
    wardrobe: state.wardrobe,
    formality: formalityFor(options.dress, options.occasion),
    mood: options.mood || "Effortless",
    band: options.band || bandFor(options.temp ?? 18),
    pinId: options.pinId || "",
    excludeId: options.excludeId || "",
    salt: options.salt || state.salt,
    uses: options.uses || {}
  };
  const pin = state.wardrobe.find((item) => item.id === ctx.pinId);
  const pieces = [];
  const gaps = [];
  const blocked = new Set();

  const pick = (category) => {
    if (pin && pin.category === category && pin.id !== ctx.excludeId) return pin;
    const pool = state.wardrobe.filter((item) => item.category === category && !blocked.has(item.id) && item.id !== ctx.excludeId);
    const ranked = pool
      .map((item) => ({ item, score: scoreItem(item, ctx) }))
      .sort((a, b) => b.score - a.score);
    return ranked[0] ? ranked[0].item : null;
  };

  const take = (category) => {
    const item = pick(category);
    if (!item) return null;
    blocked.add(item.id);
    pieces.push(item);
    return item;
  };

  const pinIsSeparate = pin && (pin.category === "Tops" || pin.category === "Bottoms");
  const wantDress = !pinIsSeparate && (pin?.category === "Dresses" || ctx.formality >= 5);

  if (wantDress) {
    if (!take("Dresses")) gaps.push("a dress with this kind of finish");
  }
  if (!pieces.some((item) => item.category === "Dresses")) {
    if (!take("Tops")) gaps.push("a top");
    if (!take("Bottoms")) gaps.push("trousers or a skirt");
  }
  if (!take("Shoes")) gaps.push("shoes that can carry the dress code");
  const temp = options.temp ?? (ctx.band === "cold" ? 8 : ctx.band === "warm" ? 26 : 18);
  if (temp <= 16) {
    const coat = take("Outerwear");
    if (!coat && temp <= 12) gaps.push("a coat for the weather");
  }
  if (ctx.formality >= 3 || ctx.mood === "Editorial") take("Accessories");

  if (pin && pin.id !== ctx.excludeId && !pieces.some((item) => item.id === pin.id)) {
    pieces.unshift(pin);
  }

  if (ctx.formality >= 5) {
    const anchor = pieces.find((item) => item.category === "Dresses" || item.category === "Tops");
    if (!anchor || anchor.formality < 4) gaps.push("a dress with a more formal finish");
  }

  const unique = [];
  pieces.forEach((item) => {
    if (!unique.some((kept) => kept.id === item.id)) unique.push(item);
  });

  return {
    pieces: unique,
    gaps,
    line: lineFor(unique, ctx, options)
  };
}

function scoreItem(item, ctx) {
  let score = 12 - Math.abs(item.formality - ctx.formality) * 2.2;
  if ((MOODS[ctx.mood] || []).includes(item.color)) score += 2.4;
  if (ctx.band === "cold" && item.warmth >= 3) score += 2;
  if (ctx.band === "warm" && item.warmth <= 1) score += 1.6;
  if (ctx.band === "warm" && item.warmth >= 4) score -= 3;
  if (ctx.band === "mild" && item.warmth >= 4) score -= 4.5;
  if (ctx.band === "mild" && item.warmth <= 1) score += 1;
  if (item.id === ctx.pinId) score += 40;
  const uses = ctx.uses[item.id] || 0;
  if (uses) {
    const reusable = ["Shoes", "Bottoms", "Outerwear", "Accessories"].includes(item.category);
    score -= reusable ? uses * 0.35 : uses * 4;
  }
  score += ((hash(item.id) + ctx.salt) % 5) * 0.2;
  return score;
}

function lineFor(pieces, ctx, options) {
  if (!pieces.length) return "The closet cannot cover this brief yet.";
  const lead = pieces[0].name.toLowerCase();
  const where = options.occasion ? options.occasion.toLowerCase() : "the day";
  return `${ctx.mood} for ${where}, cut from ${lead} and what already hangs beside it.`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pieceMarkup(item, compact) {
  return `
    <article class="piece">
      <div class="swatch" style="background-color:${item.hex}"><b>${escapeHtml(item.category)}</b></div>
      <h3>${escapeHtml(item.name)}</h3>
      ${compact ? "" : `<p class="meta">${escapeHtml(item.color)} · ${escapeHtml(item.season)}</p>`}
    </article>`;
}

function renderCount() {
  const count = state.wardrobe.length;
  $("piece-count").textContent = `${count} piece${count === 1 ? "" : "s"}`;
}

function renderCloset() {
  const query = state.query.trim().toLowerCase();
  const items = state.wardrobe.filter((item) => {
    const categoryOk = state.filter === "All" || item.category === state.filter;
    const text = `${item.name} ${item.color} ${item.category}`.toLowerCase();
    return categoryOk && (!query || text.includes(query));
  });
  const grid = $("closet-grid");
  if (!items.length) {
    grid.innerHTML = `<p class="empty">Nothing in the closet matches that.</p>`;
    return;
  }
  grid.innerHTML = items.map((item, index) => `
    <article class="card" style="animation-delay:${Math.min(index, 10) * 35}ms">
      <div class="swatch" style="background-color:${item.hex}"><b>${escapeHtml(item.color)}</b></div>
      <h3>${escapeHtml(item.name)}</h3>
      <p class="meta">${escapeHtml(item.category)} · ${escapeHtml(item.season)}</p>
    </article>`).join("");
}

function renderWeek() {
  $("days").innerHTML = state.week.map((day, index) => `
    <button type="button" class="day${index === state.dayIndex ? " is-on" : ""}" data-day="${index}">
      <small>${day.today ? "Today" : day.weekday}</small>
      <strong>${day.day}</strong>
    </button>`).join("");
  const day = state.week[state.dayIndex];
  const look = state.looks[day.key];
  const title = day.open ? "An open day" : day.title;
  const note = day.open
    ? "Nothing is on the calendar. A quiet look is here if you want one."
    : `${day.dress} · matched to the day`;
  $("day-detail").innerHTML = `
    <div class="detail-top">
      <div>
        <p class="weather">${day.temp}° · ${day.sky}</p>
        <h3>${escapeHtml(title)}</h3>
        <p class="meta">${escapeHtml(note)}</p>
      </div>
      <button type="button" class="btn ghost" id="restyle">Restyle</button>
    </div>
    <div class="pieces">${look.pieces.map((item) => pieceMarkup(item, true)).join("")}</div>
    <p class="reason">${escapeHtml(look.line)}</p>
    ${look.gaps.length ? `<p class="gap">Worth adding: ${escapeHtml(look.gaps[0])}.</p>` : ""}`;
}

function renderSelects() {
  const pin = $("pin");
  const exclude = $("exclude");
  const pinValue = pin.value;
  const excludeValue = exclude.value;
  const options = [`<option value="">No piece</option>`]
    .concat(state.wardrobe.map((item) => `<option value="${item.id}">${escapeHtml(item.name)}</option>`))
    .join("");
  pin.innerHTML = options;
  exclude.innerHTML = options;
  if ([...pin.options].some((option) => option.value === pinValue)) pin.value = pinValue;
  if ([...exclude.options].some((option) => option.value === excludeValue)) exclude.value = excludeValue;
}

function showView(name) {
  document.querySelectorAll(".nav button").forEach((button) => {
    button.classList.toggle("is-on", button.dataset.view === name);
  });
  document.querySelectorAll(".view").forEach((view) => {
    const on = view.id === `view-${name}`;
    view.hidden = !on;
    view.classList.toggle("is-on", on);
  });
  $("view-kicker").textContent = COPY[name][0];
  $("view-title").textContent = COPY[name][1];
  if (name === "closet") renderCloset();
  if (name === "week") renderWeek();
  if (name === "style") renderSelects();
}

function enterApp() {
  $("gate").hidden = true;
  $("app").hidden = false;
  document.body.classList.add("is-in");
  buildWeek();
  renderCount();
  renderSelects();
  paintSwatches();
  primeDates();
  showView("closet");
  sessionStorage.setItem("styleverse-in", "1");
}

function paintSwatches() {
  const row = $("swatches");
  if (row.childElementCount) return;
  row.innerHTML = COLORS.map(([name, hex], index) => `
    <button type="button" class="swatch-btn${index === 0 ? " is-on" : ""}" data-color="${name}" data-hex="${hex}" style="background:${hex}" aria-label="${name}"></button>`).join("");
}

function selectedColor() {
  const active = document.querySelector(".swatch-btn.is-on");
  return active ? { color: active.dataset.color, hex: active.dataset.hex } : { color: "Ivory", hex: "#f3eee4" };
}

function primeDates() {
  const from = $("from");
  const until = $("until");
  if (from.value && until.value) return;
  const start = new Date();
  start.setDate(start.getDate() + 10);
  const end = new Date(start);
  end.setDate(start.getDate() + 2);
  from.value = start.toISOString().slice(0, 10);
  until.value = end.toISOString().slice(0, 10);
}

function tripLength() {
  const from = new Date($("from").value);
  const until = new Date($("until").value);
  if (Number.isNaN(from.getTime()) || Number.isNaN(until.getTime())) return 0;
  const days = Math.round((until - from) / 86400000) + 1;
  return days;
}

function climateFor(city) {
  return CLIMATES.find((item) => item.test.test(city)) || { band: "mild", note: "A balanced climate. Pieces that layer." };
}

function buildPack(city) {
  const total = tripLength();
  const days = Math.min(Math.max(total, 1), 5);
  const climate = climateFor(city);
  const uses = {};
  const moods = ["Effortless", "Soft", "Editorial", "Bold", "Effortless"];
  const looks = Array.from({ length: days }, (_, index) => {
    const look = compose({
      occasion: "Travel",
      dress: "Smart casual",
      mood: moods[index],
      band: climate.band,
      salt: state.salt + index + 3,
      uses
    });
    look.pieces.forEach((item) => {
      uses[item.id] = (uses[item.id] || 0) + 1;
    });
    return { label: `Day ${index + 1}`, look };
  });
  const checklist = [];
  looks.forEach(({ look }) => {
    look.pieces.forEach((item) => {
      if (!checklist.some((packed) => packed.id === item.id)) {
        checklist.push({ id: item.id, name: item.name, category: item.category });
      }
    });
  });
  return { city, days, capped: total > 5, climate, looks, checklist };
}

function renderPack(plan) {
  const packedCount = plan.checklist.filter((item) => state.packed[item.id]).length;
  $("pack-result").classList.remove("pending");
  const width = plan.checklist.length ? Math.round((packedCount / plan.checklist.length) * 100) : 0;
  $("pack-result").innerHTML = `
    <p class="weather">${escapeHtml(plan.city)} · ${plan.days} day${plan.days === 1 ? "" : "s"}</p>
    <h3>${plan.checklist.length} pieces cover the trip</h3>
    <p class="meta">${escapeHtml(plan.climate.note)}${plan.capped ? " Showing the first five days." : ""}</p>
    <div class="progress" aria-hidden="true"><i style="width:${width}%"></i></div>
    <p class="meta">${packedCount} of ${plan.checklist.length} packed</p>
    ${plan.looks.map(({ label, look }) => `
      <div class="day-look">
        <h4>${label}</h4>
        <div class="pieces">${look.pieces.map((item) => pieceMarkup(item, true)).join("")}</div>
      </div>`).join("")}
    <div class="day-look">
      <h4>In the bag</h4>
      <div class="checks">
        ${plan.checklist.map((item) => `
          <label class="check${state.packed[item.id] ? " is-packed" : ""}">
            <input type="checkbox" data-pack="${item.id}" ${state.packed[item.id] ? "checked" : ""}>
            <span>${escapeHtml(item.name)}</span>
          </label>`).join("")}
      </div>
    </div>
    ${packedCount === plan.checklist.length ? `<p class="reason">The bag is ready.</p>` : ""}`;
}

function renderStyle(look, brief) {
  $("style-result").classList.remove("pending");
  $("style-result").innerHTML = `
    <div class="look-head">
      <div>
        <p class="weather">${escapeHtml(brief.mood)} · ${escapeHtml(brief.dress)}</p>
        <h3>${escapeHtml(brief.occasion)}</h3>
      </div>
    </div>
    <div class="pieces">${look.pieces.map((item) => pieceMarkup(item)).join("") || `<p class="empty">No combination fits yet.</p>`}</div>
    <p class="reason">${escapeHtml(look.line)}</p>
    ${look.gaps.length ? `<p class="gap">The closet is honest about this one. Worth adding: ${escapeHtml(look.gaps[0])}.</p>` : ""}`;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function bind() {
  $("member-id").value = DEMO_ID;
  $("passcode").value = DEMO_PASS;

  $("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const note = $("login-note");
    const id = $("member-id").value || DEMO_ID;
    const pass = $("passcode").value || DEMO_PASS;
    if (id !== DEMO_ID || pass !== DEMO_PASS) {
      note.textContent = "Those details are not on the list.";
      return;
    }
    note.textContent = "";
    enterApp();
  });

  document.querySelector(".nav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (button) showView(button.dataset.view);
  });

  $("sign-out").addEventListener("click", () => {
    sessionStorage.removeItem("styleverse-in");
    $("app").hidden = true;
    $("gate").hidden = false;
    document.body.classList.remove("is-in");
  });

  $("filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((chip) => chip.classList.toggle("is-on", chip === button));
    renderCloset();
  });

  $("search").addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCloset();
  });

  $("open-add").addEventListener("click", () => $("add-sheet").showModal());
  $("close-add").addEventListener("click", () => $("add-sheet").close());
  $("swatches").addEventListener("click", (event) => {
    const button = event.target.closest(".swatch-btn");
    if (!button) return;
    document.querySelectorAll(".swatch-btn").forEach((swatch) => swatch.classList.toggle("is-on", swatch === button));
  });

  $("add-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = $("add-name").value.trim();
    if (!raw) return;
    const known = LINK_HITS.find((item) => item.test.test(raw));
    const tone = selectedColor();
    const category = $("add-category").value;
    const season = $("add-season").value;
    const warmth = season === "Cold" ? 4 : season === "Warm" ? 1 : 2;
    const formality = { Tops: 3, Bottoms: 3, Dresses: 4, Outerwear: 3, Shoes: 3, Accessories: 2 }[category];
    const piece = known
      ? { ...known, id: `c${Date.now()}` }
      : {
          id: `c${Date.now()}`,
          name: raw.replace(/^https?:\/\/\S+/i, "Linked piece").slice(0, 48),
          category,
          color: tone.color,
          hex: tone.hex,
          season,
          formality,
          warmth
        };
    delete piece.test;
    state.wardrobe.unshift(piece);
    saveCloset();
    $("add-form").reset();
    $("add-sheet").close();
    state.filter = "All";
    document.querySelectorAll("[data-filter]").forEach((chip) => chip.classList.toggle("is-on", chip.dataset.filter === "All"));
    renderCount();
    renderCloset();
    renderSelects();
    buildWeek();
  });

  $("restore").addEventListener("click", () => {
    state.wardrobe = SAMPLE.map((item) => ({ ...item }));
    saveCloset();
    state.filter = "All";
    state.query = "";
    $("search").value = "";
    document.querySelectorAll("[data-filter]").forEach((chip) => chip.classList.toggle("is-on", chip.dataset.filter === "All"));
    renderCount();
    renderCloset();
    renderSelects();
    buildWeek();
  });

  $("day-detail").addEventListener("click", (event) => {
    if (!event.target.closest("#restyle")) return;
    const day = state.week[state.dayIndex];
    state.salt += 1;
    state.looks[day.key] = compose({
      occasion: day.occasion,
      dress: day.dress,
      mood: state.salt % 2 ? "Editorial" : "Effortless",
      temp: day.temp,
      salt: state.salt
    });
    renderWeek();
  });

  $("days").addEventListener("click", (event) => {
    const button = event.target.closest("[data-day]");
    if (!button) return;
    state.dayIndex = Number(button.dataset.day);
    renderWeek();
  });

  $("pack-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = $("pack-note");
    const city = $("city").value.trim();
    const days = tripLength();
    if (!city) {
      note.textContent = "Add a city first.";
      return;
    }
    if (days < 1) {
      note.textContent = "The return date needs to follow the departure.";
      return;
    }
    note.textContent = "";
    const button = $("pack-btn");
    button.disabled = true;
    $("pack-result").classList.add("pending");
    $("pack-result").innerHTML = `<p class="empty">Editing the suitcase…</p>`;
    await wait(700);
    state.packed = {};
    state.pack = buildPack(city);
    button.disabled = false;
    renderPack(state.pack);
  });

  $("pack-result").addEventListener("change", (event) => {
    const box = event.target.closest("[data-pack]");
    if (!box || !state.pack) return;
    state.packed[box.dataset.pack] = box.checked;
    renderPack(state.pack);
  });

  $("style-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const note = $("style-note");
    const pinId = $("pin").value;
    const excludeId = $("exclude").value;
    if (pinId && pinId === excludeId) {
      note.textContent = "Pin and set-aside need to be different pieces.";
      return;
    }
    note.textContent = "";
    const brief = {
      occasion: $("occasion").value,
      dress: $("dress").value,
      mood: $("mood").value,
      pinId,
      excludeId
    };
    const button = $("style-btn");
    button.disabled = true;
    $("style-result").classList.add("pending");
    $("style-result").innerHTML = `<p class="empty">Composing the look…</p>`;
    await wait(780);
    state.salt += 1;
    const look = compose({ ...brief, salt: state.salt, temp: 18 });
    button.disabled = false;
    renderStyle(look, brief);
  });
}

paintSwatches();
bind();
if (sessionStorage.getItem("styleverse-in") === "1") enterApp();
