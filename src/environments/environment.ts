// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyBsQQpbgYFYWDyEcOSGoPRsOi4l1g01kCM",
    authDomain: "salvoiacono-5232e.firebaseapp.com",
    databaseURL: "https://salvoiacono-5232e.firebaseio.com",
    projectId: "salvoiacono-5232e",
    storageBucket: "salvoiacono-5232e.appspot.com",
    messagingSenderId: "301611604670"
  },
  baseurl: 'https://firebasestorage.googleapis.com/v0/b/salvoiacono-5232e.appspot.com/o/'
};
