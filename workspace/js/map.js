/* Setup map view */
var map = L.map('map').setView([-37.813611,144.963056], 12)

/* Add an OpenStreetMap tile layer. */
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(osmLayer);
