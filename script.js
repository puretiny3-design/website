/* ============================================================
   YouTube Clone — Application Logic
   Real playable videos (Google sample bucket), watch page,
   history, liked videos, watch-later, comments, subscriptions.
   ============================================================ */

/* ---------- Video data (real, playable mp4 sources) ---------- */
const CDN = "https://storage.googleapis.com/gtv-videos-bucket/sample/";
const VIDEOS = [
  { id: "bbb",   title: "Big Buck Bunny — Official Blender Open Movie", channel: "Blender Foundation", subs: "1.6M", cat: ["Animation", "Film"], src: CDN + "BigBuckBunny.mp4", thumb: CDN + "images/BigBuckBunny.jpg", dur: "9:56", views: "16M", age: "4 years ago", desc: "The short film Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one day three sinister rodent bullies disrupt his serene, idyllic morning, he decides to take action and teach the miscreants a well-deserved lesson.\n\nDirected by Sacha Goedegebure. Made with the open-source Blender 3D creation suite." },
  { id: "ed",    title: "Elephants Dream — World's First Open Movie", channel: "Blender Foundation", subs: "1.6M", cat: ["Animation", "Film", "Sci-Fi"], src: CDN + "ElephantsDream.mp4", thumb: CDN + "images/ElephantsDream.jpg", dur: "10:53", views: "8.2M", age: "4 years ago", desc: "Two strange characters explore a bizarre, mechanical world that turns out to be a figment of their own imagination. The world's first open movie, produced by the Orange Open Movie Project." },
  { id: "sintel", title: "Sintel — Independent Blender Open Movie", channel: "Blender Studio", subs: "2.1M", cat: ["Animation", "Film"], src: CDN + "Sintel.mp4", thumb: CDN + "images/Sintel.jpg", dur: "14:48", views: "21M", age: "3 years ago", desc: "Sintel is an independently produced short film, built by volunteers by using open-source software. A lonely young woman searches for her baby dragon, and faces a terrible destiny." },
  { id: "tios",  title: "Tear of Steel — Sci-Fi Short Film", channel: "Blender Studio", subs: "2.1M", cat: ["Sci-Fi", "Film"], src: CDN + "TearsOfSteel.mp4", thumb: CDN + "images/TearsOfSteel.jpg", dur: "12:14", views: "5.7M", age: "2 years ago", desc: "Tears of Steel is a sci-fi short film set in a future version of Amsterdam, the brightest city in the world. It features a combination of live action VFX and Blender animation." },
  { id: "blazes", title: "For Bigger Blazes — Chromecast Adventure", channel: "Google", subs: "8.4M", cat: ["Tech"], src: CDN + "ForBiggerBlazes.mp4", thumb: CDN + "images/ForBiggerBlazes.jpg", dur: "0:15", views: "2.3M", age: "1 year ago", desc: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV." },
  { id: "escape", title: "For Bigger Escape — Run Away From the Everyday", channel: "Google", subs: "8.4M", cat: ["Tech", "Travel"], src: CDN + "ForBiggerEscapes.mp4", thumb: CDN + "images/ForBiggerEscapes.jpg", dur: "0:15", views: "1.8M", age: "1 year ago", desc: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't enough." },
  { id: "fun",   title: "For Bigger Fun — Every Moment Deserves Sharing", channel: "Google", subs: "8.4M", cat: ["Comedy"], src: CDN + "ForBiggerFun.mp4", thumb: CDN + "images/ForBiggerFun.jpg", dur: "1:00", views: "3.1M", age: "8 months ago", desc: "Introducing Chromecast. The easiest way to enjoy online video and music on your TV." },
  { id: "joy",   title: "For Bigger Joyrides — Take the Fun Anywhere", channel: "Google", subs: "8.4M", cat: ["Travel", "Comedy"], src: CDN + "ForBiggerJoyrides.mp4", thumb: CDN + "images/ForBiggerJoyrides.jpg", dur: "0:15", views: "950K", age: "6 months ago", desc: "Introducing Chromecast. Every joyride deserves a soundtrack." },
  { id: "melt",  title: "For Bigger Meltdowns — Toddler-Proof Entertainment", channel: "Google", subs: "8.4M", cat: ["Comedy"], src: CDN + "ForBiggerMeltdowns.mp4", thumb: CDN + "images/ForBiggerMeltdowns.jpg", dur: "0:15", views: "1.2M", age: "5 months ago", desc: "Introducing Chromecast. Keep the peace with instant favorites." },
  { id: "subaru", title: "Subaru Outback On Street And Dirt — Test Drive", channel: "MotorTrend PK", subs: "640K", cat: ["Cars", "Tech"], src: CDN + "SubaruOutbackOnStreetAndDirt.mp4", thumb: CDN + "images/SubaruOutbackOnStreetAndDirt.jpg", dur: "2:36", views: "410K", age: "3 months ago", desc: "Smoke and mirrors: there's a lot to sift through when it comes to the 2013 Subaru Outback review. We take it on street and dirt." },
  { id: "gti",   title: "Volkswagen GTI Review — Hot Hatch Classic", channel: "MotorTrend PK", subs: "640K", cat: ["Cars"], src: CDN + "VolkswagenGTIReview.mp4", thumb: CDN + "images/VolkswagenGTIReview.jpg", dur: "2:20", views: "290K", age: "2 months ago", desc: "The Volkswagen GTI is the definitive hot hatch. We review the latest generation and ask: is it still the benchmark?" },
  { id: "bullrun", title: "We Are Going On Bullrun — Supercar Rally", channel: "AutoVlog", subs: "320K", cat: ["Cars", "Travel"], src: CDN + "WeAreGoingOnBullrun.mp4", thumb: CDN + "images/WeAreGoingOnBullrun.jpg", dur: "0:47", views: "180K", age: "1 month ago", desc: "Join us on the wildest supercar rally on earth. Bullrun through the desert with exotic machines." },
  { id: "hundred", title: "What Care Can You Get For $100? — Challenge", channel: "FixItFridays", subs: "1.1M", cat: ["Tech", "Comedy"], src: CDN + "WhatCarCanYouGetForAGrand.mp4", thumb: CDN + "images/WhatCarCanYouGetForAGrand.jpg", dur: "3:12", views: "2.7M", age: "2 weeks ago", desc: "We hit the classifieds with a tiny budget and see what kind of car we can find for a grand. It goes... interestingly." },
];

const SHORTS = [
  { id: "sh1", title: "Bunny vs. the Bulies 🐰 #shorts", channel: "Blender Foundation", likes: "89K", src: CDN + "BigBuckBunny.mp4", thumb: CDN + "images/BigBuckBunny.jpg" },
  { id: "sh2", title: "POV: your dragon grows up 🐉 #shorts", channel: "Blender Studio", likes: "120K", src: CDN + "Sintel.mp4", thumb: CDN + "images/Sintel.jpg" },
  { id: "sh3", title: "Robot apocalypse in Amsterdam 🤖 #shorts", channel: "Blender Studio", likes: "65K", src: CDN + "TearsOfSteel.mp4", thumb: CDN + "images/TearsOfSteel.jpg" },
  { id: "sh4", title: "15 seconds of pure joyride 🚗💨 #shorts", channel: "Google", likes: "42K", src: CDN + "ForBiggerJoyrides.mp4", thumb: CDN + "images/ForBiggerJoyrides.jpg" },
  { id: "sh5", title: "Dream world tour ✨ #shorts", channel: "Blender Foundation", likes: "77K", src: CDN + "ElephantsDream.mp4", thumb: CDN + "images/ElephantsDream.jpg" },
  { id: "sh6", title: "GTI launch control test 😱 #shorts", channel: "MotorTrend PK", likes: "31K", src: CDN + "VolkswagenGTIReview.mp4", thumb: CDN + "images/VolkswagenGTIReview.jpg" },
];

const CATEGORIES = ["All", "Animation", "Film", "Sci-Fi", "Tech", "Comedy", "Cars", "Travel", "Music", "Gaming", "News", "Live", "Podcasts", "Recently uploaded", "New to you"];
const LOGO_COLORS = { "Blender Foundation": "#f2740b", "Blender Studio": "#e87d0d", "Google": "#3ea6ff", "MotorTrend PK": "#c40000", "AutoVlog": "#7a4fd6", "FixItFridays": "#1a8f55" };
const AVATAR = "R";
const LS = { history: "yt_history", liked: "yt_liked", later: "yt_later", comments: "yt_comments", subs: "yt_subs", likes: "yt_likes", hidden: "yt_hidden", progress: "yt_progress" };

/* ---------- Storage helpers ---------- */
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
let history = load(LS.history, []);
let liked = load(LS.liked, []);
let later = load(LS.later, []);
let subs = load(LS.subs, []);
let likesMap = load(LS.likes, {});
let hidden = load(LS.hidden, []);
let commentsMap = load(LS.comments, {});

/* ---------- DOM refs ---------- */
const $ = (s) => document.querySelector(s);
const grid = $("#videoGrid"), chipsEl = $("#chips"), emptyState = $("#emptyState"), toastEl = $("#toast");
const player = $("#player"), relatedList = $("#relatedList");
let activeCategory = "All", searchQuery = "", currentPage = "home", currentVideo = null, autoplay = true;
let toastTimer;

/* ---------- Utilities ---------- */
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}
function fmtViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M views";
  if (n >= 1e3) return Math.round(n / 1e3) + "K views";
  return n + " views";
}
function logoChar(name) { return name.trim()[0] || "?"; }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }

