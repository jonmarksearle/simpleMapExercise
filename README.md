# simpleLeafletExercise
This Exercise is based on the road accident data of Vicoria and can be downloaded [here] (https://www.data.vic.gov.au/data/dataset/road-crash-information-system-data-extract-may). The dataset is a csv-file containing the location, data, time and several other information regarding the road accidents.

In the following two different approaches for a simple visualisation are described. First the Leaflet framework is used to load a subset of the data and display them on a map. In a second approach the CartoDB platform is used to display the data. 

## Simple Leaflet Exercise

### Aproach:
1.    Setup a simple leaflet map to store the data.
2.    For the proof of the concept only the id, type, date, time, lng and lat columns are selected.
3.    Use the d3 framework to load a subset of the data.
4.    Parse the data into a javascipt object that is compatible with the leaflet geojson format.
5.    Display the data as markers on the map. 

### Future work:
* The csv-file is >55 MB large and it takes to long to load all the data and display them on the map. The d3 framework loads the data asynchronous, so that the map can be displayed although the data is not jet fully loaded. However loading all the 55 MB takes minutes, which is unacceptable.
A possible solution would be loading and displaying the data bit by bit, but this doesn't give us a good user experience, neither.
* Clustering the data: it would be useful to use a clustering framework like leaflet-markercluster in order to cluster the data and only display them at a reasonable zoom level. This however depends on the number of data that shall be displayed.
* The Papa Parse framework could be tested and evaluated if it gives a better solution than d3. 


## Simple CartoDB Exercise

### Aproach:
1.    The csv-dataset was preprocessed with a pythonscript, which can be found in the repository. It generates the json/geojson file that holds most of the data.
2.    The json file is loaded into the CartoDB platform.
3.    CartoDB is used to generate a Torque Cat map and a Intensity map.

As the CartoDB platform preprocesses the data, the whole dataset can be used for the visualization, although it is 10.000s of entries large.

