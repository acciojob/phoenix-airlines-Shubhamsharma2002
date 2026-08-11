import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const FlightBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedFlight = useSelector((state) => state.selectedFlight);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (phone.trim().length < 10) {
      setError('Please enter a valid phone number (at least 10 digits).');
      return;
    }

    setError('');
    const bookingDetails = {
      bookingId: 'PNX-' + Math.floor(100000 + Math.random() * 900000),
      flight: selectedFlight || { id: 'PA-101', airline: 'Phoenix Airlines' },
      passenger: { name, email, phone },
      date: new Date().toLocaleDateString(),
    };

    dispatch({ type: 'SET_PASSENGER_DETAILS', payload: { name, email, phone } });
    dispatch({ type: 'CONFIRM_BOOKING', payload: bookingDetails });
    history.push('/confirmation');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Passenger Details & Booking</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Target Selector: input[type='text'] */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email Address:</label>
          <input
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">Confirm & Book</button>
      </form>
    </div>
  );
};