/* ---------- Card rendering ---------- */
function cardHTML(v) {
  const pct = load(LS.progress, {})[v.id] || 0;
  return `<article class="video-card" data-id="${v.id}" data-category="${v.cat.join(" ")}"
      data-search="${(v.title + " " + v.channel + " " + v.cat.join(" ") + " " + v.desc).toLowerCase()}">
    <div class="thumbnail">
      <img src="${v.thumb}" alt="${esc(v.title)}" loading="lazy">
      <span class="duration">${v.dur}</span>
      ${pct > 1 ? `<span class="progress-bar" style="width:${Math.min(pct, 100)}%"></span>` : ""}
    </div>
    <div class="video-info">
      <div class="channel-logo" style="background:${LOGO_COLORS[v.channel] || "#3f3f3f"}">${logoChar(v.channel)}</div>
      <div class="video-copy">
        <h3>${esc(v.title)}</h3>
        <p>${esc(v.channel)} <span class="verified">✓</span><br>${v.views} views · ${v.age}</p>
      </div>
      <button class="more-button" data-more="${v.id}" aria-label="More options">⋮</button>
    </div>
  </article>`;
}

function renderGrid() {
  const list = VIDEOS.filter(v => !hidden.includes(v.id));
  grid.innerHTML = list.map(cardHTML).join("");
  applyFilters();
}

