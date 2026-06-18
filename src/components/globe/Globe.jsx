import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../../theme/ThemeProvider.jsx';
import './Globe.css';

// Eindhoven, Netherlands
const EINDHOVEN = { lng: 5.4697, lat: 51.4416 };

// Light mode inverts the dark palette: light ocean, dark lines/dots.
const PALETTES = {
  dark: { ocean: '#05060a', line: '#ffffff', dot: '#8a8f99' },
  light: { ocean: '#f8fafc', line: '#0f172a', dot: '#475569' },
};

export default function Globe({ size = 540, className = '' }) {
  const { theme } = useTheme();
  const canvasRef = useRef(null);
  const colorsRef = useRef(PALETTES[theme] || PALETTES.dark);
  const renderRef = useRef(() => {});
  const [marker, setMarker] = useState({ x: 0, y: 0, visible: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const dimension = size;
    const cx = dimension / 2;
    const cy = dimension / 2;
    // Keep the whole sphere inside the canvas at every zoom level so it never
    // clips to a square. maxRadius is the largest the globe may ever grow to.
    const maxRadius = dimension / 2 - 8;
    const startScale = dimension / 3.2;
    const endScale = Math.min(dimension / 2.35, maxRadius); // always a full sphere
    const baseScale = startScale;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimension * dpr;
    canvas.height = dimension * dpr;
    canvas.style.width = `${dimension}px`;
    canvas.style.height = `${dimension}px`;
    context.scale(dpr, dpr);

    const projection = d3
      .geoOrthographic()
      .scale(startScale)
      .translate([cx, cy])
      .clipAngle(90)
      .rotate([0, 0]);

    const path = d3.geoPath().projection(projection).context(context);

    // --- point-in-polygon helpers (used to fill land with halftone dots) ---
    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) dots.push(point);
        }
      }
      return dots;
    };

    const allDots = [];
    let landFeatures = null;
    let landed = false;

    const render = () => {
      const colors = colorsRef.current;
      context.clearRect(0, 0, dimension, dimension);
      const currentScale = projection.scale();
      const scaleFactor = currentScale / baseScale;

      // Ocean / globe body
      context.beginPath();
      context.arc(cx, cy, currentScale, 0, 2 * Math.PI);
      context.fillStyle = colors.ocean;
      context.fill();
      context.strokeStyle = colors.line;
      context.lineWidth = 1.5 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = colors.line;
        context.lineWidth = 0.8 * scaleFactor;
        context.globalAlpha = 0.18;
        context.stroke();
        context.globalAlpha = 1;

        // Land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => path(feature));
        context.strokeStyle = colors.line;
        context.lineWidth = 1 * scaleFactor;
        context.globalAlpha = 0.55;
        context.stroke();
        context.globalAlpha = 1;

        // Halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= dimension &&
            projected[1] >= 0 &&
            projected[1] <= dimension
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.1 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = colors.dot;
            context.fill();
          }
        });
      }
    };
    renderRef.current = render;

    // --- intro animation: fast spin -> decelerate -> zoom into Eindhoven ---
    const targetRotation = [-EINDHOVEN.lng, -EINDHOVEN.lat];
    const spins = 2; // extra full turns before settling
    const duration = 3800;
    const lambdaEnd = 360 * spins + targetRotation[0];

    let animTimer = null;

    const startAnimation = () => {
      animTimer = d3.timer((elapsed) => {
        const t = Math.min(elapsed / duration, 1);
        // cubic-out -> high velocity at the start, gentle stop at the end
        const e = d3.easeCubicOut(t);

        const lambda = lambdaEnd * e;
        const phi = targetRotation[1] * e;
        projection.rotate([lambda, phi]);

        // zoom in only during the final stretch
        const zoomT = Math.min(Math.max((t - 0.6) / 0.4, 0), 1);
        const z = d3.easeCubicInOut(zoomT);
        projection.scale(startScale + (endScale - startScale) * z);

        render();

        if (t >= 1) {
          animTimer.stop();
          // snap to exact target and reveal the marker
          projection.rotate(targetRotation);
          projection.scale(endScale);
          landed = true;
          render();
          const p = projection([EINDHOVEN.lng, EINDHOVEN.lat]);
          if (p) setMarker({ x: p[0], y: p[1], visible: true });
        }
      });
    };

    const loadWorldData = async () => {
      try {
        // Served from our own /public (same-origin, cached) instead of GitHub,
        // so the globe's intro animation starts immediately on refresh.
        const response = await fetch('/ne_110m_land.json');
        if (!response.ok) throw new Error('Failed to load land data');
        landFeatures = await response.json();

        landFeatures.features.forEach((feature) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) => {
            allDots.push({ lng, lat });
          });
        });

        render();
        startAnimation();
      } catch (err) {
        setError('Failed to load globe data');
      }
    };

    loadWorldData();

    return () => {
      if (animTimer) animTimer.stop();
    };
  }, [size]);

  // Recolor + repaint on theme change without re-fetching the map data.
  useEffect(() => {
    colorsRef.current = PALETTES[theme] || PALETTES.dark;
    renderRef.current();
  }, [theme]);

  if (error) {
    return (
      <div className={`globe globe--error ${className}`} style={{ width: size, height: size }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`globe ${className}`} style={{ width: size, height: size }}>
      <canvas ref={canvasRef} className="globe__canvas" />
      {marker.visible && (
        <div className="globe__marker" style={{ left: marker.x, top: marker.y }}>
          <span className="globe__dot" />
          <span className="globe__label">Eindhoven, Netherlands</span>
        </div>
      )}
    </div>
  );
}
