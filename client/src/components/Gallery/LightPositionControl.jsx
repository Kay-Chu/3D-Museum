
import { React, useState, useRef } from "react";
const LightPositionControl = ({ lightPosition, onChange }) => {
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef(null);
    const size = 150; // Control size in pixels
    const radius = size / 2;

    const intensityFactor = 3.5;
  
    // Convert 3D position to 2D coordinates on the turntable
    const toScreenCoords = (position) => {
      const [x, y, z] = position;
      const length = Math.sqrt(x * x + y * y + z * z);
      const normalized = [x / length, y / length, z / length];
      
      // Map 3D direction to 2D circle (using azimuthal projection)
      const azimuth = Math.atan2(normalized[0], -normalized[2]);
      const elevation = Math.asin(normalized[1]);
      
      return {
        x: radius + radius * Math.sin(azimuth) * Math.cos(elevation),
        y: radius + radius * -Math.sin(elevation)
      };
    };
  
    // Convert mouse position to light direction
    const toLightDirection = (clientX, clientY) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (clientX - rect.left - radius) / radius;
      const y = (clientY - rect.top - radius) / radius;
      
      // Clamp to circle
      const distance = Math.min(1, Math.sqrt(x * x + y * y));
      const enhancedDistance = Math.pow(distance, 0.7) * intensityFactor;
      const angle = Math.atan2(y, x);

      const enhancedX = Math.sin(angle) * enhancedDistance;
      const enhancedY = -Math.cos(angle) * enhancedDistance;
      const enhancedZ = 1 + Math.abs(enhancedDistance) * 0.5;
      
      // Convert to 3D direction
      return [enhancedX, enhancedY, enhancedZ];
    };
  
    const handleMouseDown = (e) => {
      setDragging(true);
      const newPosition = toLightDirection(e.clientX, e.clientY);
      console.log(newPosition)
      onChange(newPosition);
    };
  
    const handleMouseMove = (e) => {
      if (!dragging) return;
      const newPosition = toLightDirection(e.clientX, e.clientY);
      onChange(newPosition);
    };
  
    const handleMouseUp = () => {
      setDragging(false);
    };
  
    // Add touch event handlers similarly...
  
    const handlePosition = toScreenCoords(lightPosition);
  
    return (
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #555 0%, #222 100%)',
          border: '2px solid #888',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          cursor: 'grab',
          overflow: 'hidden'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid lines */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          background: 'rgba(255,255,255,0.3)'
        }} />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: 1,
          background: 'rgba(255,255,255,0.3)'
        }} />
        
        {/* Position indicator */}
        <div style={{
          position: 'absolute',
          left: handlePosition.x - 8,
          top: handlePosition.y - 8,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#ff9800',
          border: '2px solid #fff',
          boxShadow: '0 0 8px rgba(255,152,0,0.8)',
          pointerEvents: 'none'
        }} />
        
        {/* Center point */}
        <div style={{
          position: 'absolute',
          left: radius - 4,
          top: radius - 4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none'
        }} />
      </div>
    );
  };


export default LightPositionControl;