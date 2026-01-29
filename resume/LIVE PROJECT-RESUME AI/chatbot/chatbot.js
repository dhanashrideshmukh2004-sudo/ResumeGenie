const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

/* ================= SEND MESSAGE ================= */
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  // Show user message
  addMessage(message, "user");
  userInput.value = "";

  // Show typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "msg ai typing";
  typingDiv.innerHTML = `<span>AI is typing...</span>`;
  chatBox.appendChild(typingDiv);
  scrollChat();

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    // Remove typing
    typingDiv.remove();

    // Show AI reply
    typeWriterEffect(data.reply || "No response from AI");

  } catch (error) {
    typingDiv.remove();
    addMessage("⚠️ AI server not responding. Please start backend.", "ai");
  }
}

/* ================= ADD MESSAGE ================= */
function addMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${sender}`;
  msgDiv.innerHTML = `<span>${escapeHTML(text)}</span>`;
  chatBox.appendChild(msgDiv);
  scrollChat();
}

/* ================= TYPEWRITER EFFECT ================= */
function typeWriterEffect(text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "msg ai";
  const span = document.createElement("span");
  msgDiv.appendChild(span);
  chatBox.appendChild(msgDiv);

  let i = 0;
  const speed = 18; // typing speed

  function type() {
    if (i < text.length) {
      span.innerHTML += escapeHTML(text.charAt(i));
      i++;
      scrollChat();
      setTimeout(type, speed);
    }
  }
  type();
}

/* ================= HELPERS ================= */
function scrollChat() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHTML(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ================= ENTER KEY SUPPORT ================= */
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
