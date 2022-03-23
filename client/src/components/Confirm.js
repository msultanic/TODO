import React from "react";

const Confirm = ({ toggleDialogModal, position }) => {
  return (
    <div
      id="confirmDialog"
      style={{
        top: position.top + 22,
        // right: position.right - 100,
        bottom: position.bottom,
        left: position.left - 70,
      }}
    >
      <p>Are you sure</p>
      <div className="modal_button_container">
        <span className="modal_button" onClick={() => toggleDialogModal(true)}>
          Yes
        </span>
        <span className="modal_button" onClick={() => toggleDialogModal(false)}>
          No
        </span>
      </div>
    </div>
  );
};

export default Confirm;
