import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import LoginPage from "./views/LoginPage.vue";
import ProjectPage from "./views/ProjectPage.vue";
import ManagerPage from "./views/ManagerPage.vue";
import PostDetail from "./views/PostDetail.vue";
import PortfolioDetail from "./views/PortfolioDetail.vue";
import MyPage from "./views/MyPage.vue";
import TodoPage from "./views/TodoPage.vue";
import TodoDetail from "./views/TodoDetail.vue";
import About from "./views/About.vue";
import Kakaomapapi from "./views/Kakaomapapi.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/post",
      name: "post",
      component: PostPage
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/project",
      name: "project",
      component: ProjectPage
    },
    {
      path: "/managerpage",
      name: "managerpage",
      component: ManagerPage
    },
    {
      path: "/portfoliodetail",
      name: "portfoliodetail",
      component: PortfolioDetail
    },
    {
      path: "/postdetail",
      name: "postdetail",
      component: PostDetail
    },
    {
      path: "/mypage",
      name: "mypage",
      component: MyPage
    },
    {
      path: "/todos",
      name: "todos",
      component: TodoPage
    },
    {
      path: "/todo",
      name: "todo",
      component: TodoDetail
    },
    {
      path:"/about",
      name:"about",
      component: About
    },
    {
      path:"/kakao",
      name:"kakaoapi",
      component: Kakaomapapi
    },
    {
      //PUSH SEND (POST)
      method: ["POST"],
      path: "/push-send",
      handler: function(request, reply) {
        const subscription = JSON.parse(request.payload.subscription);
        const data = request.payload.data;
        const options = {
          TTL: 24 * 60 * 60,
          vapidDetails: {
            subject: "mailto: UR E-mail",
            publicKey: vapidKeys.publicKey,
            privateKey: vapidKeys.privateKey
          }
        };
        webpush.sendNotification(subscription, data, options);
        return reply({ statusCode: 200, data: "OK" }).code(200);
      }
    }
  ]
});
