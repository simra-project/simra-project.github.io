# Mitmachen

Jede/r Radfahrer/in in einer unserer Regionen kann durch die Nutzung unserer App an SimRa mitwirken und so Teil unserer Community der "SimRadelnden" werden (siehe erster untenstehender Abschnitt) oder eine neue Region starten (siehe zweiter Abschnitt weiter unten). Zugleich können interessierte 'citizen scientists' aber auch selbst mit unseren Daten und unserem Code arbeiten (siehe dritter Abschnitt).  

## Mitmachen als "SimRadelnde/r"

Aufgrund eines (berechtigten) Gefühls mangelnder Sicherheit, scheuen es viele Menschen vom Auto auf das Fahrrad umzusteigen.
Im Projekt SimRa sammeln wir mithilfe einer datensparsamen Smartphone-App Daten darüber, wo es in der Stadt für Radfahrende besonders gefährlich ist.
Mit diesen Daten können wir dann gezielte Handlungsempfehlungen geben, um Städte fahrradfreundlicher und sicherer zu gestalten.

Der Beitrag jedes Einzelnen zählt! Um mit zu machen, muss nur unsere Smartphone-App installiert werden:
- Für Android (6+) und LineageOS im [Google PlayStore](https://play.google.com/store/apps/details?id=de.tuberlin.mcc.simra.app) und direkt als [APK-Datei](https://tubcloud.tu-berlin.de/s/eK46JHtY7F2exq7/download/SimRa.apk)

- Für iOS (11+) im [App Store](https://itunes.apple.com/de/app/simra/id1459516968?mt=8)


Aktuell ist SimRa in folgenden Städten/Regionen verfügbar:
- Aachen
- Augsburg
- Berlin/Potsdam
- Bern
- Bielefeld
- Bonn
- Brühl
- Cottbus
- Dresden
- Düsseldorf
- Eichwalde/Zeuthen/Schulzendorf
- Hamburg-Blankenese
- Hannover
- Leipzig
- Magdeburg
- München
- Nürnberg
- Kiel
- Köln
- Region Hoyerswerda
- Ruhrgebiet
- Twente
- Walldorf/Wiesloch
- Weimar
- Wels Umland
- Wesel
- Wien
- Wuppertal/Remscheid/Solingen
- Viele weitere Städte/Regionen im Südwesten Deutschlands, siehe grün markierte Bereiche auf der [Karte](./resources/region_map.png)

Weitere Informationen und Kontaktdaten sind auf der [Projektseite](https://www.digital-future.berlin/forschung/projekte/simra/) abrufbar, erste [Ergebnisse](./index.md) sind bereits verfügbar.

Zur Datensammlung dann nur kurz vor Fahrtantritt die Aufzeichnung starten.
Nach der Fahrt können besondere Ereignisse auf der Karte markiert und im Anschluss kommentiert werden.
Die anonymisierten Daten können an unseren Server gesandt werden und sind dann online frei zugänglich - jeder Interessierte kann sich an der Auswertung beteiligen!

![Nutzung](./resources/usage.png)

## Mitmachen als Regionsverantwortliche/r
Wenn es bei euch in der Gegend noch keine Region gibt, könnt ihr einfach eine starten und dabei der/die Regionsverantwortliche/r werden (ggf. auch gemeinsam mit anderen). Regionsverantwortliche sind dafür zuständig, neue Nutzende in ihrer Region zu gewinnen und mit den Daten "etwas anzufangen". Auf Basis von uns vorausgewerteter Daten (siehe z.B. die Karten im [Dashboard](https://simra-project.github.io/dashboard/), tretet ihr hierfür an die lokal zuständigen Behörden heran. Bei Bedarf liefern wir auch individuell noch angepasste automatische Auswertungen (je nach Kapazität bei uns) und Regionsverantwortliche können auch Zugriff auf die lokalen Rohdaten bekommen. Bei Interesse einfach eine Email an [Ahmet Karakaya](mailto:ask@mcc.tu-berlin.de) schreiben.

## Nutzung von Daten und Code

Langfristig ist unser Ziel, alle mittels der SimRa App gesammelten Daten frei zugänglich zu machen. Der Datensatz für die Region Berlin kann bereits [hier](https://github.com/simra-project/dataset) abgerufen werden. Weitere Regionen werden folgen, sobald für sie genügend Daten vorliegen um unseren strengen Datenschutzrichtlinien zu genügen (wenn noch nicht so viele User/innen in einer Region aktiv sind, ist deren Anonymität nicht ausreichend gewährleistet). Bezüglich der Daten anderer Regionen können Interessierte sich jedoch gerne an ask@mcc.tu-berlin.de wenden. Darüber hinaus sind für die meisten Regionen aggregierte Gefährlichkeitsdaten sowie die Rohdaten aller gemeldeten Gefahrensituationen im [Dashboard](https://simra-project.github.io/dashboard/) verfügbar. Dazu [dort](https://simra-project.github.io/dashboard/) jeweils auf den Regionsnamen bzw. die Zahl in der Spalte "Gefahrensituationen (gesamt)" klicken.

All unser Code ist open source und findet sich auf [GitHub](https://github.com/simra-project). Für die Darstellung von Ergebnisdaten auf einer Karte werden die beiden Projekte [osmPreparation](https://github.com/simra-project/osmPreparation) (für das Beschaffen von OpenStreetMaps-Daten in geeigneter Form) sowie [osmColoring](https://github.com/simra-project/osmColoring) (für die Darstellung von Ergebnisdaten - Beschaffung dieser siehe erster Absatz - auf einer Karte, unter Nutzung der von osmPreparation generierten Daten) benötigt.
