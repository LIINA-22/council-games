// Council.exe — منطق الألعاب الثلاث. البيانات (الشفرات والمشاكل والألغاز) في أول الملف.
// ===== البيانات =====
// الشفرات سهلة عمدًا: طريقتين بس (كلمة معكوسة، أرقام الحروف)، ومعها مفتاح يحلها
const CARDS = [
  { cipher: "AIDEM", method: "كلمة معكوسة", hint: "اقرأ الحروف من الآخر للأول", key: "reverse", answer: "MEDIA",
    role: "المسؤولة الإعلامية", who: "ردينا القحطاني",
    desc: "تدير حسابات المجلس وتنشر أخباره وفعالياته أول بأول. تابعنا على X: @CcsitCouncil" },
  { cipher: "STNEVE", method: "كلمة معكوسة", hint: "اقرأ الحروف من الآخر للأول", key: "reverse", answer: "EVENTS",
    role: "منسق الأنشطة الطلابية", who: "راشد الخالدي",
    desc: "يخطط وينظم الفعاليات والورش والمسابقات اللي يسويها المجلس للطلاب." },
  { cipher: "22 - 15 - 9 - 3 - 5", method: "أرقام الحروف", hint: "كل رقم = ترتيب الحرف في الأبجدية (A=1)", key: "a1z26", answer: "VOICE",
    role: "مبادرة «صوتك مسموع!»", who: "من المجلس الطلابي لكل طالب",
    desc: "أي اقتراح أو مشكلة أو فكرة عندك، ترسلها للمجلس في دقيقتين، ونتابعها مع الجهة المختصة." },
  { cipher: "REDAEL", method: "كلمة معكوسة", hint: "اقرأ الحروف من الآخر للأول", key: "reverse", answer: "LEADER",
    role: "رئيس المجلس الطلابي", who: "عزام الزهراني",
    desc: "يمثل طلاب الكلية أمام العمادة، ويقود فريق المجلس ويوصل صوت الطلاب." },
  { cipher: "22 - 9 - 3 - 5", method: "أرقام الحروف", hint: "كل رقم = ترتيب الحرف في الأبجدية (A=1)", key: "a1z26", answer: "VICE",
    role: "نائبة رئيس المجلس", who: "لينا المحرج",
    desc: "تساند الرئيس، وتتابع شغل أعضاء المجلس ومبادراته." },
  { cipher: "14 - 15 - 20 - 5 - 19", method: "أرقام الحروف", hint: "كل رقم = ترتيب الحرف في الأبجدية (A=1)", key: "a1z26", answer: "NOTES",
    role: "أمين المجلس الطلابي", who: "ناصر الزعبي",
    desc: "يوثّق اجتماعات المجلس وقراراته، ويرتب ملفاته ومتابعاته." },
];

const BUGS = [
  { id: "study", ico: "📚", code: "Error 404", txt: "ما ألقى مكان أذاكر فيه بالكلية" },
  { id: "labs-pc", ico: "💻", code: "Error 503", txt: "أجهزة المعامل بطيئة أو خربانة" },
  { id: "power", ico: "🔌", code: "Low Battery", warn: true, txt: "ما فيه أفياش كافية في القاعات" },
  { id: "who", ico: "❓", code: "NullPointerException", txt: "ما أعرف لمين أرجع في مشكلتي" },
  { id: "wifi", ico: "📶", code: "Lag Detected", warn: true, txt: "الواي فاي بطيء" },
  { id: "labs", ico: "🔒", code: "403 Access Denied", txt: "المعامل مقفلة وقت الفراغ" },
  { id: "workshops", ico: "🧩", code: "Missing Dependency", warn: true, txt: "ما فيه ورش أو دورات تساعدني في المواد الصعبة" },
  { id: "events", ico: "📢", code: "Connection Lost", warn: true, txt: "ما أعرف عن فعاليات الكلية إلا متأخر" },
  { id: "stress", ico: "🧠", code: "Out of Memory", txt: "ضغط دراسي ومحتاج دعم نفسي أو إرشاد" },
];

