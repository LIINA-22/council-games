// Council.exe — منطق الألعاب الثلاث. البيانات (الشفرات والمشاكل والألغاز) في أول الملف.
// ===== البيانات =====
const CARDS = [
  { cipher: "PHGLD", method: "Caesar", hint: "كل حرف ارجعه ٣ حروف ورا (D ← A)", key: "caesar", answer: "MEDIA",
    role: "المسؤولة الإعلامية", who: "ردينا القحطاني",
    desc: "تدير حسابات المجلس وتنشر أخباره وفعالياته أول بأول. تابعنا على X: @CcsitCouncil" },
  { cipher: "01000101 01010110 01000101 01001110 01010100 01010011", long: true, method: "Binary → ASCII", hint: "كل ٨ أرقام = حرف واحد", key: "binary", answer: "EVENTS",
    role: "منسق الأنشطة الطلابية", who: "راشد الخالدي",
    desc: "يخطط وينظم الفعاليات والورش والمسابقات اللي يسويها المجلس للطلاب." },
  { cipher: "...- / --- / .. / -.-. / .", method: "Morse", hint: "الشرطة المائلة / تفصل بين الحروف", key: "morse", answer: "VOICE",
    role: "مبادرة «صوتك مسموع!»", who: "من المجلس الطلابي لكل طالب",
    desc: "أي اقتراح أو مشكلة أو فكرة عندك، ترسلها للمجلس في دقيقتين، ونتابعها مع الجهة المختصة." },
  { cipher: "OVZWVI", method: "Atbash", hint: "اقلب الأبجدية: A↔Z و B↔Y ...", key: "atbash", answer: "LEADER",
    role: "رئيس المجلس الطلابي", who: "عزام الزهراني",
    desc: "يمثل طلاب الكلية أمام العمادة، ويقود فريق المجلس ويوصل صوت الطلاب." },
  { cipher: "22 - 9 - 3 - 5", method: "A1Z26", hint: "كل رقم = ترتيب الحرف في الأبجدية (A=1)", key: "a1z26", answer: "VICE",
    role: "نائبة رئيس المجلس", who: "لينا المحرج",
    desc: "تساند الرئيس، وتتابع شغل أعضاء المجلس ومبادراته." },
  { cipher: "14 - 15 - 20 - 5 - 19", method: "A1Z26", hint: "كل رقم = ترتيب الحرف في الأبجدية (A=1)", key: "a1z26", answer: "NOTES",
    role: "أمين المجلس الطلابي", who: "ناصر الزعبي",
    desc: "يوثّق اجتماعات المجلس وقراراته، ويرتب ملفاته ومتابعاته." },
];

const BUGS = [
  { id: "parking", ico: "🚗", code: "Error 404", txt: "موقف سيارات not found" },
  { id: "schedule", ico: "📅", code: "Warning: Conflict", warn: true, txt: "تعارض في الجدول بين محاضرتين" },
  { id: "email", ico: "📧", code: "Timeout", warn: true, txt: "الرد على الإيميلات ياخذ وقت طويل" },
  { id: "printer", ico: "🖨️", code: "Error 503", txt: "الطابعة out of service" },
  { id: "power", ico: "🔌", code: "Low Battery", warn: true, txt: "ما فيه أفياش كافية في القاعات" },
  { id: "who", ico: "❓", code: "NullPointerException", txt: "ما أعرف لمين أرجع في مشكلتي" },
  { id: "labs", ico: "🔒", code: "403 Access Denied", txt: "المعامل مقفلة وقت الفراغ" },
  { id: "wifi", ico: "📶", code: "Lag Detected", warn: true, txt: "الواي فاي بطيء" },
];

