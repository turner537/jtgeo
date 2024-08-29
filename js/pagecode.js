
function padzero(innum){
    if (innum<10)innum="0"+innum;
    return innum;
}

function latlon2text(inlat,inlon){
    hemlon="E";
    if (inlon < 0 ){hemlon="W"}
    hemlat="N";
    if (inlat < 0 ){hemlat="S"}
    inlat=Math.abs(inlat);
    inlon=Math.abs(inlon);
    deglat=parseInt(inlat);
    deglon=parseInt(inlon);
    inlat=(inlat-deglat)*60.0;
    inlon=(inlon-deglon)*60.0;
    minlat=parseInt(inlat);
    minlon=parseInt(inlon);
    return padzero(deglat)+'&deg;'+padzero(minlat)+'\''+hemlat+' '+padzero(deglon)+'&deg;'+padzero(minlon)+'\''+hemlon;
}
    
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
//    var osm  = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    var osm  = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
		
    //Stamen WaterColor
    var stamen  = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Stamen Watercolor'
    });
    //Stamen Toner
//    var stamenToner  = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
    var stamenToner  = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    });	
    
    //create the map, note we are not using the maxBounds as this may prevent the users current location being panned to:
	//var map = L.map('map', {center: [51.52191, -0.12649], zoom: 2, layers: [stamenToner]});
	//var map = L.map('map', {center: [63.66576, -4.746], zoom: 4, layers: [stamenToner]});
	var map = L.map('map', {center: [63.66576, -4.746], zoom: 4, layers: [osm]});
    
	var baseMaps = {
		//"osm": osm,
	//	"stamen": stamen,
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
      
	  coordinates.innerHTML = latlon2text(lat[1],lng[0]);
    });
  
    //about button 
    L.easyButton({id:'customButton',
        states:[{
        icon: '<span class="easytext">About</span>',
        title: 'About',
        onClick: function(btn,map) {
            $('#aboutModal').modal('toggle');
        }     }]
    }).addTo(map);      
    
    //button to email the site admin:
    var eb = L.easyButton({id:'customButton',
        states:[{
        icon: '<span class="easytext">Contact</span>',
        title: 'Contact jtGeo',
        onClick: function(btn,map) {
            window.location.href = "mailto:jim@jtgeo.co.uk?Subject=jtGeo";
        }     }]
    }).addTo(map);       
}