// ألغاز سهلة جدًا: حساب بسيط، وعد حروف، وأسئلة عامة. كل مجموعة تعطي رقم سري من ٣ خانات
const PUZZLES = [
  { code: "527", clues: [
    { c: "print(2 + 3)" },
    { q: "كم حرف في كلمة AI ؟" },
    { q: "3 + 4 = ؟" } ] },
  { code: "846", clues: [
    { c: "print(4 * 2)" },
    { q: "كم تخصص في كلية علوم الحاسب وتقنية المعلومات؟" },
    { q: "10 − 4 = ؟" } ] },
  { code: "359", clues: [
    { c: "print(1 + 2)" },
    { q: "كم حرف في كلمة HELLO ؟" },
    { c: "print(10 - 1)" } ] },
  { code: "618", clues: [
    { c: "print(3 + 3)" },
    { c: "print(5 - 4)" },
    { q: "كم حرف في كلمة COMPUTER ؟" } ] },
  { code: "274", clues: [
    { c: "print(1 + 1)" },
    { q: "كم يوم في الأسبوع؟" },
    { q: "كم تخصص في كلية علوم الحاسب وتقنية المعلومات؟" } ] },
  { code: "963", clues: [
    { c: "print(3 * 3)" },
    { q: "كم حرف في كلمة SAWTAK ؟" },
    { q: "كم حرف في كلمة BUG ؟" } ] },
];

// ===== التخزين على هذا الجهاز =====
// غيّر الرقم في آخر الاسم إذا تبي كل الأجهزة تبدأ من الصفر (تنمسح التجارب القديمة)
const KEY = "council-games-v2";
try { ["council-games-v1", "council-booth-v1"].forEach((k) => localStorage.removeItem(k)); } catch (_) {}
const blank = () => ({ decoded: 0, decodeTries: 0, bugReports: 0, votes: {}, hackStarts: 0, hackWins: 0, fame: [], typeScores: [] });
let db;
try { db = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (_) { db = blank(); }
if (Array.isArray(db.typeScores)) db.typeScores = db.typeScores.filter((t) => t.words > 0);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (_) {} };

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// ===== التنقل بين الشاشات =====
const SCREENS = ["home", "decode", "bug", "hack", "type", "fame", "staff"];
let current = "home";
function go(name) {
  stopTimer();
  SCREENS.forEach((s) => ($("s-" + s).hidden = s !== name));
  $("home-btn").hidden = name === "home";
  current = name;
  ({ home: initHome, decode: initDecode, bug: initBug, hack: initHack, type: initType, fame: renderFame, staff: renderStaff })[name]();
  window.scrollTo(0, 0);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-go]");
  if (b) go(b.dataset.go);
});

// يرجع للرئيسية تلقائيًا إذا ما لمس أحد الجهاز دقيقة ونص
let idle;
const resetIdle = () => { clearTimeout(idle); idle = setTimeout(() => { if (current !== "home" && current !== "staff" && !hackRunning && !typeRunning) go("home"); }, 90000); };
["click", "keydown", "mousemove", "touchstart"].forEach((ev) => document.addEventListener(ev, resetIdle, { passive: true }));

$("fs-btn").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.();
});

// ===== الرئيسية =====
const BOOT = ["> booting Council.exe ...", "> loading modules: decode · bug · hack · type", "> status: <span>ONLINE ✓</span>"];
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
  reverse: () => `<p style="margin-bottom:10px">ما تحتاج جدول! بس اقرأ الكلمة من آخر حرف لأول حرف.</p>
    <div class="keytable cols-2" style="font-size:1.2rem;max-width:280px"><div><span class="k">TAC</span></div><div>← CAT</div><div><span class="k">GOD</span></div><div>← DOG</div></div>`,
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
function stopTimer() { clearInterval(timer); hackRunning = false; clearInterval(typeTimer); typeRunning = false; }
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