function applyFilters() {
  let visible = 0;
  grid.querySelectorAll(".video-card").forEach(card => {
    const cats = card.dataset.category.split(" ");
    const okCat = activeCategory === "All" || cats.includes(activeCategory);
    const hay = (card.dataset.search + " " + card.textContent).toLowerCase();
    const okSearch = !searchQuery || hay.includes(searchQuery);
    const show = okCat && okSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
  grid.hidden = visible === 0;
  if (visible === 0) {
    const parts = [];
    if (activeCategory !== "All") parts.push(`Category: ${activeCategory}`);
    if (searchQuery) parts.push(`Search: "${searchQuery}"`);
    $("#emptyCheck").textContent = parts.join("  •  ");
  }
}

function renderChips() {
  chipsEl.innerHTML = CATEGORIES.map(c =>
    `<button class="chip ${c === activeCategory ? "selected" : ""}" data-category="${c}">${c}</button>`).join("");
}

/* ---------- Page navigation ---------- */
function showPage(page) {
  currentPage = page;
  document.querySelectorAll(".page").forEach(p => p.hidden = true);
  if (page === "watch") $("#page-watch").hidden = false;
  else if (page === "shorts") $("#page-shorts").hidden = false;
  else if (page.startsWith("list:")) { $("#page-list").hidden = false; renderListPage(page.slice(5)); }
  else $("#page-home").hidden = false;
  document.querySelectorAll(".side-link").forEach(l =>
    l.classList.toggle("active", l.dataset.page === page || (page.startsWith("list:") && l.dataset.page === page.slice(5))));
  window.scrollTo(0, 0);
  if (page !== "watch" && !player.paused) player.pause();
}

/* ---------- Watch page ---------- */
function openVideo(id, fromRelated = false) {
  const v = VIDEOS.find(x => x.id === id) || SHORTS.find(x => x.id === id);
  if (!v) return;
  currentVideo = v;

  player.src = v.src;
  player.load();
  player.play().catch(() => {});
  $("#playerTitle").textContent = v.title;
  $("#watchTitle").textContent = v.title;
  const ch = v.channel;
  const logo = $("#watchChannelLogo");
  logo.style.background = LOGO_COLORS[ch] || "#3f3f3f";
  logo.textContent = logoChar(ch);
  $("#watchChannelName").innerHTML = `${esc(ch)} <span class="verified">✓</span>`;
  $("#watchChannelSubs").textContent = `${(load(LS.subs, []).includes(ch) ? ch + " • Subscribed • " : "")}${(v.subs || "100K")} subscribers`;
  updateSubscribeBtn(ch);
  $("#descViews").textContent = v.views ? `${v.views} views` : fmtViews(12000);
  $("#descDate").textContent = v.age || "";
  $("#descText").textContent = v.desc || "";
  $("#descriptionBox").classList.remove("expanded");

  const base = parseInt(v.views) || 12;
  const likes = (likesMap[v.id] === 1 ? base * 480 + 1 : base * 480);
  $("#likeCount").textContent = fmtViews(likes).replace(" views", "");
  $("#likeBtn").classList.toggle("liked", likesMap[v.id] === 1);
  $("#dislikeBtn").classList.toggle("disliked", likesMap[v.id] === -1);

  renderComments(v.id);
  renderRelated(v);

  // history
  history = history.filter(h => h !== v.id);
  history.unshift(v.id);
  save(LS.history, history);

  showPage("watch");
  if (!fromRelated) location.hash = `watch=${v.id}`;
}

function renderRelated(current) {
  const others = VIDEOS.filter(v => v.id !== current.id);
  relatedList.innerHTML = others.map(v => `
    <div class="related-item ${current.id === v.id ? "playing" : ""}" data-watch="${v.id}">
      <div class="related-thumb"><img src="${v.thumb}" alt="" loading="lazy"><span class="duration">${v.dur}</span></div>
      <div class="related-copy">
        <h4>${esc(v.title)}</h4>
        <p>${esc(v.channel)}</p>
        <p>${v.views} views · ${v.age}</p>
      </div>
    </div>`).join("");
}

function updateSubscribeBtn(channel) {
  const btn = $("#subscribeBtn");
  const on = subs.includes(channel);
  btn.classList.toggle("subscribed", on);
  btn.textContent = on ? "Subscribed ✓" : "Subscribe";
}

/* ---------- Comments ---------- */
function renderComments(videoId) {
  const list = commentsMap[videoId] || [];
  const seed = [
    { author: "Ahmed K.", color: "#e62117", text: "The quality of this upload is incredible. Watching on 4K and it looks stunning! 🔥", time: "2 days ago", likes: 132 },
    { author: "Sara Khan", color: "#5a3b88", text: "Came here from the recommendations and I'm not disappointed. Subscribed!", time: "1 week ago", likes: 48 },
    { author: "TechLearner PK", color: "#1a8f55", text: "This is exactly what I was looking for. Thank you for sharing 🙌", time: "3 weeks ago", likes: 12 },
  ];
  const all = [...list.map(c => ({ ...c, mine: true })), ...(list.length ? [] : seed)];
  $("#commentsCount").textContent = `${all.length} Comments`;
  $("#commentList").innerHTML = all.map(c => `
    <li class="comment-item">
      <span class="comment-avatar" style="background:${c.mine ? "linear-gradient(135deg,#7b2ff7,#f107a3)" : c.color}">${c.mine ? AVATAR : logoChar(c.author)}</span>
      <div class="comment-body">
        <b>${esc(c.author)}</b><small>${c.time}</small>
        <p>${esc(c.text)}</p>
        <div class="comment-actions">
          <button>👍 ${c.likes || 0}</button><button>👎</button><button>Reply</button>
          ${c.mine ? `<button class="comment-owner">Pin ♥</button>` : ""}
        </div>
      </div>
    </li>`).join("");
}

/* ---------- List pages ---------- */
const LIST_DEFS = {
  history:      { title: "History",           icon: "◷", items: () => history.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean), removable: true },
  liked:        { title: "Liked videos",      icon: "♥", items: () => liked.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean), removable: true },
  watchlater:   { title: "Watch later",       icon: "◻", items: () => later.map(id => VIDEOS.find(v => v.id === id)).filter(Boolean), removable: true },
  subscriptions:{ title: "Subscriptions",     icon: "▣", items: () => VIDEOS.filter(v => subs.includes(v.channel)), removable: false },
  you:          { title: "You",               icon: "☻", items: () => history.slice(0, 6).map(id => VIDEOS.find(v => v.id === id)).filter(Boolean), removable: false },
};

