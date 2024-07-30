import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";

const Main = () => {
  const geoUrl = "https://ismailarilik.com/react-covid-maps/geo.json";
  const [geo, setGeo] = useState(null);

  return (
    <div className=" wrapper h-[calc(100vh-74px)] md:h-[calc(100vh-80px)] bg-zinc-700 flex-1 text-white overflow-hidden flex flex-col items-center justify-center pt-20">
      <h6 className=" px-6 pb-6">Show Details: {geo?.properties.name}</h6>

      <ComposableMap
        height={900}
        projectionConfig={{ rotate: [-10, 0, 0], scale: 190 }}
      >
        <ZoomableGroup>
          <Sphere stroke="gray" strokeWidth={0.3} />
          <Graticule stroke="gray" strokeWidth={0.3} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Link to={`/detail?code=${geo.id}`} key={geo.rsmKey}>
                  <Geography
                    onMouseEnter={() => setGeo(geo)}
                    onMouseLeave={() => setGeo(null)}
                    style={{
                      default: { fill: "#eee" },
                      hover: { fill: "#16a34a" },
                      pressed: { fill: "#16854a" },
                    }}
                    geography={geo}
                  />
                </Link>
              ))
            }
          </Geographies>
          {geo && (
            <Annotation
              subject={geo.geometry.coordinates[0][0]}
              dx={-90}
              dy={-30}
              style={{ zIndex: 999999 }}
              connectorProps={{
                stroke: "#FF5533",
                strokeWidth: 3,
                strokeLinecap: "round",
              }}
            >
              <text
                x="-8"
                textAnchor="end"
                alignmentBaseline="middle"
                fill="#F53"
              >
                {geo.properties.name}
              </text>
            </Annotation>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Main;
