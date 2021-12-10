// const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const data = {}
    try {
        const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/
        const authProvider = event.requestContext.identity.cognitoAuthenticationProvider
        const [,, userPoolId, userSub] = authProvider.match(IDP_REGEX)
    
        // a) Getting the User object from Cognito pool
        // const cognito = new AWS.CognitoIdentityServiceProvider()
        // const listUsersResponse = await cognito.listUsers({
        //   UserPoolId: userPoolId,
        //   Filter: `sub = "${userSub}"`,
        //   Limit: 1
        // }).promise()
        // const user = listUsersResponse.Users[0]
    
        // b) Getting custom attributes
        // const myCustomAttribute = user.Attributes.find((a) => a.Name === 'custom:myCustomAttribute').Value

        data['userPoolId'] = userPoolId
        data['userSub'] = userSub
      } catch (err) {
        console.error(err)
      }

    const response = {
        statusCode: 200,
        // Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify({
            message: 'Your function executed successfully!',
            input: event,
            ...data
        }),
    };
    return response;
};
