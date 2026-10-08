'use strict';

// Menu para celular.
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');

document.documentElement.classList.add('js');
menuButton.hidden = false;

function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menu.classList.toggle('is-open', isOpen);
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu();
    menuButton.focus();
  }
});

window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

// Encaminha o contato sem tirar a pessoa da página.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = document.querySelector('#contact-status');
  let submitting = false;

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || !contactForm.reportValidity()) return;

    const fields = Object.fromEntries(new FormData(contactForm));
    if (fields._honey) return;
    fields.name = fields.name.trim();
    fields.email = fields.email.trim();
    fields.message = fields.message.trim();
    if (!fields.name || !fields.message) {
      status.dataset.state = 'error';
      status.textContent = 'Preencha seu nome e sua mensagem.';
      return;
    }
    if (location.protocol === 'http:' || location.protocol === 'https:') {
      fields._url = location.href;
    }

    submitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando…';
    contactForm.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending';
    status.textContent = 'Enviando sua mensagem…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch('https://formsubmit.co/ajax/batnode.services@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(fields),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('Falha no serviço de envio');
      const result = await response.json();
      if (result.success !== true && result.success !== 'true') {
        throw new Error('Envio não confirmado');
      }
      status.dataset.state = 'success';
      status.textContent = 'Mensagem enviada! Entraremos em contato pelo email informado.';
      contactForm.reset();
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'Não foi possível confirmar o envio. Seus dados foram mantidos. Tente novamente ou escreva para batnode.services@gmail.com.';
    } finally {
      clearTimeout(timeout);
      submitting = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar mensagem';
      contactForm.removeAttribute('aria-busy');
    }
  });
}
