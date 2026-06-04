const beginBtn = document.querySelector(".btn-begin");

beginBtn.addEventListener("click", () => {
  const loggedIn = localStorage.getItem("db_loggedin");

  if (loggedIn === "true") {
    window.location.href = "dashboard.html";
  } else {
    const emojis = ["🎉", "🎊", "🥳", "⭐", "✨", "💡", "👏"];
    for (let i = 0; i < 15; i++) {
      const emoji = document.createElement("span");
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = "fixed";
      emoji.style.left = Math.random() * window.innerWidth + "px";
      emoji.style.top = Math.random() * window.innerHeight + "px";
      emoji.style.fontSize = "2rem";
      emoji.style.pointerEvents = "none";
      emoji.style.animation = "fadeOut 1.5s forwards";
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 1500);
    }
  }
});

const loginBtn = document.querySelector(".btn-log");
const signupBtn = document.querySelector(".btn-sign");

loginBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

signupBtn.addEventListener("click", () => {
  window.location.href = "signup.html";
});

function addMessage(text, isUser) {
  const msgs = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = isUser ? "user-msg" : "bot-msg";
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}
