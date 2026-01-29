// Resume Genie AI - Main Page JavaScript
document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();
    initializeTemplateGallery();
    initializeFAQSection();
    initializeScrollEffects();
    initializeResponsiveFeatures();
    initializeInteractiveElements();

    // ✅ CHATBOT SEND BUTTON CONNECT
    const sendBtn = document.getElementById("sendBtn");
    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
    }

    console.log("Resume Genie AI loaded successfully");
});

// ================= NAVIGATION =================
function initializeNavigation() {
    const navLinks = document.querySelectorAll("#nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.classList.contains("sign") || this.classList.contains("get")) return;
            e.preventDefault();
            window.location.href = this.getAttribute("href");
        });
    });
}

// ================= TEMPLATE GALLERY =================
function initializeTemplateGallery() {
    const template = document.getElementById("template");
    if (!template) return;

    template.addEventListener("wheel", e => {
        e.preventDefault();
        template.scrollLeft += e.deltaY;
    });
}

// ================= FAQ =================
function initializeFAQSection() {
    const buttons = document.querySelectorAll("#page10 button");
    const questions = document.querySelectorAll("#page10 .animation");

    buttons.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            const open = btn.textContent === "-";
            btn.textContent = open ? "+" : "-";
            questions[i].style.color = open ? "#333" : "purple";
        });
    });
}

// ================= SCROLL EFFECT =================
function initializeScrollEffects() {
    const nav = document.getElementById("nav");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            nav.style.background = "#fff";
            nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        } else {
            nav.style.background = "";
            nav.style.boxShadow = "";
        }
    });
}

// ================= RESPONSIVE =================
function initializeResponsiveFeatures() {
    window.addEventListener("resize", () => {
        const template = document.getElementById("template");
        if (template && window.innerWidth < 768) {
            template.style.overflowX = "auto";
        }
    });
}

// ================= INTERACTIVE =================
function initializeInteractiveElements() {
    const buildBtn = document.querySelector(".build");
    const scoreBtn = document.querySelector(".score");

    if (buildBtn) {
        buildBtn.addEventListener("click", e => {
            e.preventDefault();
            showNotification("Starting resume builder...", "success");
        });
    }

    if (scoreBtn) {
        scoreBtn.addEventListener("click", e => {
            e.preventDefault();
            showNotification("Checking resume score...", "info");
        });
    }
}

// ================= NOTIFICATION =================
function showNotification(msg, type = "info") {
    const div = document.createElement("div");
    div.textContent = msg;
    div.style.cssText = `
        position:fixed;
        top:90px;
        right:20px;
        background:#2563eb;
        color:white;
        padding:12px 18px;
        border-radius:8px;
        z-index:1000;
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// ================= AI CHATBOT =================
async function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");

    if (!input || !chatBox || input.value.trim() === "") return;

    const userMsg = input.value;
    chatBox.innerHTML += `<p><b>You:</b> ${userMsg}</p>`;
    input.value = "";

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMsg })
        });

        const data = await response.json();
        chatBox.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        chatBox.innerHTML += `<p style="color:red;">AI server not responding</p>`;
    }
}
