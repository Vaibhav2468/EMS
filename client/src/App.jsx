import React, { useEffect, useState } from "react";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import API from "./api";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  // ✅ Fetch employees from backend
  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit form (add / update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/employees/${editId}`, formData);
      setEditId(null);
    } else {
      await API.post("/employees", formData);
    }

    fetchEmployees();
    setFormData({ name: "", email: "", role: "" });
    setShowModal(false);
  };

  // edit employee
  const handleEdit = (emp) => {
    setFormData({
      name: emp.name,
      email: emp.email,
      role: emp.role
    });
    setEditId(emp._id);
    setShowModal(true);
  };

  // delete single employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    }
  };

  // delete all employees
  const handleDeleteAll = async () => {
    if (window.confirm("Delete all employees?")) {
      await API.delete("/employees");
      fetchEmployees();
    }
  };

  // close modal
  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: "", email: "", role: "" });
  };

  return (
    <div className="container">
      <h2>Employee Management System</h2>

      <div className="topActions">
        <button className="addBtn" onClick={() => setShowModal(true)}>
          + Add Employee
        </button>

        <button
          className="deleteAll"
          onClick={handleDeleteAll}
          disabled={employees.length === 0}
        >
          Delete All
        </button>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <EmployeeForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          editId={editId}
        />
      )}
    </div>
  );
};

export default App;
