# readMe

### req5. 한/영 번역 api

1.  google translate api를 활용하여 번역기능을 구성하였습니다.
2.  api키를 가져오는 형식이 아닌 script형식으로 이루어져 있습니다. 



*****한/영 번역 사용하기*****

[https://www.w3schools.com/howto/tryit.asp?filename=tryhow_google_translate]에서 소스를 가져와 추가를 하였습니다. 

header, footer의 영역보다 최상위, 최하위로 구성되어지기 떄문에 개발자모드를 통하여 조절하시면 될 것습니다. 

```vue
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn slot="activator" color="#ffc107" dark>번역</v-btn>
        <v-card>
          <v-card-title class="headline">
            변역하고자 하는 나라를 선택하세요!
          </v-card-title>
          <div id="google_translate_element" class="text-xs-center"></div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false">
              나가기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
	</v-layout>
```

<!--추후에 css을 활용하여 쓰고자 하는 영역만 남겨주고 나머지는 hidden 처리하기-->



### req7. 날씨 api footer에 추가

	1.  openweathermap api를 활용하여 footer에 추가했습니다.
 	2.  날씨 icon, 현재온도, 명칭을 가져왔지만, 소스에는 다양한 정보를 가져 올 수 있도록 들어 있습니다. 사용자가 사용하고 싶은 정보를 가공하여 쓸 수 있도록 합니다. 



##### *날씨 api 사용하기*

1. https://openweathermap.org/에 접속하여 회원가입하기

2. 회원가입하면 project를 생성하게 되면 api 키값을 얻어 올 수 있습니다. 

3. ```vue
    axios
           .get("http://api.openweathermap.org/data/2.5/weather", {
             params: {
               q: this.city + "," + this.city_country,
               units: "metric",
               APPID: "자신의 키값"
             }
           })
   ```

   APPID : 키값 넣기

4. ```vue
        <div class="weatherbox">
           <div class="leftweather">
             <img :src="iconUrl(weathericon)" />
           </div>
           <div class="rightweather">
             <span class="title">{{ overcast }}</span>
             <p class="title">{{ city }}</p>
             <p class="title">현재 온도 : {{ currentTemp }}°</p>
           </div>
         </div>
   ```

   icon, overcast(현재 날씨), ciry(사는지역), 현재 온도만 가져와서 사용하고 있습니다. 

   <script>부문에 다양한 정보들이 있으니 사용하시기 바랍니다. 

   

### 추가기능 Kakaomap api 사용

	1. https://developers.kakao.com/features/kakao에 접속을 하셔서 로그인 및 회원가입을 합니다.
 	2. 프로젝트 생성을 하여 사용하실 map apikey를 얻어오셔서 4가지의 키값이 있는데 script 키값을 가져와서 사용을 합니다. 
 	3. 전용 url이 없기 떄문에 없는 분들은 http://localhost:8080으로 해주시거나 맞는 포트번호를 등록을 해주셔야 map을 사용할 수 있습니다.
 	4. http://apis.map.kakao.com/web/sample/basicMap/을 바탕으로 지도 생성을 해주시고, 사용자가 필요한 정보 및 기능은 apis.map.kakao.com 가이드를 보시면서 코드를 작성하시면 될 것 같습니다. 

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>지도 생성하기</title>
    
</head>
<body>
<!-- 지도를 표시할 div 입니다 -->
<div id="map" style="width:100%;height:350px;"></div>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 사용하세요"></script>
<script>
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption); 
</script>
</body>
</html>
```

<!-- 샘플코드입니다. 참고하셔서 vue 방식으로 작성하시거나 본 프로젝트 파일을 참고하셔서 쓰시면 될 것 같습니다. -->