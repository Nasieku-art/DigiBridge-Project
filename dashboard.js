const COURSE_ICONS = [
  "💻",
  "🌐",
  "📊",
  "🔒",
  "⚖️",
  "🧠",
  "📱",
  "🎯",
  "🔬",
  "📝",
];
const COURSE_BGS = [
  "rgba(0,213,255,0.12)",
  "rgba(255,180,0,0.12)",
  "rgba(100,200,100,0.12)",
  "rgba(200,100,255,0.12)",
  "rgba(208,194,160,0.4)",
  "rgba(255,100,100,0.12)",
  "rgba(100,180,255,0.12)",
  "rgba(255,220,100,0.12)",
  "rgba(100,255,200,0.12)",
  "rgba(255,150,200,0.12)",
];

const FALLBACK_COURSES = [
  {
    id: "f1",
    name: "Digital Literacy Fundamentals",
    icon: "💻",
    bg: "rgba(0,213,255,0.12)",
    lessons: 12,
    duration: "3h 20m",
  },
  {
    id: "f2",
    name: "Web Development Basics",
    icon: "🌐",
    bg: "rgba(255,180,0,0.12)",
    lessons: 18,
    duration: "5h 10m",
  },
  {
    id: "f3",
    name: "Data & Financial Inclusion",
    icon: "📊",
    bg: "rgba(100,200,100,0.12)",
    lessons: 10,
    duration: "2h 45m",
  },
  {
    id: "f4",
    name: "Cybersecurity Essentials",
    icon: "🔒",
    bg: "rgba(200,100,255,0.12)",
    lessons: 14,
    duration: "4h 00m",
  },
  {
    id: "f5",
    name: "Intellectual Property Rights",
    icon: "⚖️",
    bg: "rgba(208,194,160,0.4)",
    lessons: 5,
    duration: "3h 10m",
  },
];

function getCourses() {
  const adminData = JSON.parse(
    localStorage.getItem("digibridge_admin") || '{"courses":[]}',
  );
  if (!adminData.courses || adminData.courses.length === 0)
    return FALLBACK_COURSES;
  return adminData.courses.map((c, i) => ({
    id: c.id,
    name: c.title,
    icon: COURSE_ICONS[i % COURSE_ICONS.length],
    bg: COURSE_BGS[i % COURSE_BGS.length],
    lessons: c.modules ? c.modules.length : 0,
    duration: c.duration ? c.duration + " week(s)" : "—",
  }));
}

let COURSES = getCourses();

const SKILLS = [
  { name: "CV Writing", pct: 55, color: "#de6b1f" },
  { name: "Financial Literacy", pct: 5, color: "#a78bfa" },
  { name: "Intellectual Property", pct: 10, color: "#098054" },
  { name: "HTML & CSS", pct: 80, color: "rgb(0,213,255)" },
  { name: "JavaScript", pct: 55, color: "#FFD700" },
  { name: "Digital Literacy", pct: 95, color: "#4caf50" },
  { name: "Cybersecurity", pct: 20, color: "#f44336" },
  { name: "Data Analysis", pct: 60, color: "#a78bfa" },
  { name: "Version Control (Git)", pct: 35, color: "#ab1d51" },
];

const LEADERBOARD = [
  { initials: "MN", name: "Mary N.", pts: 1240, color: "#FFD700", me: false },
  { initials: "OD", name: "Omar D.", pts: 1180, color: "#C0C0C0", me: false },
  {
    initials: "SO",
    name: "Salamat O.",
    pts: 1050,
    color: "#CD7F32",
    me: false,
  },
  {
    initials: "AW",
    name: "Amina W.",
    pts: 980,
    color: "rgb(0,213,255)",
    me: true,
  },
  { initials: "AN", name: "Anthony N.", pts: 870, color: "#f472b6", me: false },
  { initials: "CO", name: "Cynthia O.", pts: 810, color: "#60a5fa", me: false },
];

function getCourseProgress(id) {
  const stored = JSON.parse(localStorage.getItem("db_course_progress") || "{}");
  const base = COURSES.find((c) => c.id === id);
  return stored[id] !== undefined ? stored[id] : base ? base.progress : 0;
}
function setCourseProgress(id, pct) {
  const stored = JSON.parse(localStorage.getItem("db_course_progress") || "{}");
  stored[id] = pct;
  localStorage.setItem("db_course_progress", JSON.stringify(stored));
}

function getCertificates() {
  return JSON.parse(localStorage.getItem("db_certificates") || "[]");
}
function saveCertificate(cert) {
  const certs = getCertificates();
  if (!certs.find((c) => c.courseId === cert.courseId)) {
    certs.push(cert);
    localStorage.setItem("db_certificates", JSON.stringify(certs));
    document.getElementById("cert-count").textContent = certs.length;
  }
}

