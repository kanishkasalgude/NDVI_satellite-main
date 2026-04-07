import React from 'react';

const STEPS = [
  "Connecting to Earth Engine",
  "Filtering cloud-free scenes",
  "Generating multi-band composite",
  "Computing vegetation indices",
  "Fusing statistical metrics"
];

export default function LoadingOverlay({ isVisible, currentStepIdx }) {
  if (!isVisible) return null;

  return (
    <div id="loading-overlay" className="loading-overlay">
      <div className="spinner-card">
        <div id="loaderSpinner" className="spinner">
           <div className="spinner__ring"></div>
           <div className="spinner__ring spinner__ring--2"></div>
           <div className="spinner__ring spinner__ring--3"></div>
        </div>
        <h3 className="spinner-card__title">Analyzing Farm Data</h3>
        <p className="spinner-card__subtitle">Querying Sentinel-2 Satellite Archive</p>
        
        <div className="progress-steps">
          {STEPS.map((step, idx) => {
             let statusClass = '';
             if (idx < currentStepIdx) { statusClass = 'progress-step--done'; }
             else if (idx === currentStepIdx) { statusClass = 'progress-step--active'; }
             
             return (
               <div key={idx} className={`progress-step ${statusClass}`}>
                 {step}
               </div>
             );
          })}
        </div>
      </div>
    </div>
  );
}
