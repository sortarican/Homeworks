// def queryURL of significant earthquakes in past 30 days and respective coordinates
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

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

    // loop through eqData and append to eqMarkers
    // for (var i = 0; i < eqData.length; i++) {
    //     // set marker radius, passing mag into the markerSize function
    //     eqMarkers.push(
    //     L.circleMarker(eqData[i].geometry.coordinates, {
    //         stroke: false,
    //         color: '#ff9033',
    //         radius: markerSize(eqData[i].properties.mag)
    //     })
    //     );
    // }
    
    // EQ layer to createMap function
    createMap(earthquakes, eqData);

    function createMap(earthquakes, eqData) {
                
        // def var for base layers
        var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });

        // var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        //     maxZoom: 18,
        //     id: "dark-v10",
        //     accessToken: API_KEY
        // });
       
        console.log(eqMarkers)

        var mkrLayer = L.layerGroup(eqMarkers);

        // def baseMaps obj to hold base layers
        var baseMaps = {
            "Street Map": streetMap,
            // "Dark Map": darkMap
        };

        // def overlay object to hold overlay layer
        var overlayMaps = {
            "Magnitude": mkrLayer,
            "Earthquakes": earthquakes
        };

        // def myMap, with layers to display on load
        var myMap = L.map("map", {
            center: [
                37.09, -100.71
            ],
            zoom: 5,
            layers: [streetMap, mkrLayer, earthquakes]
        });

        // marker size based on magnitude
        function markerSize(mag) {
        return mag * 20000;
        }

        // Loop through eqData
        for (var i = 0; i < eqData.length; i++) {
            L.circle(eqData[i].geometry.coordinates.slice(0,2).reverse(), {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple",
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: markerSize(eqData[i].properties.mag)
            }).addTo(myMap)//.bindPopup("<h1>" + eqData[i].properties.place + "</h1> <hr> <h3>Population: " + eqData[i].properties.mag + "</h3>").addTo(myMap);
        }
        
        console.log(eqData[1].geometry.coordinates.slice(0,2))

        // Create a layer control
        // Pass in baseMaps and overlayMaps
        // Add layer control to map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
    }

}

// GET request to queryURL
d3.json(queryURL, function(data) {
    // send data.features response object to createFeatures function
    createFeatures(data.features);
});