
'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression, Icon } from 'leaflet';

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


const TrackingMap = () => {
    return (
        <MapContainer center={courierPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <Marker position={courierPosition} icon={truckIcon}>
                <Popup>
                    Kurir Anda ada di sini.
                </Popup>
            </Marker>
            
            <Marker position={destinationPosition}>
                <Popup>
                    Lokasi penjemputan Anda.
                </Popup>
            </Marker>

            <Polyline positions={routeCoordinates} color="blue" />
        </MapContainer>
    );
};

export default TrackingMap;
