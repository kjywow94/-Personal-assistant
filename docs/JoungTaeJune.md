# readMe

### req6. 페이지 웹 로그 세팅

1. 페이지 뷰에 대한 로그를 firebase를 통해 확인가능합니다.
2. 페이지 뷰에 대한 로그를 firebase 프로젝트에서 세팅하여 확인할 수 있도록 합니다.



> **Firebase 저장소 기본 설정**
>
> [https://console.firebase.google.com](https://console.firebase.google.com/)에서 프로젝트를 생성 후 진행,
>
> 해당 프로젝트 터미널에서 
>
> `firebase login`을 치고 login을 한 후,
>
> `firebase init`
>
> ```bash
> Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection)
> >( ) Database: Deploy Firebase Realtime Database Rules
>  ( ) Firestore: Deploy rules and create indexes for Firestore
>  (*) Functions: Configure and deploy Cloud Functions
>  (*) Hosting: Configure and deploy Firebase Hosting sites
>  ( ) Storage: Deploy Cloud Storage security rules
> ```
>
> **Functions**와 **Hosting**을 선택 후 Enter -> JavaScript -> 이후 선택적 Y/N(대부분 Y로 진행함)
>
> **What do you want to use as your public directory?(public)**에서 `dist` Enter
>
> 이후 기존 프로젝트 사용할 것이기에 No
>
> `npm i -g firebase-tools`
>
> 만들어진 **functions/index.js**에서 상황에 맞게 내용 작성
>
> ```js
> /*
> 사용자가 로그인을 하였을 때, 해당 사용자의 로그인 로그를 userLogin 보드에 남기기
> */
> exports.userLogin = functions.https.onCall((data, context) => {
> 	const email = context.auth.token.email || null;
> 	console.log(email+'님, Login하셨습니다.')
> 	response.send("User Login!");
> });
> ```
>
> 로그인 로직이 있는 **FirebaseService** 설정
>
> ```js
> import "firebase/functions";
> 
> const userLogin = firebase.functions().httpsCallable("userLogin");
> 
> export default {
>   loginWithEmail(email, password) {
>     return firebase
>       .auth()
>       .signInWithEmailAndPassword(email, password)
>       .then(function(user) {
>         /* 
>         Function userLogin
>         로그인에 성공하면 로그를 남기기 위해 함수 실행
>         */
>         userLogin({});
>         return user;
>       })
>   }
> }
> ```





**참고자료**

> **firebase Youtube**
>
> https://www.youtube.com/watch?v=DYfP-UIKxH0&list=PLl-K7zZEsYLkPZHe41m4jfAxUi0JjLgSM
>
> **firebase Docs_Functions**
>
> https://firebase.google.com/docs/functions/callable?hl=ko