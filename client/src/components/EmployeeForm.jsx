import React from "react";

const EmployeeForm = ({
  formData,
  handleChange,
  handleSubmit,
  closeModal,
  editId
}) => {
  return (
    <div className="modalOverlay">
      <div className="modal">
        <h3>{editId ? "Edit Employee" : "Add Employee"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Employee Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Employee Role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <div className="modalBtns">
            <button type="submit">
              {editId ? "Update" : "Submit"}
            </button>

            <button
              type="button"
              className="cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
