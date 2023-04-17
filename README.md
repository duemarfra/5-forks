#5-Forks

## Description

It is a cross-platform mobile application, made with React Native Expo.

This app is used to see nearby restaurants, rate them and save them as favorites. You will notice some inspiration in "Tripadvisor".

It should also be clarified that this app is not my authorship, but rather the culmination of a udemy tutorial by (Agustyn Navarro Galdon).

- expo version: "48.0.6"

- firebase: "9.17.2"

- react: "18.2.0"

- react native: "0.71.6"

- react navigation/native: "6.1.6"

- Language support: English

See package.json for more project details

## Wear

IMPORTANT:

This app consumes a "free" database in firebase, so when you try it it probably won't work. For this, my recommendation is that you first create a project in firebase that has "Authentication" enabled and "Cloud Firestore" supports the "web app" format. You will also need to replace the credentials in the "src/config/firebase-config.js" file with the credentials obtained from your firebase... And configure maps in google cloud.

Run with "expo go":

- install dependencies

          install npm

- start local server

          start of exposure npx

- scan the qr code from a mobile

Create apk:

To generate an apk, you need to create an account at "https://expo.dev" and run the following command from your project's terminal:

          eas build -p android --profile preview

If you have any other problems, I recommend reading this guide: "https://docs.expo.dev/development/create-development-builds/"

## Links of interest

-repo

          https://github.com/duemarfra/5-forks.git

- APK hosted by Expo

          https://expo.dev/accounts/duemarfra/projects/5-forks/builds/125577c7-f70d-4897-9d78-838a77cf270f

Note:

My Firebase server will only last a month or two from today, so this app may not work properly.
