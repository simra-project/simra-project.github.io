var params = new URLSearchParams(window.location.search)

var region;
var regionMeta;

switch (params.get("region")) {
    case "berlin10":
        region = "region/berlin10.json";
        regionMeta = "region/berlin10-meta.json";
        break;
    case "leipzig":
        region = "region/leipzig.json";
        regionMeta = "region/leipzig-meta.json"
        // break; UNCOMMENT TO ACTIVATE
    default:
        region = "region/berlin.json";
        regionMeta = "region/berlin-meta.json";
}

var geojson;

fetch(regionMeta)
    .then(response => response.json())
    .then(data => {
        document.getElementById("regionTitle").innerHTML = data.regionTitle
        document.getElementById("regionDescription").innerHTML = data.regionDescription
        map.setView(data.mapView, data.mapZoom);
    })

fetch(region)
    .then(response => response.json())
    .then(data => {
        geojson = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature,
            filter: withoutIncidents
        }).addTo(polygonGroup);
    })