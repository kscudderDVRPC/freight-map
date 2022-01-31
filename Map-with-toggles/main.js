// Step 1: create the "map" object
// -------------------------------
mapboxgl.accessToken =
  "pk.eyJ1Ijoia3NjdWRkZXIiLCJhIjoiY2szNHp3ZjM5MWI0bzNtcG04cjNlODk3OCJ9.FtZqPy6mIY9tpScUon9gcg";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/kscudder/ckyw1ruim001j14o2vg4ri861",
  center: [-75.16362, 39.95238],
  zoom: 9.5,
});

// Step 2: add data sources and layers to the map after initial load
// -----------------------------------------------------------------

map.on("load", () => {
  // LOAD DATA: add geojson layer from DVRPC's open data portal
  map.addSource("airports-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/2f319a9ae95d444d846cf038b3a02b28_0.geojson",
  });

  // LOAD DATA: add geojson layer from DVRPC's open data portal
  map.addSource("freight-highways-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/cda7b40b831447d29bad84ec4ea703d8_0.geojson",
  });

  // LOAD DATA: add geojson layer from DVRPC's open data portal
  map.addSource("freight-rail-geojson", {
    type: "geojson",
    data: "https://opendata.arcgis.com/datasets/fd5dbce74bec468ea4fed5b497975e60_0.geojson",
  });

  // ADD LAYER: add airport layer as a fill
  map.addLayer({
    id: "airports-fill",
    type: "fill",
    source: "airports-geojson",
    paint: {
      "fill-opacity": 0.25,
      "fill-color": "red",
    },
  });
 
 
  // ADD LAYER: add freight rail layer as a line
  map.addLayer({
    id: "freight-rail-line",
    type: "line",
    source: "freight-rail-geojson",
    paint: {
      "line-width": 2,
      "line-opacity": 1,
      "line-color": "black",
    },
  });
  
  // ADD LAYER: add freight highways layer as a line
  map.addLayer({
    id: "freight-highways-lines",
    type: "line",
    source: "freight-highways-geojson",
    paint: {
      "line-opacity": 0.7,
      "line-width": 3,
      "line-color": [
        "case",
        ["==", ["get", "type"], "Interstate Highway"],
        "green",
        ["==", ["get", "type"], "Limited Access Highway"],
        "red",
        "black",
      ],
    },
  });
});


// Step 3: define what happens when the legend form is clicked on

let form = document.getElementById("legend-form");
form.addEventListener("change", function () {
  let freighthighways = form.elements["freight-highways"];
  if (freighthighways.checked) {
    map.setLayoutProperty("freight-highways-lines", "visibility", "visible");
  } else {
    map.setLayoutProperty("freight-highways-lines", "visibility", "none");
  }

  let freightrail = form.elements["freight-rail"];
  if (freightrail.checked) {
    map.setLayoutProperty("freight-rail-line", "visibility", "visible");
  } else {
    map.setLayoutProperty("freight-rail-line", "visibility", "none");
  }

  let airports = form.elements["airports"];
  if (airports.checked) {
    map.setLayoutProperty("airports-fill", "visibility", "visible");
  } else {
    map.setLayoutProperty("airports-fill", "visibility", "none");
  }
});
