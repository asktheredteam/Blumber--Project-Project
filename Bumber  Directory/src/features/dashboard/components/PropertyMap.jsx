import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const propertyMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    let resizeTimeout;
    const resizeMap = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        map.invalidateSize({ pan: false });
      }, 100);
    };

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(resizeMap);
      observer.observe(container);
      return () => {
        observer.disconnect();
        window.clearTimeout(resizeTimeout);
      };
    }

    window.addEventListener("resize", resizeMap);
    return () => {
      window.removeEventListener("resize", resizeMap);
      window.clearTimeout(resizeTimeout);
    };
  }, [map]);

  return null;
}

function MapPropertyLocations({ properties }) {
  const map = useMap();
  const locatedProperties = useMemo(
    () =>
      properties.filter(
        (property) =>
          Number.isFinite(property.latitude) &&
          Number.isFinite(property.longitude),
      ),
    [properties],
  );

  useEffect(() => {
    if (locatedProperties.length === 0) return;

    const locations = locatedProperties.map((property) => [
      property.latitude,
      property.longitude,
    ]);

    if (locations.length === 1) {
      map.setView(locations[0], 14);
      return;
    }

    map.fitBounds(locations, { padding: [30, 30], maxZoom: 14 });
  }, [locatedProperties, map]);

  return locatedProperties.map((property) => (
    <Marker
      key={property.id}
      position={[property.latitude, property.longitude]}
      icon={propertyMarkerIcon}
    >
      <Popup>
        <strong>{property.title}</strong>
        <br />
        {property.location}
        <br />
        GH₵{property.price.toLocaleString()}/{property.rentalPeriod}
      </Popup>
    </Marker>
  ));
}

function PropertyMap({ properties = [] }) {
  const accraCoordinates = [5.6037, -0.187];

  return (
    <MapContainer
      center={accraCoordinates}
      zoom={13}
      className="property-map"
      style={{ height: "100%", width: "100%" }}
    >
      <MapResizeHandler />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapPropertyLocations properties={properties} />
    </MapContainer>
  );
}

export default PropertyMap;
