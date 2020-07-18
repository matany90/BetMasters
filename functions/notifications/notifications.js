const admin = require('firebase-admin');
const functions = require('firebase-functions');

exports.sendInviteNotification = functions.database
  .ref('/invitations/{inviteUid}')
  .onCreate((snapshot, context) => {
    const friendEmail = snapshot.val().friendEmail;
    const friendlyLeagueName = snapshot.val().friendlyLeagueName;
    const inviterEmail = snapshot.val().inviterEmail;

    const payload = {
      notification: {
        title: `קיבלת הזמנה מ-${inviterEmail}!`,
        body: `המשתמש ${inviterEmail} מזמין אותך לליגה ${friendlyLeagueName}. לחץ להצגה!`
      }
    };

    admin.auth().getUserByEmail(friendEmail)
      .then((user) => {
        return admin.database().ref(`/usersDb/${user.uid}/notificationToken`).once('value')
      })
      .then(tokenSnapshot => {
        const token = tokenSnapshot.val();
        console.log(`Notification to ${friendEmail} sent successfully!`);
        return admin.messaging().sendToDevice(token, payload);
      })
      .catch((error) => {
        console.log(`Error fetching ${friendEmail}, ${error}`);
      })
  });
