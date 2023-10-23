var params = new URLSearchParams(window.location.search)

var region;
var regionMeta;
var incidents;
var incidentsMeta;


switch (params.get("region")) {
	case "aachen_all":
        region = "region/Aachen_all.json";
        regionMeta = "region/Aachen_all-meta.json";
	    incidents = "incidents/Aachen-incidents.json";
        incidentsMeta = "incidents/Aachen-incidents-meta.json";
        break;
	case "aachen2_all":
        region = "region/Aachen2_all.json";
        regionMeta = "region/Aachen2_all-meta.json";
	    incidents = "incidents/Aachen2-incidents.json";
        incidentsMeta = "incidents/Aachen2-incidents-meta.json";
        break;
	case "alzey_all":
        region = "region/Alzey_all.json";
        regionMeta = "region/Alzey_all-meta.json";
	    incidents = "incidents/Alzey-incidents.json";
        incidentsMeta = "incidents/Alzey-incidents-meta.json";
        break;
	case "ahrweiler_all":
        region = "region/Ahrweiler_all.json";
        regionMeta = "region/Ahrweiler_all-meta.json";
	    incidents = "incidents/Ahrweiler-incidents.json";
        incidentsMeta = "incidents/Ahrweiler-incidents-meta.json";
        break;
    case "augsburg":
        region = "region/Augsburg.json";
        regionMeta = "region/Augsburg-meta.json";
	    incidents = "incidents/Augsburg-incidents.json";
        incidentsMeta = "incidents/Augsburg-incidents-meta.json";
        break;
    case "augsburg_all":
        region = "region/Augsburg_all.json";
        regionMeta = "region/Augsburg_all-meta.json";
	    incidents = "incidents/Augsburg-incidents.json";
        incidentsMeta = "incidents/Augsburg-incidents-meta.json";
		break;
    case "berlin":
        region = "region/Berlin.json";
        regionMeta = "region/Berlin-meta.json";
	    incidents = "incidents/Berlin-incidents.json";
        incidentsMeta = "incidents/Berlin-incidents-meta.json";
        break;
    case "berlin10":
        region = "region/Berlin10.json";
        regionMeta = "region/Berlin10-meta.json";
	    incidents = "incidents/Berlin-incidents.json";
        incidentsMeta = "incidents/Berlin-incidents-meta.json";
        break;
    case "bern":
        region = "region/Bern.json";
        regionMeta = "region/Bern-meta.json";
	    incidents = "incidents/Bern-incidents.json";
        incidentsMeta = "incidents/Bern-incidents-meta.json";
        break;
    case "bern_all":
        region = "region/Bern_all.json";
        regionMeta = "region/Bern_all-meta.json";
	    incidents = "incidents/Bern-incidents.json";
        incidentsMeta = "incidents/Bern-incidents-meta.json";
        break;
    case "bielefeld":
        region = "region/Bielefeld.json";
        regionMeta = "region/Bielefeld-meta.json";
	    incidents = "incidents/Bielefeld-incidents.json";
        incidentsMeta = "incidents/Bielefeld-incidents-meta.json";
        break;
    case "bielefeld_all":
        region = "region/Bielefeld_all.json";
        regionMeta = "region/Bielefeld_all-meta.json";
	    incidents = "incidents/Bielefeld-incidents.json";
        incidentsMeta = "incidents/Bielefeld-incidents-meta.json";
        break;
    case "bonn":
        region = "region/Bonn.json";
        regionMeta = "region/Bonn-meta.json";
	    incidents = "incidents/Bonn-incidents.json";
        incidentsMeta = "incidents/Bonn-incidents-meta.json";
        break;
    case "bonn_all":
        region = "region/Bonn_all.json";
        regionMeta = "region/Bonn_all-meta.json";
	    incidents = "incidents/Bonn-incidents.json";
        incidentsMeta = "incidents/Bonn-incidents-meta.json";
        break;
    case "breisgau-hochschwarzwald":
        region = "region/Breisgau-Hochschwarzwald.json";
        regionMeta = "region/Breisgau-Hochschwarzwald-meta.json";
	    incidents = "incidents/Breisgau-Hochschwarzwald-incidents.json";
        incidentsMeta = "incidents/Breisgau-Hochschwarzwald-incidents-meta.json";
        break;
    case "breisgau-hochschwarzwald_all":
        region = "region/Breisgau-Hochschwarzwald_all.json";
        regionMeta = "region/Breisgau-Hochschwarzwald_all-meta.json";
	    incidents = "incidents/Breisgau-Hochschwarzwald-incidents.json";
        incidentsMeta = "incidents/Breisgau-Hochschwarzwald-incidents-meta.json";
        break;
    case "bruchsal":
        region = "region/Bruchsal.json";
        regionMeta = "region/Bruchsal-meta.json";
	    incidents = "incidents/Bruchsal-incidents.json";
        incidentsMeta = "incidents/Bruchsal-incidents-meta.json";
        break;
    case "bruchsal_all":
        region = "region/Bruchsal_all.json";
        regionMeta = "region/Bruchsal_all-meta.json";
	    incidents = "incidents/Bruchsal-incidents.json";
        incidentsMeta = "incidents/Bruchsal-incidents-meta.json";
        break;
    case "bruehl_all":
        region = "region/Bruehl_all.json";
        regionMeta = "region/Bruehl_all-meta.json";
	    incidents = "incidents/Bruehl-incidents.json";
        incidentsMeta = "incidents/Bruehl-incidents-meta.json";
        break;
	case "darmstadt_all":
        region = "region/Darmstadt_all.json";
        regionMeta = "region/Darmstadt_all-meta.json";
	    incidents = "incidents/Darmstadt-incidents.json";
        incidentsMeta = "incidents/Darmstadt-incidents-meta.json";
        break;
	case "dresden":
        region = "region/Dresden.json";
        regionMeta = "region/Dresden-meta.json";
	    incidents = "incidents/Dresden-incidents.json";
        incidentsMeta = "incidents/Dresden-incidents-meta.json";
        break;
    case "düsseldorf":
        region = "region/Düsseldorf.json";
        regionMeta = "region/Düsseldorf-meta.json";
	    incidents = "incidents/Düsseldorf-incidents.json";
        incidentsMeta = "incidents/Düsseldorf-incidents-meta.json";
        break;
	case "eichwalde":
        region = "region/Eichwalde.json";
        regionMeta = "region/Eichwalde-meta.json";
	    incidents = "incidents/Eichwalde-incidents.json";
        incidentsMeta = "incidents/Eichwalde-incidents-meta.json";
        break;
    case "eichwalde_all":
        region = "region/Eichwalde_all.json";
        regionMeta = "region/Eichwalde_all-meta.json";
	    incidents = "incidents/Eichwalde-incidents.json";
        incidentsMeta = "incidents/Eichwalde-incidents-meta.json";
        break;
    case "frankfurt_all":
        region = "region/Frankfurt_all.json";
        regionMeta = "region/Frankfurt_all-meta.json";
	    incidents = "incidents/Frankfurt-incidents.json";
        incidentsMeta = "incidents/Frankfurt-incidents-meta.json";
        break;
    case "freiburg":
        region = "region/Freiburg.json";
        regionMeta = "region/Freiburg-meta.json";
	    incidents = "incidents/Freiburg-incidents.json";
        incidentsMeta = "incidents/Freiburg-incidents-meta.json";
        break;
    case "freiburg_all":
        region = "region/Freiburg_all.json";
        regionMeta = "region/Freiburg_all-meta.json";
	    incidents = "incidents/Freiburg-incidents.json";
        incidentsMeta = "incidents/Freiburg-incidents-meta.json";
        break;
    case "friedrichshafen_all":
        region = "region/Friedrichshafen_all.json";
        regionMeta = "region/Friedrichshafen_all-meta.json";
	    incidents = "incidents/Friedrichshafen-incidents.json";
        incidentsMeta = "incidents/Friedrichshafen-incidents-meta.json";
        break;
	case "hannover":
        region = "region/Hannover.json";
        regionMeta = "region/Hannover-meta.json";
	    incidents = "incidents/Hannover-incidents.json";
        incidentsMeta = "incidents/Hannover-incidents-meta.json";
        break;
    case "hannover_all":
        region = "region/Hannover_all.json";
        regionMeta = "region/Hannover_all-meta.json";
	    incidents = "incidents/Hannover-incidents.json";
        incidentsMeta = "incidents/Hannover-incidents-meta.json";
        break;
    case "hamburg-blankenese":
        region = "region/Hamburg-Blankenese.json";
        regionMeta = "region/Hamburg-Blankenese-meta.json";
	    incidents = "incidents/Hamburg-Blankenese-incidents.json";
        incidentsMeta = "incidents/Hamburg-Blankenese-incidents-meta.json";
        break;
    case "hamburg-blankenese_all":
        region = "region/Hamburg-Blankenese_all.json";
        regionMeta = "region/Hamburg-Blankenese_all-meta.json";
	    incidents = "incidents/Hamburg-Blankenese-incidents.json";
        incidentsMeta = "incidents/Hamburg-Blankenese-incidents-meta.json";
        break;
	case "hoyerswerda":
        region = "region/Hoyerswerda_all.json";
        regionMeta = "region/Hoyerswerda_all-meta.json";
	    incidents = "incidents/Hoyerswerda-incidents.json";
        incidentsMeta = "incidents/Hoyerswerda-incidents-meta.json";
        break;
    case "kaiserslautern_all":
        region = "region/Kaiserslautern_all.json";
        regionMeta = "region/Kaiserslautern_all-meta.json";
	    incidents = "incidents/Kaiserslautern-incidents.json";
        incidentsMeta = "incidents/Kaiserslautern-incidents-meta.json";
        break;
    case "karlsruhe":
        region = "region/Karlsruhe.json";
        regionMeta = "region/Karlsruhe-meta.json";
	    incidents = "incidents/Karlsruhe-incidents.json";
        incidentsMeta = "incidents/Karlsruhe-incidents-meta.json";
        break;
    case "kiel_all":
        region = "region/Kiel_all.json";
        regionMeta = "region/Kiel_all-meta.json";
	    incidents = "incidents/Kiel-incidents.json";
        incidentsMeta = "incidents/Kiel-incidents-meta.json";
        break;
    case "kiel":
        region = "region/Kiel.json";
        regionMeta = "region/Kiel-meta.json";
	    incidents = "incidents/Kiel-incidents.json";
        incidentsMeta = "incidents/Kiel-incidents-meta.json";
        break;
	case "koblenz":
        region = "region/Koblenz.json";
        regionMeta = "region/Koblenz-meta.json";
	    incidents = "incidents/Koblenz-incidents.json";
        incidentsMeta = "incidents/Koblenz-incidents-meta.json";
        break;
	case "koblenz_all":
        region = "region/Koblenz_all.json";
        regionMeta = "region/Koblenz_all-meta.json";
	    incidents = "incidents/Koblenz-incidents.json";
        incidentsMeta = "incidents/Koblenz-incidents-meta.json";
        break;
    case "köln_all":
        region = "region/Köln_all.json";
        regionMeta = "region/Köln_all-meta.json";
	    incidents = "incidents/Köln-incidents.json";
        incidentsMeta = "incidents/Köln-incidents-meta.json";
        break;
    case "köln":
        region = "region/Köln.json";
        regionMeta = "region/Köln-meta.json";
	    incidents = "incidents/Köln-incidents.json";
        incidentsMeta = "incidents/Köln-incidents-meta.json";
        break;
	case "konstanz":
        region = "region/Konstanz.json";
        regionMeta = "region/Konstanz-meta.json";
	    incidents = "incidents/Konstanz-incidents.json";
        incidentsMeta = "incidents/Konstanz-incidents-meta.json";
        break;
    case "konstanz_all":
        region = "region/Konstanz_all.json";
        regionMeta = "region/Konstanz_all-meta.json";
	    incidents = "incidents/Konstanz-incidents.json";
        incidentsMeta = "incidents/Konstanz-incidents-meta.json";
        break;
    case "landau":
        region = "region/Landau.json";
        regionMeta = "region/Landau-meta.json";
	    incidents = "incidents/Landau-incidents.json";
        incidentsMeta = "incidents/Landau-incidents-meta.json";
        break;
    case "landau_all":
        region = "region/Landau_all.json";
        regionMeta = "region/Landau_all-meta.json";
	    incidents = "incidents/Landau-incidents.json";
        incidentsMeta = "incidents/Landau-incidents-meta.json";
        break;
    case "leipzig":
        region = "region/Leipzig.json";
        regionMeta = "region/Leipzig-meta.json";
	    incidents = "incidents/Leipzig-incidents.json";
        incidentsMeta = "incidents/Leipzig-incidents-meta.json";
        break;
    case "mainz":
        region = "region/Mainz.json";
        regionMeta = "region/Mainz-meta.json";
	    incidents = "incidents/Mainz-incidents.json";
        incidentsMeta = "incidents/Mainz-incidents-meta.json";
        break;
    case "mainz_all":
        region = "region/Mainz_all.json";
        regionMeta = "region/Mainz_all-meta.json";
	    incidents = "incidents/Mainz-incidents.json";
        incidentsMeta = "incidents/Mainz-incidents-meta.json";
        break;
    case "magdeburg":
        region = "region/Magdeburg.json";
        regionMeta = "region/Magdeburg-meta.json";
	    incidents = "incidents/Magdeburg-incidents.json";
        incidentsMeta = "incidents/Magdeburg-incidents-meta.json";
        break;
    case "magdeburg_all":
        region = "region/Magdeburg_all.json";
        regionMeta = "region/Magdeburg_all-meta.json";
	    incidents = "incidents/Magdeburg-incidents.json";
        incidentsMeta = "incidents/Magdeburg-incidents-meta.json";
        break;
    case "mannheim":
        region = "region/Mannheim.json";
        regionMeta = "region/Mannheim-meta.json";
	    incidents = "incidents/Mannheim-incidents.json";
        incidentsMeta = "incidents/Mannheim-incidents-meta.json";
        break;
    case "mannheim_all":
        region = "region/Mannheim_all.json";
        regionMeta = "region/Mannheim_all-meta.json";
	    incidents = "incidents/Mannheim-incidents.json";
        incidentsMeta = "incidents/Mannheim-incidents-meta.json";
        break;
    case "münchen":
        region = "region/München.json";
        regionMeta = "region/München-meta.json";
	    incidents = "incidents/München-incidents.json";
        incidentsMeta = "incidents/München-incidents-meta.json";
        break;
    case "münchen_all":
        region = "region/München_all.json";
        regionMeta = "region/München_all-meta.json";
	    incidents = "incidents/München-incidents.json";
        incidentsMeta = "incidents/München-incidents-meta.json";
        break;
    case "nuernberg":
        region = "region/Nuernberg.json";
        regionMeta = "region/Nuernberg-meta.json";
	    incidents = "incidents/Nuernberg-incidents.json";
        incidentsMeta = "incidents/Nuernberg-incidents-meta.json";
        break;
    case "nuernberg_path":
        region = "region/Nuernberg_Path.json";
        regionMeta = "region/Nuernberg_Path-meta.json";
	    incidents = "incidents/Nuernberg-incidents.json";
        incidentsMeta = "incidents/Nuernberg-incidents-meta.json";
        break;
    case "nuernberg_all":
        region = "region/Nuernberg_all.json";
        regionMeta = "region/Nuernberg_all-meta.json";
	    incidents = "incidents/Nuernberg-incidents.json";
        incidentsMeta = "incidents/Nuernberg-incidents-meta.json";
        break;
    case "nuernberg_all_i":
        region = "region/Nuernberg_all_i.json";
        regionMeta = "region/Nuernberg_all_i-meta.json";
	    incidents = "incidents/Nuernberg-incidents.json";
        incidentsMeta = "incidents/Nuernberg-incidents-meta.json";
        break;
    case "nuernberg_all_path":
        region = "region/Nuernberg_all_path.json";
        regionMeta = "region/Nuernberg_all_path-meta.json";
	    incidents = "incidents/Nuernberg-incidents.json";
        incidentsMeta = "incidents/Nuernberg-incidents-meta.json";
        break;		
    case "ortenau":
        region = "region/Ortenau.json";
        regionMeta = "region/Ortenau-meta.json";
	    incidents = "incidents/Ortenau-incidents.json";
        incidentsMeta = "incidents/Ortenau-incidents-meta.json";
        break;
	case "odenwald_all":
        region = "region/Odenwald_all.json";
        regionMeta = "region/Odenwald_all-meta.json";
	    incidents = "incidents/Ortenau-incidents.json";
        incidentsMeta = "incidents/Ortenau-incidents-meta.json";
        break;
    case "ortenau_all":
        region = "region/Ortenau_all.json";
        regionMeta = "region/Ortenau_all-meta.json";
	    incidents = "incidents/Ortenau-incidents.json";
        incidentsMeta = "incidents/Ortenau-incidents-meta.json";
        break;
    case "ostalbkreis_all":
        region = "region/Ostalbkreis_all.json";
        regionMeta = "region/Ostalbkreis_all-meta.json";
	    incidents = "incidents/Ostalbkreis-incidents.json";
        incidentsMeta = "incidents/Ostalbkreis-incidents-meta.json";
        break;
    case "pforzheim_all":
        region = "region/Pforzheim_all.json";
        regionMeta = "region/Pforzheim_all-meta.json";
	    incidents = "incidents/Pforzheim-incidents.json";
        incidentsMeta = "incidents/Pforzheim-incidents-meta.json";
        break;
    case "rastatt":
        region = "region/Rastatt.json";
        regionMeta = "region/Rastatt-meta.json";
	    incidents = "incidents/Rastatt-incidents.json";
        incidentsMeta = "incidents/Rastatt-incidents-meta.json";
        break;
    case "rastatt_all":
        region = "region/Rastatt_all.json";
        regionMeta = "region/Rastatt_all-meta.json";
	    incidents = "incidents/Rastatt-incidents.json";
        incidentsMeta = "incidents/Rastatt-incidents-meta.json";
        break;
    case "ruhrgebiet":
        region = "region/Ruhrgebiet.json";
        regionMeta = "region/Ruhrgebiet-meta.json";
	    incidents = "incidents/Ruhrgebiet-incidents.json";
        incidentsMeta = "incidents/Ruhrgebiet-incidents-meta.json";
        break;
    case "ruhrgebiet_all":
        region = "region/Ruhrgebiet_all.json";
        regionMeta = "region/Ruhrgebiet_all-meta.json";
	    incidents = "incidents/Ruhrgebiet-incidents.json";
        incidentsMeta = "incidents/Ruhrgebiet-incidents-meta.json";
        break;
    case "ruhrgebiet_all_i":
        region = "region/Ruhrgebiet_all_i.json";
        regionMeta = "region/Ruhrgebiet_all_i-meta.json";
	    incidents = "incidents/Ruhrgebiet-incidents.json";
        incidentsMeta = "incidents/Ruhrgebiet-incidents-meta.json";
        break;
    case "saarbrücken_all":
        region = "region/Saarbrücken_all.json";
        regionMeta = "region/Saarbrücken_all-meta.json";
	    incidents = "incidents/Saarbrücken-incidents.json";
        incidentsMeta = "incidents/Saarbrücken-incidents-meta.json";
        break;
    case "saarlouis":
        region = "region/Saarlouis.json";
        regionMeta = "region/Saarlouis-meta.json";
	    incidents = "incidents/Saarlouis-incidents.json";
        incidentsMeta = "incidents/Saarlouis-incidents-meta.json";
        break;
    case "saarlouis_all":
        region = "region/Saarlouis_all.json";
        regionMeta = "region/Saarlouis_all-meta.json";
	    incidents = "incidents/Saarlouis-incidents.json";
        incidentsMeta = "incidents/Saarlouis-incidents-meta.json";
        break;
    case "sigmaringen_all":
        region = "region/Sigmaringen_all.json";
        regionMeta = "region/Sigmaringen_all-meta.json";
	    incidents = "incidents/Sigmaringen-incidents.json";
        incidentsMeta = "incidents/Sigmaringen-incidents-meta.json";
        break;
    case "stuttgart":
        region = "region/Stuttgart.json";
        regionMeta = "region/Stuttgart-meta.json";
	    incidents = "incidents/Stuttgart-incidents.json";
        incidentsMeta = "incidents/Stuttgart-incidents-meta.json";
        break;
    case "stuttgart_all":
        region = "region/Stuttgart_all.json";
        regionMeta = "region/Stuttgart_all-meta.json";
	    incidents = "incidents/Stuttgart-incidents.json";
        incidentsMeta = "incidents/Stuttgart-incidents-meta.json";
        break;
    case "trier":
        region = "region/Trier.json";
        regionMeta = "region/Trier-meta.json";
	    incidents = "incidents/Trier-incidents.json";
        incidentsMeta = "incidents/Trier-incidents-meta.json";
        break;
    case "trier_all":
        region = "region/Trier_all.json";
        regionMeta = "region/Trier_all-meta.json";
	    incidents = "incidents/Trier-incidents.json";
        incidentsMeta = "incidents/Trier-incidents-meta.json";
        break;
    case "tübingen":
        region = "region/Tübingen.json";
        regionMeta = "region/Tübingen-meta.json";
	    incidents = "incidents/Tübingen-incidents.json";
        incidentsMeta = "incidents/Tübingen-incidents-meta.json";
        break;
    case "tübingen_all":
        region = "region/Tübingen_all.json";
        regionMeta = "region/Tübingen_all-meta.json";
	    incidents = "incidents/Tübingen-incidents.json";
        incidentsMeta = "incidents/Tübingen-incidents-meta.json";
        break;
    case "tuttlingen":
        region = "region/Tuttlingen.json";
        regionMeta = "region/Tuttlingen-meta.json";
	    incidents = "incidents/Tuttlingen-incidents.json";
        incidentsMeta = "incidents/Tuttlingen-incidents-meta.json";
        break;
    case "tuttlingen_all":
        region = "region/Tuttlingen_all.json";
        regionMeta = "region/Tuttlingen_all-meta.json";
	    incidents = "incidents/Tuttlingen-incidents.json";
        incidentsMeta = "incidents/Tuttlingen-incidents-meta.json";
        break;
	case "twente":
        region = "region/Twente.json";
        regionMeta = "region/Twente-meta.json";
	    incidents = "incidents/Twente-incidents.json";
        incidentsMeta = "incidents/Twente-incidents-meta.json";
        break;
    case "tuttlingen_all":
        region = "region/Twente_all.json";
        regionMeta = "region/Twente_all-meta.json";
	    incidents = "incidents/Twente-incidents.json";
        incidentsMeta = "incidents/Twente-incidents-meta.json";
        break;
    case "ulm_all":
        region = "region/Ulm_all.json";
        regionMeta = "region/Ulm_all-meta.json";
	    incidents = "incidents/Ulm-incidents.json";
        incidentsMeta = "incidents/Ulm-incidents-meta.json";
        break;
    case "vulkaneifel":
        region = "region/Vulkaneifel.json";
        regionMeta = "region/Vulkaneifel-meta.json";
	    incidents = "incidents/Vulkaneifel-incidents.json";
        incidentsMeta = "incidents/Vulkaneifel-incidents-meta.json";
        break;
    case "vulkaneifel_all":
        region = "region/Vulkaneifel_all.json";
        regionMeta = "region/Vulkaneifel_all-meta.json";
	    incidents = "incidents/Vulkaneifel-incidents.json";
        incidentsMeta = "incidents/Vulkaneifel-incidents-meta.json";
        break;
    case "walldorf":
        region = "region/Walldorf.json";
        regionMeta = "region/Walldorf-meta.json";
	    incidents = "incidents/Walldorf-incidents.json";
        incidentsMeta = "incidents/Walldorf-incidents-meta.json";
        break;
    case "weimar_all":
        region = "region/Weimar_all.json";
        regionMeta = "region/Weimar_all-meta.json";
	    incidents = "incidents/Weimar-incidents.json";
        incidentsMeta = "incidents/Weimar-incidents-meta.json";
        break;
    case "wels":
        region = "region/Wels.json";
        regionMeta = "region/Wels-meta.json";
	    incidents = "incidents/Wels-incidents.json";
        incidentsMeta = "incidents/Wels-incidents-meta.json";
        break;
    case "wels_all":
        region = "region/Wels_all.json";
        regionMeta = "region/Wels_all-meta.json";
	    incidents = "incidents/Wels-incidents.json";
        incidentsMeta = "incidents/Wels-incidents-meta.json";
        break;
    case "wesel_all":
        region = "region/Wesel_all.json";
        regionMeta = "region/Wesel_all-meta.json";
	    incidents = "incidents/Wesel-incidents.json";
        incidentsMeta = "incidents/Wesel-incidents-meta.json";
        break;
    case "wetterau":
        region = "region/Wetterau.json";
        regionMeta = "region/Wetterau-meta.json";
	    incidents = "incidents/Wetterau-incidents.json";
        incidentsMeta = "incidents/Wetterau-incidents-meta.json";
        break;
    case "wetterau_all":
        region = "region/Wetterau_all.json";
        regionMeta = "region/Wetterau_all-meta.json";
	    incidents = "incidents/Wetterau-incidents.json";
        incidentsMeta = "incidents/Wetterau-incidents-meta.json";
        break;
    case "wien":
        region = "region/Wien.json";
        regionMeta = "region/Wien-meta.json";
	    incidents = "incidents/Wetterau-incidents.json";
        incidentsMeta = "incidents/Wetterau-incidents-meta.json";
        break;
    case "wien_all":
        region = "region/Wien_all.json";
        regionMeta = "region/Wien_all-meta.json";
	    incidents = "incidents/Wien-incidents.json";
        incidentsMeta = "incidents/Wien-incidents-meta.json";
        break;
    case "wuppertal":
        region = "region/Wuppertal.json";
        regionMeta = "region/Wuppertal-meta.json";
	    incidents = "incidents/Wuppertal-incidents.json";
        incidentsMeta = "incidents/Wuppertal-incidents-meta.json";
        break;
    case "wuppertal_all":
        region = "region/Wuppertal_all.json";
        regionMeta = "region/Wuppertal_all-meta.json";
	    incidents = "incidents/Wuppertal-incidents.json";
        incidentsMeta = "incidents/Wuppertal-incidents-meta.json";
        break;
    default:
        region = "region/Berlin.json";
        regionMeta = "region/Berlin-meta.json";
	    incidents = "incidents/Berlin-incidents.json";
        incidentsMeta = "incidents/Berlin-incidents-meta.json";
}

