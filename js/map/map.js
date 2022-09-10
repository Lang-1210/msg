/* 
 * 鐧惧害鍦板浘
 */
//鍒涘缓鍜屽垵濮嬪寲鍦板浘鍑芥暟锛�
function initMap() {
    $("#allmap").html('');
    createMap();//鍒涘缓鍦板浘
    setMapEvent();//璁剧疆鍦板浘浜嬩欢
    addMapControl();//鍚戝湴鍥炬坊鍔犳帶浠�
}
//鍒涘缓鍦板浘鍑芥暟锛�
function createMap() {
    window.map = new BMap.Map("allmap");//鍦ㄧ櫨搴﹀湴鍥惧鍣ㄤ腑鍒涘缓涓€涓湴鍥�
    getAddressMap();
}

//鍦板浘浜嬩欢璁剧疆鍑芥暟锛�
function setMapEvent() {
    map.enableDragging();//鍚敤鍦板浘鎷栨嫿浜嬩欢锛岄粯璁ゅ惎鐢�(鍙笉鍐�)
    map.enableScrollWheelZoom();//鍚敤鍦板浘婊氳疆鏀惧ぇ缂╁皬
    map.enableDoubleClickZoom();//鍚敤榧犳爣鍙屽嚮鏀惧ぇ锛岄粯璁ゅ惎鐢�(鍙笉鍐�)
    map.enableKeyboard();//鍚敤閿洏涓婁笅宸﹀彸閿Щ鍔ㄥ湴鍥�
}

//鍦板浘鎺т欢娣诲姞鍑芥暟锛�
function addMapControl() {
    //鍚戝湴鍥句腑娣诲姞缂╂斁鎺т欢
    var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(ctrl_nav);
    map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM }));  //鍙充笅瑙掞紝浠呭寘鍚缉鏀炬寜閽�
    //鍚戝湴鍥句腑娣诲姞缂╃暐鍥炬帶浠�
    var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
    map.addControl(ctrl_ove);
    //鍚戝湴鍥句腑娣诲姞姣斾緥灏烘帶浠�
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
}
//
function getCurrentPosition() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            window.map.addOverlay(mk);
            window.map.panTo(r.point);
            window.my_point = r.point;
            window.map.centerAndZoom(r.point, 13);
        } else {
            getAddressMap();
            alert('瀹氫綅鏈嶅姟宸插叧闂紝鏃犳硶浣跨敤瀵艰埅锛�');
        }
    }, { enableHighAccuracy: true });
}
//鏍规嵁鍦板潃 鏄剧ず鍦板浘--鍦ㄦ棤娉曞紑鍚疓PS鏃朵娇鐢�
function getAddressMap() {
    var x = setFloat($('#zb_x').val());
    var y = setFloat($('#zb_y').val());
    var _business_address = encodeURIComponent($('#business_address').val());
    _business_address.replace("+", "%20");
    if (x > 0 && y > 0) {
        window.map.centerAndZoom(new BMap.Point(x, y), 16);
        addOverlay(x, y);
        $('#bdmap').attr('href', 'http://api.map.baidu.com/marker?location=' + y + ',' + x + '&title=' + $('#lbs_company_name').val() + '&content=' + _business_address + '&output=html');
    } else {
        var myGeo = new BMap.Geocoder();
        var address = $('#business_address').val();
        // 灏嗗湴鍧€瑙ｆ瀽缁撴灉鏄剧ず鍦ㄥ湴鍥句笂,骞惰皟鏁村湴鍥捐閲�
        myGeo.getPoint(address, function (point) {
            if (point) {
                window.map.centerAndZoom(point, 16);
                window.map.addOverlay(new BMap.Marker(point));
                addOverlay(point.lng, point.lat);
                $('#zb_x').val(point.lng);
                $('#zb_y').val(point.lat);
                $('#bdmap').attr('href', 'http://api.map.baidu.com/marker?location=' + point.lat + ',' + point.lng + '&title=' + $('#lbs_company_name').val() + '&content=' + _business_address + '&output=html');
            }
        }, address);
    }
}
function setFloat(num) {
    num = parseFloat(num);
    num = isNaN(num) ? 0 : num;
    return num;
}

function mapClick(e) {
    $('#zb_x').val(e.point.lng);
    $('#zb_y').val(e.point.lat);
    window.map.clearOverlays();
    addOverlay(e.point.lng, e.point.lat);
    window.map.setDefaultCursor();
    window.map.removeEventListener("click", mapClick);
}

