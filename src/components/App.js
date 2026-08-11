import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FlightSearch } from './FlightSearch';
import { FlightBooking } from './FlightBooking';
import { Confirmation } from './Confirmation';
import '../styles/App.css';

const LandingPage = () => (
  <div style={{ padding: '20px' }}>
    <h1>Welcome to Phoenix Airlines</h1>
    <p>Fly with comfort and convenience across top destinations.</p>
    <Link to="/flight-search">
      <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Search Flights Now</button>
    </Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '15px', background: '#1e293b', color: '#fff' }}>
        <h2 style={{ margin: 0, display: 'inline-block' }}>Phoenix Airlines</h2>
        <div style={{ float: 'right' }}>
          <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Home</Link>
          <Link to="/flight-search" style={{ color: '#fff' }}>Search</Link>
        </div>
      </nav>

      <div style={{ minHeight: '80vh' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/flight-search" component={FlightSearch} />
          <Route exact path="/flight-booking" component={FlightBooking} />
          <Route exact path="/confirmation" component={Confirmation} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;