// Auth.js
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { AWS_CONFIG } from '../constant';

const poolData = {
  UserPoolId: AWS_CONFIG.UserPoolId,
  ClientId: AWS_CONFIG.ClientId
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      {
        Name: 'email',
        Value: email,
      },
    ];

    userPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const confirmSignUp = (email, verificationCode) => {
  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmRegistration(verificationCode, true, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const login = (email, password) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const userData = {
    Username: email,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

export const getUserAttributes = (user) => {
  return new Promise((resolve, reject) => {
    user.getSession((err, session) => {
      if (err) {
        reject(err);
      } else {
        user.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            const results = attributes.reduce((acc, attribute) => {
              acc[attribute.Name] = attribute.Value;
              return acc;
            }, {});
            resolve(results);
          }
        });
      }
    });
  });
};
