# Pawel Sloboda – Interactive Portfolio

A modern **React + Vite** personal-portfolio that demonstrates my Machine-Learning and Software-Engineering skill-set.  It ships with:

* ⚡ Lightning-fast static front-end (React 18, Vite, Tailwind CSS, Framer-Motion)
* 💬 AI Chatbot powered by **OpenAI** Retrieval-Augmented Generation (RAG)
* 🖼️ Responsive design & dark-mode toggle
* 📱 QR code for instant mobile access
* 📂 Fully-documented project & experience sections (auto-highlighted from chatbot links)
* 📝 Downloadable résumé (PDF) and printable QR code embed
* 📚 Minimalistic Blog section (bonus) – easily add markdown posts
* ☁️ Server-less API functions (Vercel) – no dedicated backend needed

---
## 📑  Table of Contents
1. [Live Demo](#live-demo)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [AI Chatbot](#ai-chatbot)
5. [Blog](#blog)
6. [QR Code](#qr-code)
7. [Deployment on Vercel](#deployment)
8. [Environment Variables](#environment-variables)
9. [Assignment Rubric Mapping](#assignment-rubric-mapping)
10. [License](#license)

---
## 🚀  Live Demo

> Replace with your production URL once deployed.  
> Example: https://pawel-portfolio.vercel.app

Scan the QR-code at the bottom of the page or in the résumé to open it on mobile.

---
## ⚙️  Quick Start
```bash
# 1. clone repo
git clone https://github.com/pawelsloboda5/my-portfolio.git
cd my-portfolio

# 2. install deps
npm install

# 3. local dev – **Vercel Dev** (server-less + front-end)
npx vercel dev      # http://localhost:3000

# OR traditional split setup
npm run dev         # Vite on :5173 (front-end)
# and in another terminal
npx vercel dev      # API functions on :3000 (proxy configured)
```

---
## 🗂️  Project Structure
```
my-portfolio/
├─ api/                 # Vercel server-less functions
│  └─ chat.js           # OpenAI RAG endpoint
├─ public/              # Static assets (built by Vite)
├─ src/
│  ├─ assets/           # Images, icons, GIFs
│  ├─ components/       # React components (Hero, Projects, Blog…)
│  ├─ data/
│  │  └─ aiBotData.json # Skills / projects fed to the chatbot (RAG)
│  ├─ index.css         # Tailwind base + custom CSS
│  └─ main.jsx
├─ .env.local           # **never commit** – holds OPENAI_API_KEY
├─ vite.config.js       # + dev proxy for /api/*
└─ package.json
```

---
## 🤖  AI Chatbot
The floating robot icon opens a chat window.  Messages are posted to `/api/chat` which:
1. Reads `aiBotData.json` (skills, projects, experiences)
2. Builds a *system prompt* that embeds this data (simple RAG)
3. Calls `openai.chat.completions` (model: `gpt-4o-mini`) and streams back a concise answer (2-4 sentences) that *always* positions Pawel as a great fit.
4. Projects / experience titles in the reply are automatically turned into **clickable links** – clicking scrolls to the matching section and pulses the card.

Feel free to swap the model or add embeddings for more advanced RAG.

---
## ✍️  Blog
A new **Blog** section (`#blog`) lives below Experience.  Posts are hard-coded in `src/components/Blog.jsx` for now – add or map to Markdown/MDX later.  The header and mobile menu include a *Blog* anchor.

---
## 📱  QR Code
Generate once with any QR service pointing to your production URL, then drop the PNG into `src/assets/qr.png` and reference it in the footer / résumé.

---
## 🚚  Deployment
1. Push to GitHub.
2. Import into Vercel → "Deploy".
3. Add **Environment Variable** `OPENAI_API_KEY` (Project → Settings → Environment Variables).

Every push to `main` triggers a new build.  API routes & front-end share the same domain, so `/api/chat` just works.

---
## 🔐  Environment Variables
| Variable         | Scope            | Description                   |
|------------------|------------------|-------------------------------|
| `OPENAI_API_KEY` | Server-less only | Secret key for OpenAI API     |

Create `.env.local` at project root:
```ini
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```
Never commit `.env*` files – they are already git-ignored.

---
## 📊  Assignment Rubric 
| Criterion                        | Implementation Details                                                     |
|----------------------------------|----------------------------------------------------------------------------|
| Website Design             | Responsive Tailwind UI, dark/light mode, smooth-scroll nav                |
| Chatbot Functionality      | OpenAI RAG, clickable links, loading animation                             |
| QR Code Usage              | QR image shown in footer + résumé                                          |
| GitHub Integration         | Source hosted publicly with README (this file) + project links             |
| Resume Quality            | PDF link in Hero + Header; downloadable                                    |
| **Bonus** NLP Chatbot            | Yes – OpenAI LLM with embedded portfolio context                           |
| **Bonus** Blog                   | Blog section with minimalistic, modern styling                             |

---
## 📝  License
MIT – do whatever you like, just keep the attribution link back to this repo.
