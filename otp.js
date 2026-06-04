emailjs.init("uzSRH4ozEQcFqTGbg");

const fc = document.getElementById("face-circle");
const angryB = document.getElementById("angry-brows");
const happyB = document.getElementById("happy-brows");
const eyeL = document.getElementById("eye-left");
const eyeR = document.getElementById("eye-right");
const pupilL = document.getElementById("pupil-left");
const pupilR = document.getElementById("pupil-right");
const mouth = document.getElementById("mouth");
const blushL = document.getElementById("blush-l");
const blushR = document.getElementById("blush-r");
const msgEl = document.getElementById("msg");
const faceEl = document.getElementById("face");

const method = localStorage.getItem("db_otp_method");
const contact =
  method === "email"
    ? localStorage.getItem("db_email")
    : localStorage.getItem("db_phone");

document.getElementById("otp-sub").textContent =
  `Enter the 6-digit code sent to your ${method === "email" ? "email" : "phone"}: ${contact}`;

const boxes = document.querySelectorAll(".otp-box");

boxes.forEach((box, index) => {
  box.addEventListener("input", () => {
    box.value = box.value.replace(/[^0-9]/g, "");
    if (box.value && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }
  });

  box.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !box.value && index > 0) {
      boxes[index - 1].focus();
    }
  });
});

const otpTime = parseInt(localStorage.getItem("db_otp_time"));
const EXPIRY_MS = 5 * 60 * 1000;

function updateTimer() {
  const elapsed = Date.now() - otpTime;
  const remaining = EXPIRY_MS - elapsed;

  if (remaining <= 0) {
    document.getElementById("countdown").textContent = "00:00";
    document.getElementById("timer").style.color = "#f44336";
    msgEl.className = "msg err";
    msgEl.textContent = "⏰ OTP expired! Please resend.";
    document.getElementById("verify-btn").disabled = true;
    return;
  }

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);
  document.getElementById("countdown").textContent =
    `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

updateTimer();
const timerInterval = setInterval(updateTimer, 1000);

function setHappy() {
  fc.setAttribute("fill", "url(#happyGrad)");
  angryB.setAttribute("opacity", "0");
  happyB.setAttribute("opacity", "1");
  eyeL.setAttribute("ry", "4");
  eyeR.setAttribute("ry", "4");
  pupilL.setAttribute("cy", "44");
  pupilR.setAttribute("cy", "44");
  mouth.setAttribute("d", "M 32 66 Q 55 85 78 66");
  blushL.setAttribute("opacity", "0.5");
  blushR.setAttribute("opacity", "0.5");
  msgEl.className = "msg ok";
  msgEl.textContent = "✅ OTP Verified! Welcome to Digibridge 🎉";
}

function setAngry() {
  fc.setAttribute("fill", "url(#faceGrad)");
  angryB.setAttribute("opacity", "1");
  happyB.setAttribute("opacity", "0");
  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
  pupilL.setAttribute("cy", "47");
  pupilR.setAttribute("cy", "47");
  mouth.setAttribute("d", "M 38 76 Q 55 65 72 76");
  blushL.setAttribute("opacity", "0");
  blushR.setAttribute("opacity", "0");
  msgEl.className = "msg err";
  msgEl.textContent = "❌ Oops! Wrong OTP. Try again.";

  faceEl.classList.remove("shake-face");
  void faceEl.offsetWidth;
  faceEl.classList.add("shake-face");
  setTimeout(() => faceEl.classList.remove("shake-face"), 500);
}

document.getElementById("verify-btn").addEventListener("click", () => {
  const entered = Array.from(boxes)
    .map((b) => b.value)
    .join("");
  const saved = localStorage.getItem("db_otp");
  const otpAge = Date.now() - parseInt(localStorage.getItem("db_otp_time"));

  if (otpAge > EXPIRY_MS) {
    msgEl.className = "msg err";
    msgEl.textContent = "⏰ OTP expired! Please resend.";
    return;
  }

  if (entered === saved) {
    clearInterval(timerInterval);
    localStorage.setItem("db_loggedin", "true");
    setHappy();
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 2000);
  } else {
    setAngry();
  }
});

async function resendOTP() {
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const name = localStorage.getItem("db_name");
  const email = localStorage.getItem("db_email");

  localStorage.setItem("db_otp", newOtp);
  localStorage.setItem("db_otp_time", Date.now().toString());

  document.getElementById("verify-btn").disabled = false;
  document.getElementById("timer").style.color = "#ff9800";

  try {
    // await emailjs.send('service_93mb1dh', 'template_uy1faqd', {
    await emailjs.send("service_7ny6sbj", "template_uy1faqd", {
      to_name: name,
      to_email: email,
      otp_code: newOtp,
    });
    msgEl.className = "msg ok";
    msgEl.textContent = "📧 New OTP sent! Check your email.";
  } catch (e) {
    msgEl.className = "msg err";
    msgEl.textContent = "❌ Failed to resend. Try again.";
  }
}
