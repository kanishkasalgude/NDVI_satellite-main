import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { ndviToColor, _rgba } from './colorUtils';

/**
 * Renders a density canvas heatmap for given layer data where each 
 * individual cell has its own radial density blob.
 */
export default function HeatmapLayer({ data, activeBand }) {
    const map = useMap();
    const canvasRef = useRef(null);
    const renderReqRef = useRef(null);

    useEffect(() => {
        const _canvas = L.DomUtil.create('canvas', 'cv-heatmap');
        const s = _canvas.style;
        s.position = 'absolute';
        s.top = '0';
        s.left = '0';
        s.pointerEvents = 'none';
        s.opacity = '0.90';
        
        map.getPanes().overlayPane.appendChild(_canvas);
        canvasRef.current = _canvas;

        return () => {
            if (_canvas && _canvas.parentNode) {
                _canvas.parentNode.removeChild(_canvas);
            }
        };
    }, [map]);

    useEffect(() => {
        if (!map || !canvasRef.current || !data) return;

        const redraw = () => {
            const canvas = canvasRef.current;
            const size = map.getSize();
            canvas.width = size.x;
            canvas.height = size.y;
            L.DomUtil.setPosition(canvas, map.containerPointToLayerPoint([0, 0]));
            
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, size.x, size.y);

            const features = data.features || [];
            
            for (const feature of features) {
                const val = feature.properties[activeBand];
                if (val === null || val === undefined || isNaN(val)) continue;

                // 1. Centroid
                const ring = feature.geometry.coordinates[0];
                let sumLng = 0, sumLat = 0;
                ring.forEach(([lng, lat]) => { sumLng += lng; sumLat += lat; });
                const center = map.latLngToContainerPoint([sumLat / ring.length, sumLng / ring.length]);

                // 2. Blob radius
                const pts = ring.map(([lng, lat]) => map.latLngToContainerPoint([lat, lng]));
                let maxR = 0;
                pts.forEach(p => { maxR = Math.max(maxR, Math.hypot(p.x - center.x, p.y - center.y)); });
                const radius = Math.max(maxR * 1.6, 8);

                // 3. Radial gradient
                const color = ndviToColor(val);
                const grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
                grad.addColorStop(0, _rgba(color, 0.95));
                grad.addColorStop(0.30, _rgba(color, 0.82));
                grad.addColorStop(0.60, _rgba(color, 0.48));
                grad.addColorStop(1, _rgba(color, 0));

                ctx.beginPath();
                ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            }
        };

        const handleUpdate = () => {
             if (renderReqRef.current) cancelAnimationFrame(renderReqRef.current);
             renderReqRef.current = requestAnimationFrame(redraw);
        };

        map.on('moveend zoomend resize', handleUpdate);
        handleUpdate();

        return () => {
            map.off('moveend zoomend resize', handleUpdate);
            if (renderReqRef.current) cancelAnimationFrame(renderReqRef.current);
        };
    }, [map, data, activeBand]);

    return null;
}
