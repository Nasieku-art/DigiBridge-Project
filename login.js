const fc       = document.getElementById("face-circle");
const angryB   = document.getElementById("angry-brows");
const sadB     = document.getElementById("sad-brows");
const happyB   = document.getElementById("happy-brows");
const eyeL     = document.getElementById("eye-left");
const eyeR     = document.getElementById("eye-right");
const pupilL   = document.getElementById("pupil-left");
const pupilR   = document.getElementById("pupil-right");
const mouth    = document.getElementById("mouth");
const blushL   = document.getElementById("blush-l");
const blushR   = document.getElementById("blush-r");
const msgEl    = document.getElementById("msg");
const faceEl   = document.getElementById("face");
const submitBtn = document.getElementById("submit-btn");


function setNeutral() {
  fc.setAttribute("fill", "url(#faceGrad)");
  angryB.setAttribute("opacity", "0");
  sadB.setAttribute("opacity", "0");
  happyB.setAttribute("opacity", "0");
  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
  pupilL.setAttribute("cy", "46");
  pupilR.setAttribute("cy", "46");
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
  mouth.setAttribute("d", "M 32 66 Q 55 85 78 66");
  blushL.setAttribute("opacity", "0.5");
  blushR.setAttribute("opacity", "0.5");
  msgEl.className = "msg ok";
  msgEl.textContent = "✅ Welcome back! Redirecting...";
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
  mouth.setAttribute("d", "M 38 76 Q 55 65 72 76");
  blushL.setAttribute("opacity", "0");
  blushR.setAttribute("opacity", "0");

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

function setSad() {
  fc.setAttribute("fill", "url(#sadGrad)");
  angryB.setAttribute("opacity", "0");
  sadB.setAttribute("opacity", "1");
  happyB.setAttribute("opacity", "0");
  eyeL.setAttribute("ry", "8");
  eyeR.setAttribute("ry", "8");
  pupilL.setAttribute("cy", "46");
  pupilR.setAttribute("cy", "46");
  mouth.setAttribute("d", "M 38 75 Q 55 65 72 75");
  blushL.setAttribute("opacity", "0");
  blushR.setAttribute("opacity", "0");
}


document.getElementById("login-email").addEventListener("input", setNeutral);
document.getElementById("login-password").addEventListener("input", setNeutral);


function handleLogin() {
  const enteredEmail = document.getElementById("login-email").value.trim();
  const enteredPass  = document.getElementById("login-password").value;


  if (!enteredEmail || !enteredPass) {
    setSad();
    msgEl.className = "msg warn";
    msgEl.textContent = "🥺 Please fill in all fields!";
    return;
  }

  const savedEmail = localStorage.getItem("db_email");
  const savedPass  = localStorage.getItem("db_pass");

 
  if (!savedEmail || !savedPass) {
    setAngry();
    msgEl.className = "msg err";
    msgEl.textContent = "❌ No account found. Please sign up first!";
    return;
  }


  if (enteredEmail !== savedEmail) {
    setAngry();
    msgEl.className = "msg err";
    msgEl.textContent = "❌ Email not found. Check your email!";
    return;
  }


  if (enteredPass !== savedPass) {
    setAngry();
    msgEl.className = "msg err";
    msgEl.textContent = "❌ Wrong password. Try again!";
    return;
  }

  
  localStorage.setItem("db_loggedin", "true");
  setHappy();
  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in...";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 2000);
}


document.getElementById("login-password").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});
document.getElementById("login-email").addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleLogin();
});