// كل مجموعة ألغاز تعطي رقم سري من ٣ خانات (تم التحقق من الأجوبة)
const PUZZLES = [
  { code: "274", clues: [
    { c: "x = 2\nx = x * 3 + 1\nprint(x % 5)" },
    { c: "int('0111', 2)" },
    { q: "كم تخصص في كلية علوم الحاسب وتقنية المعلومات؟" } ] },
  { code: "738", clues: [
    { c: 'print(len("Council"))' },
    { c: "int('0011', 2)" },
    { c: "print(2 ** 3)" } ] },
  { code: "329", clues: [
    { c: "print(10 // 3)" },
    { c: "print(17 % 5)" },
    { c: "int('1001', 2)" } ] },
  { code: "653", clues: [
    { c: "print(len([1, 2, 3, 4, 5, 6]))" },
    { c: "int('0101', 2)" },
    { c: "a = 3\nb = a\na = 1\nprint(b)" } ] },
  { code: "182", clues: [
    { c: "print(9 - 2 * 4)" },
    { c: "int('1000', 2)" },
    { c: 'print("CCSIT".count("C"))' } ] },
  { code: "395", clues: [
    { c: "for i in range(4):\n    pass\nprint(i)" },
    { c: "print(0x9)" },
    { c: 'print(int("4") + 1)' } ] },
];

// ===== التخزين على هذا الجهاز =====
const KEY = "council-games-v1";
const blank = () => ({ decoded: 0, decodeTries: 0, bugReports: 0, votes: {}, hackStarts: 0, hackWins: 0, fame: [] });
let db;
try { db = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (_) { db = blank(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (_) {} };

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// ===== التنقل بين الشاشات =====
const SCREENS = ["home", "decode", "bug", "hack", "fame", "staff"];
let current = "home";
function go(name) {
  stopTimer();
  SCREENS.forEach((s) => ($("s-" + s).hidden = s !== name));
  $("home-btn").hidden = name === "home";
  current = name;
  ({ home: initHome, decode: initDecode, bug: initBug, hack: initHack, fame: renderFame, staff: renderStaff })[name]();
  window.scrollTo(0, 0);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-go]");
  if (b) go(b.dataset.go);
});

// يرجع للرئيسية تلقائيًا إذا ما لمس أحد الجهاز دقيقة ونص
let idle;
const resetIdle = () => { clearTimeout(idle); idle = setTimeout(() => { if (current !== "home" && current !== "staff" && !hackRunning) go("home"); }, 90000); };
["click", "keydown", "mousemove", "touchstart"].forEach((ev) => document.addEventListener(ev, resetIdle, { passive: true }));

$("fs-btn").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
});

// ===== الرئيسية =====
const BOOT = ["> booting Council.exe ...", "> loading modules: decode · bug · hack", "> status: <span>ONLINE ✓</span>"];
let bootTimer;
function initHome() {
  clearTimeout(bootTimer);
  const el = $("boot");
  el.innerHTML = "";
  let i = 0;
  const next = () => { if (i < BOOT.length) { el.innerHTML += (i ? "<br>" : "") + BOOT[i++]; bootTimer = setTimeout(next, 450); } };
  next();
  const best = [...db.fame].sort((a, b) => a.secs - b.secs)[0];
  $("home-foot").innerHTML =
    `<span>🔐 شفرات انفكّت: <b>${db.decoded}</b></span>` +
    `<span>🐞 تقارير Bugs: <b>${db.bugReports}</b></span>` +
    `<span>💻 صناديق انفتحت: <b>${db.hackWins}</b></span>` +
    (best ? `<span>⚡ أسرع اختراق: <b>${best.secs}s</b> (${esc(best.name)})</span>` : "");
}

