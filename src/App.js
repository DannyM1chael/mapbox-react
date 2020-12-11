import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import "./App.css";
import fetchData from "./api/fetchData";
import Marker from "./components/Marker";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFubnltMWNoYWVsIiwiYSI6ImNraTh4dHZ0cjBhZnkydGxjbXNpdTIycm0ifQ.j5rP6APNQdHY1j42awkssQ";

function App() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [11.581981, 48.135124],
      zoom: 12.5,
    });

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("moveend", async () => {
      const { lng, lat } = map.getCenter();
      const results = await fetchData({ long: lng, lat: lat });
      results.items.forEach((result) => {
        const { geometry, properties } = result;
        const markerNode = document.createElement("div");

        ReactDOM.render(<Marker id={properties.id} />, markerNode);
        new mapboxgl.Marker(markerNode)
          .setLngLat(geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 15 })
            .setHTML(
              "<h3>" +
                properties.name +
                "</h3><p>" +
                properties.description +
                "</p>"
            )
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
}

export default App;
