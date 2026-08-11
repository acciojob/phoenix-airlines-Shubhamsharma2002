import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const Confirmation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const booking = useSelector((state) => state.bookingConfirmation);

  const handleReturnHome = () => {
    dispatch({ type: 'RESET_BOOKING' });
    history.push('/');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Booking Confirmed! 🎉</h2>
      {booking ? (
        <div style={{ border: '1px solid #4CAF50', padding: '15px', borderRadius: '6px', maxWidth: '450px' }}>
          <p><strong>Booking Reference:</strong> {booking.bookingId}</p>
          <p><strong>Passenger:</strong> {booking.passenger.name}</p>
          <p><strong>Email:</strong> {booking.passenger.email}</p>
          <p><strong>Phone:</strong> {booking.passenger.phone}</p>
          <p><strong>Airline:</strong> {booking.flight.airline} ({booking.flight.id})</p>
        </div>
      ) : (
        <p>Your ticket has been booked successfully.</p>
      )}

      {/* Target Selector: button */}
      <button onClick={handleReturnHome} style={{ marginTop: '20px' }}>
        Return to Home
      </button>
    </div>
  );
};