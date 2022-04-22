// trigger modal dismisses
var modal = document.getElementsByClassName("modal")[0];
document.getElementsByClassName("modal-background")[0].addEventListener('click', function(event) {
	modal.classList.remove('is-active');
});
document.getElementsByClassName("modal-close")[0].addEventListener('click', function(event) {
	modal.classList.remove('is-active');
});
var map = L.map('map'); 
			
var osm=new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{
				attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
fetchIncidents()

var normal_style = {
	'weight': 3,
	'opacity': 0.6,
	color: '#000000'
}
var highlight_style = {
	'weight': 6,
	'opacity': 1,
	color: '#0000ff'
};

// Set style function that sets fill color property
function style(feature) {
	return {
	'weight': 3,
	'opacity': 0.6,
	color: '#000000'
	};
}

function forEachFeature(feature, layer) {

	var popupContent = '<p><b>Datum: </b>' + feature.properties.date
	+ '<br /> <b>Fahrradtyp: </b>' + feature.properties.bikeType
	+ '<br /> <b>Kind transportiert: </b>' + feature.properties.child
	+ '<br /> <b>Anhänger dabei: </b>' + feature.properties.trailer
	+ '<br /> <b>Handyort: </b>' + feature.properties.pLoc
	+ '<br /> <b>Beinaheunfalltyp: </b>' + feature.properties.incident
	+ '<br /> <b>Beteiligte Verkehrsteilnehmer: </b>' + feature.properties.participant
	+ '<br /> <b>Diese Erfahrung war beängstigend: </b>' + feature.properties.scary
	+ '<br /> <b>Beschreibung: </b>' + feature.properties.descr
	+ '<br /> <b>Region: </b>' + feature.properties.region
	+ '</p>';

	layer.bindPopup(popupContent);
	layer.on('click', function () {
	});
}
	
// Null variable that will hold layer
var redIcon = new L.Icon({
	   iconUrl: './resources/marker-icon-2x-red.png',
	   iconSize: [25, 41],
	   iconAnchor: [12, 41],
	   popupAnchor: [1, -34],
	   shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
	   iconUrl: './resources/marker-icon-2x-blue.png',
	   iconSize: [25, 41],
	   iconAnchor: [12, 41],
	   popupAnchor: [1, -34],
	   shadowSize: [41, 41]
});

var markers = L.markerClusterGroup();

// for Layer Control	
var baseMaps = {
	"Open Street Map": osm  	
};

var overlayMaps = {
	"Incidents":markers
};	

	
//Add layer control
L.control.layers(baseMaps, overlayMaps).addTo(map);