function renderListPage(key) {
  const def = LIST_DEFS[key];
  if (!def) return;
  const items = def.items();
  $("#listTitle").textContent = def.title;
  $("#listCount").textContent = `${items.length} video${items.length === 1 ? "" : "s"}`;
  const big = $("#listBigIcon");
  if (items[0] && key !== "you") big.innerHTML = `<img src="${items[0].thumb}" alt="">`;
  else big.textContent = def.icon;
  $("#listActions").style.display = items.length ? "" : "none";

  $("#listTable").innerHTML = items.length ? items.map((v, i) => `
    <div class="list-row" data-watch="${v.id}">
      <span class="row-index">${i + 1}</span>
      <div class="row-thumb"><img src="${v.thumb}" alt="" loading="lazy"><span class="duration">${v.dur}</span></div>
      <div class="row-title"><h4>${esc(v.title)}</h4><p>${v.views} views · ${v.age}</p></div>
      <div class="row-channel">${esc(v.channel)}</div>
      ${def.removable && key !== "history" ? `<button class="row-remove" data-remove="${v.id}" data-list="${key}" aria-label="Remove">✕</button>` :
        key === "history" ? `<button class="row-remove" data-remove="history:${v.id}" data-list="history" aria-label="Remove">✕</button>` : "<span></span>"}
    </div>`).join("")
    : `<div class="list-empty"><div class="empty-icon">${def.icon}</div><h3>${def.title} is empty</h3><p>Items you ${key === "history" ? "watch" : "save"} will show up here.</p></div>`;
}

