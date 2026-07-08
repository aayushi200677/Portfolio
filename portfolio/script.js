/* ============================================
   Aayushi Kashyap — Portfolio JS
   ============================================ */

/* ---------- Preloader ---------- */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader").classList.add("hidden"), 700);
});

/* ---------- Year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Theme toggle ---------- */
const themeBtn = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") document.body.classList.add("light");
themeBtn.textContent = savedTheme === "light" ? "☀" : "🌙";
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  themeBtn.textContent = isLight ? "☀" : "🌙";
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  })
);

/* ---------- Cursor glow ---------- */
const cursor = document.getElementById("cursor-glow");
window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ---------- Scroll progress + active nav ---------- */
const progressBar = document.getElementById("scroll-progress");
const sections = [...document.querySelectorAll("section[id]")];
const navAs = [...document.querySelectorAll(".nav-links a")];
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${scrollTop / height})`;

  let current = "home";
  for (const s of sections) {
    if (s.getBoundingClientRect().top < 140) current = s.id;
  }
  navAs.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
});

/* ---------- Typewriter ---------- */
(function typewriter() {
  const words = ["Aspiring Software Engineer", "Full Stack Developer", "Problem Solver"];
  const el = document.getElementById("typewriter");
  let i = 0, text = "", del = false;
  function tick() {
    const current = words[i % words.length];
    if (!del) {
      text = current.slice(0, text.length + 1);
      el.textContent = text;
      if (text === current) { del = true; setTimeout(tick, 1400); return; }
      setTimeout(tick, 90);
    } else {
      text = current.slice(0, text.length - 1);
      el.textContent = text;
      if (text === "") { del = false; i++; }
      setTimeout(tick, 40);
    }
  }
  tick();
})();

/* ---------- Reveal on scroll ---------- */
const revealables = document.querySelectorAll(".section, .stat, .skill-card, .project-card, .ach-card, .cert-card, .profile-card");
revealables.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.1, rootMargin: "-40px" }
);
revealables.forEach((el) => io.observe(el));

/* ---------- Counter animation ---------- */
const counterIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0");
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      let start = null;
      function step(t) {
        if (start === null) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 0.5 - Math.cos(Math.PI * p) / 2;
        const val = target * eased;
        el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIO.unobserve(el);
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".stat-num").forEach((el) => counterIO.observe(el));

/* ============ DATA + RENDERERS ============ */

/* Skills */
const skillsData = [
  { icon: "💻", title: "Languages", items: [["Java", 88], ["Python", 82], ["JavaScript", 80], ["SQL", 78]] },
  { icon: "🎨", title: "Frontend", items: [["HTML", 92], ["CSS", 88], ["JavaScript", 80], ["Responsive Design", 85]] },
  { icon: "⚙️", title: "Backend", items: [["Node.js", 60], ["Express", 55], ["REST APIs", 65]] },
  { icon: "🗄️", title: "Database", items: [["MySQL", 78], ["Schema Design", 70]] },
  { icon: "🔧", title: "Developer Tools", items: [["Git", 85], ["GitHub", 88], ["VS Code", 90], ["Postman", 75], ["Vercel", 80]] },
  { icon: "📚", title: "Core Subjects", items: [["DSA", 82], ["OOP", 85], ["DBMS", 80], ["OS", 72], ["Computer Networks", 70], ["SDLC", 75]] },
];
const skillsGrid = document.getElementById("skills-grid");
skillsData.forEach((s) => {
  const card = document.createElement("div");
  card.className = "glass gradient-border skill-card";
  card.innerHTML = `
    <div class="skill-head">
      <span class="skill-ico">${s.icon}</span>
      <span class="skill-name">${s.title}</span>
    </div>
    <ul class="skill-list">
      ${s.items.map(([n, p]) => `
        <li>
          <div class="skill-item-head"><span>${n}</span><span>${p}%</span></div>
          <div class="skill-bar"><div class="skill-fill" data-pct="${p}"></div></div>
        </li>`).join("")}
    </ul>`;
  skillsGrid.appendChild(card);
});
// Animate skill bars when visible
const barIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll(".skill-fill").forEach((f) => (f.style.width = f.dataset.pct + "%"));
    barIO.unobserve(e.target);
  });
}, { threshold: 0.2 });
document.querySelectorAll(".skill-card").forEach((c) => barIO.observe(c));

/* Projects */
const projectsData = [
  {
    name: "EmotionScope – AI Sentiment Analyzer",
    tag: "AI • NLP",
    desc: "A real-time text analysis tool that goes beyond basic sentiment — detecting sarcasm, toxicity, slang and emotional intensity.",
    stack: ["HTML", "CSS", "JavaScript", "NLP"],
    features: ["Sentiment analysis", "Sarcasm detection", "Toxicity analysis", "Slang recognition", "Emotional intensity", "Real-time visualization"],
    github: "https://github.com/aayushi-kashyap/emotionscope",
    demo: "#",
  },
  {
    name: "SheCycle – Period Cycle Tracker",
    tag: "Health • Web",
    desc: "A thoughtful period cycle tracker with predictions, reminders and health tips — private, kind and useful.",
    stack: ["HTML", "CSS", "JavaScript"],
    features: ["Cycle prediction", "Health tips", "Smart reminders", "Fully responsive"],
    github: "https://github.com/aayushi-kashyap/shecycle",
    demo: "#",
  },
 
];
const projectsGrid = document.getElementById("projects-grid");
projectsData.forEach((p) => {
  const short = p.name.split("–")[0].trim();
  const card = document.createElement("div");
  card.className = "glass gradient-border project-card";
  card.innerHTML = `
    <div class="project-cover">
      <div class="project-cover-text">
        <div class="project-cover-title grad">${short}</div>
        <div class="project-cover-tag">${p.tag}</div>
      </div>
      ${p.upcoming ? '<span class="project-upcoming">Coming soon</span>' : ""}
    </div>
    <h3 class="project-title">${p.name}</h3>
    <p class="project-desc">${p.desc}</p>
    ${p.features.length ? `<ul class="project-features">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>` : ""}
    <div class="project-stack">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
    <div class="project-actions">
      <a href="${p.github || "#"}" target="_blank" rel="noreferrer" class="btn btn-ghost ${p.upcoming ? "disabled" : ""}">🐙 GitHub</a>
      <a href="${p.demo || "#"}" target="_blank" rel="noreferrer" class="btn btn-primary ${p.upcoming ? "disabled" : ""}">↗ Live Demo</a>
    </div>`;
  projectsGrid.appendChild(card);
});

/* Achievements */
const achData = [
  { icon: "🏆", title: "Dexterix 5.0 Hackathon", desc: "Winner — Best All-Girls Team", tag: "2025" },
  { icon: "🏅", title: "Smart India Hackathon", desc: "Round 1 Qualified", tag: "2025" },
  { icon: "⭐", title: "IEEE Women in Engineering", desc: "Active Participant & Contributor", tag: "2025" },
  
];
const achGrid = document.getElementById("ach-grid");
achData.forEach((a) => {
  const c = document.createElement("div");
  c.className = "glass gradient-border ach-card";
  c.innerHTML = `
    <div class="ach-head"><span class="ach-ico">${a.icon}</span><span class="pill">${a.tag}</span></div>
    <div class="ach-title">${a.title}</div>
    <div class="ach-desc">${a.desc}</div>`;
  achGrid.appendChild(c);
});

/* Certifications */
const certData = [
  { title: "Deloitte Australia Data Analytics", issuer: "Deloitte • Forage", year: "2026" },
  { title: "Oracle SQL Programming", issuer: "Oracle", year: "2025" },
  { title: "Smart India Hackathon Participation", issuer: "MoE, Govt. of India", year: "2025" },
  { title: "IEEE WIE Participation", issuer: "IEEE", year: "2025" },

];
const certGrid = document.getElementById("cert-grid");
const modal = document.getElementById("cert-modal");
const modalTitle = document.getElementById("cert-modal-title");
const modalIssuer = document.getElementById("cert-modal-issuer");
certData.forEach((c) => {
  const b = document.createElement("button");
  b.className = "glass gradient-border cert-card";
  b.innerHTML = `
    <div class="cert-head">
      <span>📄</span>
      ${c.upcoming ? '<span class="pill">In progress</span>' : `<span class="pill">${c.year}</span>`}
    </div>
    <div class="cert-title">${c.title}</div>
    <div class="cert-issuer">${c.issuer}</div>
    <div class="cert-preview-link">👁 Preview</div>`;
  b.addEventListener("click", () => {
    modalTitle.textContent = c.title;
    modalIssuer.textContent = "Issued by " + c.issuer;
    modal.classList.add("open");
  });
  certGrid.appendChild(b);
});
modal.querySelector(".modal-close").addEventListener("click", () => modal.classList.remove("open"));
modal.querySelector(".modal-backdrop").addEventListener("click", () => modal.classList.remove("open"));

/* Profiles */
const profilesData = [
  { icon: "GH", name: "GitHub", handle: "@aayushi-kashyap", stat: " repos", href: "https://github.com/aayushi-kashyap" },
  { icon: "in", name: "LinkedIn", handle: "in/aayushi-kashyap", stat: "300+ network", href: "https://linkedin.com/in/aayushi-kashyap" },
  { icon: "LC", name: "LeetCode", handle: "@aayushi-kashyap", stat: "100+ solved", href: "https://leetcode.com/aayushi-kashyap" },
  { icon: "Co", name: "Codolio", handle: "@aayushi-kashyap", stat: "Ranked profile", href: "https://codolio.com/aayushi-kashyap" },
];
const profilesGrid = document.getElementById("profiles-grid");
profilesData.forEach((p) => {
  const a = document.createElement("a");
  a.href = p.href;
  a.target = "_blank";
  a.rel = "noreferrer";
  a.className = "glass gradient-border profile-card";
  a.innerHTML = `
    <div class="profile-head">
      <span class="profile-ico">${p.icon}</span>
      <div>
        <div class="profile-name">${p.name}</div>
        <div class="profile-handle">${p.handle}</div>
      </div>
      <span class="profile-arrow">→</span>
    </div>
    <div class="profile-stat grad">${p.stat}</div>`;
  profilesGrid.appendChild(a);
});

/* Contact form */
const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendBtn.textContent = "✓ Message sent";
  setTimeout(() => (sendBtn.textContent = "➤ Send message"), 3000);
  form.reset();
});

/* Back to top */
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
