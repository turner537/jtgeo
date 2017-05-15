
function initMapLL(){

    
    //setup map bounds 
var southWest = L.latLng(-90, -180),
    northEast = L.latLng(90, 180),
    bounds = L.latLngBounds(southWest, northEast);	    
    
    //setup a marker variable for current location:
    var markerCurrentLocation = null ;
    var markerCurrentLocationControl = null ;
      
    //define a title icon for the map:
    var titleIcon = new L.icon({
        iconUrl: 'images/jtgeoLogo.png',
        iconSize:     [321, 150], // size of the icon
        iconAnchor:   [150, 0], // point of the icon which will correspond to marker's location
        });   
        
    //setup the basemaps:
    //Openstreetmap
    var osm  = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    //Stamen WaterColor
    var stamen  = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Stamen Watercolor'
    });
    //Stamen Toner
//    var stamenToner  = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    var stamenToner  = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Stamen Toner'
    });	
    
    //create the map, note we are not using the maxBounds as this may prevent the users current location being panned to:
	//var map = L.map('map', {center: [51.52191, -0.12649], zoom: 2, layers: [stamenToner]});
	var map = L.map('map', {center: [63.66576, -4.746], zoom: 4, layers: [stamenToner]});
    
	var baseMaps = {
		"osm": osm,
		"stamen": stamen,
		"stamenToner": stamenToner
	};
    
    //add the title image to the map:
    var maptitle = new L.marker([map.getBounds().getNorth(),map.getCenter().lng], {icon: titleIcon, clickable:false}).addTo(map);
    
    //and ensure the title icon is updated when map moves:
    map.on('move', function(e) {
        maptitle.setLatLng([map.getBounds().getNorth(),map.getCenter().lng]);
        });
    

    //when the mouse moves on the map, update the coordinates
	map.on('mousemove', function(e){
	  // e is the click event
      var coord = e.latlng.toString().split(',');
      var lat = coord[0].split('(');
      var lng = coord[1].split(')');
	  	  coordinates.innerHTML = "latitude: " + lat[1] + "&deg; longitude: " + lng[0]+"&deg;";
    });

    //button to locate current position:
    L.easyButton({id:'customButton',
        states:[{
        icon: '<span class="easytext">Locator</span>',
        title: 'Where are you?',
        onClick: function(btn,map) {
        map.locate().on('locationfound', function(e){
                if (markerCurrentLocation!=null){
                    map.removeLayer(markerCurrentLocation);
                    map.removeControl(markerCurrentLocationControl);
                }
                //create marker and assign pop up text:
                markerCurrentLocation = L.marker([e.latitude, e.longitude]);
                markerCurrentLocation.bindTooltip('<span class="infotext">You are here</span>');
                map.addLayer(markerCurrentLocation);
                var loclayers = {
                    "Current Location": markerCurrentLocation
                };	      
                markerCurrentLocationControl=L.control.layers(null,loclayers).addTo(map);   
                //zoom2All();                
                //markerCurrentLocation.openPopup();
            });
       }     }]
    }).addTo(map);    
    
     
    //about button 
    L.easyButton({id:'customButton',
        states:[{
        icon: '<span class="easytext">About</span>',
        title: 'About',
        onClick: function(btn,map) {
            alert("jtGeo provides specialist geospatial consultancy and bespoke software.\n\nWith expertise in land, marine and space domains, jtGeo delivers significant mission-critical projects.  These include coordinate reprojection software libraries for UK mainline rail routes, bespoke FME plug-ins, and complex algorithms for deriving oil and gas sector business intelligence from marine AIS.\n\nClients include UCL-Business, Network Rail and Seisintel.");
         
            
        }     }]
    }).addTo(map);      
    
    //button to email the site admin:
    L.easyButton({id:'customButton',
        states:[{
        icon: '<span class="easytext">Contact</span>',
        title: 'Contact jtGeo',
        onClick: function(btn,map) {
            window.location.href = "mailto:jim@jtgeo.co.uk?Subject=jtGeo";
        }     }]
    }).addTo(map);       

}


