function toggleChat() {
  const win = document.getElementById("chat-window");
  win.classList.toggle("open");
  if (win.classList.contains("open")) {
    document.getElementById("chat-input").focus();
  }
}

function addMessage(text, isUser) {
  const msgs = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = isUser ? "msg-user" : "msg-bot";
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function quickAsk(text) {
  document.getElementById("chat-input").value = text;
  sendMessage();
}

let chatHistory = [];

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";

  addMessage(text, true);
  chatHistory.push({ role: "user", content: text });

  const typing = addMessage("Typing...", false);
  typing.style.color = "rgb(0,213,255)";
  typing.style.fontStyle = "italic";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are Digi, a friendly AI learning assistant for Digibridge — a Kenya-based ICT literacy and digital skills platform targeting Kenyan learners built by Mary Nasieku.

You help learners with:
- Questions about Digibridge courses: Digital Literacy Fundamentals, Web Development Basics, Cybersecurity Essentials, Data & Financial Inclusion, Data Analysis
- How to sign up, login, verify OTP and navigate the dashboard
- Digital skills advice and encouragement
- General tech questions

Rules:
- Keep responses short (2-4 sentences max)
- Be warm, friendly and encouraging
- Use simple everyday language
- Add relevant emojis occasionally
- Always relate back to Digibridge when possible`,
        messages: chatHistory,
      }),
    });

    const data = await res.json();
    const reply = data.content[0].text;
    chatHistory.push({ role: "assistant", content: reply });
    typing.textContent = reply;
    typing.style.color = "#ddd";
    typing.style.fontStyle = "normal";
  } catch (e) {
    typing.textContent = "❌ Something went wrong. Please try again!";
    typing.style.color = "#f44336";
    typing.style.fontStyle = "normal";
  }
}
