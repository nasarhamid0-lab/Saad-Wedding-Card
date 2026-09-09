/* =========================================================
   ASIM STEEL WORKS — script.js
   Sections:
   1. Config
   2. Page chrome (loader, header, nav, reveal, footer year)
   3. Static content render (services, why-us, process, reviews)
   4. Gallery / Projects system (CRUD + localStorage + upload)
   5. Lightbox
   6. Contact form (demo)
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIG
   Change these two values to update the site everywhere.
--------------------------------------------------------- */
const WHATSAPP_NUMBER = "923001234567"; // international format, no + or spaces
const WHATSAPP_MESSAGE = "Hello Asim Steel Works, I would like to get a quotation for your steel work services.";

/* ---------------------------------------------------------
   2. PAGE CHROME
--------------------------------------------------------- */
window.addEventListener("load", () => {
  document.getElementById("loader").classList.add("is-hidden");
});

document.getElementById("year").textContent = new Date().getFullYear();

const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
});

const hamburger = document.getElementById("hamburger");
const siteNav = document.getElementById("siteNav");
hamburger.addEventListener("click", () => {
  const open = siteNav.classList.toggle("is-open");
  hamburger.classList.toggle("is-open", open);
  hamburger.setAttribute("aria-expanded", String(open));
});
siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

// WhatsApp float + contact-section link share the same number/message
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.getElementById("whatsappFloat").href = waUrl;
document.getElementById("contactWhatsapp").href = waUrl;

// Scroll-reveal (IntersectionObserver, respects prefers-reduced-motion via CSS)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
});

/* ---------------------------------------------------------
   3. STATIC CONTENT RENDER
--------------------------------------------------------- */
const SERVICES = [
  { title: "Steel Gates", desc: "Heavy-duty sliding and swing gates built for daily use and long-term security.", img: "gate,steel,fabrication" },
  { title: "Main Entrance Gates", desc: "Statement entrance gates combining strength with a refined, welcoming design.", img: "entrance,gate,iron" },
  { title: "Steel Grills", desc: "Custom security grills for doors and openings, fitted precisely to your frame.", img: "window,grill,metal" },
  { title: "Window Grills", desc: "Decorative and protective window grills in classic and modern patterns.", img: "window,security,bars" },
  { title: "Steel Railings", desc: "Balcony and boundary railings finished smooth, safe and rust-resistant.", img: "railing,steel,balcony" },
  { title: "Stair Railings", desc: "Interior and exterior stair railings engineered for grip and stability.", img: "staircase,railing,metal" },
  { title: "Steel Sheds", desc: "Industrial and agricultural sheds framed for weather and heavy loads.", img: "steel,shed,warehouse" },
  { title: "Steel Structures", desc: "Structural steel framing for commercial buildings and large-span roofs.", img: "steel,structure,construction" },
  { title: "Metal Fabrication", desc: "General fabrication — brackets, frames, panels — cut and welded to spec.", img: "metal,fabrication,workshop" },
  { title: "Custom Steel Work", desc: "One-off designs built from a sketch, a photo, or a site measurement.", img: "custom,metalwork,steel" },
  { title: "Welding Work", desc: "MIG, TIG and arc welding for repairs, joins and structural work.", img: "welding,sparks,worker" },
  { title: "Commercial Steel Projects", desc: "Larger-scale fabrication for factories, warehouses and commercial sites.", img: "industrial,warehouse,steel" },
];

const servicesGrid = document.getElementById("servicesGrid");
servicesGrid.innerHTML = SERVICES.map(s => `
  <article class="service-card">
    <img class="service-card__img" src="https://loremflickr.com/500/320/${s.img}" alt="${s.title} by Asim Steel Works" loading="lazy">
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <a href="#contact" class="service-card__link">View Details</a>
  </article>
`).join("");