// ===== Speed Type =====
// جمل قصيرة عن شغل المجلس، والطالب يكتبها خلال ٢٥ ثانية
const SENTENCES = [
  "اعتماد خطة الفعاليات التطوعية للشهر القادم بنجاح",
  "رفع محضر الاجتماع الدوري لأعضاء المجلس الطلابي",
  "مراجعة تقارير الساعات التطوعية لجميع طلاب الكلية",
  "تدقيق سجلات الحضور لاجتماعات المجلس الرسمية",
  "إصدار التقرير الختامي لأنشطة الفصل الدراسي",
  "توثيق التوصيات الصادرة عن اجتماع المجلس",
  "رفع إحصاءات المشاركة المجتمعية لعمادة شؤون الطلاب",
  "متابعة تنفيذ قرارات المجلس الطلابي بخصوص المبادرات",
  "اعتماد جدول أعمال الاجتماع القادم للمجلس",
  "أرشفة التقارير الإدارية الخاصة بلجان الكلية",
];
const TYPE_TIME = 25;
let typeRunning = false, typeTimer, typeStart, typeName, typeWords, typeCorrect, typeTotal, typeSentence, typeLastIdx = -1;
const sortTypeScores = () => [...db.typeScores].sort((a, b) => b.words - a.words || b.acc - a.acc);
function renderTypeBoard(highlight) {
  const list = sortTypeScores().slice(0, 10);
  $("type-board").innerHTML = list.length
    ? list.map((s) => `<li class="${s === highlight ? "me" : ""}"><span>${esc(s.name)}</span><span class="tm">${s.words}</span><span class="acc">${s.acc}%</span></li>`).join("")
    : '<li style="display:block" class="empty">كن أول واحد في اللوحة ⚡</li>';
}
function initType() {
  typeRunning = false;
  $("type-setup").hidden = false; $("type-play").hidden = true; $("type-result").hidden = true;
  $("type-name").value = "";
  renderTypeBoard();
  setTimeout(() => $("type-name").focus(), 50);
}
function nextSentence() {
  let i; do { i = Math.floor(Math.random() * SENTENCES.length); } while (i === typeLastIdx && SENTENCES.length > 1);
  typeLastIdx = i; typeSentence = SENTENCES[i];
  $("type-text").innerHTML = [...typeSentence].map((c) => `<span>${esc(c)}</span>`).join("");
  $("type-input").value = "";
}
// يحسب الكلمات الصحيحة في الجملة: الكلمة تنحسب إذا كل حروفها انكتبت صح
function scoreSentence(typed) {
  const words = typeSentence.split(" "), got = typed.trim().split(/\s+/);
  return words.filter((w, i) => got[i] === w).length;
}
$("type-form").addEventListener("submit", (e) => {
  e.preventDefault();
  typeName = $("type-name").value.trim().slice(0, 20) || "Anonymous";
  typeWords = 0; typeCorrect = 0; typeTotal = 0; typeStart = null;
  $("type-time").classList.remove("low");
  $("type-score").textContent = "0 words";
  $("type-setup").hidden = true; $("type-play").hidden = false;
  nextSentence();
  $("type-input").disabled = true;
  typeRunning = true;
  // عد تنازلي ٣-٢-١، وبعدها يبدأ الوقت تلقائيًا
  let n = 3;
  $("type-time").textContent = "جاهز؟ " + n;
  clearInterval(typeTimer);
  typeTimer = setInterval(() => {
    n--;
    if (n > 0) { $("type-time").textContent = "جاهز؟ " + n; return; }
    clearInterval(typeTimer);
    startTypeClock();
  }, 1000);
});
function startTypeClock() {
  typeStart = Date.now();
  $("type-time").textContent = TYPE_TIME + "s";
  $("type-input").disabled = false;
  $("type-input").focus();
  typeTimer = setInterval(() => {
    const left = Math.max(0, TYPE_TIME - Math.floor((Date.now() - typeStart) / 1000));
    $("type-time").textContent = left + "s";
    $("type-time").classList.toggle("low", left <= 5);
    if (left === 0) endType();
  }, 200);
}
$("type-input").addEventListener("input", () => {
  if (!typeStart) return;
  const v = $("type-input").value;
  const spans = $("type-text").children;
  [...spans].forEach((sp, i) => {
    sp.className = i >= v.length ? "" : v[i] === typeSentence[i] ? "ok" : "bad";
  });
  if (v.length >= typeSentence.length) finishSentence(v);
});
function finishSentence(v) {
  typeWords += scoreSentence(v);
  typeTotal += v.length;
  typeCorrect += [...v].filter((c, i) => c === typeSentence[i]).length;
  $("type-score").textContent = typeWords + " words";
  nextSentence();
}
function endType() {
  if (!typeRunning) return;
  clearInterval(typeTimer); typeRunning = false;
  const v = $("type-input").value;
  if (v.length) { // الجملة اللي ما خلصت: نحسب كلماتها الكاملة الصحيحة بس
    const done = v.endsWith(" ") ? v : v.slice(0, v.lastIndexOf(" ") + 1);
    typeWords += scoreSentence(done);
    typeTotal += v.length;
    typeCorrect += [...v].filter((c, i) => c === typeSentence[i]).length;
  }
  $("type-input").disabled = true;
  const acc = typeTotal ? Math.round((typeCorrect / typeTotal) * 100) : 0;
  $("type-res-name").textContent = typeName;
  $("type-res-words").textContent = typeWords;
  $("type-res-acc").textContent = acc + "%";
  // اللي ما كتب ولا كلمة صح ما يدخل اللوحة
  if (!typeTotal || !typeWords) {
    $("type-res-rank").textContent = typeTotal ? "ولا كلمة صح هالمرة 😅 جرّب مرة ثانية!" : "ما كتبت شي! جرّب مرة ثانية ⌨️";
    $("type-play").hidden = true; $("type-result").hidden = false;
    renderTypeBoard();
    return;
  }
  const entry = { name: typeName, words: typeWords, acc, at: new Date().toISOString() };
  db.typeScores.push(entry); save();
  const rank = sortTypeScores().indexOf(entry) + 1;
  $("type-res-rank").textContent = rank <= 10 ? `🎉 ترتيبك رقم ${rank} في اللوحة!` : "قربت! جرّب مرة ثانية وادخل اللوحة 💪";
  $("type-play").hidden = true; $("type-result").hidden = false;
  renderTypeBoard(entry);
  if (rank <= 3) confetti(true);
}
$("type-again").addEventListener("click", initType);

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
    [db.typeScores.length, "محاولات Speed Type"], [db.typeScores.length ? sortTypeScores()[0].words : 0, "أعلى كلمات في Speed Type"],
  ].map(([n, l]) => `<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");
  $("staff-bugs").innerHTML = topBugsHtml(BUGS.length);
}
$("export").addEventListener("click", () => {
  const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [["القسم", "البند", "القيمة"],
    ["عام", "شفرات انفكّت", db.decoded], ["عام", "محاولات فك", db.decodeTries], ["عام", "تقارير Bugs", db.bugReports],
    ["عام", "محاولات Hack", db.hackStarts], ["عام", "صناديق انفتحت", db.hackWins],
    ...BUGS.map((b) => ["تصويت Bugs", b.txt, db.votes[b.id] || 0]),
    ...[...db.fame].sort((a, b) => a.secs - b.secs).map((f) => ["Hall of Fame", f.name, f.secs + "s"]),
    ...sortTypeScores().map((s) => ["Speed Type", s.name, `${s.words} كلمة · ${s.acc}%`])];
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

// رابط مباشر للوحة الفريق: أضف #staff في آخر الرابط
go(location.hash === "#staff" ? "staff" : "home");
window.addEventListener("hashchange", () => { if (location.hash === "#staff") go("staff"); });
resetIdle();