// ===== Decode the Council =====
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const MORSE = { A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--.." };
const KEYS = {
  caesar: () => `<p style="color:var(--muted);margin-bottom:8px">الصف الأول المشفّر ← الصف الثاني الأصلي</p>
    <div class="keytable cols-13">${ABC.slice(0, 13).map((c, i) => `<div class="top-row">${ABC[(i + 3) % 26]}</div>`).join("")}${ABC.slice(0, 13).map((c) => `<div class="k">${c}</div>`).join("")}</div>
    <div class="keytable cols-13" style="margin-top:6px">${ABC.slice(13).map((c, i) => `<div class="top-row">${ABC[(i + 16) % 26]}</div>`).join("")}${ABC.slice(13).map((c) => `<div class="k">${c}</div>`).join("")}</div>`,
  binary: () => `<div class="keytable cols-2">${ABC.map((c) => `<div><span class="k">${c}</span> = ${c.charCodeAt(0).toString(2).padStart(8, "0")}</div>`).join("")}</div>`,
  morse: () => `<div class="keytable cols-3">${ABC.map((c) => `<div><span class="k">${c}</span> ${MORSE[c]}</div>`).join("")}</div>`,
  atbash: () => `<div class="keytable cols-13">${ABC.slice(0, 13).map((c) => `<div class="k">${c}</div>`).join("")}${ABC.slice(0, 13).map((c) => `<div class="top-row">${ABC[25 - ABC.indexOf(c)]}</div>`).join("")}</div>
    <p style="color:var(--muted);margin-top:8px">كل حرف فوق يقابله الحرف اللي تحته، والعكس.</p>`,
  a1z26: () => `<div class="keytable cols-13">${ABC.map((c, i) => `<div><span class="k">${c}</span><br>${i + 1}</div>`).join("")}</div>`,
};
let deck = [], card;
function nextCard() {
  if (!deck.length) deck = shuffle(CARDS);
  card = deck.pop();
  $("dec-cipher").textContent = card.cipher;
  $("dec-cipher").classList.toggle("long", !!card.long);
  $("dec-method").textContent = card.method;
  $("dec-hint").textContent = card.hint;
  $("dec-key").innerHTML = KEYS[card.key]();
  $("dec-input").value = "";
  $("dec-feedback").textContent = "";
  $("dec-play").hidden = false;
  $("dec-reveal").hidden = true;
  setTimeout(() => $("dec-input").focus(), 50);
}
function initDecode() { nextCard(); }
$("dec-skip").addEventListener("click", nextCard);
$("dec-again").addEventListener("click", nextCard);
$("dec-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = $("dec-input").value.trim().toUpperCase().replace(/\s+/g, "");
  if (!v) return;
  db.decodeTries++;
  if (v === card.answer) {
    db.decoded++; save();
    $("rev-word").textContent = card.answer;
    $("rev-role").textContent = card.role;
    $("rev-desc").textContent = card.desc;
    $("rev-who").textContent = card.who;
    $("dec-play").hidden = true;
    $("dec-reveal").hidden = false;
    confetti();
  } else {
    save();
    const fb = $("dec-feedback");
    fb.className = "feedback bad";
    fb.textContent = "✕ مو صح، جرّب مرة ثانية";
    const box = $("dec-form");
    box.classList.remove("shake"); void box.offsetWidth; box.classList.add("shake");
  }
});

// ===== Bug in the System =====
let picked = new Set();
function initBug() {
  picked = new Set();
  $("bug-play").hidden = false;
  $("bug-report").hidden = true;
  $("bugs").innerHTML = BUGS.map((b) => `
    <button class="bug" data-id="${b.id}" aria-pressed="false">
      <span class="ico">${b.ico}</span>
      <span class="code${b.warn ? " warn" : ""}">${esc(b.code)}</span>
      <span class="txt">${esc(b.txt)}</span>
      <span class="tick">✓</span>
    </button>`).join("");
  updatePicked();
}
function updatePicked() {
  $("bug-count").textContent = picked.size;
  $("bug-submit").disabled = picked.size === 0;
}
$("bugs").addEventListener("click", (e) => {
  const b = e.target.closest(".bug");
  if (!b) return;
  const id = b.dataset.id;
  if (picked.has(id)) picked.delete(id);
  else if (picked.size < 3) picked.add(id);
  else { const c = $("bug-count").parentElement; c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); return; }
  b.setAttribute("aria-pressed", picked.has(id));
  updatePicked();
});
function topBugsHtml(limit) {
  const rows = BUGS.map((b) => ({ ...b, n: db.votes[b.id] || 0 })).sort((a, b) => b.n - a.n).slice(0, limit);
  const max = Math.max(1, ...rows.map((r) => r.n));
  return rows.map((r) => `<li><span>${r.ico} ${esc(r.txt)}</span><span class="bar"><i style="width:${(r.n / max) * 100}%"></i></span><span class="n">${r.n}</span></li>`).join("");
}
$("bug-submit").addEventListener("click", () => {
  picked.forEach((id) => (db.votes[id] = (db.votes[id] || 0) + 1));
  db.bugReports++; save();
  $("top-bugs").innerHTML = topBugsHtml(3);
  $("bug-play").hidden = true;
  $("bug-report").hidden = false;
});