/* ---------- Shorts ---------- */
function renderShorts() {
  $("#shortsGrid").innerHTML = SHORTS.map(s => `
    <div class="short-card" data-watch="${s.id}">
      <div class="short-thumb"><img src="${s.thumb}" alt="${esc(s.title)}" loading="lazy"><span class="short-play">▶</span></div>
      <h4>${esc(s.title)}</h4>
      <p>${s.likes} likes</p>
    </div>`).join("");
}

/* ---------- Sidebar subscriptions ---------- */
function renderSidebarSubs() {
  const channels = [...new Set(VIDEOS.map(v => v.channel))];
  $("#sideSubs").innerHTML = `<div class="side-title">Subscriptions</div>` + channels.map(ch => `
    <a class="side-link ${subs.includes(ch) ? "active" : ""}" href="#" data-channel="${esc(ch)}">
      <span class="side-icon channel-dot" style="color:${LOGO_COLORS[ch] || "#aaa"}">●</span><span>${esc(ch)}</span>
    </a>`).join("");
}

/* ============================================================
   EVENT WIRING
   ============================================================ */

/* Chips */
chipsEl.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeCategory = chip.dataset.category;
  chipsEl.querySelectorAll(".chip").forEach(c => c.classList.toggle("selected", c === chip));
  applyFilters();
});

