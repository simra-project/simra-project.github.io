var params = new URLSearchParams(window.location.search)

var region;
var regionMeta;

switch (params.get("region")) {
    case "alzey_all":
        region = "region/Alzey_all.json";
        regionMeta = "region/Alzey_all-meta.json"
        break;
	case "augsburg":
        region = "region/Augsburg.json";
        regionMeta = "region/Augsburg-meta.json"
        break;
    case "berlin":
        region = "region/Berlin.json";
        regionMeta = "region/Berlin-meta.json";
        break;
    case "berlin10":
        region = "region/Berlin10.json";
        regionMeta = "region/Berlin10-meta.json";
        break;
    case "bern":
        region = "region/Bern.json";
        regionMeta = "region/Bern-meta.json";
        break;
    case "breisgau-hochschwarzwald":
        region = "region/Breisgau-Hochschwarzwald.json";
        regionMeta = "region/Breisgau-Hochschwarzwald-meta.json";
        break;
    case "breisgau-hochschwarzwald_all":
        region = "region/Breisgau-Hochschwarzwald_all.json";
        regionMeta = "region/Breisgau-Hochschwarzwald_all-meta.json";
        break;
    case "bruchsal":
        region = "region/Bruchsal.json";
        regionMeta = "region/Bruchsal-meta.json";
        break;
    case "bruchsal_all":
        region = "region/Bruchsal_all.json";
        regionMeta = "region/Bruchsal_all-meta.json";
        break;
    case "freiburg":
        region = "region/Freiburg.json";
        regionMeta = "region/Freiburg-meta.json";
        break;
    case "Freiburg_all":
        region = "region/Freiburg_all.json";
        regionMeta = "region/Freiburg_all-meta.json";
        break;
    case "hannover":
        region = "region/Hannover.json";
        regionMeta = "region/Hannover-meta.json";
        break;
    case "hannover_all":
        region = "region/Hannover_all.json";
        regionMeta = "region/Hannover_all-meta.json";
        break;
    case "hamburg":
        region = "region/Freiburg.json";
        regionMeta = "region/Freiburg-meta.json";
        break;
    case "hamburg_all":
        region = "region/Hamburg_all.json";
        regionMeta = "region/Hamburg_all-meta.json";
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
    case "landau":
        region = "region/Landau.json";
        regionMeta = "region/Landau-meta.json"
        break;
    case "landau_all":
        region = "region/Landau_all.json";
        regionMeta = "region/Landau_all-meta.json"
        break;
    case "mainz":
        region = "region/Mainz.json";
        regionMeta = "region/Mainz-meta.json"
        break;
    case "mainz_all":
        region = "region/Mainz_all.json";
        regionMeta = "region/Mainz_all-meta.json"
        break;
    case "mannheim":
        region = "region/Mannheim.json";
        regionMeta = "region/Mannheim-meta.json"
        break;
    case "mannheim_all":
        region = "region/Mannheim_all.json";
        regionMeta = "region/Mannheim_all-meta.json"
        break;
    case "münchen":
        region = "region/München.json";
        regionMeta = "region/München-meta.json"
        break;
	case "nuernberg":
        region = "region/Nuernberg.json";
        regionMeta = "region/Nuernberg-meta.json"
        break;
	case "nuernberg_path":
        region = "region/Nuernberg_Path.json";
        regionMeta = "region/Nuernberg_Path-meta.json"
        break;
    case "nuernberg_all":
        region = "region/Nuernberg_all.json";
        regionMeta = "region/Nuernberg_all-meta.json"
        break;
	case "nuernberg_all_i":
        region = "region/Nuernberg_all_i.json";
        regionMeta = "region/Nuernberg_all_i-meta.json"
        break;
	case "nuernberg_all_path":
        region = "region/Nuernberg_all_path.json";
        regionMeta = "region/Nuernberg_all_path-meta.json"
        break;		
    case "ortenau":
        region = "region/Ortenau.json";
        regionMeta = "region/Ortenau-meta.json"
        break;
    case "ortenau_all":
        region = "region/Ortenau_all.json";
        regionMeta = "region/Ortenau_all-meta.json"
        break;
    case "rastatt":
        region = "region/Rastatt.json";
        regionMeta = "region/Rastatt-meta.json"
        break;
    case "rastatt_all":
        region = "region/Rastatt_all.json";
        regionMeta = "region/Rastatt_all-meta.json"
        break;
    case "ruhrgebiet":
        region = "region/Ruhrgebiet.json";
        regionMeta = "region/Ruhrgebiet-meta.json"
        break;
    case "ruhrgebiet_all_i":
        region = "region/Ruhrgebiet_all_i.json";
        regionMeta = "region/Ruhrgebiet_all_i-meta.json"
        break;
	case "saarlouis":
        region = "region/Saarlouis.json";
        regionMeta = "region/Saarlouis-meta.json"
        break;
    case "saarlouis_all":
        region = "region/Saarlouis_all.json";
        regionMeta = "region/Saarlouis_all-meta.json"
        break;
    case "stuttgart":
        region = "region/Stuttgart.json";
        regionMeta = "region/Stuttgart-meta.json"
        break;
    case "stuttgart_all":
        region = "region/Stuttgart_all.json";
        regionMeta = "region/Stuttgart_all-meta.json"
        break;
    case "trier":
        region = "region/Trier.json";
        regionMeta = "region/Trier-meta.json"
        break;
    case "trier_all":
        region = "region/Trier_all.json";
        regionMeta = "region/Trier_all-meta.json"
        break;
    case "tübingen":
        region = "region/Tübingen.json";
        regionMeta = "region/Tübingen-meta.json"
        break;
    case "tübingen_all":
        region = "region/Tübingen_all.json";
        regionMeta = "region/Tübingen_all-meta.json"
        break;
    case "tuttlingen":
        region = "region/Tuttlingen.json";
        regionMeta = "region/Tuttlingen-meta.json"
        break;
    case "tuttlingen_all":
        region = "region/Tuttlingen_all.json";
        regionMeta = "region/Tuttlingen_all-meta.json"
        break;
    case "vulkaneifel":
        region = "region/Vulkaneifel.json";
        regionMeta = "region/Vulkaneifel-meta.json"
        break;
    case "vulkaneifel_all":
        region = "region/Vulkaneifel_all.json";
        regionMeta = "region/Vulkaneifel_all-meta.json"
        break;
    case "wetterau":
        region = "region/Wetterau.json";
        regionMeta = "region/Wetterau-meta.json"
        break;
    case "wetterau_all":
        region = "region/Wetterau_all.json";
        regionMeta = "region/Wetterau_all-meta.json"
        break;
    case "wuppertal":
        region = "region/Wuppertal.json";
        regionMeta = "region/Wuppertal-meta.json"
        break;
    case "wuppertal_all":
        region = "region/Wuppertal_all.json";
        regionMeta = "region/Wuppertal_all-meta.json"
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
