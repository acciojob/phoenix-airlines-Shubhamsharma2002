import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const MOCK_FLIGHTS = [
  { id: 'PA-101', airline: 'Phoenix Airlines', source: 'Delhi', destination: 'Mumbai', price: 4500, departureTime: '10:00 AM' },
  { id: 'PA-202', airline: 'Phoenix Airlines', source: 'Delhi', destination: 'Mumbai', price: 5200, departureTime: '04:00 PM' },
  { id: 'PA-303', airline: 'Phoenix Airlines', source: 'Noida', destination: 'Bangalore', price: 6100, departureTime: '08:30 AM' },
];

export const FlightSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tripType, setTripType] = useState('one-way');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!source || !destination || !departureDate) {
      alert('Please fill in source, destination, and departure date.');
      return;
    }

    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: { tripType, source, destination, departureDate, returnDate },
    });

    // Filter available mock flights
    const results = MOCK_FLIGHTS.filter(
      (f) =>
        f.source.toLowerCase() === source.trim().toLowerCase() &&
        f.destination.toLowerCase() === destination.trim().toLowerCase()
    );

    setSearchResults(results.length > 0 ? results : MOCK_FLIGHTS); // Fallback to list for demo
    setHasSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch({ type: 'SELECT_FLIGHT', payload: flight });
    history.push('/flight-booking');
  };

  return (
    <div className="search-container" style={{ padding: '20px' }}>
      <h2>Search Flights</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <div>
          <label>
            <input
              type="radio"
              value="one-way"
              checked={tripType === 'one-way'}
              onChange={() => setTripType('one-way')}
            />
            One-way
          </label>
          <label style={{ marginLeft: '15px' }}>
            <input
              type="radio"
              value="round-trip"
              checked={tripType === 'round-trip'}
              onChange={() => setTripType('round-trip')}
            />
            Round-trip
          </label>
        </div>

        <input
          type="text"
          placeholder="Source City"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination City"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
        {tripType === 'round-trip' && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        )}

        <button type="submit">Search Flights</button>
      </form>

      {hasSearched && (
        <div style={{ marginTop: '25px' }}>
          <h3>Available Flights</h3>
          {searchResults.map((flight) => (
            <div
              key={flight.id}
              style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px', borderRadius: '4px' }}
            >
              <p><strong>{flight.airline}</strong> ({flight.id})</p>
              <p>{flight.source} ➔ {flight.destination} | {flight.departureTime}</p>
              <p>Price: ₹{flight.price}</p>
              
              {/* Target Selector: .book-flight */}
              <button className="book-flight" onClick={() => handleBookFlight(flight)}>
                Book Flight
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};