/* Search */
$("#searchForm").addEventListener("submit", e => {
  e.preventDefault();
  searchQuery = $("#searchInput").value.trim().toLowerCase();
  if (currentPage !== "home") showPage("home");
  applyFilters();
  if (searchQuery) showToast(`Results for “${$("#searchInput").value.trim()}”`);
});
$("#searchInput").addEventListener("input", e => {
  searchQuery = e.target.value.trim().toLowerCase();
  if (currentPage === "home") applyFilters();
});

/* Card clicks + context menu */
let ctxVideoId = null;
grid.addEventListener("click", e => {
  const more = e.target.closest(".more-button");
  if (more) {
    e.stopPropagation();
    ctxVideoId = more.dataset.more;
    const menu = $("#contextMenu");
    menu.hidden = false;
    const r = more.getBoundingClientRect();
    menu.style.top = Math.min(r.bottom + 4, innerHeight - 320) + "px";
    menu.style.left = Math.min(r.left - 200, innerWidth - 260) + "px";
    return;
  }
  const card = e.target.closest(".video-card");
  if (card) openVideo(card.dataset.id);
});

$("#contextMenu").addEventListener("click", e => {
  const item = e.target.closest(".ctx-item");
  if (!item || !ctxVideoId) return;
  const v = VIDEOS.find(x => x.id === ctxVideoId);
  const act = item.dataset.ctx;
  if (act === "later") {
    later = later.includes(ctxVideoId) ? later.filter(i => i !== ctxVideoId) : [ctxVideoId, ...later];
    save(LS.later, later);
    showToast(later.includes(ctxVideoId) ? "Saved to Watch later" : "Removed from Watch later");
  } else if (act === "liked") {
    liked = liked.includes(ctxVideoId) ? liked.filter(i => i !== ctxVideoId) : [ctxVideoId, ...liked];
    save(LS.liked, liked);
    showToast(liked.includes(ctxVideoId) ? "Added to Liked videos" : "Removed from Liked videos");
  } else if (act === "share") { navigator.clipboard?.writeText(`${location.href.split("#")[0]}#watch=${ctxVideoId}`).then(() => showToast("Link copied to clipboard")); }
  else if (act === "hide") { hidden.push(ctxVideoId); save(LS.hidden, hidden); renderGrid(); showToast("Video hidden — reset by clearing site data"); }
  else if (act === "notint") { hidden.push(ctxVideoId); save(LS.hidden, hidden); renderGrid(); showToast("We'll show you fewer videos like this"); }
  else if (act === "queue") showToast("Added to queue");
  else if (act === "report") showToast("Report submitted (demo)");
  $("#contextMenu").hidden = true;
});
document.addEventListener("click", e => {
  if (!e.target.closest("#contextMenu") && !e.target.closest(".more-button")) $("#contextMenu").hidden = true;
  if (!e.target.closest(".dropdown") && !e.target.closest(".create-wrap") && !e.target.closest(".notif-wrap"))
    document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open"));
});

/* Related + shorts + list clicks */
document.addEventListener("click", e => {
  const rel = e.target.closest("[data-watch]");
  if (rel && !e.target.closest(".row-remove")) {
    openVideo(rel.dataset.watch, true);
    return;
  }
  const rem = e.target.closest("[data-remove]");
  if (rem) {
    const val = rem.dataset.remove;
    if (val.startsWith("history:")) history = history.filter(h => h !== val.slice(8));
    else if (rem.dataset.list === "liked") liked = liked.filter(i => i !== val);
    else if (rem.dataset.list === "watchlater") later = later.filter(i => i !== val);
    save(LS.history, history); save(LS.liked, liked); save(LS.later, later);
    showPage(currentPage);
    showToast("Removed");
  }
});

