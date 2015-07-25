L.mapbox.accessToken = 'pk.eyJ1Ijoic2FoaXRpIiwiYSI6Ijk1ZjFlZWM2ZWVlYzg4NDExZTQzMzFiMGY1NWRlNTM3In0.mG1hNAPjaF361OcslYgq9Q';

var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([30.05899, -95.3698], 10)
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
if(drawnItems != null){
map.removeLayer(drawnItems);
}
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
	  e.layer.bindPopup("Selected area is too large! Please select an area less than 100km squared.");
  }else{
	var bounds=map.getBounds();
	var nw=bounds.getNorthWest();
	var nw_str = nw.toString();
	var partsArray = nw_str.split(',');
	var nwlatitude = partsArray[0].match(/-?\d+.?\d+/)[0];
	var nwlongitude = partsArray[1].match(/-?\d+.?\d+/)[0];

	var se=bounds.getSouthEast();
	var nw_str = nw.toString();
	var partsArray = nw_str.split(',');
	var selatitude = partsArray[0].match(/-?\d+.?\d+/)[0];
	var selongitude = partsArray[1].match(/-?\d+.?\d+/)[0];
	
	e.layer.bindPopup("NW: " + nwlatitude  + ' ,' + nwlongitude + '\n' + "SE: " + selatitude + ' ,' + selongitude );
  }
   e.layer.openPopup();
   //sendJSON(nwlatitude, nwlongitude, selatitude, selongitude);
   nbins = document.getElementById('bins').value;
   //nbins = document.getElementsByClassName("searchField")[0].value;
   alert("You selected " + nbins + " many bin locations.");
   var values = [nwlatitude, nwlongitude, selatitude, selongitude, nbins];
   //postToURL(url, values);
} 
 
function loadImportedGeoJson() {
  // Fetch just the contents of a .geojson file from GitHub by passing
  // `application/vnd.github.v3.raw` to the Accept header
  // As with any other AJAX request, this technique is subject to the Same Origin Policy:
  // http://en.wikipedia.org/wiki/Same_origin_policy the server delivering the request should support CORS.
  var url = 'https://api.github.com/repos/mapbox/mapbox.js/contents/test/manual/example.geojson';

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

function sendJSON(nwlatitude, nwlongitude, selatitude, selongitude) {
	var geoJsonData = 
	{
	  "type": "FeatureCollection",
	  "features": [
		{
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  nwlatitude,
			  nwlongitude
			]
		  }
		},
		{
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  selatitude,
			  selongitude
			]
		  }
		}
	  ]
	};	
}

function postToURL(url, values) {
    values = values || {};

    var form = createElement("form", {action: url,
                                      method: "POST",
                                      style: "display: none"});
    for (var property in values) {
        if (values.hasOwnProperty(property)) {
            var value = values[property];
            if (value instanceof Array) {
                for (var i = 0, l = value.length; i < l; i++) {
                    form.appendChild(createElement("input", {type: "hidden",
                                                             name: property,
                                                             value: value[i]}));
                }
            }
            else {
                form.appendChild(createElement("input", {type: "hidden",
                                                         name: property,
                                                         value: value}));
            }
        }
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

$(loadImportedGeoJson);
$(sendJSON);
