import { addBodyPadding, removeBodyPadding } from "../js/app.js";

const appendModal = (type, message) => {
  const modalJSX = `
        <div class="modal" id="modal">
            <div class="modal-inner">
                <div class="modal-header">
                    <button class="modal-close-button" id="modal-close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#14151b">
                            <path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-content">
                    <p class="${type}">${message}</p>
                </div>
            </div>
        </div>
    `;
  if (!document.getElementById("modal")) {
    document.body.insertAdjacentHTML("beforeend", modalJSX);
  }
  addBodyPadding();
  removeModal();
};

const removeModal = () => {
  const modal = document.getElementById("modal");
  const closeModalButton = document.getElementById("modal-close-button");
  closeModalButton.addEventListener("click", () => {
    modal.remove();
    removeBodyPadding();
  });
  setTimeout(() => {
    if (modal) {
      modal.remove();
      removeBodyPadding();
    }
  }, 5000);
};

export default appendModal;