/* Sidebar nav */
$("#sidebar").addEventListener("click", e => {
  const link = e.target.closest(".side-link[data-page]");
  if (link) { e.preventDefault(); showPage(link.dataset.page); return; }
  const chan = e.target.closest("[data-channel]");
  if (chan) {
    e.preventDefault();
    const ch = chan.dataset.channel;
    if (!subs.includes(ch)) { subs.push(ch); save(LS.subs, subs); showToast(`Subscribed to ${ch}`); }
    else showToast(`You're subscribed to ${ch} — manage in Subscriptions`);
    renderSidebarSubs();
    if (currentVideo) updateSubscribeBtn(currentVideo.channel);
  }
});
$("#menuToggle").addEventListener("click", () => document.body.classList.toggle("side-open"));
$("#homeLink").addEventListener("click", e => { e.preventDefault(); activeCategory = "All"; searchQuery = ""; $("#searchInput").value = ""; renderChips(); applyFilters(); showPage("home"); location.hash = ""; });

/* Top-bar dropdowns */
$("#createBtn").addEventListener("click", e => { e.stopPropagation(); $("#createMenu").classList.toggle("open"); $("#notifMenu").classList.remove("open"); });
$("#notifBtn").addEventListener("click", e => { e.stopPropagation(); $("#notifMenu").classList.toggle("open"); $("#createMenu").classList.remove("open"); $("#notifBadge").style.display = "none"; });
$("#createMenu").addEventListener("click", e => {
  if (e.target.closest("[data-action]")) {
    const a = e.target.closest("[data-action]").dataset.action;
    showToast(a === "upload" ? "Upload flow — connect your backend here" : a === "live" ? "Go live — requires a streaming key" : "Create a post — coming soon");
    $("#createMenu").classList.remove("open");
  }
});
$("#avatarBtn").addEventListener("click", () => showToast(`Signed in as ${AVATAR} (demo account)`));
$(".mic").addEventListener("click", () => {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) return showToast("Voice search isn't supported in this browser");
  const rec = new SpeechRec();
  rec.onresult = (ev) => { $("#searchInput").value = ev.results[0][0].transcript; $("#searchForm").dispatchEvent(new Event("submit")); };
  rec.onerror = () => showToast("Voice search unavailable");
  rec.start();
  showToast("Listening…");
});

/* Watch page controls */
$("#likeBtn").addEventListener("click", () => {
  if (!currentVideo) return;
  likesMap[currentVideo.id] = likesMap[currentVideo.id] === 1 ? 0 : 1;
  if (likesMap[currentVideo.id] === 1 && !liked.includes(currentVideo.id)) liked.unshift(currentVideo.id);
  save(LS.likes, likesMap); save(LS.liked, liked);
  $("#likeBtn").classList.add("liked"); $("#dislikeBtn").classList.remove("disliked");
  $("#likeBtn").querySelector("svg").style.fill = "currentColor";
  showToast("Added to Liked videos");
});
$("#dislikeBtn").addEventListener("click", () => {
  if (!currentVideo) return;
  likesMap[currentVideo.id] = likesMap[currentVideo.id] === -1 ? 0 : -1;
  save(LS.likes, likesMap);
  $("#dislikeBtn").classList.toggle("disliked", likesMap[currentVideo.id] === -1);
  $("#likeBtn").classList.remove("liked");
  if (likesMap[currentVideo.id] === -1) showToast("Dislike recorded (counts hidden)");
});
$("#subscribeBtn").addEventListener("click", () => {
  if (!currentVideo) return;
  const ch = currentVideo.channel;
  if (subs.includes(ch)) { subs = subs.filter(s => s !== ch); showToast(`Unsubscribed from ${ch}`); }
  else { subs.push(ch); showToast(`Subscribed to ${ch} 🔔`); }
  save(LS.subs, subs);
  updateSubscribeBtn(ch);
  renderSidebarSubs();
});
$("#shareBtn").addEventListener("click", () => {
  if (!currentVideo) return;
  const url = `${location.href.split("#")[0]}#watch=${currentVideo.id}`;
  if (navigator.share) navigator.share({ title: currentVideo.title, url }).catch(() => {});
  else navigator.clipboard?.writeText(url).then(() => showToast("Share link copied"));
});
$("#downloadBtn").addEventListener("click", () => showToast("Downloads are available with Premium (demo)"));
$("#watchMoreBtn").addEventListener("click", () => showToast("Show transcript · Save · Report"));
$("#descriptionBox").addEventListener("click", () => $("#descriptionBox").classList.toggle("expanded"));
$("#autoplaySwitch").addEventListener("click", () => {
  autoplay = !autoplay;
  $("#autoplaySwitch").setAttribute("aria-checked", autoplay);
  showToast(autoplay ? "Autoplay is on" : "Autoplay is off");
});

