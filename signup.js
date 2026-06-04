emailjs.init("uzSRH4ozEQcFqTGbg");

const fc = document.getElementById("face-circle");
const angryB = document.getElementById("angry-brows");
const sadB = document.getElementById("sad-brows");
const happyB = document.getElementById("happy-brows");
const eyeL = document.getElementById("eye-left");
const eyeR = document.getElementById("eye-right");
const pupilL = document.getElementById("pupil-left");
const pupilR = document.getElementById("pupil-right");
const tearL = document.getElementById("tear-left");
const tearR = document.getElementById("tear-right");
const mouth = document.getElementById("mouth");
const blushL = document.getElementById("blush-l");
const blushR = document.getElementById("blush-r");
const msgEl = document.getElementById("msg");
const faceEl = document.getElementById("face");
const submitBtn = document.getElementById("submit-btn");

let activeTab = "email";

function switchTab(tab) {
  activeTab = tab;
  document.getElementById("email-field").style.display =
    tab === "email" ? "block" : "none";
  document.getElementById("phone-field").style.display =
    tab === "phone" ? "block" : "none";

  document.getElementById("tab-email").style.background =
    tab === "email" ? "rgb(0,213,255)" : "#1a1a1a";
  document.getElementById("tab-email").style.color =
    tab === "email" ? "#000" : "#aaa";
  document.getElementById("tab-email").style.border =
    tab === "email" ? "1px solid rgb(0,213,255)" : "1px solid #444";

  document.getElementById("tab-phone").style.background =
    tab === "phone" ? "rgb(0,213,255)" : "#1a1a1a";
  document.getElementById("tab-phone").style.color =
    tab === "phone" ? "#000" : "#aaa";
  document.getElementById("tab-phone").style.border =
    tab === "phone" ? "1px solid rgb(0,213,255)" : "1px solid #444";
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function setNeutral() {
  fc.setAttribute("fill", "url(#faceGrad)");
  angryB.setAttribute("opacity", "0");
  sadB.setAttribute("opacity", "0");
  happyB.setAttribute("opacity", "0");
  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
  pupilL.setAttribute("cy", "46");
  pupilR.setAttribute("cy", "46");
  tearL.setAttribute("opacity", "0");
  tearR.setAttribute("opacity", "0");
  mouth.setAttribute("d", "M 38 70 Q 55 65 72 70");
  blushL.setAttribute("opacity", "0");
  blushR.setAttribute("opacity", "0");
  msgEl.className = "msg";
  msgEl.textContent = "";
}

function setHappy() {
  fc.setAttribute("fill", "url(#happyGrad)");
  angryB.setAttribute("opacity", "0");
  sadB.setAttribute("opacity", "0");
  happyB.setAttribute("opacity", "1");
  eyeL.setAttribute("ry", "4");
  eyeR.setAttribute("ry", "4");
  pupilL.setAttribute("cy", "44");
  pupilR.setAttribute("cy", "44");
  tearL.setAttribute("opacity", "0");
  tearR.setAttribute("opacity", "0");
  mouth.setAttribute("d", "M 32 66 Q 55 85 78 66");
  blushL.setAttribute("opacity", "0.5");
  blushR.setAttribute("opacity", "0.5");
  msgEl.className = "msg ok";
  msgEl.textContent =
    "🎉 OTP sent! Check your " +
    (activeTab === "email" ? "email" : "phone") +
    "...";
}

function setAngry() {
  fc.setAttribute("fill", "url(#faceGrad)");
  angryB.setAttribute("opacity", "1");
  sadB.setAttribute("opacity", "0");
  happyB.setAttribute("opacity", "0");
  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
  pupilL.setAttribute("cy", "47");
  pupilR.setAttribute("cy", "47");
  tearL.setAttribute("opacity", "0");
  tearR.setAttribute("opacity", "0");
  mouth.setAttribute("d", "M 38 76 Q 55 65 72 76");
  blushL.setAttribute("opacity", "0");
  blushR.setAttribute("opacity", "0");
  msgEl.className = "msg err";
  msgEl.textContent = "😤 Please fill in all fields correctly!";

  faceEl.classList.remove("shake-face");
  submitBtn.classList.remove("shake-btn");
  void faceEl.offsetWidth;
  faceEl.classList.add("shake-face");
  submitBtn.classList.add("shake-btn");
  setTimeout(() => {
    faceEl.classList.remove("shake-face");
    submitBtn.classList.remove("shake-btn");
  }, 500);
}

function setEmpty() {
  fc.setAttribute("fill", "url(#sadGrad)");
  angryB.setAttribute("opacity", "0");
  sadB.setAttribute("opacity", "1");
  happyB.setAttribute("opacity", "0");
  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
  pupilL.setAttribute("cy", "46");
  pupilR.setAttribute("cy", "46");
  tearL.setAttribute("opacity", "0.8");
  tearR.setAttribute("opacity", "0.8");
  mouth.setAttribute("d", "M 38 75 Q 55 65 72 75");
  blushL.setAttribute("opacity", "0");
  blushR.setAttribute("opacity", "0");
  msgEl.className = "msg warn";
  msgEl.textContent = "🥺 Please fill in all fields first!";
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
function isValidPhone(p) {
  return /^\+?[0-9]{10,15}$/.test(p.replace(/\s/g, ""));
}

document.getElementById("fullname").addEventListener("input", setNeutral);
document.getElementById("email").addEventListener("input", setNeutral);
document.getElementById("phone").addEventListener("input", setNeutral);
document.getElementById("password").addEventListener("input", setNeutral);

submitBtn.addEventListener("click", async () => {
  const name = document.getElementById("fullname").value.trim();
  const pass = document.getElementById("password").value;
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !pass) {
    setEmpty();
    return;
  }
  if (activeTab === "email" && !email) {
    setEmpty();
    return;
  }
  if (activeTab === "phone" && !phone) {
    setEmpty();
    return;
  }

  if (activeTab === "email" && !isValidEmail(email)) {
    setAngry();
    return;
  }
  if (activeTab === "phone" && !isValidPhone(phone)) {
    setAngry();
    return;
  }
  if (pass.length < 8) {
    setAngry();
    return;
  }

  const otp = generateOTP();

  localStorage.setItem("db_name", name);
  localStorage.setItem("db_email", email);
  localStorage.setItem("db_phone", phone);
  localStorage.setItem("db_pass", pass);
  localStorage.setItem("db_otp", otp);
  localStorage.setItem("db_otp_time", Date.now().toString());
  localStorage.setItem("db_loggedin", "false");
  localStorage.setItem("db_otp_method", activeTab);

  if (activeTab === "email") {
    submitBtn.textContent = "Sending OTP...";
    submitBtn.disabled = true;

    try {
      // await emailjs.send('service_93mb1dh', 'template_uy1faqd', {
      await emailjs.send("service_7ny6sbj", "template_uy1faqd", {
        to_name: name,
        to_email: email,
        otp_code: otp,
      });

      setHappy();
      setTimeout(() => {
        window.location.href = "otp.html";
      }, 2000);
    } catch (error) {
      msgEl.className = "msg err";
      msgEl.textContent = "❌ Failed to send OTP. Try again.";
      submitBtn.textContent = "Sign Up & Get OTP";
      submitBtn.disabled = false;
    }
  } else {
    setHappy();
    msgEl.textContent = "📱 OTP sent to your phone! (Simulated for now)";
    setTimeout(() => {
      window.location.href = "otp.html";
    }, 2000);
  }
});
