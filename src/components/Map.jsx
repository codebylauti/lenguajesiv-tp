import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  const position = [-24.741670786173028, -65.39372853282484];
  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Aquí estamos en Salta.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
