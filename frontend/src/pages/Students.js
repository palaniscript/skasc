import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/students';

function Students() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ name: '', gender: '', mobile: '', email: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchStudents = async () => {
        const res = await axios.get(API_URL);
        setStudents(res.data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${API_URL}/${editingId}`, formData);
        } else {
            await axios.post(API_URL, formData);
        }
        setFormData({ name: '', gender: '', mobile: '', email: '' });
        setEditingId(null);
        fetchStudents();
    };

    const handleEdit = (student) => {
        setFormData(student);
        setEditingId(student._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
    };

    return (
        <div>
      <h2>🧑‍🎓 Students Management</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">{editingId ? 'Update' : 'Add'} Student</button>
      </form>

      <table>
        <thead>
          <tr><th>Name</th><th>Gender</th><th>Mobile</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.gender}</td>
              <td>{s.mobile}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button> &nbsp;
                <button className="del" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
}

export default Students;