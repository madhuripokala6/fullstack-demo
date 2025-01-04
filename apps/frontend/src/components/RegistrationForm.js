import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    teamName: '',
    idea: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios.get(`${getApiBaseUrl()}/api/registrations/${id}`)
        .then((res) => setForm(res.data))
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Error fetching registration details');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone Number is required';
    if (!form.idea.trim()) newErrors.idea = 'Idea is required';
    else if (form.idea.length < 10) newErrors.idea = 'Idea must be at least 10 characters long';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors before submitting');
      return;
    }

    const apiCall = id
      ? axios.put(`${getApiBaseUrl()}/api/registrations/${id}`, form)
      : axios.post(`${getApiBaseUrl()}/api/registrations`, form);

    apiCall
      .then(() => {
        toast.success('Registration saved successfully');
        navigate('/');
      })
      .catch(() => toast.error('Error saving registration'));
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Edit Registration' : 'Add New Registration'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name <span className="required">*</span>
          </label>
          <input
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>
            Email <span className="required">*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>
            Phone Number <span className="required">*</span>
          </label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label>Team Name (optional)</label>
          <input
            name="teamName"
            placeholder="Enter your team name"
            value={form.teamName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            Idea <span className="required">*</span>
          </label>
          <textarea
            name="idea"
            placeholder="Describe your idea"
            value={form.idea}
            onChange={handleChange}
          />
          {errors.idea && <p className="error-text">{errors.idea}</p>}
        </div>

        <button type="submit" className="submit-button">
          {id ? 'Update Registration' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
