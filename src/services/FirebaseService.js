import firebase, { functions } from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/functions";
import "@firebase/messaging";
import store from "../store";
import Push from "./Push";

const POSTS = "posts";
const PORTFOLIOS = "portfolios";
const USERS = "users";
const COMMENTS = "comments";
const COMMENTSREPLY = "reply";
const LIKES = "likes";
const TODOS = "todos";


// Setup Firebase
const config = {
  projectId: "team-5dd61",
  apiKey: "AIzaSyC_LHv9xsBCTLgidGQ9s8CfhncDcBTazHk",
  authDomain: "team-5dd61.firebaseapp.com",
  databaseURL: "https://team-5dd61.firebaseio.com",
  storageBucket: "team-5dd61.appspot.com",
  messagingSenderId: "978142044362",
  appId: "1:978142044362:web:f75b3e742427501e"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const userLogin = firebase.functions().httpsCallable("userLogin");
const userLogout = firebase.functions().httpsCallable("userLogout");

function insertDB(email, name) {
  firestore
    .collection(USERS)
    .doc(email)
    .set({
      email: email,
      name: name,
      auth: "guest",
      imgur:
        "https://cdn.pixabay.com/photo/2017/08/10/21/08/hacker-2627849_960_720.png",
      portfolio_count: 0,
      post_count: 0
    });
}

function userIdCheck(email) {
  return firestore
    .collection(USERS)
    .doc(email)
    .get()
    .then(doc => {
      if (doc.exists) {
        return true;
      } else {
        return false;
      }
    });
}

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BEt36LUJxP9dGmuEN2FrjiebrZ4WoVKBPz-iIjVHRKOZWwZLOhZsObkJklhkImEH4H4MA_exPfeCOeyb-jqoLcU");
Notification.requestPermission().then(function(permission) {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Unable to get permission to notify.");
  }
});

messaging
  .requestPermission()
  .then(function() {
    return messaging.getToken();
  })
  .then(function(token) {
    store.state.pushToken = token;
  })
  .catch(function(arr) {
    console.log("Error Occured", arr);
  });

messaging.onMessage(function(payload) {
  var title = payload.notification.title;
  var options = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  var notification = new Notification(title,options);
});

function deleteAtPath(path) {
  var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
  deleteFn({ path: path })
    .then(function(result) {
      console.log("Delete success: " + JSON.stringify(result));
    })
    .catch(function(err) {
      console.log("Delete failed, see console,");
      console.warn(err);
    });
}

