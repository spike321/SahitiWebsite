L.mapbox.accessToken = 'pk.eyJ1Ijoic2FoaXRpIiwiYSI6Ijk1ZjFlZWM2ZWVlYzg4NDExZTQzMzFiMGY1NWRlNTM3In0.mG1hNAPjaF361OcslYgq9Q';
var url = 'https://api.github.com/repos/mapbox/mapbox.js/contents/test/manual/example.geojson';

var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([0.3941, -78.2227], 7)
  .addControl(L.mapbox.geocoderControl('mapbox.places'));

 var featureGroup = L.featureGroup().addTo(map);
 map.addLayer(featureGroup);
 
 var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: featureGroup
  },
  draw: {
    polygon: false,
    polyline: false,
    rectangle: true,
    circle: false,
    marker: false
  }
}).addTo(map);

map.on('draw:created', chkArea);
map.on('draw:edited', chkAreaEdited);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
 
 map.on('draw:created', function (e) {

    var type = e.layerType,
        layer = e.layer;
	
    

    drawnItems.addLayer(layer);
});

function chkAreaEdited(e) {
  e.layers.eachLayer(function(layer) {
    chkArea({ layer: layer });
  });
}
function chkArea(e) {
  featureGroup.clearLayers();
  featureGroup.addLayer(e.layer);
  var area = (LGeo.area(e.layer) / 1000000).toFixed(2);
  if(area> 100.00){
	  alert("Selected area is too large! Please select an area less than 100km squared.");
  }else{
	var bounds=map.getBounds();
	var nw=bounds.getNorthWest();
	var se=bounds.getSouthEast();
	e.layer.bindPopup("NW: " + nw + " SE: " + se);
  e.layer.openPopup();
  }
} 
 
function load() {
  // Fetch just the contents of a .geojson file from GitHub by passing
  // `application/vnd.github.v3.raw` to the Accept header
  // As with any other AJAX request, this technique is subject to the Same Origin Policy:
  // http://en.wikipedia.org/wiki/Same_origin_policy the server delivering the request should support CORS.
  $.ajax({
    headers: {
      'Accept': 'application/vnd.github.v3.raw'
    },
    xhrFields: {
      withCredentials: false
    },
    dataType: 'json',
    url: url,
    success: function(geojson) {
        // On success add fetched data to the map.
        L.mapbox.featureLayer(geojson).addTo(map);
    }
  });
}

$(load);
