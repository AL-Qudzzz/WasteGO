
'use client';

import { useEffect, useRef } from 'react';
import L, { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const courierPosition: LatLngExpression = [-6.229728, 106.827148]; // Courier somewhere in Jakarta
const destinationPosition: LatLngExpression = [-6.208763, 106.845599]; // Destination somewhere in Jakarta
const routeCoordinates: LatLngExpression[] = [
  [-6.229728, 106.827148],
  [-6.2250, 106.8350],
  [-6.2180, 106.8400],
  [-6.208763, 106.845599]
];

// Custom truck icon
const truckIcon = new Icon({
  iconUrl: 'https://i.imgur.com/g13KGoX.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Default marker icon fix
const defaultIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;


const TrackingMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        // Only initialize the map if the ref is available and the map hasn't been initialized yet
        if (mapRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current).setView(courierPosition, 13);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstanceRef.current);

            // Add markers and polyline
            L.marker(courierPosition, { icon: truckIcon }).addTo(mapInstanceRef.current)
                .bindPopup('Kurir Anda ada di sini.');
            
            L.marker(destinationPosition).addTo(mapInstanceRef.current)
                .bindPopup('Lokasi penjemputan Anda.');
            
            L.polyline(routeCoordinates, { color: 'blue' }).addTo(mapInstanceRef.current);
        }

        // Cleanup function to run when the component is unmounted
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default TrackingMap;