var geojson;
var incidentLayer;

function fetchRegionMeta(isIncidentMap) {
    fetch(regionMeta)
        .then(response => response.json())
        .then(data => {
            if (!isIncidentMap) {
                document.getElementById("regionTitle").innerHTML = data.regionTitle
                document.getElementById("regionDescription").innerHTML = data.regionDescription
                if (data.regionDate != undefined) {
                    document.getElementById("regionDate").innerHTML = data.regionDate
                }
            }
            map.setView(data.mapView, data.mapZoom);
        })
}

function fetchIncidentsMeta() {
    fetch(incidentsMeta)
        .then(response => response.json())
        .then(data => {
            document.getElementById("regionTitle").innerHTML = data.regionTitle
            if (data.regionDate != undefined) {
                document.getElementById("regionDate").innerHTML = data.regionDate
            }
            map.setView(data.mapView, data.mapZoom);
        })
}

function fetchRegion() {
    fetchRegionMeta(false)
    fetch(region)
        .then(response => response.json())
        .then(data => {
            geojson = L.geoJson(data, {
                style: style,
                onEachFeature: onEachFeature,
                filter: withoutIncidents
            }).addTo(polygonGroup);
        })
}

function fetchIncidents() {
    fetchIncidentsMeta()
    fetch(incidents)
        .then(response => response.json())
        .then(data => {
            incidentLayer = L.geoJson(data, {
                pointToLayer: function (feature, latlng) {
                    if (feature.properties.scary === "Ja") {
                        return L.marker(latlng, {
                            icon: redIcon
                        });
                    } else {
                        return L.marker(latlng, {
                            icon: blueIcon
                        });
                    }
                },
                onEachFeature: forEachFeature, style: style
            });
        })
        .then(() => {
                markers.addLayer(incidentLayer);
                markers.addTo(map);
            }
        )
}

function download() {
    fetch(incidents)
        .then(() => {
            window.open(incidents.replaceAll(".json",".zip"))
        })
}
