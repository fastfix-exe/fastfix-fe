import { useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { FaUser, FaStoreAlt } from "react-icons/fa";

const EmployeeMap = (props) => {
  const [userLocation, setUserLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [viewPort] = useState({
    longitude: props.lng,
    latitude: props.lat,
    zoom: 15,
    pitch: 50,
  });

  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    const getUserLocation = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }, 10000);

    return () => {
      clearInterval(getUserLocation);
    };
  }, []);

  useEffect(() => {
    const getDataDirection = async () => {
      try {
        fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude}%2C${userLocation.latitude}%3B${props.lng}%2C${props.lat}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            const legs = data.routes[0].legs;
            const steps = legs[0].steps;
            const l = [];
            for (var step of steps) {
              var inters = step.intersections;
              for (var inter of inters) {
                var locs = inter.location;
                l.push(locs);
              }
            }
            setRoutes(l);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getDataDirection();
  }, []);

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates:
        // [props.lng, props.lat],
        // [userLocation.longitude, userLocation.latitude],
        routes,
    },
  };

  return (
    <div className="relative">
      <Map
        initialViewState={{
          ...viewPort,
        }}
        style={{ height: "90vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          latitude={viewPort.latitude}
          longitude={viewPort.longitude}
          anchor="bottom"
        >
          <div className="text-cyan-500 text-2xl">
            <FaStoreAlt />
          </div>
        </Marker>
        <Marker
          latitude={props.lat}
          longitude={props.lng}
          anchor="bottom"
        >
          <div className="text-red-500 text-2xl">
            <FaUser />
          </div>
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
              "line-color": "rgb(255, 132, 34)",
              "line-width": 5,
            }}
          />
        </Source>
        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
};

export default EmployeeMap;
