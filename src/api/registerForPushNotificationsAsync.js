import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native';

// this is the expo push server, normally you wouldn't directly POST
// here, instead if you need to send a notification immediately it's better
// to use local notifications.
// The typical case will POST to your server, and then there will be some
// server-side code to handle sending the notification. You can see an example
// of this in the code tab, or online on the expo push notification guide

const PUSH_ENDPOINT = 'http://www.belavo.co/api/users/add'
// Endpoint for PUSH testing:
// const PUSH_ENDPOINT = 'http://belavoco.proxy.beeceptor.com'

export default (async function registerForPushNotificationsAsync () {
  // Get the token that uniquely identifies this device

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  const username = await AsyncStorage.getItem('name');
  let token = await Notifications.getExpoPushTokenAsync()
  
  // POST the token to our backend so we can use it to send pushes from there
  return window.fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: username,
        },
      })
  })
})