// RentalMap.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css"


function RentalMap(props) {
  const [position, setPosition] = React.useState(null);

  React.useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(props.location)}&format=json&limit=1`
        );
        const data = await response.json();
        if (data.length === 0) {
          console.log(data);
          throw new Error('Location not found');
        }
        setPosition([data[0].lat, data[0].lon]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, [props.location]);

  return (
    <div className="map-container">
      {position && (
        <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>{props.location}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default RentalMap;
