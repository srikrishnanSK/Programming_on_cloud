import { Auth } from "aws-amplify";

export async function login(username, password) {
  return Auth.signIn(username, password)
    .then((resp) => resp)
    .catch((err) => err);
}
export async function register(data) {
  return Auth.signUp(data)
    .then((resp) => resp)
    .catch((err) => err);
}
export async function confirmSignup(username, password) {
  return Auth.confirmSignUp(username, password)
    .then((resp) => resp)
    .catch((err) => err);
}
export async function resendOTP(userName) {
  return Auth.resendSignUp(userName)
    .then((resp) => resp)
    .catch((err) => err);
}
export async function sendOTP(userName) {
  return Auth.forgotPassword(userName)
    .then((resp) => resp)
    .catch((err) => err);
}
export async function forgotPassword(userName, code, newpassword) {
  return Auth.forgotPasswordSubmit(userName, code, newpassword)
    .then((resp) => resp)
    .catch((err) => err);
}

export async function logoutUser(data) {
  return Auth.signOut({ global: true })
    .then((resp) => resp)
    .catch((err) => err);
}
