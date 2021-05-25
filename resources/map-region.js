var params = new URLSearchParams(window.location.search)

var region;
var regionMeta;

switch (params.get("region")) {
    case "berlin10":
        region = "region/berlin10.json";
        regionMeta = "region/berlin10-meta.json";
        // break;
    case "konstanz":
        region = "region/Konstanz.json";
        regionMeta = "region/Konstanz-meta.json"
        break;
    case "konstanz_all":
        region = "region/Konstanz_all.json";
        regionMeta = "region/Konstanz_all-meta.json"
        break;
    case "nuernberg":
        region = "region/Nuernberg.json";
        regionMeta = "region/Nuernberg-meta.json"
        break;
    case "nuernberg_all":
        region = "region/Nuernberg_all.json";
        regionMeta = "region/Nuernberg_all-meta.json"
        break;
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
        if (data.regionDate != undefined) {
            document.getElementById("regionDate").innerHTML = data.regionDate
        }
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