const learnerName = localStorage.getItem("db_name") || "Mary Nasieku";
const learnerEmail =
  localStorage.getItem("db_email") || "mary@digibridge.co.ke";
const joinDate =
  localStorage.getItem("db_joined") || new Date().toLocaleDateString("en-KE");
const initials = learnerName
  .split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase()
  .slice(0, 2);

document.getElementById("welcome-msg").textContent =
  `Welcome back, ${learnerName.split(" ")[0]} 👋`;
document.getElementById("sidebar-name").textContent = learnerName;
document.getElementById("sidebar-avatar").textContent = initials;
document.getElementById("profile-name").textContent = learnerName;
document.getElementById("profile-email").textContent = learnerEmail;
document.getElementById("profile-joined").textContent = joinDate;
document.getElementById("profile-avatar").textContent = initials;
document.getElementById("cert-count").textContent =
  getCertificates().length || 2;

const navItems = document.querySelectorAll(".nav-item[data-section]");

navItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const section = this.dataset.section;
    switchSection(section);
    navItems.forEach((n) => n.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll(".see-all[data-section]").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const sec = this.dataset.section;
    switchSection(sec);
    navItems.forEach((n) => n.classList.remove("active"));
    document.querySelector(`[data-section="${sec}"]`)?.classList.add("active");
  });
});

function switchSection(name) {
  document
    .querySelectorAll(".page-section")
    .forEach((s) => s.classList.remove("active"));
  const target = document.getElementById("sec-" + name);
  if (target) {
    target.classList.add("active");

    if (name === "progress") animateSkillBars();
    if (name === "certificates") renderCertificatesPage();
    if (name === "leaderboard") renderLeaderboard();
    if (name === "courses") renderCoursesGrid();
  }
}

function renderHomeCourses() {
  COURSES = getCourses();
  const list = document.getElementById("home-course-list");
  const preview = COURSES.slice(0, 4);
  list.innerHTML = preview
    .map((c) => {
      const pct = getCourseProgress(c.id);
      return `
      <div class="course-item" onclick="openCourseDetail(${c.id})">
        <div class="course-icon" style="background:${c.bg}">${c.icon}</div>
        <div class="course-info">
          <div class="course-name">${c.name}</div>
          <div class="course-meta">${c.lessons} lessons · ${c.duration}</div>
          <div class="progress-bar-wrap">
            <div class="progress-bar" data-target="${pct}" style="width:0%"></div>
          </div>
        </div>
        <div class="course-pct" style="color:${pct === 100 ? "#4caf50" : "var(--cyan)"}">
          ${pct === 100 ? "✓" : pct + "%"}
        </div>
      </div>`;
    })
    .join("");

  setTimeout(() => {
    list.querySelectorAll(".progress-bar[data-target]").forEach((bar) => {
      bar.style.width = bar.dataset.target + "%";
    });
  }, 100);
}

function renderCoursesGrid() {
  COURSES = getCourses();
  const grid = document.getElementById("courses-full-list");
  grid.innerHTML = COURSES.map((c) => {
    const pct = getCourseProgress(c.id);
    const isDone = pct === 100;
    return `
      <div class="course-card-full" id="course-card-${c.id}">
        <div class="course-card-header">
          <div class="course-card-icon" style="background:${c.bg}">${c.icon}</div>
          <div>
            <div class="course-card-title">${c.name}</div>
            <div class="course-card-meta">${c.lessons} lessons · ${c.duration}</div>
          </div>
        </div>
        <div class="course-card-progress-wrap">
          <div class="course-card-progress-bar" data-target="${pct}" style="width:0%;background:${isDone ? "#4caf50" : "var(--cyan)"}"></div>
        </div>
        <div class="course-card-footer">
          <span class="course-card-pct" style="color:${isDone ? "#4caf50" : "var(--cyan)"}">
            ${isDone ? "✓ Completed" : pct + "% complete"}
          </span>
          <button class="course-btn ${isDone ? "complete" : ""}" onclick="handleCourseAction(${c.id}, event)">
            ${isDone ? "🏅 Get Certificate" : "Continue →"}
          </button>
        </div>
      </div>`;
  }).join("");

  setTimeout(() => {
    grid
      .querySelectorAll(".course-card-progress-bar[data-target]")
      .forEach((bar) => {
        bar.style.width = bar.dataset.target + "%";
      });
  }, 100);
}