// ===== Hack the Box =====
const TIME = 120;
let puzzle, digits, focusIdx, lives, timeLeft, timer, startedAt, hackRunning = false, lastWin = null, lastPuzzle = null;
function initHack() {
  hackRunning = false;
  ["hack-play", "hack-win", "hack-lose"].forEach((id) => ($(id).hidden = true));
  $("hack-intro").hidden = false;
}
function startHack() {
  const pool = PUZZLES.filter((p) => p !== lastPuzzle);
  puzzle = lastPuzzle = pool[Math.floor(Math.random() * pool.length)];
  digits = [0, 0, 0]; focusIdx = 0; lives = 3; timeLeft = TIME;
  db.hackStarts++; save();
  $("clues").innerHTML = puzzle.clues.map((c, i) => `
    <div class="clue"><span class="n">${i + 1}</span>${c.c ? `<pre>${esc(c.c)}</pre>` : `<span class="q">${esc(c.q)}</span>`}</div>`).join("") +
    `<p style="color:var(--muted)">جواب اللغز ١ = الخانة الأولى، وهكذا.</p>`;
  $("wheels").innerHTML = [0, 1, 2].map((i) => `
    <div class="wheel"><button data-w="${i}" data-d="1" aria-label="زِد">▲</button><div class="digit" id="dg${i}">0</div><button data-w="${i}" data-d="-1" aria-label="نقّص">▼</button></div>`).join("");
  $("hack-msg").textContent = "";
  $("hack-msg").className = "lock-msg";
  drawLock();
  $("hack-intro").hidden = true;
  $("hack-play").hidden = false;
  hackRunning = true;
  startedAt = Date.now();
  tick();
  timer = setInterval(tick, 250);
}
function drawLock() {
  digits.forEach((d, i) => { $("dg" + i).textContent = d; $("dg" + i).classList.toggle("focus", i === focusIdx); });
  $("hack-lives").textContent = "♥".repeat(lives) + "♡".repeat(3 - lives);
}
function tick() {
  timeLeft = Math.max(0, TIME - Math.floor((Date.now() - startedAt) / 1000));
  const t = $("hack-time");
  t.textContent = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;
  t.classList.toggle("low", timeLeft <= 15);
  if (timeLeft === 0) lose("خلص الوقت ⏱️");
}
function stopTimer() { clearInterval(timer); hackRunning = false; }
function tryCode() {
  if (!hackRunning) return;
  if (digits.join("") === puzzle.code) {
    stopTimer();
    const secs = Math.round((Date.now() - startedAt) / 1000);
    db.hackWins++; save();
    lastWin = { secs, at: new Date().toISOString() };
    $("win-time").textContent = secs;
    $("fame-name").value = "";
    $("hack-play").hidden = true;
    $("hack-win").hidden = false;
    setTimeout(() => $("fame-name").focus(), 50);
    confetti(true);
    return;
  }
  lives--;
  drawLock();
  if (lives === 0) return lose("خلصت المحاولات 💔");
  const m = $("hack-msg");
  m.className = "lock-msg bad";
  m.textContent = `WRONG CODE ✕  (${lives} left)`;
  const w = $("wheels"); w.classList.remove("shake"); void w.offsetWidth; w.classList.add("shake");
}
function lose(msg) {
  stopTimer();
  $("lose-msg").textContent = `${msg} الرقم الصحيح كان ${puzzle.code}`;
  $("hack-play").hidden = true;
  $("hack-lose").hidden = false;
}
$("hack-start").addEventListener("click", startHack);
$("hack-retry").addEventListener("click", startHack);
$("hack-try").addEventListener("click", tryCode);
$("wheels").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-w]");
  if (!b) return;
  const i = +b.dataset.w;
  focusIdx = i;
  digits[i] = (digits[i] + +b.dataset.d + 10) % 10;
  drawLock();
});
document.addEventListener("keydown", (e) => {
  if (current !== "hack" || !hackRunning) return;
  if (/^[0-9]$/.test(e.key)) { digits[focusIdx] = +e.key; focusIdx = Math.min(2, focusIdx + 1); drawLock(); }
  else if (e.key === "Backspace") { focusIdx = Math.max(0, focusIdx - 1); digits[focusIdx] = 0; drawLock(); }
  else if (e.key === "ArrowLeft") { focusIdx = Math.max(0, focusIdx - 1); drawLock(); }
  else if (e.key === "ArrowRight") { focusIdx = Math.min(2, focusIdx + 1); drawLock(); }
  else if (e.key === "ArrowUp") { digits[focusIdx] = (digits[focusIdx] + 1) % 10; drawLock(); }
  else if (e.key === "ArrowDown") { digits[focusIdx] = (digits[focusIdx] + 9) % 10; drawLock(); }
  else if (e.key === "Enter") tryCode();
  else return;
  e.preventDefault();
});
let lastFameIdx = -1;
$("fame-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!lastWin) return;
  const name = $("fame-name").value.trim().slice(0, 20) || "Anonymous";
  db.fame.push({ name, ...lastWin });
  lastFameIdx = db.fame.length - 1;
  lastWin = null; save();
  go("fame");
});

