
L.mapbox.accessToken = 'pk.eyJ1Ijoic2FoaXRpIiwiYSI6Ijk1ZjFlZWM2ZWVlYzg4NDExZTQzMzFiMGY1NWRlNTM3In0.mG1hNAPjaF361OcslYgq9Q';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([38.89399, -77.03659], 17);

var featureGroup = L.featureGroup().addTo(map);
map.addLayer(featureGroup);
var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: featureGroup
  },
  draw: {
    polygon: true,
    polyline: false,
    rectangle: false,
    circle: false,
    marker: false
  }
}).addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

map.on('draw:created', function (e) {

    var type = e.layerType,
        layer = e.layer;

   
        layer.on('mouseover', function() {
            alert(layer.getLatLngs());    
        });
    

    drawnItems.addLayer(layer);
});

//map.on('draw:created', showPolygonArea);
//map.on('draw:edited', showPolygonAreaEdited);

function showPolygonAreaEdited(e) {
  e.layers.eachLayer(function(layer) {
    showPolygonArea({ layer: layer });
  });
}
function showPolygonArea(e) {
  featureGroup.clearLayers();
  featureGroup.addLayer(e.layer);
  e.layer.bindPopup((LGeo.area(e.layer) / 1000000).toFixed(2) + ' km<sup>2</sup>');
  e.layer.openPopup();
}

