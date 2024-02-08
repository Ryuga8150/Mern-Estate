import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Box } from "@mui/material";

// mapboxgl.accessToken = import.meta.env.MAPBOX_TOKEN;

// console.log(import.meta.env.VITE_MAPBOX_TOKEN);

export default function LocationMap() {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
  // console.log(import.meta.env.VITE_MAPBOX_TOKEN);
  const mapContainer = useRef(null);
  const map = useRef(null);
  // 28.619081, 77.278333
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  const [lng, setLng] = useState(77.278333);
  const [lat, setLat] = useState(28.619081);
  const [zoom, setZoom] = useState(12);
  // console.log("Map Rendered");
  // console.log(mapContainer);
  // console.log(map);
  // mapbox://styles/ryuga8150/clrtmk1d0007501pde91bcfm3
  // light:  hsl(220, 29%, 86%)
  // dark: hsl(220, 17%, 24%)
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      // style: "mapbox://styles/ryuga8150/clrtmk1d0007501pde91bcfm3",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: false,
    });

    // Create marker
    const el = document.createElement("div");

    // coming from our css
    el.className = "marker";
    console.log(el);

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat([lng, lat])
      .addTo(map.current);

    // console.log(marker);
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // map.current.on("load", function () {
    //   // console.log(map.current.resize());

    //   // Create marker
    //   const el = document.createElement("div");

    //   // coming from our css
    //   el.className = "marker";
    //   console.log(el);

    //   // Add marker
    //   new mapboxgl.Marker({
    //     element: el,
    //     anchor: "bottom",
    //   })
    //     .setLngLat([lng, lat])
    //     .addTo(map.current);

    // });
  }, [lat, lng, zoom]);

  return (
    <Box sx={{ padding: "1.2rem", width: "100%", height: "100%" }}>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <Box
        ref={mapContainer}
        sx={{ borderRadius: 3, width: "100%", height: 392 }}
      />
    </Box>
  );
}
// CSS

// .section-map {
//   position: relative;
//   height: 65rem;
//   margin-top: calc(0px - var(--section-rotate));
// }

// #map {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   width: 100%;
// }

// .marker {
//   background-image: url('../img/pin.png');
//   background-size: cover;
//   width: 32px;
//   height: 40px;
//   cursor: pointer;
// }

// .mapboxgl-popup {
//   max-width: 25rem;
// }

// .mapboxgl-popup-content {
//   text-align: center;
//   font-family: 'Lato', sans-serif;
//   padding: 1.5rem !important;
//   font-size: 1.4rem;
//   -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
//   box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
// }
