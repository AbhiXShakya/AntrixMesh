import React, { useState, useEffect } from "react";
import "./WorldMap.css";
import L from "leaflet";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap/leaflet-heatmap";
import { MdOutlineAdd, AiOutlineMinus } from "react-icons/all";
import crg from "country-reverse-geocoding";
import axios from "axios";
import n from "country-js";
import MapOnClickCard from "../MapOnClickCard/MapOnClickCard";
import GlobalCard from "../GlobalCard/GlobalCard";
import CircularButton from "../CircularButton/CircularButton";
import getCountryISO2 from "country-iso-3-to-2";

let cfg = {
  radius: 6,
  maxOpacity: 0.6,
  scaleRadius: true,
  useLocalExtrema: true,
  latField: "lat",
  lngField: "lng",
  valueField: "count",
};

export function WorldMap({ authLogin }) {
  const initialState = {
    name: "global",
    code: undefined,
  };

  const [toggleDiscussion, setToggleDiscussion] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [mapSelectedCountry, setMapSelectedCountry] = useState();
  const [mapOnClick, setMapOnClick] = useState(false);
  const [globalCard, setGlobalCard] = useState(false);
  const toggleMapOnClick = () => {
    setMapOnClick(!mapOnClick);
  };
  const toggleGlobalCard = () => {
    setGlobalCard(!globalCard);
  };

  const toggleDiscusionHandler = () => {
    setToggleDiscussion(!toggleDiscussion);
  };

  const loadheat = (map) => {
    let heatPoints = [];
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/country/count`)
      .then((res) => {
        for (const [key, value] of Object.entries(res.data.collections)) {
          try {
            const countryISO2 = getCountryISO2(key);
            let ltng = n.search(countryISO2)[0].geo;
            heatPoints.push({
              lat: ltng?.latitude,
              lng: ltng?.longitude,
              count: value,
            });
          } catch (err) {
            console.log(err);
          }
        }
        let testData = {
          max: 10,
          data: heatPoints,
        };
        let heatmapLayer = new HeatmapOverlay(cfg);
        heatmapLayer.setData(testData);

        map.addLayer(heatmapLayer);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    let baseLayer = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors',
        maxZoom: 18,
      }
    );

    let map = new L.Map("map", {
      center: new L.LatLng(25.6586, 60),
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
      layers: [baseLayer],
      noWrap: false,
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      zoomAnimation: true,
      maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
      zoomControl: false,
    });

    map.on("click", async (e) => {
      setIsLoading(true);
      let countryData;
      try {
        countryData = crg
          .country_reverse_geocoding()
          .get_country(e.latlng.lat, e.latlng.lng);
      } catch (error) {
        console.log(error);
      }

      if (countryData && countryData?.name && countryData?.code) {
        setMapSelectedCountry(countryData);
        toggleMapOnClick();
      }
    });

    setMapInstance(map);
    loadheat(map);

    return () => {
      map.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="map"></div>
      <CircularButton
        toggleDiscusionHandler={toggleDiscusionHandler}
        toggleGlobalCard={toggleGlobalCard}
      />
      {mapOnClick ? (
        <MapOnClickCard
          toggleMapOnClick={toggleMapOnClick}
          mapSelectedCountry={mapSelectedCountry}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      ) : null}
      {globalCard ? (
        <GlobalCard
          toggleGlobalCard={toggleGlobalCard}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      ) : null}

      <div className="btn-container">
        <div
          style={{ bottom: "-1.4rem" }}
          className="search-btn3"
          onClick={() => mapInstance && mapInstance?.zoomIn()}
        >
          <MdOutlineAdd />
        </div>
        <div
          className="search-btn3"
          onClick={() => mapInstance && mapInstance?.zoomOut()}
        >
          <AiOutlineMinus />
        </div>
      </div>
    </>
  );
}
