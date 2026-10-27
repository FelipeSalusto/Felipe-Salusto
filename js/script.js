// E-mail que receberá as mensagens
const EMAIL_DESTINO = "felipesalusto2.0@gmail.com";

// Menu mobile
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
  })
);

// Animação ao rolar
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Formulário: abre o app de e-mail com a mensagem preenchida
const form = document.getElementById("contact-form");
const errorEl = form.querySelector(".form-error");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) { errorEl.textContent = "Preencha todos os campos."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errorEl.textContent = "Informe um e-mail válido."; return; }
  errorEl.textContent = "";

  const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
  const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
  window.location.href = `mailto:${EMAIL_DESTINO}?subject=${subject}&body=${body}`;
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
