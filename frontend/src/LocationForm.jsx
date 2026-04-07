import React, { useState } from 'react';

export default function LocationForm({ onFlyTo }) {
  const [lat, setLat] = useState('13.42294');
  const [lng, setLng] = useState('75.53250');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFlyTo([parseFloat(lat), parseFloat(lng)]);
  };

  return (
    <section className="card" id="card-location" aria-labelledby="location-heading">
      <h2 className="card__title" id="location-heading">
        <span className="card__icon">🌎</span> Fly to Location
      </h2>
      <form onSubmit={handleSubmit} className="location-form" id="location-form">
        <div className="form-group">
          <input 
            type="number" 
            step="any" 
            value={lat} 
            onChange={e => setLat(e.target.value)} 
            placeholder="Latitude" 
            required 
          />
          <input 
            type="number" 
            step="any" 
            value={lng} 
            onChange={e => setLng(e.target.value)} 
            placeholder="Longitude" 
            required 
          />
        </div>
        <button type="submit" className="btn btn--secondary btn--sm" style={{width: "100%", marginTop: "0.5rem"}}>Fly to Coordinates</button>
      </form>
    </section>
  );
}
