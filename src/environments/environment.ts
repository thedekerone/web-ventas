// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  secretKey: "",
  apiUrl: "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev",
  lambda_cognito:
    "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev/outh2/token",
  lambda_auth: "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev",
  lambda_programs:
    "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev/list/program",
  lambda_empresas:
    "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev/list/business",
  lambda_usuario:
    "https://0grqy7x10b.execute-api.us-east-1.amazonaws.com/dev/search/equifax",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
