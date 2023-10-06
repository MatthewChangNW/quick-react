import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    // Check if the click occurred outside the modal content
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={handleOverlayClick}></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              {/* Modal header */}
              <div className="modal-header">
                <div className='flex justify-between flex-row'>
                    <h3 className="text-2xl font-semibold">Selected Courses</h3>
                    <button
                    className="modal-close"
                    onClick={closeModal}
                    aria-label="Close modal"
                    >
                    &times;
                    </button>
                </div>

              </div>
              {/* Modal body */}
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