/* Autoplay: save progress + play next */
player.addEventListener("timeupdate", () => {
  if (!currentVideo || !player.duration) return;
  const p = load(LS.progress, {});
  p[currentVideo.id] = (player.currentTime / player.duration) * 100;
  save(LS.progress, p);
});
player.addEventListener("ended", () => {
  if (!autoplay || !currentVideo) return;
  const others = VIDEOS.filter(v => v.id !== currentVideo.id && !hidden.includes(v.id));
  const next = others[0];
  if (next) { showToast(`Playing next: ${next.title}`); openVideo(next.id, true); }
});

/* Comments UI */
$("#commentAvatar").addEventListener("click", () => { $("#commentInput").focus(); });
$("#commentInput").addEventListener("focus", () => { $("#commentButtons").hidden = false; });
$("#commentCancel").addEventListener("click", () => { $("#commentInput").value = ""; $("#commentButtons").hidden = true; $("#commentInput").blur(); });
$("#commentPublish").addEventListener("click", () => {
  const text = $("#commentInput").value.trim();
  if (!text || !currentVideo) return;
  (commentsMap[currentVideo.id] ||= []).unshift({ author: "You " + AVATAR, text, time: "just now", likes: 0, mine: true });
  save(LS.comments, commentsMap);
  $("#commentInput").value = "";
  $("#commentButtons").hidden = true;
  renderComments(currentVideo.id);
  showToast("Comment posted");
});
$("#commentInput").addEventListener("keydown", e => { if (e.key === "Enter") $("#commentPublish").click(); });

/* Chips scroll arrows */
$("#chipNext").addEventListener("click", () => chipsEl.scrollBy({ left: 300, behavior: "smooth" }));
$("#chipPrev").addEventListener("click", () => chipsEl.scrollBy({ left: -300, behavior: "smooth" }));
chipsEl.addEventListener("scroll", () => {
  $("#chipPrev").classList.toggle("visible", chipsEl.scrollLeft > 8);
  $("#chipNext").classList.toggle("visible", chipsEl.scrollLeft + chipsEl.clientWidth < chipsEl.scrollWidth - 8);
});

/* Play all / shuffle on list pages */
$("#playAllBtn").addEventListener("click", () => {
  const first = $("#listTable").querySelector(".list-row");
  if (first) openVideo(first.dataset.watch, true);
});
$("#shuffleBtn").addEventListener("click", () => {
  const rows = [...$("#listTable").querySelectorAll(".list-row")];
  if (rows.length) {
    const shuffled = rows.sort(() => Math.random() - .5).map(r => r.dataset.watch);
    save("yt_shuffle_queue", shuffled);
    openVideo(shuffled[0], true);
    showToast("Shuffling playlist");
  }
});

/* Keyboard shortcuts */
document.addEventListener("keydown", e => {
  if (e.target.matches("input, textarea")) return;
  if (e.key === "k" || e.key === " ") { if (currentPage === "watch") { e.preventDefault(); player.paused ? player.play() : player.pause(); } }
  if (e.key === "f") { if (currentPage === "watch") player.requestFullscreen?.(); }
  if (e.key === "Escape") { $("#contextMenu").hidden = true; document.querySelectorAll(".dropdown.open").forEach(d => d.classList.remove("open")); }
  if (e.key === "/") { e.preventDefault(); $("#searchInput").focus(); }
});

/* ---------- Init ---------- */
renderChips();
renderGrid();
renderShorts();
renderSidebarSubs();
document.body.classList.toggle("side-open", innerWidth >= 1500);
document.body.classList.add("side-mini-not-hover");

// deep link: #watch=id
const hash = location.hash.match(/watch=([\w]+)/);
if (hash && (VIDEOS.some(v => v.id === hash[1]) || SHORTS.some(s => s.id === hash[1]))) openVideo(hash[1]);
else showPage("home");
