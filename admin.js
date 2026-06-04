let data = JSON.parse(
  localStorage.getItem("digibridge_admin") ||
    '{"courses":[],"learners":[],"certificates":[]}',
);

let editingId = null;

function save() {
  localStorage.setItem("digibridge_admin", JSON.stringify(data));
}

function showSection(s) {
  document
    .querySelectorAll(".section")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".nav-item")
    .forEach((el) => el.classList.remove("active"));

  document.getElementById("sec-" + s).classList.add("active");
  document.querySelector(`[data-section="${s}"]`).classList.add("active");

  if (s === "overview") renderOverview();
  if (s === "courses") renderCourses();
  if (s === "learners") renderLearners();
  if (s === "certificates") renderCerts();
}

function renderOverview() {
  document.getElementById("stat-courses").textContent = data.courses.length;
  document.getElementById("stat-learners").textContent = data.learners.length;
  document.getElementById("stat-completions").textContent =
    data.learners.filter((l) => l.progress === 100).length;
  document.getElementById("stat-certs").textContent = data.certificates.length;

  const ocl = document.getElementById("overview-courses-list");
  if (!data.courses.length) {
    ocl.innerHTML =
      '<div class="empty">No courses yet. <a href="#" onclick="showSection(\'courses\')">Add one</a></div>';
  } else {
    ocl.innerHTML = `
      <table>
        <thead><tr><th>Title</th><th>Category</th><th>Modules</th></tr></thead>
        <tbody>
          ${data.courses
            .slice(-3)
            .reverse()
            .map(
              (c) => `
            <tr>
              <td>${c.title}</td>
              <td><span class="tag ${catColor(c.category)}">${c.category}</span></td>
              <td>${c.modules.length}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>`;
  }

  const oll = document.getElementById("overview-learners-list");
  if (!data.learners.length) {
    oll.innerHTML = '<div class="empty">No learners registered yet.</div>';
  } else {
    oll.innerHTML = `
      <table>
        <thead><tr><th>Name</th><th>Progress</th><th>Status</th></tr></thead>
        <tbody>
          ${data.learners
            .slice(-3)
            .reverse()
            .map(
              (l) => `
            <tr>
              <td>${l.name}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="progress-bar" style="width:120px">
                    <div class="progress-fill" style="width:${l.progress || 0}%"></div>
                  </div>
                  <span style="font-size:12px;color:#888">${l.progress || 0}%</span>
                </div>
              </td>
              <td>
                <span class="tag ${l.progress === 100 ? "green" : "amber"}">
                  ${l.progress === 100 ? "Completed" : "In Progress"}
                </span>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>`;
  }
}

function catColor(c) {
  const map = {
    "Digital Skills": "green",
    "ICT Literacy": "blue",
    Employability: "amber",
    "IP Rights": "green",
    Cybersecurity: "blue",
  };
  return map[c] || "gray";
}

function renderCourses() {
  const el = document.getElementById("courses-list");

  if (!data.courses.length) {
    el.innerHTML = `
      <div class="card">
        <div class="empty">
          <i class="ti ti-book"></i>
          No courses yet. Click "Add Course" to get started.
        </div>
      </div>`;
    return;
  }

  el.innerHTML = data.courses
    .map(
      (c) => `
    <div class="card" style="margin-bottom:12px">
      <div class="card-header">
        <div>
          <div style="font-weight:600;font-size:15px">${c.title}</div>
          <div style="font-size:12px;color:#888;margin-top:3px">${c.duration} week(s) &middot; ${c.level}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="tag ${catColor(c.category)}">${c.category}</span>
          <button class="btn small" onclick="editCourse('${c.id}')"><i class="ti ti-edit"></i> Edit</button>
          <button class="btn danger small" onclick="deleteCourse('${c.id}')"><i class="ti ti-trash"></i></button>
        </div>
      </div>

      ${c.description ? `<p style="font-size:13px;color:#555;margin-bottom:12px">${c.description}</p>` : ""}

      ${
        c.modules.length
          ? `<div style="font-size:11px;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:6px">Modules</div>
           ${c.modules
             .map(
               (m, i) => `
             <div class="module-item">
               <div class="module-num">${i + 1}</div>
               <span style="font-size:13px">${m}</span>
             </div>`,
             )
             .join("")}`
          : `<div style="font-size:12px;color:#aaa">No modules added yet.</div>`
      }
    </div>
  `,
    )
    .join("");
}

function renderLearners() {
  const tb = document.getElementById("learners-tbody");

  if (!data.learners.length) {
    tb.innerHTML = `<tr><td colspan="5" class="empty">No learners registered yet.</td></tr>`;
    return;
  }

  tb.innerHTML = data.learners
    .map(
      (l) => `
    <tr>
      <td style="font-weight:600">${l.name}</td>
      <td style="color:#888">${l.email}</td>
      <td>${l.course || "—"}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="progress-bar" style="width:90px">
            <div class="progress-fill" style="width:${l.progress || 0}%"></div>
          </div>
          <span style="font-size:12px;color:#888">${l.progress || 0}%</span>
        </div>
      </td>
      <td style="color:#888">${l.joined || "—"}</td>
    </tr>
  `,
    )
    .join("");
}

function renderCerts() {
  const tb = document.getElementById("certs-tbody");

  if (!data.certificates.length) {
    tb.innerHTML = `<tr><td colspan="4" class="empty">No certificates issued yet.</td></tr>`;
    return;
  }

  tb.innerHTML = data.certificates
    .map(
      (c) => `
    <tr>
      <td style="font-weight:600">${c.learner}</td>
      <td>${c.course}</td>
      <td style="color:#888">${c.issued}</td>
      <td>
        <button class="btn small" onclick="downloadCertificate('${c.learner}', '${c.course}', '${c.issued}')">
          <i class="ti ti-download"></i> Download
        </button>
      </td>
    </tr>
  `,
    )
    .join("");
}

function downloadCertificate(learner, course, issued) {
  alert(
    `Certificate download for:\nLearner: ${learner}\nCourse: ${course}\nIssued: ${issued}\n\n(Connect your PDF generator here)`,
  );
}

function openCourseModal(id) {
  editingId = id || null;
  document.getElementById("modal-title").textContent = id
    ? "Edit Course"
    : "Add New Course";

  const c = id ? data.courses.find((x) => x.id === id) : {};

  document.getElementById("f-title").value = c.title || "";
  document.getElementById("f-cat").value = c.category || "Digital Skills";
  document.getElementById("f-desc").value = c.description || "";
  document.getElementById("f-dur").value = c.duration || "";
  document.getElementById("f-level").value = c.level || "Beginner";

  const mc = document.getElementById("modules-container");
  mc.innerHTML = "";
  (c.modules || []).forEach((m) => addModuleField(m));

  document.getElementById("course-modal").classList.add("open");
}

function closeCourseModal() {
  document.getElementById("course-modal").classList.remove("open");
}

document.getElementById("course-modal").addEventListener("click", function (e) {
  if (e.target === this) closeCourseModal();
});

function addModuleField(val = "") {
  const row = document.createElement("div");
  row.className = "module-field-row";
  row.innerHTML = `
    <input placeholder="Module title e.g. Introduction to the Internet" value="${val}" />
    <button class="btn danger small" onclick="this.parentNode.remove()">
      <i class="ti ti-trash"></i>
    </button>`;
  document.getElementById("modules-container").appendChild(row);
}

function saveCourse() {
  const title = document.getElementById("f-title").value.trim();
  if (!title) {
    alert("Please enter a course title.");
    return;
  }

  const modules = [...document.querySelectorAll("#modules-container input")]
    .map((i) => i.value.trim())
    .filter(Boolean);

  const course = {
    id: editingId || Date.now().toString(),
    title,
    category: document.getElementById("f-cat").value,
    description: document.getElementById("f-desc").value.trim(),
    duration: document.getElementById("f-dur").value || 1,
    level: document.getElementById("f-level").value,
    modules,
    created: new Date().toLocaleDateString("en-KE"),
  };

  if (editingId) {
    const idx = data.courses.findIndex((c) => c.id === editingId);
    data.courses[idx] = course;
  } else {
    data.courses.push(course);
  }

  save();
  closeCourseModal();
  renderCourses();
}

function editCourse(id) {
  openCourseModal(id);
}

function deleteCourse(id) {
  if (!confirm("Are you sure you want to delete this course?")) return;
  data.courses = data.courses.filter((c) => c.id !== id);
  save();
  renderCourses();
}

renderOverview();
