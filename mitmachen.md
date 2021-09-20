# Mitmachen

Jede/r Radfahrer/in in einer unserer Regionen kann durch die Nutzung unserer App an SimRa mitwirken und so Teil unserer Community der "SimRadelnden" werden (siehe erster untenstehender Abschnitt). Zugleich können interessierte 'citizen scientists' aber auch selbst mit unseren Daten und unserem Code arbeiten (siehe zweiter Abschnitt).  

## Mitmachen als "SimRadelnde/r"

Aufgrund eines (berechtigten) Gefühls mangelnder Sicherheit, scheuen es viele Menschen vom Auto auf das Fahrrad umzusteigen.
Im Projekt SimRa sammeln wir mithilfe einer datensparsamen Smartphone-App Daten darüber, wo es in der Stadt für Radfahrende besonders gefährlich ist.
Mit diesen Daten können wir dann gezielte Handlungsempfehlungen geben, um Städte fahrradfreundlicher und sicherer zu gestalten.
Aktuell ist SimRa in folgenden Städten/Regionen verfügbar:
- Augsburg
- Berlin
- Bern
- Bielefeld
- Brühl
- Cottbus
- Dresden
- Düsseldorf
- Eichwalde/Zeuthen/Schulzendorf
- Hannover
- Leipzig
- München
- Nürnberg
- Ruhrgebiet
- Weimar
- Wuppertal/Remscheid/Solingen
- Viele weitere Städte/Regionen im Südwesten Deutschlands, siehe grün markierte Bereiche auf der [Karte](./resources/region_map.png)

Weitere Informationen und Kontaktdaten sind auf der [Projektseite](https://www.digital-future.berlin/forschung/projekte/simra/) abrufbar, erste [Ergebnisse](./index.md) sind bereits verfügbar!!

Der Beitrag jedes Einzelnen zählt! Um mit zu machen, muss nur unsere Smartphone-App installiert werden:
- Für Android (6+) und LineageOS im [Google PlayStore](https://play.google.com/store/apps/details?id=de.tuberlin.mcc.simra.app) und direkt als [APK-Datei](http://www.redaktion.tu-berlin.de/fileadmin/fg344/simra/SimRa.apk)
- Für iOS (11+) im [App Store](https://itunes.apple.com/de/app/simra/id1459516968?mt=8)

Zur Datensammlung dann nur kurz vor Fahrtantritt die Aufzeichnung starten.
Nach der Fahrt können besondere Ereignisse auf der Karte markiert und im Anschluss kommentiert werden.
Die anonymisierten Daten können an unseren Server gesandt werden und sind dann online frei zugänglich - jeder Interessierte kann sich an der Auswertung beteiligen!

![Nutzung](./resources/usage.png)

## Nutzung von Daten und Code

Langfristig ist unser Ziel, alle mittels der SimRa App gesammelten Daten frei zugänglich zu machen. Der Datensatz für die Region Berlin kann bereits [hier](https://github.com/simra-project/dataset) abgerufen werden. Weitere Regionen werden folgen, sobald für sie genügend Daten vorliegen um unseren strengen Datenschutzrichtlinien zu genügen (wenn noch nicht so viele User/innen in einer Region aktiv sind, ist deren Anonymität nicht ausreichend gewährleistet). Bezüglich der Daten anderer Regionen können Interessierte sich jedoch gerne an ask@mcc.tu-berlin.de wenden. 

All unser Code ist open source und findet sich auf [GitHub](https://github.com/simra-project). Für die Darstellung von Ergebnisdaten auf einer Karte werden die beiden Projekte [osmPreparation](https://github.com/simra-project/osmPreparation) (für das Beschaffen von OpenStreetMaps-Daten in geeigneter Form) sowie [osmColoring](https://github.com/simra-project/osmColoring) (für die Darstellung von Ergebnisdaten - Beschaffung dieser siehe erster Absatz - auf einer Karte, unter Nutzung der von osmPreparation generierten Daten) benötigt.
