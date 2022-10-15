import { useState } from "react";
import Map, { Layer, Marker, NavigationControl, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import { FaUser, FaStoreAlt } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";

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

  const getDataDirection = async () => {
    try {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.longitude}%2C${userLocation.latitude}%3B${props.lng}%2C${props.lat}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      )
        .then((response) => response.json())
        .then((data) => {
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
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
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
      <div className="absolute bottom-0 left-0 w-full h-40 bg-white p-1 rounded-t-xl">
        <div className="flex items-center">
          <div className="rounded-full w-16 overflow-hidden mr-2">
            <img src={props.store.avatarPicture} alt="a" />
          </div>
          <div className="mr-28">
            <div>{props.store.storeName.toUpperCase()}</div>
            <div className="text-gray-500">{props.store.distance.toFixed(2)} Km</div>
          </div>
          <div className="flex items-center text-orange text-2xl">
            <div className="bg-black rounded-full p-2 cursor-pointer" onClick={() => window.open(`tel:+${props.store.phoneNumber}`,"", "width=400,height=400")}>
              <AiFillPhone/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMap;
