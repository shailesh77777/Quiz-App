# Quiz App (React + Vite)

A clean, responsive Quiz App built with React functional components and hooks. 
- One question at a time with four options
- Score tracking + Results page
- Progress indicator and 30s timer per question
- React Router routes: `/quiz` and `/results`

## 🚀 Quick Start

```bash
# 1) Extract the zip
cd quiz-app-starter

# 2) Install dependencies
npm install

# 3) Start dev server
npm run dev
```

Open the printed local URL in your browser.

## 🧱 Project Structure

```
src/
  components/
    ProgressBar.jsx
    Question.jsx
    Quiz.jsx
    Results.jsx
  data/
    questions.json
  App.jsx
  main.jsx
  styles.css
```

## 📝 Notes

- Questions are loaded from `src/data/questions.json`. Replace with your own dataset or wire up Open Trivia DB.
- Basic edge cases covered: prevent next without selection, timer auto-lock.
- Results are passed via `sessionStorage` so a refresh on `/results` still has data.

## 🛠 Tech

- React 18, React Router 6
- Vite 5 (fast dev/build)

## 📦 Build

```bash
npm run build
npm run preview
```

## ✅ What to improve next

- Add difficulty selection and dynamic fetch from Open Trivia DB.
- Persist high scores via `localStorage`.
- A11y: focus management and keyboard shortcuts (1–4 to select).

Happy hacking!
