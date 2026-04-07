/**
 * api.js
 * API interaction handles
 */

export async function analyzeFarm(geoJsonGeometry) {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ geometry: geoJsonGeometry }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Server error: ${response.status}`);
    }

    return await response.json();
}

export async function samplePixel(lat, lng, band) {
    const response = await fetch(`/api/sample?lat=${lat}&lng=${lng}&band=${band}`);
    if (!response.ok) return null;
    return await response.json();
}
