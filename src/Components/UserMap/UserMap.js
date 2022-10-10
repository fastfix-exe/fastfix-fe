import { useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import pin from "../../Pictures/marker.jpg";

const UserMap = (props) => {
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [viewPort, setViewPort] = useState({
    longitude: props.lng,
    latitude: props.lat,
    zoom: 15,
    pitch: 50,
  });

  useEffect(() => {
    console.log("fired");
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [props.lng, props.lat],
        [userLocation.longitude, userLocation.latitude],
      ],
    },
  };

  return (
    <Map
      initialViewState={{
        ...viewPort,
      }}
      style={{ height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        latitude={viewPort.latitude}
        longitude={viewPort.longitude}
        anchor="bottom"
      />
      <Marker
        latitude={userLocation.latitude}
        longitude={userLocation.longitude}
        anchor="bottom"
      >
        <img src={pin} className="w-10" />
      </Marker>
      <Source id="polylineLayer" type="geojson" data={dataOne}>
        <Layer
          id="lineLayer"
          type="line"
          source="my-data"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "rgba(3, 170, 238, 0.5)",
            "line-width": 5,
          }}
        />
      </Source>
      <NavigationControl position="bottom-right" />
    </Map>
  );
};

export default UserMap;