//娣诲姞渚﹀惉榧犳爣鐐瑰嚮浜嬩欢
function addEventListen() {
    window.map.addEventListener('click', mapClick);
}
//鍦ㄥ湴鍥炬坊鍔犳爣娉�
function addOverlay(lng, lat) {
    window.pt = new BMap.Point(lng, lat);
    var myIcon = new BMap.Icon("http://static.files.mozhan.com/Public/Images/mark.png", new BMap.Size(30, 30));
    window.mark = new BMap.Marker(pt);  // 鍒涘缓鏍囨敞
    window.map.addOverlay(mark);
    addInfo();
}
//鏄剧ず鏍囨敞淇℃伅
function addInfo() {
    var lbs_company_name = $('#lbs_company_name').val();
    var lbs_address = $('#business_address').val();
    var lbs_phone = $('#lbs_phone').val();
    var content = '<div style="margin:0;padding:0;margin:0;line-height:18px;">' +
        $("#company_name").val() + "：" + lbs_company_name + '<br>' + $("#company_address").val() + '：' + lbs_address + '<br/>' + $("#company_phone").val() + '：' + lbs_phone + '<br/>' + '</div>';
    var infoWindow = new BMap.InfoWindow(content, { enableMessage: false });
    window.mark.openInfoWindow(infoWindow);
    window.mark.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);
    });
}
//璁剧疆鍧愭爣
function setMark() {
    window.map.setDefaultCursor('crosshair');
    addEventListen();
}

initMap();//鍒涘缓鍜屽垵濮嬪寲鍦板浘

//soso 琛楁櫙
function sosoMap() {
    $("#allmap").html('');
    //鍦板潃瑙ｆ瀽
    var qqgeocoder, qqmap, qqmarker = null;
    qqmap = new qq.maps.Map(document.getElementById('allmap'));
    qqgeocoder = new qq.maps.Geocoder({
        complete: function (result) {
            qqmap.setCenter(result.detail.location);

            //鏍囪
            qqmarker = new qq.maps.Marker({
                map: qqmap,
                position: result.detail.location
            });

            //琛楁櫙鍦板浘
            var panoService = new qq.maps.PanoramaService();
            panoService.getPano(result.detail.location, 1000, function (result) {
                var pano = result ? result.svid : "false";
                if (pano == 'false') {
                    alert('姝ゅ鏃犺鏅湴鍥�');
                    initMap();
                } else {
                    new qq.maps.Panorama(document.getElementById('allmap'), {
                        pano: pano,
                        disableMove: false,
                        disableFullScreen: false,
                        zoom: 1,
                        pov: {
                            heading: 20,
                            pitch: 10
                        }
                    });
                }
            });
        }
    });
    //鍧愭爣
    var x = setFloat($('#zb_x').val());
    var y = setFloat($('#zb_y').val());
    if (!x || !y) {
        //鍦板潃瑙ｆ瀽
        var qqaddress = document.getElementById("business_address").value;
        qqgeocoder.getLocation(qqaddress);
    } else {
        //杞崲鐧惧害鍧愭爣涓鸿吘璁潗鏍�
        qq.maps.convertor.translate(new qq.maps.LatLng(y, x), 3, function (res) {
            latlng = res[0];
            var panoService = new qq.maps.PanoramaService();
            panoService.getPano(latlng, 1000, function (result) {
                var pano = result ? result.svid : "false";
                if (pano == 'false') {
                    alert('姝ゅ鏃犺鏅湴鍥�');
                    initMap();
                } else {
                    new qq.maps.Panorama(document.getElementById('allmap'), {
                        pano: pano,
                        disableMove: false,
                        disableFullScreen: false,
                        zoom: 1,
                        pov: {
                            heading: 20,
                            pitch: 10
                        }
                    });
                }
            });
        });


    }
}


$(document).ready(function () {
    // 鍒涘缓鍦板潃瑙ｆ瀽鍣ㄥ疄渚�
    var myGeo = new BMap.Geocoder();
    var business_address = $.trim($('#business_address').val());
    var x = setFloat($('#zb_x').val());
    var y = setFloat($('#zb_y').val());
    // 灏嗗湴鍧€瑙ｆ瀽缁撴灉鏄剧ず鍦ㄥ湴鍥句笂,骞惰皟鏁村湴鍥捐閲�
    myGeo.getPoint(business_address, function (point) {
        if (point) {
            var str = '';
            $.each(point, function (key, item) {
                str += key + ':' + item + "\n";
            });
            //$('#bdmap').attr('href','http://api.map.baidu.com/marker?location='+y+','+x+'&title='+business_address+'&content='+business_address+'&output=html');

        }
    }, business_address);
});
