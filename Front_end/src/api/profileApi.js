import axios from "axios";
import apiUrl from "aws-exports/environment";
import { getAwsDetails } from "utils/common";
export async function createUserProfile(payload) {
  let url = `${apiUrl}insert`;
  return axios
    .post(url, payload)
    .then((response) => response)
    .catch((error) => error);
}
export async function createProfessionalProfile(payload) {
  let url = `${apiUrl}addNewProf`;
  return axios
    .post(url, payload)
    .then((response) => response)
    .catch((error) => error);
}
export async function updatedUserProfile(payload) {
  let url = `${apiUrl}insertUpdateUser`;
  return axios
    .post(url, payload)
    .then((response) => response)
    .catch((error) => error);
}
export async function updatedProfessionalProfile(payload) {
  let url = `${apiUrl}insertUpdateProf`;
  return axios
    .post(url, payload)
    .then((response) => response)
    .catch((error) => error);
}
// export async function getUserProfileStatus(userId) {
//   let url =
//     `https://y6ftq60fl2.execute-api.us-east-1.amazonaws.com/profile-check/userdata/` +
//     getAwsDetails().payload.sub;
//   return axios
//     .get(url, {
//       headers: {
//         "Access-Control-Allow-Origin": "*", // changed this
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => response)
//     .catch((error) => error);
// }
// export async function getProfessionalProfileStatus(userId) {
//   let url =
//     `https://y6ftq60fl2.execute-api.us-east-1.amazonaws.com/profile-check/professional/` +
//     getAwsDetails().payload.sub;
//   return axios
//     .get(url, {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json", // changed this
//       },
//     })
//     .then((response) => response)
//     .catch((error) => error);
// }
export async function getUserProfile() {
  let url = `${apiUrl}getUserDetails?cognitoId=` + getAwsDetails().payload.sub;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}
export async function getProfessionalProfile() {
  let url =
    `${apiUrl}getProfessDetails?profesCogId=` + getAwsDetails().payload.sub;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}
export async function getAllProfileBySearch(result) {
  let url = `https://kqzv4xx1x7.execute-api.us-east-1.amazonaws.com/Deployed?q=${result}`;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

//   const options = {
//     method: "GET",
//     headers: {
//       Authorization: localStorage.getItem("token"),
//     },
//     url: url,
//   };
//   return axios(options);
