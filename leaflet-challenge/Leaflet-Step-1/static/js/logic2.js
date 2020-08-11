// marker size based on magnitude
function markerSize(mag) {
    return mag;
}

// def queryURL of significant earthquakes in past 30 days and respective coordinates
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// GET request to queryURL
d3.json(queryURL, function(data) {
    // send data.features response object to createFeatures function
    createFeatures(data.features);
});

// def function to run once per feature in features array and create popup
// ...per feature, describing: place, magnitude, & time of EQ
function createFeatures(eqData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
        "<h3><hr>" + feature.properties.mag + 
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // def L.geoJSON layer on(Each) feature array in eqData
    var earthquakes = L.geoJSON(eqData, {
        onEachFeature: onEachFeature
    });

    //array for markers
    var eqMarkers = [];

    // loop through earthquakes and append to eqMarkers
    for (var i = 0; i < earthquakes.length; i++) {
        // set marker radius, passing mag into the markerSize function
        eqMarkers.push(
        L.circle(earthquakes[i].coordinates, {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: "white",
            radius: markerSize(earthquakes[i].properties.mag)
        }));
    }
    
    // create layer
    var EQs = L.layerGroup(eqMarkers);
    
    // EQ layer to createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // def var for base layers
    var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

  var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // def baseMaps obj to hold base layers
    var baseMaps = {
        "Street Map": streetMap,
        "Dark Map": darkMap
    };
  
    // def overlay object to hold overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };
  
    // def myMap, with layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetMap, earthquakes, EQs]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}