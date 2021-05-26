var params = new URLSearchParams(window.location.search)

var region;
var regionMeta;

switch (params.get("region")) {
    case "alzey_all":
        region = "region/Alzey_all.json";
        regionMeta = "region/Alzey_all-meta.json"
        break;
    case "berlin":
        region = "region/berlin.json";
        regionMeta = "region/berlin-meta.json";
        break;
    case "berlin10":
        region = "region/berlin10.json";
        regionMeta = "region/berlin10-meta.json";
        break;
    case "koblenz":
        region = "region/Koblenz.json";
        regionMeta = "region/Koblenz-meta.json"
        break;
    case "koblenz_all":
        region = "region/Koblenz_all.json";
        regionMeta = "region/Koblenz_all-meta.json"
        break;
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
    case "ortenau":
        region = "region/Ortenau.json";
        regionMeta = "region/Ortenau-meta.json"
        break;
    case "ortenau_all":
        region = "region/Ortenau_all.json";
        regionMeta = "region/Ortenau_all-meta.json"
        break;
    case "trier":
        region = "region/Trier.json";
        regionMeta = "region/Trier-meta.json"
        break;
    case "trier_all":
        region = "region/Trier_all.json";
        regionMeta = "region/Trier_all-meta.json"
        break;
    case "tuttlingen":
        region = "region/Tuttlingen.json";
        regionMeta = "region/Tuttlingen-meta.json"
        break;
    case "tuttlingen_all":
        region = "region/Tuttlingen_all.json";
        regionMeta = "region/Tuttlingen_all-meta.json"
        break;
    case "wetterau":
        region = "region/Wetterau.json";
        regionMeta = "region/Wetterau-meta.json"
        break;
    case "wetterau_all":
        region = "region/Wetterau_all.json";
        regionMeta = "region/Wetterau_all-meta.json"
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