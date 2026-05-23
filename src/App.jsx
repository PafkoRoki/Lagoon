import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import parcels from "./data/parcels";

const { BaseLayer } = LayersControl;

function App() {
  const [selectedId, setSelectedId] = useState(null);

  const style = (feature) => ({
    color:
      selectedId === feature.properties.id
        ? "#ff5500"
        : "#2563eb",
    weight: 2,
    fillOpacity: 0.1,
  });

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setSelectedId(feature.properties.id);
      },
    });

    layer.bindPopup(
      `Działka: ${feature.properties.numer}`
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MapContainer
        center={[53.979142, 14.775103]}
        zoom={16}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <LayersControl position="topright">

          <BaseLayer checked name="Mapa">
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
          </BaseLayer>

          <BaseLayer name="Satelita">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="© Esri"
            />
          </BaseLayer>

          <BaseLayer name="Topograficzna">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution="© OpenTopoMap"
            />
          </BaseLayer>

        </LayersControl>

        <GeoJSON
          data={parcels}
          style={style}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}

export default App;