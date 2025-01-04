import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistrationList = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios
      .get(`${getApiBaseUrl()}/api/registrations`)
      .then((res) => setRegistrations(res.data))
      .catch(() => toast.error('Error fetching registrations'));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${getApiBaseUrl()}/api/registrations/${id}`)
      .then(() => {
        setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
        toast.success('Registration deleted successfully');
      })
      .catch(() => toast.error('Error deleting registration'));
  };

  return (
    <div className="container">
      <div className="welcome-container">
        <h2 className="welcome-heading">Welcome to the Hackathon Dashboard</h2>
        <Link to="/register" className="add-button">Add New Registration</Link>
      </div>

      <main>
        {registrations.length === 0 ? (
          <p className="no-registrations">No registrations available yet!</p>
        ) : (
          <div className="card-container">
            {registrations.map((reg) => (
              <div key={reg.id} className="registration-card">
                <h3>{reg.name}</h3>
                <p><strong>Email:</strong> {reg.email}</p>
                <p><strong>Team:</strong> {reg.teamName || 'N/A'}</p>
                <p><strong>Idea:</strong> {reg.idea}</p>
                <div className="card-actions">
                  <Link to={`/detail/${reg.id}`} className="details-button">View Details</Link>
                  <Link to={`/register/${reg.id}`} className="edit-button">Edit</Link>
                  <button onClick={() => handleDelete(reg.id)} className="delete-button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default RegistrationList;
