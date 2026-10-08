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

// Usa o POST nativo para permitir a verificação e a confirmação do FormSubmit.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const status = document.querySelector('#contact-status');
  let submitting = false;

  function restoreContactForm() {
    submitting = false;
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar mensagem';
    contactForm.removeAttribute('aria-busy');
    status.textContent = '';
    delete status.dataset.state;
  }

  // O navegador pode restaurar o botão desabilitado ao voltar da página do serviço.
  window.addEventListener('pageshow', restoreContactForm);

  contactForm.addEventListener('submit', event => {
    if (submitting) {
      event.preventDefault();
      return;
    }

    const name = contactForm.elements.namedItem('name');
    const email = contactForm.elements.namedItem('email');
    const message = contactForm.elements.namedItem('message');
    name.value = name.value.trim();
    email.value = email.value.trim();
    message.value = message.value.trim();

    if (contactForm.elements.namedItem('_honey').value || !contactForm.reportValidity()) {
      event.preventDefault();
      return;
    }

    if (location.protocol !== 'http:' && location.protocol !== 'https:') {
      event.preventDefault();
      status.dataset.state = 'error';
      status.textContent = 'Para enviar, abra o site publicado ou use um servidor local (http://localhost). O formulário não funciona ao abrir o arquivo HTML diretamente.';
      return;
    }

    // Não interceptar o POST nem reenviar automaticamente: o serviço confirma o resultado.
    submitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Continuando…';
    contactForm.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending';
    status.textContent = 'Continuando para a verificação e confirmação do envio…';
  });
}
