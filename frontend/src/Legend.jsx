import React from 'react';

export default function Legend({ activeLayer }) {
  return (
    <div className="ndvi-legend" id="ndvi-legend">
      <div className="ndvi-legend__title" id="ndvi-legend-title">{activeLayer.toUpperCase()} Index</div>
      <div className="ndvi-legend__bar"></div>
      <div className="ndvi-legend__labels">
        <span>0.0</span>
        <span>0.2</span>
        <span>0.4</span>
        <span>0.6</span>
        <span>0.8</span>
        <span>1.0</span>
      </div>
    </div>
  );
}