const WHY_US = [
  { title: "High Quality Materials", desc: "Certified steel sourced from trusted suppliers, checked before it reaches the workshop." },
  { title: "Skilled Workers", desc: "Fabricators and welders with years of hands-on, on-site experience." },
  { title: "Custom Designs", desc: "Every piece designed around your space, not pulled off a shelf." },
  { title: "Strong & Durable Work", desc: "Joints and frames built to carry real, everyday load." },
  { title: "Affordable Pricing", desc: "Transparent quotes with no hidden costs after the job starts." },
  { title: "On-Time Completion", desc: "Projects scheduled and delivered against a clear timeline." },
  { title: "Professional Finishing", desc: "Primer, paint and edge-work that holds up to weather and time." },
  { title: "Customer Satisfaction", desc: "We stay involved until the installation is right, not just done." },
];
document.getElementById("whyUsGrid").innerHTML = WHY_US.map(w => `
  <div class="why-card">
    <svg class="why-card__icon" viewBox="0 0 40 40"><path d="M20 4 L34 12 L34 28 L20 36 L6 28 L6 12 Z"/><path d="M20 4 V36 M6 12 L34 28 M34 12 L6 28"/></svg>
    <h3>${w.title}</h3>
    <p>${w.desc}</p>
  </div>
`).join("");

const PROCESS = [
  { title: "Contact Us", desc: "Call, message, or send an inquiry with what you need built." },
  { title: "Discuss Your Design", desc: "We visit or review measurements and agree on design, material and price." },
  { title: "Fabrication", desc: "Your piece is cut, welded and finished in our workshop." },
  { title: "Installation & Delivery", desc: "We deliver and install on site, and walk you through the finished work." },
];
document.getElementById("processList").innerHTML = PROCESS.map((p, i) => `
  <li class="process__step">
    <div class="process__num">${String(i + 1).padStart(2, "0")}</div>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
  </li>
`).join("");

const REVIEWS = [
  { name: "Ahmed Raza", role: "Homeowner, Lahore", rating: 5, text: "The main gate they built for our house is exactly what we sketched — solid, smooth to open, and it still looks new two years on.", avatar: "man,portrait" },
  { name: "Sana Khalid", role: "Business Owner, Faisalabad", rating: 5, text: "We needed a warehouse structure fast. Asim Steel Works kept to the timeline and the welding quality passed our engineer's inspection.", avatar: "woman,portrait" },
  { name: "Bilal Hussain", role: "Architect, Karachi", rating: 4, text: "Reliable for custom railing designs. Communication during fabrication could be quicker, but the finished work is always clean.", avatar: "man,face" },
];
document.getElementById("reviewsGrid").innerHTML = REVIEWS.map(r => `
  <div class="review-card">
    <div class="review-card__stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
    <p>"${r.text}"</p>
    <div class="review-card__person">
      <img src="https://loremflickr.com/80/80/${r.avatar}" alt="${r.name}" loading="lazy">
      <div><strong>${r.name}</strong><span>${r.role}</span></div>
    </div>
  </div>
`).join("");

/* ---------------------------------------------------------
   4. GALLERY / PROJECTS SYSTEM
   Demo storage: browser localStorage, keyed by STORAGE_KEY.
   Swap-out point for a real backend:
   - Replace `loadProjects()` / `saveProjects()` with API calls.
   - Replace `readFilesAsImages()` with an upload to
     Firebase Storage / Supabase Storage / Cloudinary, and
     store the returned URLs instead of base64 data URIs.
--------------------------------------------------------- */
const STORAGE_KEY = "asimSteelWorks.projects.v1";

