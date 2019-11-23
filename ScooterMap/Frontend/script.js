var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: { lat: -25.363882, lng: 131.044922 }
    });

    map.addListener('click', function (e) {
        console.log("Panning to ", e.latLng);
        placeMarkerAndPanTo(e.latLng, map);
    });

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log("I am located at:", position);
        var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        placeMarkerAndPanTo(pos, map);
        //map.panTo(post);

    }, null, { enableHighAccuracy: true });

    loadVoiData(map);
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({ //Enough just creating a marker
        position: latLng,
        map: map
    });

    map.panTo(latLng);
}

function loadVoiData(map){
    fetch("https://local.learnify.se:5001/voi").then(result=>{
        return result.json();
    }).then(data=>{
        for(var i=0;i < data.length;i++){
            var lat = data[i].location[0];
            var lng = data[i].location[1];
            var marker = new google.maps.Marker({ //Enough just creating a marker
                position: {lat,lng},
                map: map
            });
        }
    });
}

calculateDistance = function (lat1, lon1, lat2, lon2) {
    var R, a, c, d, dLat, dLon;
    R = 6371;
    dLat = (lat2 - lat1).toRad();
    dLon = (lon2 - lon1).toRad();
    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = R * c;
    return d;
};

Number.prototype.toRad = function () {
    return this * Math.PI / 180;
};