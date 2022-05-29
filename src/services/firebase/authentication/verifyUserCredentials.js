const { verifyIdToken } = require("../../../configurations/FirebaseConfig");

// idToken comes from the client app
verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    // ...
  })
  .catch((error) => {
    // Handle error
  });
