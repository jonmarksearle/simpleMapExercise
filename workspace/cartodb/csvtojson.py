import csv
import json
from datetime import datetime


file = open("/home/helo/Downloads/SIS_DATASUPPLY_may.csv")
data = csv.reader(file)

header = data.next()

geojson = {
    "type": "FeatureCollection",
    "features": []
}
rows = 0
skippedRows = 0
for row in data:
    try:
        if len(row)==62:
            no = row[0]
            lng = float(row[17])
            lat = float(row[18])
            date = datetime.strptime(row[3]+" "+row[4], "%d/%m/%Y %H.%M.%S")
            accident = row[6]
            entry = {
                "type": "Feature",
                "properties": {
                    "id": no,
                    "date": date.strftime('%Y-%m-%dT%H:%M:%SZ'),
                    "type": accident
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [lng, lat]
                }
            }
            geojson["features"].append(entry)
            rows += 1
    except:
        # skip row
        skippedRows += 1

print rows
print skippedRows

file = open("/home/helo/Downloads/SIS_DATASUPPLY_may.json", "w")
json.dump(geojson, file)
file.close()
