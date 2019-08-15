const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.projectWeb = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.userLogin = functions.https.onCall((data, context) => {
	const email = context.auth.token.email || null;
	console.log(email+'님, Login하셨습니다.')
	response.send("User Login!");
});

exports.userLogout = functions.https.onCall((data, context) => {
	const email = context.auth.token.email || null;
	console.log(email+'님께서 Logout하셨습니다.')
	response.send("User Logout!");
});

exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB'
  })
  .https.onCall((data, context) => {
    if (!(context.auth && context.auth.token && context.auth.token.admin)) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Must be an administrative user to initiate delete.'
      );
    }

    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );
    return firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token
      })
      .then(() => {
        return {
          path: path
        };
      });
  });
