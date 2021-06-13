// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://nspot-server.herokuapp.com/api/',
  baseApiUrl: 'https://nspot-server.herokuapp.com/',

  adminPortalUrl: 'http://nspot.admin.surge.sh',
  institutePortalUrl: 'http://nspot.admin.surge.sh',
  studentPortalUrl: 'http://nspot.admin.surge.sh',

  RAZORPAY_KEY_ID: "rzp_test_tmR2af2TNK0qLo",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
