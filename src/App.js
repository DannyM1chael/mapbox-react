import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";

import "./App.css";
import fetchData from "./api/fetchData";
import Marker from "./components/Marker";
import Popup from "./components/Popup";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFubnltMWNoYWVsIiwiYSI6ImNraTh4dHZ0cjBhZnkydGxjbXNpdTIycm0ifQ.j5rP6APNQdHY1j42awkssQ";

function App() {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

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
        const markerNode = document.createElement("div");
        ReactDOM.render(<Marker id={result.properties.id} />, markerNode);

        markerNode.addEventListener("click", (e) => {
          const popupNode = document.createElement("div");
          ReactDOM.render(<Popup />, popupNode);
          popUpRef.current
            .setLngLat(result.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        });

        new mapboxgl.Marker(markerNode)
          .setLngLat(result.geometry.coordinates)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
}

export default App;
