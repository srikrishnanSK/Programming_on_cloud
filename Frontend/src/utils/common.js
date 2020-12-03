export const REGEX = {
  email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  hostUrl: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  alphaNumeric: "^[a-zA-Z0-9_ ]*$",
  mobileNumber: "^[0-9+-]+$",
  specialCharacter: /\W|_/g,
};

export function isValidEmail(email) {
  return REGEX.email.test(email);
}

export function getAwsDetails() {
  let awsAuth = JSON.parse(localStorage.getItem("cognitoUser"));
  awsAuth = awsAuth.idToken;
  return awsAuth;
}
