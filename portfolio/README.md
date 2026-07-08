# Aayushi Kashyap — Portfolio

A world-class, premium, futuristic personal portfolio website built with **plain HTML, CSS and JavaScript** — no build step, no framework. Just open `index.html` and go.

## ✨ Features

- Glassmorphism UI with frosted glass cards & animated gradient borders
- Animated hero with typing effect (Aspiring Software Engineer / Full Stack Developer / Problem Solver)
- Dark / Light theme toggle with saved preference
- Cursor glow, animated blob backgrounds, gradient mesh, scroll progress bar
- Smooth reveal animations on scroll
- Sections: Hero, About + Timeline, Skills (animated progress bars), Projects,
  Achievements, Certifications (with preview modal), Coding Profiles + GitHub
  contribution graph, Resume + Experience, Contact form, Footer
- Fully responsive (mobile / tablet / desktop)
- ATS-friendly resume badge, semantic HTML, accessible labels
- Zero dependencies. Zero build. 100% editable.

## 📁 Folder Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/          ← put profile photo + project screenshots here
│   ├── icons/           ← favicon, custom icons
│   ├── certificates/    ← certificate PDFs / images
│   └── resume.pdf       ← replace with your actual resume
├── projects/            ← optional: link out to per-project folders
└── README.md
```

## 🚀 How to run

1. Extract the ZIP.
2. Open `index.html` in your browser. That's it.
3. To develop with live reload (optional): install VS Code + "Live Server" extension → right-click `index.html` → "Open with Live Server".

## 🛠 How to customize

### Personal info
Open `index.html` and search for:
- `Aayushi Kashyap` — replace with your name
- Social links (`linkedin.com/in/aayushi-kashyap`, `github.com/aayushi-kashyap`, `leetcode.com/aayushi-kashyap`, `codolio.com/aayushi-kashyap`, `aayushi@example.com`) — update to your handles
- CGPA (`8.54`), Graduation year (`2028`), Projects/Certifications/Hackathons counts

### Profile photo
Drop your photo at `assets/images/profile.jpg` and replace the `.avatar` inner content in `index.html`:
```html
<div class="avatar">
  <img src="assets/images/profile.jpg" alt="Aayushi Kashyap" style="width:100%;height:100%;object-fit:cover" />
</div>
```

### Resume
Replace `assets/resume.pdf` with your actual PDF (keep the same filename or update the `href` in `index.html`).

### Skills / Projects / Achievements / Certifications
All data lives inside `script.js` in these arrays:
- `skillsData`
- `projectsData`
- `achData`
- `certData`
- `profilesData`

Edit the arrays and the cards regenerate automatically.

### Colors / theme
Design tokens live in `style.css` under `:root { ... }`:
```css
--primary: #b56bff;
--primary-2: #6ab7ff;
--accent: #74f3d3;
```
Change these three and the whole gradient system updates.

## 📜 License

Personal use — feel free to fork and adapt for your own portfolio.

Made with care by Aayushi Kashyap ✨
