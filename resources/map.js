var map = L.map('map')
var markerGroup = L.featureGroup().addTo(map);
var polygonGroup = L.featureGroup().addTo(map);

// trigger modal dismisses
var modal = document.getElementsByClassName("modal")[0];
document.getElementsByClassName("modal-background")[0].addEventListener('click', function(event) {
    modal.classList.remove('is-active');
});
document.getElementsByClassName("modal-close")[0].addEventListener('click', function(event) {
    modal.classList.remove('is-active');
});

map.on('click', function(e) {
    console.log('clicked on map');
    markerGroup.clearLayers();
});

markerGroup.on('click', function(e) {
    console.log('clicked on marker');
    L.DomEvent.stopPropagation(e);
});

polygonGroup.on('click', function(e) {
    var markers = e.layer.feature.properties.markers;
    console.log('markers: ' + markers);
    for (var i = 0; i < markers.length; i++) {
        var incidentMarkerIcon
        if (markers[i][2]) {
            incidentMarkerIcon = L.icon({
                iconUrl: './resources/marker-icon-2x-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        } else {
            incidentMarkerIcon = L.icon({
                iconUrl: './resources/marker-icon-2x-blue.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
        }
        L.marker([markers[i][0][1], markers[i][0][0]], {
            icon: incidentMarkerIcon
        }).bindPopup(markers[i][1]).addTo(markerGroup);

    }
    L.DomEvent.stopPropagation(e);
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function printProps(object) {
    for (var propName in object) {
        console.log('propName,propValue: ' + propName, propValue);
    }
}


// control that shows state info on hover
var info = L.control();

info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};



info.update = function(id, props) {
    if (typeof props !== 'undefined') {
        var htmlContent = '';
        if (props.type === 'Street' || props.type === 'Junction') {
            htmlContent += ('<b>Gefahrenscore: ' + (Math.round((props.score + Number.EPSILON) * 100) / 100) + '</b>' +
                // '<br /> ID: ' + id +
                '<br /> <b>Gesamtzahl Fahrten: </b>' + props.rides +
                // '<br />' + props.type +
                '<br /> <b>Gesamtzahl Beinaheunfälle: </b>' + props.incidents +
                '<br /> <i>Zu dichtes Überholen: </i>' + props.clopa +
                '<br /> <i>Ein- oder ausparkendes Fahrzeug: </i>' + props.spiot +
                '<br /> <i>Beinahe-Abbiegeunfall: </i>' + props.nlorh +
                '<br /> <i>Entgegenkommender Verkehrsteilnehmer: </i>' + props.saho +
                '<br /> <i>Zu dichtes Auffahren: </i>' + props.tailgating +
                '<br /> <i>Beinahe-Dooring: </i>' + props.nd +
                '<br /> <i>Einem Hindernis ausweichen: </i>' + props.dao +
                '<br /> <i>Sonstiges: </i>' + props.other);
        } else {
            '<b>Mauszeiger über einem Segment halten</b>';
        }
        this._div.innerHTML = '<h4><b>Info</h4>' + htmlContent;
    } else {
        this._div.innerHTML = '<h4><b>Info</h4> <br /> Mauszeiger über einem Segment halten</b>'
    }
};

info.addTo(map);


// get color depending on score value
function getColor(score) {
    return score >= 0.5 ? '#d7191c' :
        score >= 0.25 ? '#ff6600' :
        score >= 0.1 ? '#ffff00' :
        '#1a9641';
}

// get opacity depending on score value
function getOpacity(score) {
    return score > 0.1 ? 0.7 : 0.1;
}

// get weight depending on score value
function getWeight(score) {
    return score > 0.1 ? 5 : 1;
}


function style(feature) {
    return {
        weight: getWeight(feature.properties.score),
        color: getColor(feature.properties.score),
        fillOpacity: getOpacity(feature.properties.score),
        fillColor: getColor(feature.properties.score)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge && layer.feature.properties.type != 'Incident') {
        layer.bringToFront();
    }

    info.update(layer.feature.id, layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(feature) {
    map.fitBounds(feature.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function withoutIncidents(feature) {
    if (feature.properties.type !== 'Incident') {
        return true;
    }
}

// add incident markers on click on segment


// legend on bottom right
var legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.1, 0.25, 0.5],
        labels = ['<strong>Gefahrenscore</strong>'],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 0.01) + '"></i> ' +
            from + (to ? ' &ndash; ' + to : ' und höher'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);