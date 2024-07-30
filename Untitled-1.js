// Save this as script.js
const msalConfig = {
    auth: {
        clientId: "5cbd5d8c-1afe-44b6-89d9-ddcdb344885b",
        authority: "https://login.microsoftonline.com/84c31ca0-ac3b-4eae-ad11-519d80233e6f",
        redirectUri: "http://localhost/ 1 web, 0 spa, 0 public client"
    }
};

const loginRequest = {
    scopes: ["User.Read"]
};

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

document.getElementById('login-button').onclick = function() {
    myMSALObj.loginPopup(loginRequest)
        .then(loginResponse => {
            console.log('id_token acquired at: ' + new Date().toString());
            console.log(loginResponse);

            // Display user info
            myMSALObj.acquireTokenSilent(loginRequest)
                .then(tokenResponse => {
                    console.log(tokenResponse.accessToken);
                }).catch(error => {
                    console.error(error);
                    myMSALObj.acquireTokenPopup(loginRequest)
                        .then(tokenResponse => {
                            console.log(tokenResponse.accessToken);
                        }).catch(error => {
                            console.error(error);
                        });
                });
        }).catch(error => {
            console.error(error);
        });
}
