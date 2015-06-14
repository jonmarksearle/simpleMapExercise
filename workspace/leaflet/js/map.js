$(document).ready(function() {
/* Setup map view */
var map = L.map('map').setView([-37.813611,144.963056], 10)


/* Add an OpenStreetMap tile layer. */
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(osmLayer);


/* Add data from csv to map */
d3.csv("data/SIS_DATASUPPLY_2014_fatal.csv", function(d) {
    return {
        id:    d["ACCIDENT_NO"],
        lng:   d["LONGITUDE"],
        lat:   d["LATITUDE"],
        date:  d["ACCIDENT_DATE"],
        time:  d["ACCIDENT_TIME"],
        type1: d["ACCIDENT_TYPE"],
        type2: d["DCA_CODE"],		
		dow:   d["DAY_OF_WEEK"],
		light: d["LIGHT_CONDITION"],
		sev:   d["SEVERITY"],
		rma:   d["RMA"],
		speed: d["SPEED_ZONE"]		
    };
}, function(error, rows) {
    var geojson1 = [];
    $.each(rows, function(item, entry) {
    	if (isNaN(entry.lng) || isNaN(entry.lat)) {
    		console.log(entry);
    	} else {
			var tmp = {
				"type": "Feature",
				"properties": {
					"name": entry.id,
					"popupContent": 
						"<p><b>"  +entry.dow+" "+entry.date+" " +entry.time+"</b><br>"+
						"<br>" +entry.type1+
						"<br>" +entry.type1+
						"<br>" +entry.type2+
						"<br>" +entry.light+
						"<br>" +entry.sev+
						"<br>" +entry.rma+
						"<br>" +entry.speed+
						"</p>"
				},
				"geometry": {
					"type": "Point",
					"coordinates": [entry.lng, entry.lat]
				}
			};
			geojson1.push(tmp);
    	};
    });
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
