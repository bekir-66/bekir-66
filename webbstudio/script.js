// Ersätt den tomma texten med din egen e-postadress innan du publicerar sidan.
const contactEmail = '';
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    status.textContent = 'Kontaktformuläret är inte aktiverat ännu. Webbplatsens ägare behöver lägga in sin e-postadress.';
    return;
  }
  const name = document.querySelector('#name').value.trim();
  const business = document.querySelector('#business').value.trim();
  const message = document.querySelector('#message').value.trim();
  if (!name || !business || !message) {
    status.textContent = 'Fyll i alla fält innan du fortsätter.';
    return;
  }
  const subject = `Offertförfrågan från ${name}`;
  const body = `Hej!\n\nJag heter ${name} och min verksamhet heter ${business}.\n\n${message}\n\nVänliga hälsningar\n${name}`;
  status.textContent = 'Ditt e-postprogram öppnas. Granska och skicka mejlet där.';
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
