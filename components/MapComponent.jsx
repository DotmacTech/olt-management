// MapComponent.jsx
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map styles inline
const mapStyles = `
  /* Tooltip styling */
  .leaflet-tooltip {
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 6px 10px;
    font-family: inherit;
  }

  /* Remove default arrow */
  .leaflet-tooltip-top:before,
  .leaflet-tooltip-bottom:before,
  .leaflet-tooltip-left:before,
  .leaflet-tooltip-right:before {
    display: none;
  }

  /* Popup styling */
  .leaflet-popup-content-wrapper {
    border-radius: 6px;
    padding: 0;
  }

  .leaflet-popup-content {
    margin: 0;
    padding: 0;
    min-width: 200px;
  }

  .leaflet-container a.leaflet-popup-close-button {
    color: #64748b;
    padding: 8px 8px 0 0;
  }

  .leaflet-container a.leaflet-popup-close-button:hover {
    color: #0f172a;
  }

  /* Customize the attribution text */
  .leaflet-control-attribution {
    font-size: 9px;
    background: rgba(255, 255, 255, 0.7);
  }

  /* Styling for connection lines on hover */
  .leaflet-interactive:hover {
    stroke-opacity: 1;
    stroke-width: 2.5;
  }

  /* Custom colors for the map base */
  .leaflet-container {
    background-color: #f8fafc;
  }

  /* Animation for marker appear */
  @keyframes markerAppear {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  .olt-marker,
  .onu-marker,
  .olt-marker-critical,
  .onu-marker-warning {
    animation: markerAppear 0.3s ease-out;
  }
`;

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

// Component to fit bounds automatically
const FitBounds = ({ devices }) => {
  const map = useMap();
  
  useEffect(() => {
    if (devices.length > 0) {
      const bounds = [];
      devices.forEach(device => {
        if (device.latitude && device.longitude) {
          bounds.push([device.latitude, device.longitude]);
        }
      });
      
      if (bounds.length > 0) {
        map.fitBounds(bounds);
      }
    }
  }, [map, devices]);
  
  return null;
};

const MapComponent = ({ devices, connections = [] }) => {
  // Fix Leaflet icon issues on component mount
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  // Custom styled icons to match DOTMAC UI colors
  const oltIcon = new L.DivIcon({
    html: `<div style="background-color: #22C55E; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.2);"></div>`,
    className: 'olt-marker',
    iconSize: [18, 18]
  });
  
  const onuIcon = new L.DivIcon({
    html: `<div style="background-color: #A855F7; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.2);"></div>`,
    className: 'onu-marker',
    iconSize: [14, 14]
  });
  
  const criticalOltIcon = new L.DivIcon({
    html: `<div style="background-color: #EF4444; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.2);"></div>`,
    className: 'olt-marker-critical',
    iconSize: [18, 18]
  });
  
  const warningOnuIcon = new L.DivIcon({
    html: `<div style="background-color: #F59E0B; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 1px rgba(0,0,0,0.2);"></div>`,
    className: 'onu-marker-warning',
    iconSize: [14, 14]
  });

  // Find a valid center point for initial map render
  const findInitialCenter = () => {
    for (const device of devices) {
      if (device.latitude && device.longitude) {
        return [device.latitude, device.longitude];
      }
    }
    return [9.0820, 8.6753]; // Default to center of Nigeria
  };

  // Determine which icon to use based on device type and status
  const getDeviceIcon = (device) => {
    // You can extend this logic based on your actual status values
    if (device.type === 'OLT') {
      return device.status === 'PENDING' ? criticalOltIcon : oltIcon;
    } else {
      return device.status === 'PENDING' ? warningOnuIcon : onuIcon;
    }
  };

  return (
    <>
      {/* Apply global styles for the map */}
      <style jsx global>{mapStyles}</style>
      
      <MapContainer 
        center={findInitialCenter()} 
        zoom={7} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false} // We'll use our custom zoom controls
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <FitBounds devices={devices} />
        
        {/* Draw connections between OLTs and ONUs */}
        {connections.map(connection => (
          <Polyline
            key={connection.id}
            positions={[connection.source.position, connection.target.position]}
            color="#9AA5B1"
            weight={1.5}
            opacity={0.7}
            dashArray="5, 5"
          />
        ))}
        
        {devices.map(device => {
          if (device.latitude && device.longitude) {
            const position = [device.latitude, device.longitude];
            const icon = getDeviceIcon(device);
            
            return (
              <Marker 
                key={`${device.type}-${device.id}`}
                position={position}
                icon={icon}
              >
                <Tooltip permanent={false} direction="top" className="custom-tooltip">
                  <div className="font-medium">{device.name}</div>
                  <div className="text-xs text-gray-500">{device.type}</div>
                </Tooltip>
                <Popup className="custom-popup">
                  <div className="p-1">
                    <h3 className="font-bold text-lg border-b pb-1 mb-2">{device.name}</h3>
                    <div className="space-y-1">
                      <p><span className="font-medium">Type:</span> {device.type}</p>
                      <p><span className="font-medium">Status:</span> {device.status || 'Active'}</p>
                      <p><span className="font-medium">IP:</span> {device.ipaddress || device.ip_address || 'N/A'}</p>
                      <p><span className="font-medium">Location:</span> {device.latitude.toFixed(6)}, {device.longitude.toFixed(6)}</p>
                      {device.type === 'OLT' && device.children && (
                        <p><span className="font-medium">Connected ONUs:</span> {device.children.length}</p>
                      )}
                      {device.type === 'ONU' && device.parent_id && (
                        <p>
                          <span className="font-medium">Connected to:</span> {
                            devices.find(d => d.id === device.parent_id)?.name || 'Unknown OLT'
                          }
                        </p>
                      )}
                    </div>
                    <div className="mt-3 pt-2 border-t flex justify-end">
                      <button className="px-2 py-1 bg-green-500 text-white text-xs rounded">Manage</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </>
  );
};

export default MapComponent;