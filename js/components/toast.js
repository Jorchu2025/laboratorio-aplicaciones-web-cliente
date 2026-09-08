export function toast(message) {
  const template = `
    <div class="toast align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  const toastContainer = document.querySelector('.toast-container');
  toastContainer.innerHTML += template;

  const toasts = document.querySelectorAll('.toast');
  const lastToast = toasts[toasts.length - 1];
  const bootstrapToast = new bootstrap.Toast(lastToast, { delay: 3000 });
  bootstrapToast.show();
}