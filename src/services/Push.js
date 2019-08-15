const serverKey = `AAAA473PIMo:APA91bFfjEaehTqPay-atAGaFdNjNR573DhX1wD01AzWj2lNDmQ5dyz5McWjYPZIM5m7yd11R7X6ahZKGpVylkNX-G_lCUuAFWmJVOa1_l6twKelsL9jV_4U-4kwb2TwxrDn6iLzcIDg
`;

export default {
  subscribeTokenToTopic(token, topic) {
    fetch(
      "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic,
      {
        method: "POST",
        headers: new Headers({
          "Authorization": `key=${serverKey}`
        })
      })
      .then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw "Error subscribing to topic: " + response.status + " - " + response.text();
        }
      })
      .catch(error => {
        console.error(error);
      });
  },
  // post에 글 작성 했을 때 메세지 push
  newPostPush(url) {
    const message = {
      notification: {
        "body": "새 포스트가 등록되었습니다.",
        "title": "진격의巨鳥",
        "icon": "favicon.ico",
        "click_action": "http://localhost:8080/",
     },
      to: "/topics/post"
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(message),
      headers: new Headers({
        "Content-type": "application/json",
        "Authorization" : `key=${serverKey}`
      })
    })
      .then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw "Error subscribing to topic: " +
            response.status +
            " - " +
            response.text();
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  // portfolio에 글 작성 했을 때 메세지 push
  newPortfolioPush(url){
    const message = {
      notification: {
        "body" : "새 포트폴리오가 등록되었습니다.",
        "title": "진격의巨鳥",
        "icon": "favicon.ico",
        "click_action": "http://localhost:8080/",
      },
      to: "/topics/portfolio"
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(message),
      headers: new Headers({
        "Content-type": "application/json",
        "Authorization": `key=${serverKey}`
      })
    })
      .then(response => {
        if (response.status < 200 || response.status >= 400) {
          throw "Error subscribing to topic: " + response.status + " - " + response.text();
        }
      })
      .catch(e => {
        console.log(e);
      });
  },
  newCommentPush(url,bodys){
    const message = {
      notification: {
        "body": `${bodys}에 새 댓글이 등록되었습니다.`,
        "title": "진격의巨鳥",
        "icon": "favicon.ico",
        "click_action": "http://localhost:8080/",
     },
      to: "/topics/manager"
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(message),
      headers: new Headers({
        "Content-type": "application/json",
        "Authorization" : `key=${serverKey}`
      })
    })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw "Error subscribing to topic: " + response.status + " - " + response.text();
      }
    })
    .catch(e => {
      console.log(e);
    });
  }
};
