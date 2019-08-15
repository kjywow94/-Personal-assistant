# readMe

## gitgraph 그리기

### req2. Gitlap Repository 그래프 구현

1. 웹사이트 gitlab 그래프를 가시적으로 확인할 수 있도록 구현합니다.
2. 모바일 사이즈에서는 그래프가 비노출 되어야 합니다.
3. Repository를 클릭 시 해당 Repository 페이지로 이동합니다.
4. 본인과 팀원의 Gitlab 계정을 연동하여 여러작업자의 Gitlab 상태를 확인할 수 있도록 구현합니다.



- Gitlap api 공식 document : [공식문서](https://docs.gitlab.com/ee/api)



##### 공통사항

- gitlab의 프로젝트, 커밋, 머지 등 여러가지 정보들을 가져오기 위해 api요청을 보내야 한다.

- `postman`으로 api요청을 테스트 한 후 코드작성

- postman 요청보내기

  - 요청주소는` https://lab.ssafy.com/api/v4`
  - 헤더에 `PRIVATE-TOKEN`을 같이 넘겨줘야 하기 때문에 axios요청을 보내는데 같이 담아줘야 한다

  ```javascript
  // axios요청 예시
  import axios from "axios";

  export default baseURL => {
    return axios.create({
      baseURL: baseURL,
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // lab.ssafy personal token
        "PRIVATE-TOKEN": "프라이빗토큰값"
      }
    });
  };
  ```
  - axios요청을 보내서 사용하고싶은 gitlab api 주소들은 `GitlabService.js`에서 관리



##### 요구사항 1. 웹사이트 gitlab 그래프를 가시적으로 확인할 수 있도록 구현

- `gitgraph.js`를 사용해서 그래프를 나타내기

  - 설치

  ```
  > npm i @gitgraph/js
  ```

  - 사용하기

  ```vue
  <template>
      <div id="gitgraph"></div>
  </template>
  <script>
      import { createGitgraph } from "@gitgraph/js";
      const graphContainer = document.getElementById("gitgraph");
      const gitgraph = createGitgraph(graphContainer);
  </script>
  ```

- gitgraph.js 의 경우 DOM 생성전에 만들어져야 하기 때문에 `mounted()`를 사용해야 한다.

  ```vue
  <!-- Graph.vue -->
  <script>
  export default{
      mounted(){
          this.init();
      },
      methods:{
          init(){
              // 이 부분에 gitgiraph.js를 생성하는 코드를 넣어야 함
          }
      }
  }
  </script>
  ```

- 위와 같은 상황때문에 요청을 보내고 받은 데이터를 넘겨주는 문제가 생김
  - 데이터는 `promise`객체로 넘어오는데 이 데이터를 `init()`함수가 실행되기 전에 가져와서 `init()`함수에 데이터를 넘겨주는 방식으로 해결
- axios 요청주소
  - https://lab.ssafy.com/api/v4/projects/6083/events
    - `pushed new`  : branch
    - `pushed to` : commit
    - `accepted` : merge
  - merge의 경우 어디에서 어디로 merge요청을 보냈다는 정보가 있어야 하는데 위의 요청에서는 알 수 없으므로, 한개의 요청을 더 보내 이를 해결
  - https://lab.ssafy.com/api/v4/projects/6083/merge_requests



##### 요구사항 2. 모바일 사이즈에서는 그래프가 비노출 되어야 합니다.

- css 미디어 쿼리를 사용해서  구현

```vue
<style>
@media screen and (max-width: 1024px) {
  .profile_hidden {
    display: none;
  }
</style>
```

- `Vuetify` 를 사용하고 있기 때문에 제공하는 class속성으로 가능

```vue
<v-flex class="hidden-sm-and-down">
</v-flex>
```



##### 요구사항 3. Repository를 클릭 시 해당 Repository 페이지로 이동합니다.

- gitgraph.js 의 Eventlistener를 이용해서 구현

  ```
  onClick(commit) {
  	window.open(`https://lab.ssafy.com/Dev.J/webmobile-	sub2/commit/${r.data[i].push_data.commit_to}`
  	)},
  onMessageClick(commit) {
  	window.open(`https://lab.ssafy.com/Dev.J/webmobile-sub2/commit/${r.data[i].push_data.commit_to}`
  	)},
  ```
  - `onClick` : 그래프의 dot을 클릭하면 해당 commit의 repository로 이동
  - `onMessageclick` : 그래프의 commit 메세지를 클릭하면 해당 commit의 repository로 이동



##### 요구사항4. 본인과 팀원의 Gitlab 계정을 연동하여 여러작업자의 Gitlab 상태를 확인할 수 있도록 구현합니다.

- axios 요청주소 : https://lab.ssafy.com/api/v4/projects/6083/members

  - postman을 통한 요청 테스트

    - Headers 부분에 토큰값을 넣어서 요청한 결과

    ![web2-member](C:\Users\multicampus\Downloads\web2-member.png)

  - 위의 요청주소에서 팀원들의 이름, 깃랩주소, 프로필 사진을 가져옴

- axios 요청주소 : https://lab.ssafy.com/api/v4/projects/6083/repository/commits

  - postman 요청 테스트

  ![web2-commit](C:\Users\multicampus\Downloads\web2-commit.png)

  - 요청 결과 프로젝트의 전체 commit기록을 가져와 팀원 자신들이 각각 commit한 내용을 담아준다

- code

```vue
<!-- ProjectMember.vue -->
v-for="(member, i) in members" 으로 팀원들 정보를 가져오고
v-if="commit_auth[i] == commit.author_name 을 통해 분류
```
