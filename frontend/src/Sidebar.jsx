import React from 'react';
import LocationForm from './LocationForm';
import FarmSummary from './FarmSummary';

export default function Sidebar({ onFlyTo, analysisData }) {
    return (
        <aside className="sidebar" role="complementary" aria-label="Farm Analysis Panel">
            <section className="card" id="card-instructions" aria-labelledby="instructions-heading">
                <h2 className="card__title" id="instructions-heading">
                  <span className="card__icon">📍</span> How to Analyze
                </h2>
                <ol className="steps-list">
                  <li className="step">
                    <span className="step__num">1</span>
                    <span className="step__text">Click the <strong>polygon tool</strong> on the map</span>
                  </li>
                  <li className="step">
                    <span className="step__num">2</span>
                    <span className="step__text">Draw your <strong>farm boundary</strong> by clicking vertices</span>
                  </li>
                  <li className="step">
                    <span className="step__num">3</span>
                    <span className="step__text">Close the polygon — analysis <strong>starts automatically</strong></span>
                  </li>
                </ol>
            </section>
                
            <LocationForm onFlyTo={onFlyTo} />
            <FarmSummary analysisData={analysisData} />
        </aside>
    );
}