const SEED_PROJECTS = [
  { id: "seed-1", title: "Sliding Entrance Gate — DHA Phase 6", category: "Gates", description: "Twin-leaf sliding gate with powder-coated finish and motorised track.", images: ["https://loremflickr.com/700/520/steel,gate,entrance"] },
  { id: "seed-2", title: "Decorative Window Grills — Model Town", category: "Grills", description: "Custom pattern grills fitted across an eight-window facade.", images: ["https://loremflickr.com/700/520/window,grill,house"] },
  { id: "seed-3", title: "Balcony Railing Set — Bahria Town", category: "Railings", description: "Powder-coated balcony railings with a slim vertical-bar design.", images: ["https://loremflickr.com/700/520/balcony,railing,modern"] },
  { id: "seed-4", title: "Agricultural Storage Shed — Sheikhupura", category: "Sheds", description: "Clear-span steel shed frame for grain storage, built for wind load.", images: ["https://loremflickr.com/700/520/steel,shed,farm"] },
  { id: "seed-5", title: "Warehouse Roof Structure — Sundar Estate", category: "Steel Structures", description: "Structural steel trusses for a 12,000 sq. ft warehouse roof.", images: ["https://loremflickr.com/700/520/steel,structure,roof"] },
  { id: "seed-6", title: "Site Welding & Repairs — Kot Lakhpat", category: "Welding", description: "On-site structural repair welding for an existing factory frame.", images: ["https://loremflickr.com/700/520/welding,industrial,worker"] },
  { id: "seed-7", title: "Spiral Staircase — Custom Residence", category: "Custom Projects", description: "Bespoke spiral staircase, fully fabricated and finished in-house.", images: ["https://loremflickr.com/700/520/spiral,staircase,metal"] },
  { id: "seed-8", title: "Stair Railing — Commercial Plaza", category: "Railings", description: "Handrail and baluster set for a three-floor commercial staircase.", images: ["https://loremflickr.com/700/520/stair,railing,commercial"] },
  { id: "seed-9", title: "Main Gate & Boundary Grill — Johar Town", category: "Gates", description: "Matching main gate and boundary wall grill, single design language.", images: ["https://loremflickr.com/700/520/iron,gate,boundary"] },
];

function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not read saved projects, starting fresh.", e);
  }
  saveProjects(SEED_PROJECTS);
  return SEED_PROJECTS.slice();
}

function saveProjects(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Could not save projects (storage may be full).", e);
    alert("Your browser storage is full. Try removing an older project before adding new photos.");
  }
}

let projects = loadProjects();
let activeFilter = "all";
let searchTerm = "";
let lightboxImages = [];
let lightboxIndex = 0;

const galleryGrid = document.getElementById("galleryGrid");
const galleryEmpty = document.getElementById("galleryEmpty");

