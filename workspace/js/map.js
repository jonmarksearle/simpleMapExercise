$(document).ready(function() {
/* Setup map view */
var map = L.map('map').setView([-37.813611,144.963056], 10)


/* Add an OpenStreetMap tile layer. */
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(osmLayer);


/* Add data from csv to map */
d3.csv("/workspace/data/SIS_DATASUPPLY_may_subset.csv", function(d) {
    return {
        id: d["ACCIDENT_NO"],
        lng: d[" LONGITUDE"],
        lat: d[" LATITUDE"],
        date: d[" ACCIDENT_DATE"],
        time: d[" ACCIDENT_TIME"],
        type: d[" ACCIDENT_TYPE"]
    };
}, function(error, rows) {
    geojson1 = [];
    $.each(rows, function(item, entry) {
        tmp = {
            "type": "Feature",
            "properties": {
                "name": entry.id,
                "popupContent": "<p><b>" +entry.id+ 
                    "</b><br>Date: " +entry.date+ 
                    "<br>Time: " +entry.time+ 
                    "<br><i>" +entry.type+ "</i></p>"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [entry.lng, entry.lat]
            }
        };
       geojson1.push(tmp); 
    })
    L.geoJson(geojson1, {
        onEachFeature: onEachFeature
    }).addTo(map);
});

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}
});
