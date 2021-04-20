var map;
$(document).ready(function () {
    map = new GMaps({
        el: '#map',
        lat: 12.9923,
        lng: 77.7161,
        zoomControl: true,
        zoomControlOpt: {
            style: 'SMALL',
            position: 'TOP_LEFT'
        },
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        overviewMapControl: false
    });
    var lat = 12.9923;
    var lng = 77.7161;
    /*draw default circle in global so it can be deleted  */
    circle = map.drawCircle({
        lat: lat,
        lng: lng,
        radius: 0, //hide circle
        strokeColor: '#F8F8FB',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#e2f2fb',
        fillOpacity: 0.6,
        //map:null
    });
    /* search address */
    $('#storeLocationSearchMap').blur(function (e) {
        //if(e.which == 13) {
        e.preventDefault();
        GMaps.geocode({
            address: $('#storeLocationSearchMap').val().trim(),
         //   lat: 12.9923,
           // lng: 77.7161,
            callback: function (results, status) {
                if (status == 'OK') {
                    var latlng = results[0].geometry.location;
                    lat = latlng.lat();
                    lng = latlng.lng();
                    getLatitudeLong(latlng.lat(), latlng.lng());
                    var addr = results[0].formatted_address;
                    //updateAddress(addr);
                    GetAddress(addr);
                    circle.setMap(null);
                    circle = map.drawCircle({
                        lat: lat,
                        lng: lng,
                        radius: 350,
                        strokeColor: '#e2f2fb',
                        strokeOpacity: 1,
                        strokeWeight: 3,
                        fillColor: '#e2f2fb',
                        fillOpacity: 0.6,
                    });
                    map.setCenter(latlng.lat(), latlng.lng());
                    map.removeMarkers();
                    map.addMarker({
                        lat: latlng.lat(),
                        lng: latlng.lng(),
                        draggable: true,
                        dragend: function (event) {
                            var lat = event.latLng.lat();
                            var lng = event.latLng.lng();
                            fnUpdateAddress(lat, lng);
                      //      alert('draggable ' + lat + " - " + lng);
                       //     getLatitudeLong(latlng.lat(), latlng.lng());
                            

                        }
                        
                    });
                    
                    // function drawArea(latt, longi, radi) {
                    //     if (radi == 0) {
                    //         circle = map.drawCircle({
                    //             lat: latt,
                    //             lng: longi,
                    //             radius: radi,
                    //             strokeColor: '#BBD8E9',
                    //             strokeOpacity: 1,
                    //             strokeWeight: 3,
                    //             fillColor: '#432070',
                    //             fillOpacity: 0.6,
                    //             map: null
                    //         });
                    //         circle.setMap(null);
                    //     } else {

                    //         circle = map.drawCircle({
                    //             lat: latt,
                    //             lng: longi,
                    //             radius: radi,
                    //             strokeColor: '#BBD8E9',
                    //             strokeOpacity: 1,
                    //             strokeWeight: 3,
                    //             fillColor: '#F8F8FB',
                    //             fillOpacity: 0.6,
                    //             draggable: true,
                    //         });
                    //         //circle.setMap(null);
                    //     }
                    // }
                    /* End draw circle */
                }
            }
        });

    });
     function fnUpdateAddress(lati, long){
         GMaps.geocode({
            lat: lati,
            lng: long,
             callback: function (results, status) {
                 if (status == 'OK') {
                     var latlng = results[0].geometry.location;
                     lat = latlng.lat();
                     lng = latlng.lng();
                     getLatitudeLong(latlng.lat(), latlng.lng());
                     var addr = results[0].formatted_address;
                     updateAddress(addr);
                     GetAddress(addr);
                     circle.setMap(null);
                     circle = map.drawCircle({
                         lat: lat,
                         lng: lng,
                         radius: 350,
                         strokeColor: '#F8F8FB',
                         strokeOpacity: 1,
                         strokeWeight: 3,
                         fillColor: '#e2f2fb',
                         fillOpacity: 0.6,
                     });
                     map.setCenter(latlng.lat(), latlng.lng());
 
                }
            }
        });
    }
    const center = { lat: 12.9923, lng: 77.7161 };
    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    };
    const input = document.getElementById("storeLocationSearchMap");
    const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "IN" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: false,
        types: ["establishment"],
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.setComponentRestrictions({ 'country': ['in'] });
});
function getLatitudeLong(la, ln) {
    var latt = $('#latitudeInput');
    var long = $('#longitudeInput');
    $(latt).val(la);
    $(long).val(ln);
}
function GetAddress(addr) {
    var zipcode = $('#zipcode');
    var country = $('#country');

    var arr = addr.split(',');
    var arrCount = arr.length;
    var countryName = arr[arrCount - 1];
    $("#country option").each(function (i) {
        if ($(this).text() == countryName.trim()) {
            $(this).attr('selected', 'selected');
        }

    });
    var statePincode = arr[arrCount - 2];
    var strArrState = statePincode.split(' ');
    var pin = strArrState[2];
    $(zipcode).val(pin);
    // if($('#country: not(:selected)').text()=='India'){
    //     alert("asdf");
    // }


    // alert(a.val());
    // $(country).
    // alert(arr[arrCount-2]);
    //$("#date").html("<span>"+arr[0] + "</span></br>" + arr[1]+"/"+arr[2]);
}
function updateAddress(addr) {

    $('#storeLocationSearchMap').val(addr);
}