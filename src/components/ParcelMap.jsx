import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ParcelMap() {
  return (
    <MapContainer
      center={[52.2297, 21.0122]}
      zoom={14}
      style={{
        height: "100vh",
        width: "100%"
      }}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}