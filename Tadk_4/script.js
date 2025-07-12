 
 
    //---------------------side-menu-bar----------------->
    
function sidebarShow() {
    document.querySelector(".sidebar").classList.add("open");
}
function sidebarClose() {
    document.querySelector(".sidebar").classList.remove("open");
}
    //------------------ Dynamic Role Typing------------->

const roles = [
    "Data Scientist",
    "Front End Developer",
    "Problem Solver",
    "Fresher"
];
let roleIndex = 0, charIndex = 0, typing = true;
const dynamicRole = document.getElementById('dynamic-role');
function typeRole() {
    if (typing) {
        if (charIndex < roles[roleIndex].length) {
            dynamicRole.textContent += roles[roleIndex][charIndex++];
            setTimeout(typeRole, 80);
        } else {
            typing = false;
            setTimeout(typeRole, 1200);
        }
    } else {
        if (charIndex > 0) {
            dynamicRole.textContent = roles[roleIndex].substring(0, --charIndex);
            setTimeout(typeRole, 30);
        } else {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 200);
        }
    }
}
typeRole();

// ------------Skill-page----------->

let i=0;
let j=0;
const Topic_skill=[
    "Programming Languages & Tools",
    "Web Development"
];
let pro_skill=["Python","Java","Git","GitHub","VS Code"];
let web_skill=["HTML 5","CSS 3","JavaScript","React JS","MySQL"];
const skills=[pro_skill,web_skill];
let pro= document.querySelector(".programming");
let web= document.querySelector(".web");
const arr=[pro,web];

for (i = 0; i<2; i++){
    arr[i].innerHTML+=`
    <div class="ToS">
        <h2>${Topic_skill[i]}</h2>
    </div>
`;
    for(j=0; j<5; j++){
        arr[i].innerHTML+=`
    <div class="sk">
        <h3>${skills[i][j]}</h3>
        <p>intermediate</p>
    </div>
`;
    }
}

// ------------------project-page--------------->

const projects = [
      {
        title: "Restuarant Web APP",
        description: "A responsive restaurant website with menu display and table reservation features, built for a smooth user experience.",
        techstack:['html', 'css', 'javaScript', 'git & github'],
        link: "https://github.com/msanjai2005/Restuarant"
      },
      {
        title: "Recipe App",
        description: "A simple and responsive app to browse and view recipes with ingredients and instructions. Built for easy meal planning and inspiration.",
        techstack:['html', 'css', 'javaScript', 'git & github'],
        link:"https://github.com/msanjai2005/RecipeApp" 
      },
      {
        title: "Guess The Number Game",
        description: "An interactive number guessing game with instant feedback. Enhances logical thinking in a fun and engaging way.",
        techstack:['html', 'css', 'javaScript', 'git & github'],
        link:"https://github.com/msanjai2005/GuessTheNumber" 
      },
      {
        title: "Rock-Paper-Scissor Game",
        description: "A classic rock-paper-scissors game with score tracking. Features clean UI and simple game logic for quick play.",
        techstack:['html', 'css', 'javaScript', 'git & github'],
        link:"https://github.com/msanjai2005/Rock_Paper_Scissors"
      },
      {
        title: "To-Do-List App",
        description: "A lightweight app to manage daily tasks with add, delete, and mark-complete features. Designed for productivity and ease of use.",
        techstack:['html', 'css', 'javaScript', 'git & github'],
        link:"https://github.com/msanjai2005/ToDoList" 
      },
      {
        title: "Calculator App",
        description: "A basic calculator for performing arithmetic operations. Built with a clean interface and real-time input handling.",
        techstack:["html", 'css', 'javaScript', 'git & github'],
        link:"https://github.com/msanjai2005/SimpleCalculator"
      }
    ];

    const container = document.getElementById("projects-container");

    const projectHTML = projects.map(project => `
      <div class="project">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p class="techstack">Tech Stack: <br/>${project.techstack.map(tech => `<button>${tech}</button>`).join(' ')}</p>
        <button class='btn'><a href="${project.link}" target=_blank>Learn more <i class="fa-solid fa-arrow-right"></i></a></button>
      </div>
    `).join("");

    container.innerHTML = projectHTML;

// ---------------------Contact-------------------------->

document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.sendForm("service_8nkkk6j", "template_yepo30y", this)
        .then(() => {
          alert("Message sent successfully!");
          this.reset(); // Clear form
        }, (err) => {
          alert("Failed to send message. Error: " + JSON.stringify(err));
      });
});