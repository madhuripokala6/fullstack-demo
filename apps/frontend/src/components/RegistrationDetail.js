import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from './utils';

const RegistrationDetail = () => {
  const { id } = useParams();
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/api/registrations/${id}`)
        .then((res) => setRegistration(res.data))
        .catch((error) => {
          console.error('Error details:', error);
          toast.error('Error fetching registration details');
        });
    }
  }, [id]);

  return (
    <div className="detail-container">
      {registration ? (
        <div className="detail-card">
          <h2 className="detail-title">{registration.name}</h2>
          <div className="detail-info">
            <p>
              <strong>Email:</strong> {registration.email}
            </p>
            <p>
              <strong>Phone:</strong> {registration.phoneNumber}
            </p>
            <p>
              <strong>Team Name:</strong> {registration.teamName || 'N/A'}
            </p>
            { registration.skills && <p>
              <strong> Skills:</strong> {registration.skills || 'N/A'}
              </p>
            }
            <p>
              <strong>Idea:</strong> {registration.idea}
            </p>
          </div>
          <div className="detail-actions">
            <Link to="/" className="back-button">
              Back to List
            </Link>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default RegistrationDetail;
