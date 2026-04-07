import React from 'react';

export default function LayerToggle({ activeLayer, onChange }) {
  const bands = ['ndvi', 'evi', 'savi', 'ndmi', 'gndvi', 'cvi'];
  
  return (
    <div className="layer-toggle" id="layer-toggle">
        {bands.map((layer) => (
          <button
            key={layer}
            className={`layer-toggle__btn ${activeLayer === layer ? 'is-active' : ''}`}
            onClick={() => onChange(layer)}
          >
            {layer.toUpperCase()}
          </button>
        ))}
    </div>
  );
}