// ===== لوحة الأبطال =====
function renderFame() {
  const list = db.fame.map((f, i) => ({ ...f, i })).sort((a, b) => a.secs - b.secs).slice(0, 10);
  $("fame-list").innerHTML = list.length
    ? list.map((f) => `<li class="${f.i === lastFameIdx ? "me" : ""}"><span>${esc(f.name)}</span><span class="tm">${f.secs}s</span></li>`).join("")
    : '<li style="display:block" class="empty">ما أحد فتح الصندوق للحين. كن الأول! ⚡</li>';
}

// ===== لوحة الفريق =====
let taps = 0, tapT;
$("brand").addEventListener("click", () => {
  taps++; clearTimeout(tapT); tapT = setTimeout(() => (taps = 0), 1500);
  if (taps >= 5) { taps = 0; go("staff"); }
});
document.addEventListener("keydown", (e) => { if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "s") { e.preventDefault(); go("staff"); } });
function renderStaff() {
  const rate = db.hackStarts ? Math.round((db.hackWins / db.hackStarts) * 100) : 0;
  $("stats").innerHTML = [
    [db.decoded, "شفرات انفكّت"], [db.bugReports, "تقارير Bugs"], [db.hackWins, "صناديق انفتحت"], [rate + "%", `نسبة نجاح Hack (${db.hackStarts} محاولة)`],
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");
  $("staff-bugs").innerHTML = topBugsHtml(BUGS.length);
}
$("export").addEventListener("click", () => {
  const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [["القسم", "البند", "القيمة"],
    ["عام", "شفرات انفكّت", db.decoded], ["عام", "محاولات فك", db.decodeTries], ["عام", "تقارير Bugs", db.bugReports],
    ["عام", "محاولات Hack", db.hackStarts], ["عام", "صناديق انفتحت", db.hackWins],
    ...BUGS.map((b) => ["تصويت Bugs", b.txt, db.votes[b.id] || 0]),
    ...[...db.fame].sort((a, b) => a.secs - b.secs).map((f) => ["Hall of Fame", f.name, f.secs + "s"])];
  const csv = "﻿" + rows.map((r) => r.map(q).join(",")).join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  a.download = `council-games-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
});
$("reset").addEventListener("click", () => {
  if (!confirm("متأكد؟ بينمسح كل التصويت ولوحة الأبطال والإحصائيات على هذا الجهاز.")) return;
  db = blank(); save(); renderStaff();
});

// ===== احتفال =====
function confetti(big) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cv = $("confetti"), ctx = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;
  const colors = ["#5fb3e4", "#22c55e", "#f5b942", "#e6edf6", "#f472b6"];
  const parts = Array.from({ length: big ? 180 : 90 }, () => ({
    x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight / 3,
    vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 4, s: 5 + Math.random() * 6,
    c: colors[Math.floor(Math.random() * colors.length)], r: Math.random() * 6,
  }));
  let f = 0;
  (function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += .35; p.r += .1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
    if (++f < 140) requestAnimationFrame(draw); else ctx.clearRect(0, 0, cv.width, cv.height);
  })();
}

go("home");
resetIdle();
