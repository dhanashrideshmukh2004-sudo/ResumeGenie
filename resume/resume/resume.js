// Template Selection
const viewMoreBtn = document.getElementById("viewMore");
const templateGrid = document.getElementById("templateGrid");
let selectedTemplate = null;

viewMoreBtn.addEventListener("click", () => {
  templateGrid.classList.toggle("hidden");
});

document.querySelectorAll(".template").forEach(template => {
  template.addEventListener("click", () => {
    selectedTemplate = template.dataset.name;
    alert("Template Selected: " + selectedTemplate);
    showPage("headerInfo");
  });
});

// Multi-step navigation
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Next Buttons
document.querySelectorAll(".nextBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const nextId = btn.dataset.next;
    if (validateCurrentPage()) {
      showPage(nextId);
    }
  });
});

// Back Buttons
document.querySelectorAll(".backBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const backId = btn.dataset.back;
    showPage(backId);
  });
});

// Validation
function validateCurrentPage() {
  const activePage = document.querySelector(".page.active");
  const inputs = activePage.querySelectorAll("input, textarea");
  for (let input of inputs) {
    if (input.value.trim() === "") {
      alert("Please fill all fields before continuing.");
      return false;
    }
  }
  return true;
}

// Download Resume as PDF using jsPDF
document.getElementById("downloadResume").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(18);
  doc.text("Resume", 105, y, { align: "center" });

  y += 10;
  doc.setFontSize(12);
  doc.text("Full Name: " + document.getElementById("fullName").value, 10, y);
  y += 10;
  doc.text("Email: " + document.getElementById("email").value, 10, y);
  y += 10;
  doc.text("Phone: " + document.getElementById("phone").value, 10, y);
  y += 10;
  doc.text("Company: " + document.getElementById("company").value, 10, y);
  y += 10;
  doc.text("Role: " + document.getElementById("role").value, 10, y);
  y += 10;
  doc.text("Duration: " + document.getElementById("duration").value, 10, y);
  y += 10;
  doc.text("College: " + document.getElementById("college").value, 10, y);
  y += 10;
  doc.text("Degree: " + document.getElementById("degree").value, 10, y);
  y += 10;
  doc.text("Year: " + document.getElementById("year").value, 10, y);
  y += 10;
  doc.text("Skills: " + document.getElementById("skill1").value + ", " + document.getElementById("skill2").value + ", " + document.getElementById("skill3").value, 10, y);
  y += 10;
  doc.text("Summary: " + document.getElementById("summaryText").value, 10, y);

  doc.save("Resume.pdf");
});
