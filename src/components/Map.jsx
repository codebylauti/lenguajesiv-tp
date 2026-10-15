import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet's default icon paths are page-relative and 404 under the
// GitHub Pages base path; point them at Vite-emitted assets instead.
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function Map() {
  const position = [-24.741670786173028, -65.39372853282484];
  return (
    <MapContainer 
      center={position}
      zoom={15} 
      style={{ height: '200px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Universidad Católica de Salta
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
