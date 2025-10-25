import { skills, projects, work } from "./data.js"; 
// ⚠️ Make sure this script is included in your HTML as: 
// <script type="module" src="app.js"></script>

// ✅ Fetch GitHub user info
fetch("https://api.github.com/users/kamal126")
  .then(res => res.json())
  .then(data => {
    const imageUrl = data.avatar_url;
    const username = data.login;
    const url = data.html_url;
    const repo = data.public_repos;

    // Profile image
    const imgElement = document.querySelector(".profileImg");
    if (imgElement) imgElement.src = imageUrl;
  })
  .catch(error => console.error("Error fetching GitHub data:", error));

// ✅ Render skills
const skillsContainer = document.querySelector("#skills .grid-container");
if (skillsContainer) {
  skillsContainer.innerHTML = skills
    .map(
      item => `
        <div class="item">
          <img src="${item.img}" alt="${item.name}" />
          <h3>${item.name}</h3>
        </div>
      `
    )
    .join("");
}

// ✅ Render projects
const projectsContainer = document.querySelector("#portfolio .project-container");
if (projectsContainer) {
  projectsContainer.innerHTML = projects
    .map(
      item => `
        <div class="project">
          <img src="${item.img}" alt="${item.name}" />
          <div class="card">
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="tags">
              ${item.tag.map(tag => `<span>${tag}</span>`).join("")}
            </div>
            <div class="links">
              <button onclick="window.open('${item.url}', '_blank')">View Project</button>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

// ✅ Render experience (if you have a `work` array defined)
if (typeof work !== "undefined") {
  const exp = document.querySelector("#experience .exp-container");
  if (exp) {
    exp.innerHTML = work
      .map(
        item => `
          <div class="${item.class}">
            <div class="year">${item.start} - ${item.end}</div>
            <div class="name">${item.name}</div>
            <p class="company">${item.company} | ${item.location}</p>
            <p class="skills">Skills: ${item.tech.map(skill => `<span>${skill}</span>`).join(", ")}</p>
            <p class="work">${item.desc}</p>
            <div class="gola"></div>
          </div>
        `
      )
      .join("");

    const newDiv = document.createElement("div");
    newDiv.className = "verticalLine";
    exp.appendChild(newDiv);
  }
}



// resume hide/show
const togglebtn = document.getElementById("toggleBtn");
const pdf = document.querySelector(".pdf");
const pdfcontainer = document.querySelector(".pdf-container");
const pcstyle = pdfcontainer.style;


togglebtn.onclick = () =>{
  if(pdf.style.display === "none"){
    pdf.style.display = "block";
    pcstyle.height = "800px";
    pcstyle.width = "100%";
    pcstyle.maxWidth = "800px";
    pcstyle.border = "2px solid #38bdf8";
    pcstyle.borderRadius = "10px";
    pcstyle.overflow = "auto";
    togglebtn.textContent = "Hide Resume";
  } else{
    pdf.style.display = "none";
    togglebtn.textContent = "Show Resume";
    pcstyle.height = "0px";
    pcstyle.width = "0%";
    pcstyle.maxWidth = "0px";
    pcstyle.border = "none";
  }
}



// email
// const form = document.querySelector(".connect-form");
// const tempMsg = document.querySelector("#temp-message");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Show temporary message
//   tempMsg.style.display = "block";
//   form.input = "";
//   // Reset the form
//   form.reset();

//   // Hide the message after 5 seconds
//   setTimeout(() => {
//     tempMsg.style.display = "none";
//   }, 5000);
// });
const form = document.querySelector(".connect-form");
const tempMsg = document.querySelector("#temp-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // default submit roko

  const formData = new FormData(form);

  try {
    // Form data send to Formspree using fetch
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Show temporary message
      tempMsg.style.display = "block";

      // Optional: form reset karna agar chaho
      form.reset();

      setTimeout(() => {
        tempMsg.style.display = "none";
      }, 5000);
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  } catch (error) {
    alert("Error submitting form. Please try again later.");
    console.error(error);
  }
});




// visited count
// Visitor Counter using LocalStorage + Approx Public Counter Effect
let visitCount = localStorage.getItem("visitCount");

if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("visitCount", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("visitCount", visitCount);
}

document.getElementById("visitorCount").innerText = visitCount;
