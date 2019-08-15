<template>
  <div id="dmap">
    <div id="map" style="width:100%; height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: "dmap",
  data() {
    return {
      locations: [
        {
          name: "정태준",
          latlng: new kakao.maps.LatLng(35.191369, 126.811486),
          motto: "안되면 되게 하라!",
          hobby: "영화 시청",
          word: "남은 기간동안 잘하자!",
          img: "profile.jpg"
        },
        {
          name: "문동식",
          latlng: new kakao.maps.LatLng(35.155797, 126.870595),
          motto: "여유있는 사람이 되자",
          hobby: "브롤 하기",
          word: "정치 그만해",
          img: "profile5.jpg"
        },
        {
          name: "위준석",
          latlng: new kakao.maps.LatLng(35.190384, 126.811724),
          motto: "인생은 한방이다!",
          hobby: "노래들으면서 공원 산책",
          word: "가는데 순서없다.",
          img: "profile2.jpg"
        },
        {
          name: "조병용",
          latlng: new kakao.maps.LatLng(35.181467, 126.809548),
          motto: "자신에게 떳떳한 사람이 되자!",
          hobby: "독서",
          word: "우리 팀원들 가장 좋다!",
          img: "profile3.jpg"
        },
        {
          name: "김준영",
          latlng: new kakao.maps.LatLng(35.209536, 126.846435),
          motto: "나를 가꾸는 사람이 되자!",
          hobby: "아이스스케이팅 타기",
          word: "팀 분위기가 너무좋아연~",
          img: "profile4.jpg"
        }
      ]
    };
  },
  mounted() {
    var container = document.getElementById("map");
    var mapOptions = {
      center: new kakao.maps.LatLng(35.207593, 126.811740),
      level: 4
    };
    var map = new kakao.maps.Map(container, mapOptions);

    for (var i = 0; i < this.locations.length; i++) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: this.locations[i].latlng
      });

      var content = '<div class="wrap">' +
        '    <div class="infomap">' +
        '        <div class="title">' +
        this.locations[i].name +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="' + this.getImgUrl(this.locations[i].img) + '" width="73" height="70">' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="jibun ellipsis">' +
        '                   좌우명 : ' + this.locations[i].motto + '<br>' +
        '                   취미 : ' + this.locations[i].hobby + '<br>' +
        '                   한마디 : '  + this.locations[i].word  +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';


      var infowindow = new kakao.maps.InfoWindow({
        content: content
      });
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
    }

    function makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    }

    function makeOutListener(infowindow) {
      return function() {
        infowindow.close();
      };
    }
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    }
  }
};
</script>

<style>
.wrap {
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .infomap {
  width: 295px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .infomap:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.infomap .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
}
.infomap .close:hover {
  cursor: pointer;
}
.infomap .body {
  position: relative;
  overflow: hidden;
  background: white;
}
.infomap .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}
.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}
.infomap .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}
.infomap:after {
  content: "";
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url("http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}

.infomap .link {
  color: #5085bb;
}
</style>