function handleCourseAction(id, e) {
  e.stopPropagation();
  const pct = getCourseProgress(id);
  const course = COURSES.find((c) => c.id === id);

  if (pct === 100) {
    openCertificate(course);
  } else {
    const newPct = Math.min(100, pct + 20);
    setCourseProgress(id, newPct);
    renderCoursesGrid();
    renderHomeCourses();
    if (newPct === 100) {
      const cert = {
        courseId: id,
        courseName: course.name,
        learnerName,
        issuedDate: new Date().toLocaleDateString("en-KE", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        duration: course.duration,
      };
      saveCertificate(cert);
      setTimeout(() => {
        if (
          confirm(
            `🎉 Congratulations! You completed "${course.name}"!\nView your certificate now?`,
          )
        ) {
          openCertificate(course);
        }
      }, 400);
    }
  }
}

function renderSkills() {
  const list = document.getElementById("skills-list");
  list.innerHTML = SKILLS.map(
    (s) => `
    <div class="skill-row">
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar-wrap">
        <div class="skill-bar" data-target="${s.pct}" style="width:0%;background:${s.color}"></div>
      </div>
      <div class="skill-pct">${s.pct}%</div>
    </div>`,
  ).join("");
}

function animateSkillBars() {
  document.querySelectorAll(".skill-bar[data-target]").forEach((bar) => {
    setTimeout(() => {
      bar.style.width = bar.dataset.target + "%";
    }, 100);
  });
}

function renderLeaderboard() {
  const list = document.getElementById("leader-list");
  list.innerHTML = LEADERBOARD.map(
    (l, i) => `
    <div class="leader-item ${l.me ? "me" : ""}">
      <div class="leader-rank">${i + 1}</div>
      <div class="leader-avatar" style="background:${l.color}">${l.initials}</div>
      <div class="leader-name">${l.name} ${l.me ? '<span class="you-tag">(You)</span>' : ""}</div>
      <div class="leader-pts">${l.pts.toLocaleString()} pts</div>
    </div>`,
  ).join("");
}

function renderCertificatesPage() {
  const grid = document.getElementById("certs-grid");
  const certs = getCertificates();

  const display = certs.length
    ? certs
    : [
        {
          courseId: 3,
          courseName: "Data & Financial Inclusion",
          learnerName,
          issuedDate: "25 May 2026",
          duration: "2h 45m",
        },
        {
          courseId: 99,
          courseName: "Intellectual Property Rights Skills",
          learnerName,
          issuedDate: "01 Jun 2026",
          duration: "3h 10m",
        },
      ];

  grid.innerHTML = display
    .map(
      (c) => `
    <div class="cert-card">
      <div style="font-size:2rem">🏅</div>
      <div class="cert-card-title">${c.courseName}</div>
      <div class="cert-card-meta">Issued to: ${c.learnerName}</div>
      <div class="cert-card-date">📅 ${c.issuedDate}</div>
      <div class="cert-card-meta">⏱ Duration: ${c.duration}</div>
      <div class="cert-view-btn" onclick='viewCertFromData(${JSON.stringify(c)})'>
        View & Download →
      </div>
    </div>`,
    )
    .join("");
}

function openCertificate(course) {
  const certs = getCertificates();
  const existing = certs.find((c) => c.courseId === course.id);
  const cert = existing || {
    courseId: course.id,
    courseName: course.name,
    learnerName,
    issuedDate: new Date().toLocaleDateString("en-KE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    duration: course.duration,
  };
  viewCertFromData(cert);
}

function viewCertFromData(cert) {
  const startDate = localStorage.getItem("db_joined")
    ? new Date(localStorage.getItem("db_joined"))
    : new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  document.getElementById("cert-preview").innerHTML = `
    <div class="cert-logo-row">
      <div style="font-size:28px">🇰🇪</div>
      <div class="cert-logo-text">Digi<span>Bridge</span></div>
      <div style="font-size:22px">🌐</div>
    </div>

    <div class="cert-title-block">
      <div class="cert-platform-name">Digital Bridge Platform (DigiBridge)</div>
      <div class="cert-title">Certificate of Completion</div>
      <div class="cert-subtitle">This certifies that</div>
    </div>

    <div class="cert-divider"></div>

    <div class="cert-learner-name">${cert.learnerName}</div>

    <div class="cert-completed-text">has successfully completed the online course</div>
    <div class="cert-course-name">${cert.courseName}</div>

    <div class="cert-meta-row">
      <div class="cert-meta-block">
        <span>Duration</span>
        <strong>${cert.duration}</strong>
      </div>
      <div class="cert-signature">
        <div class="cert-sig-line">✍</div>
        <div class="cert-sig-name">Mary Nasieku</div>
        <div class="cert-sig-role">Program Director</div>
      </div>
      <div class="cert-meta-block" style="text-align:right">
        <span>Date Issued</span>
        <strong>${cert.issuedDate}</strong>
      </div>
    </div>`;

  window._currentCert = cert;
  document.getElementById("cert-modal-bg").classList.add("open");
}

document.getElementById("cert-close").addEventListener("click", () => {
  document.getElementById("cert-modal-bg").classList.remove("open");
});
document
  .getElementById("cert-modal-bg")
  .addEventListener("click", function (e) {
    if (e.target === this) this.classList.remove("open");
  });

document.getElementById("cert-download-btn").addEventListener("click", () => {
  const cert = window._currentCert;
  if (!cert) return;

  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html><html><head>
    <title>Certificate - ${cert.courseName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans&display=swap" rel="stylesheet">
    <style>
      body { font-family:'DM Sans',sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f0f0f0; margin:0; }
      .cert { width:700px; padding:3rem; border:3px solid #1a73a7; border-radius:8px; background:#fff; text-align:center; position:relative; }
      .cert::before { content:''; position:absolute; inset:10px; border:1px dashed rgba(26,115,167,0.3); border-radius:4px; pointer-events:none; }
      .logo-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; }
      .logo-text { font-size:22px; font-weight:700; color:#1a73a7; }
      .logo-text span { color:#1D9E75; }
      .platform { font-size:12px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:#333; }
      .cert-title { font-size:22px; font-weight:700; color:#1a1a1a; margin-top:4px; }
      .sub { font-size:12px; color:#888; font-style:italic; margin-top:4px; }
      .divider { width:60px; height:2px; background:#1a73a7; margin:1rem auto; }
      .learner { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:700; color:#1a1a1a; border-bottom:2px dotted #aaa; display:inline-block; padding:0 2rem 4px; margin:0.5rem 0; }
      .completed { font-size:12px; color:#555; font-style:italic; margin:8px 0 4px; }
      .course { font-size:18px; font-weight:600; color:#1a73a7; }
      .meta-row { display:flex; justify-content:space-between; margin-top:2rem; padding-top:1.5rem; border-top:1px solid #e0e0e0; font-size:12px; color:#555; }
      .meta-block { text-align:left; } .meta-block.right { text-align:right; }
      .meta-block strong { display:block; font-size:13px; color:#1a1a1a; margin-top:3px; }
      .sig-line { border-top:1px solid #aaa; width:140px; margin:0 auto 4px; padding-top:4px; font-size:12px; color:#555; }
      .sig-name { font-size:13px; font-weight:600; color:#1a1a1a; }
      .sig-role { font-size:11px; color:#888; }
      @media print { body { background:#fff; } }
    </style>
  </head><body>
  <div class="cert">
    <div class="logo-row">
      <span style="font-size:28px">🇰🇪</span>
      <div class="logo-text">Digi<span>Bridge</span></div>
      <span style="font-size:22px">🌐</span>
    </div>
    <div class="platform">Digital Bridge Platform (DigiBridge)</div>
    <div class="cert-title">Certificate of Completion</div>
    <div class="sub">This certifies that</div>
    <div class="divider"></div>
    <div class="learner">${cert.learnerName}</div>
    <div class="completed">has successfully completed the online course</div>
    <div class="course">${cert.courseName}</div>
    <div class="meta-row">
      <div class="meta-block"><span>Duration</span><strong>${cert.duration}</strong></div>
      <div style="text-align:center">
        <div class="sig-line">✍</div>
        <div class="sig-name">Mary Nasieku</div>
        <div class="sig-role">Program Director</div>
      </div>
      <div class="meta-block right"><span>Date Issued</span><strong>${cert.issuedDate}</strong></div>
    </div>
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
  </body></html>`);
  win.document.close();
});

document.querySelector(".search-bar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll(".course-item").forEach((item) => {
    const name =
      item.querySelector(".course-name")?.textContent.toLowerCase() || "";
    item.classList.toggle("hidden", !name.includes(query));
  });
});

const notifBtn = document.getElementById("notif-btn");
const notifDropdown = document.getElementById("notif-dropdown");
const notifDot = document.getElementById("notif-dot");

notifBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  notifDropdown.classList.toggle("open");
  notifDot.style.display = "none";
});

document.getElementById("notif-clear").addEventListener("click", (e) => {
  e.stopPropagation();
  document
    .querySelectorAll(".notif-item.unread")
    .forEach((el) => el.classList.remove("unread"));
  notifDropdown.classList.remove("open");
});

document.addEventListener("click", () =>
  notifDropdown.classList.remove("open"),
);

COURSES = getCourses();

document.querySelector(".stat-card.accent .stat-value").textContent =
  COURSES.length;

renderHomeCourses();
renderSkills();
renderLeaderboard();

setTimeout(() => {
  document
    .querySelectorAll("#home-course-list .progress-bar[data-target]")
    .forEach((bar) => {
      bar.style.width = bar.dataset.target + "%";
    });
}, 200);