function renderGallery() {
  const filtered = projects.filter(p => {
    const matchesFilter = activeFilter === "all" || p.category === activeFilter;
    const matchesSearch = !searchTerm ||
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  galleryEmpty.hidden = filtered.length !== 0;
  galleryGrid.innerHTML = filtered.map(p => `
    <article class="project-card" data-id="${p.id}">
      <div class="project-card__media" data-action="view">
        <span class="project-card__cat">${p.category}</span>
        <img src="${p.images[0] || ''}" alt="${p.title}" loading="lazy">
      </div>
      <div class="project-card__body">
        <h3>${p.title}</h3>
        <p>${p.description || ""}</p>
        <div class="project-card__actions">
          <button class="project-card__view" data-action="view">View Project</button>
          <div class="project-card__tools">
            <button class="icon-btn" data-action="edit" aria-label="Edit project">✎</button>
            <button class="icon-btn icon-btn--danger" data-action="delete" aria-label="Delete project">🗑</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}
renderGallery();

// Filters
document.getElementById("galleryFilters").addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll("#galleryFilters .chip").forEach(c => c.classList.remove("is-active"));
  btn.classList.add("is-active");
  activeFilter = btn.dataset.filter;
  renderGallery();
});

// Search
document.getElementById("gallerySearch").addEventListener("input", (e) => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderGallery();
});

// Card actions: view / edit / delete
galleryGrid.addEventListener("click", (e) => {
  const actionEl = e.target.closest("[data-action]");
  if (!actionEl) return;
  const card = e.target.closest(".project-card");
  const id = card.dataset.id;
  const project = projects.find(p => p.id === id);
  if (!project) return;

  const action = actionEl.dataset.action;
  if (action === "view") {
    openLightbox(project.images, project.title);
  } else if (action === "edit") {
    openProjectModal(project);
  } else if (action === "delete") {
    if (confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      projects = projects.filter(p => p.id !== id);
      saveProjects(projects);
      renderGallery();
    }
  }
});

/* ---- Add / Edit modal ---- */
const modal = document.getElementById("projectModal");
const projectForm = document.getElementById("projectForm");
const modalTitle = document.getElementById("modalTitle");
const modalPreview = document.getElementById("modalPreview");
let pendingImages = [];

function openProjectModal(project = null) {
  projectForm.reset();
  modalPreview.innerHTML = "";
  pendingImages = project ? project.images.slice() : [];
  renderModalPreview();

  document.getElementById("pf-id").value = project ? project.id : "";
  document.getElementById("pf-title").value = project ? project.title : "";
  document.getElementById("pf-category").value = project ? project.category : "Gates";
  document.getElementById("pf-description").value = project ? project.description : "";
  modalTitle.textContent = project ? "Edit Project" : "Add Project";

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.getElementById("addProjectBtn").addEventListener("click", () => openProjectModal());
document.getElementById("modalClose").addEventListener("click", closeProjectModal);
document.getElementById("modalCancel").addEventListener("click", closeProjectModal);
document.getElementById("modalBackdrop").addEventListener("click", closeProjectModal);

function renderModalPreview() {
  modalPreview.innerHTML = pendingImages.map((src, i) =>
    `<img src="${src}" alt="Preview ${i + 1}">`
  ).join("");
}

// Easy image upload: read selected files, downscale, convert to
// data URLs for this frontend demo. Kept as its own function so it
// can be swapped for a real upload (Firebase/Supabase/Cloudinary)
// without touching the rest of the form logic.
function readFilesAsImages(fileList) {
  const files = Array.from(fileList).filter(f =>
    ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(f.type)
  );
  return Promise.all(files.map(readAndDownscaleImage));
}

function readAndDownscaleImage(file) {
  const MAX_WIDTH = 1200;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_WIDTH / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.getElementById("pf-images").addEventListener("change", async (e) => {
  if (!e.target.files.length) return;
  const newImages = await readFilesAsImages(e.target.files);
  pendingImages = pendingImages.concat(newImages);
  renderModalPreview();
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("pf-id").value;
  const title = document.getElementById("pf-title").value.trim();
  const category = document.getElementById("pf-category").value;
  const description = document.getElementById("pf-description").value.trim();

  if (!title) return;
  const images = pendingImages.length ? pendingImages : ["https://loremflickr.com/700/520/steel,fabrication"];

  if (id) {
    const idx = projects.findIndex(p => p.id === id);
    if (idx !== -1) projects[idx] = { ...projects[idx], title, category, description, images };
  } else {
    projects.unshift({ id: "p-" + Date.now(), title, category, description, images });
  }
  saveProjects(projects);
  renderGallery();
  closeProjectModal();
});

/* ---------------------------------------------------------
   5. LIGHTBOX
--------------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(images, caption) {
  lightboxImages = images.length ? images : ["https://loremflickr.com/700/520/steel,fabrication"];
  lightboxIndex = 0;
  lightboxCaption.textContent = caption || "";
  updateLightboxImage();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}
function updateLightboxImage() {
  lightboxImg.src = lightboxImages[lightboxIndex];
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.getElementById("lightboxPrev").addEventListener("click", () => {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
});
document.getElementById("lightboxNext").addEventListener("click", () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightboxImage();
});
document.addEventListener("keydown", (e) => {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
  if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
});

/* ---------------------------------------------------------
   6. CONTACT FORM (frontend demo — no backend wired up)
--------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");
const contactNote = document.getElementById("contactNote");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    contactNote.textContent = "Please fill in your name, phone and message.";
    contactNote.style.color = "var(--danger)";
    return;
  }
  contactNote.textContent = "Thanks — your inquiry has been noted. We'll contact you shortly.";
  contactNote.style.color = "var(--gold-light)";
  contactForm.reset();
});