export default {
  store,
  data() {
    return {
      storageData: ""
    };
  },
  MypageupdateDB(email, name, auth, imgur, portfolio_count, post_count) {
    return firestore
      .collection("users")
      .doc(email)
      .set({
        email: email,
        name: name,
        auth: auth,
        imgur: imgur,
        portfolio_count: portfolio_count,
        post_count: post_count
      });
  },
  ImgupdateDB(email, name, auth, imgur) {
    return firestore
      .collection("users")
      .doc(email)
      .set({
        email: email,
        name: name,
        auth: auth,
        imgur: imgur
      });
  },
  updateDB(email, name, auth, imgur, portfolio_count, post_count) {
    return firestore
      .collection("users")
      .doc(email)
      .set({
        email: email,
        name: name,
        auth: auth,
        imgur: imgur,
        portfolio_count: portfolio_count,
        post_count: post_count
      });
  },
  deleteDB(email) {
    return firestore
      .collection(USERS)
      .doc(email)
      .delete();
  },
  getPosts() {
    const postsCollection = firestore.collection(POSTS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.id = doc.id;
          return data;
        });
      });
  },
  postPost(title, body, uid) {
    return firestore.collection(POSTS).add({
      title,
      body,
      uid,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.id = doc.id;
          return data;
        });
      });
  },
  getPortfolioById(id) {
    const portfoliosCollection = firestore.collection(PORTFOLIOS).doc(id);
    return portfoliosCollection.get().then(docSnapshots => {
      let data = docSnapshots.data();
      data.id = docSnapshots.id;
      return data;
    });
  },
  getPostById(id) {
    const postsCollection = firestore.collection(POSTS).doc(id);
    return postsCollection.get().then(docSnapshots => {
      let data = docSnapshots.data();
      data.id = docSnapshots.id;
      return data;
    });
  },
  updatePortfolio(id, title, body, img, uid) {
    return firestore
      .collection("portfolios")
      .doc(id)
      .set({
        title: title,
        body: body,
        img: img,
        uid: uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      });
  },
  updatePost(id, title, body, uid) {
    return firestore
      .collection("posts")
      .doc(id)
      .set({
        title: title,
        body: body,
        uid: uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      });
  },
  postPortfolio(title, body, img, uid) {
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      uid,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  getUsers() {
    const usersCollection = firestore.collection(USERS);
    return usersCollection.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        return data;
      });
    });
  },
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        userLogin({});
        userIdCheck(result.user.email)
          .then(res => {
            if (!res) {
              insertDB(result.user.email, result.user.displayName);
            }
          })
          .catch(err => {
            console.log(err);
          });
        return result;
      });
  },
  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        userLogin({});
        return result;
      });
  },
  signUp(email, password, userName, portfolio_count, post_count) {
    let user;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function() {
        user = firebase.auth().currentUser;
      })
      .then(function() {
        user.updateProfile({
          displayName: userName
        });
        insertDB(email, userName, portfolio_count, post_count);
        user.sendEmailVerification();
      });
  },
  loginWithEmail(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        userLogin({});
        return user;
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        userLogout({});
      });
    store.commit("auth", "");
  },
  session() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        store.commit("session", user);
      }
      let auth;
      let imgur;
      let portfolio_count;
      let post_count;
      firestore
        .collection(USERS)
        .doc(user.email)
        .get()
        .then(doc => {
          if (doc.exists) {
            auth = doc.data().auth;
            imgur = doc.data().imgur;
            portfolio_count = doc.data().portfolio_count;
            post_count = doc.data().post_count;
            if (user) {
              store.commit("auth", auth);
              store.commit("imgur", imgur);
              store.commit("portfolio_count", portfolio_count);
              store.commit("post_count", post_count);
            }
          }
        });
    });
  },
  getUserImg(uid) {
    return firestore
      .collection(USERS)
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().imgur;
        } else {
          return "없음";
        }
      });
  },
  deletePortfolio(id) {
    firestore
      .collection(PORTFOLIOS)
      .doc(id)
      .delete();
  },
  deletePost(id) {
    firestore
      .collection(POSTS)
      .doc(id)
      .delete();
  },
  postImageStorage(file) {
    let storageRef = firebase.storage().ref();
    let metadata = {
      contentType: "image/*"
    };
    this.storageData = storageRef.child("images/" + Date.now() + file.name);
    let uploadTask = this.storageData.put(file, metadata);
    return uploadTask;
  },
  getImageStorage() {
    return this.storageData.getDownloadURL();
  },
  writeComment(board_id, content, uid, c_name, my_img) {
    var postComment = firestore.collection(c_name).doc(board_id);
    return postComment.collection(COMMENTS).add({
      content,
      uid,
      my_img,
      reply_state: false,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  getComment(board_id, c_name) {
    const commentCollection = firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS);
    return commentCollection
      .orderBy("created_at")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return data;
        });
      });
  },
  getCommentID(board_id, c_name) {
    const commentCollection = firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS);
    return commentCollection
      .orderBy("created_at")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.id;
        });
      });
  },
  getCommentReplyID(board_id, c_name, reply_id) {
    const commentCollection = firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS)
      .doc(reply_id)
      .collection(COMMENTSREPLY);
    return commentCollection
      .orderBy("created_at")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          return doc.id;
        });
      });
  },
  delComment(board_id, reply_id, c_name) {
    firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS)
      .doc(reply_id)
      .delete();
  },
  getCommentReply(c_name, board_id, reply_id) {
    return firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS)
      .doc(reply_id)
      .collection(COMMENTSREPLY)
      .orderBy("created_at")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return data;
        });
      });
  },
  writeCommentReply(board_id, c_name, reply_id, content, uid, u_img) {
    var postComment = firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS)
      .doc(reply_id);
    return postComment.collection(COMMENTSREPLY).add({
      content,
      uid,
      u_img,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  deleteCommentReply(board_id, c_name, reply_id, d_id) {
    firestore
      .collection(c_name)
      .doc(board_id)
      .collection(COMMENTS)
      .doc(reply_id)
      .collection(COMMENTSREPLY)
      .doc(d_id)
      .delete();
  },
  updateLike(board_id, c_name, uid) {
    var like = firestore.collection(c_name).doc(board_id);
    return this.userLikeCheck(uid, board_id, c_name)
      .then(res => {
        if (res) {
          return like.collection(LIKES).doc(uid).delete();
        }else {
          return like.collection(LIKES).doc(uid).set({
            uid: uid
          });
        }
      });
  },
  getLike(board_id, c_name) {
    const likeCollection = firestore
      .collection(c_name)
      .doc(board_id)
      .collection(LIKES);
    return likeCollection.get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          return data;
        })
      });
  },
  userLikeCheck(email,board_id, c_name) {
    return firestore
      .collection(c_name)
      .doc(board_id)
      .collection(LIKES)
      .doc(email)
      .get()
      .then(doc => {
        if (doc.exists) {
          return true;
        } else {
          return false;
        }
      });
  },
  getTodos() {
    const todosCollection = firestore
      .collection(TODOS)
      .where("uid", "==", this.store.state.user.email);
    return todosCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.due_at = this.dateFormating(data.due_at);
          data.id = doc.id;
          return data;
        });
      });
  },
  postTodos(type, uid, title, content, due_at) {
    const todosCollection = firestore.collection(TODOS);
    return todosCollection.add({
      type,
      uid,
      title,
      content,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      due_at
    });
  },
  updateTodosType(id, type) {
    const todosCollection = firestore.collection(TODOS).doc(id);
    return todosCollection.update({
      type: type
    });
  },
  deleteTodos(id) {
    firestore
      .collection(TODOS)
      .doc(id)
      .delete();
  },
  updateTodos(id, title, content, due_at) {
    const todosColletion = firestore.collection(TODOS).doc(id);
    return todosColletion.update({
      title: title,
      content: content,
      due_at: due_at
    });
  },
  dateFormating(date) {
    let dataString = Date.parse(date);
    let d = new Date(dataString);
    let year = d.getFullYear();
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
};
