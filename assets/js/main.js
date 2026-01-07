(() => {
  const overlay = document.querySelector('[data-overlay]');
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('show');
    overlay.classList.add('show');
  };
  const closeModal = () => {
    document.querySelectorAll('.modal.show').forEach((modal) => modal.classList.remove('show'));
    overlay.classList.remove('show');
  };
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-modal-target]');
    if (opener) {
      const targetId = opener.getAttribute('data-modal-target');
      openModal(targetId);
    }
    if (event.target.closest('[data-modal-close]') || event.target.matches('[data-overlay]')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
})();

