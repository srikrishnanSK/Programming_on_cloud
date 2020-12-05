import axios from "axios";
import { getAwsDetails } from "utils/common";
import apiUrl from "aws-exports/environment";
export async function getPendingAppointments(profId) {
  let url = `${apiUrl}getPendingAppointments?typeOfUser=Profes&proId=` + profId;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}
export async function getUpcomingAppointments(profId) {
  let url =
    `${apiUrl}getUpcomingAppointments?typeOfUser=Profes&proId=` + profId;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}
export async function getPastAppointments(profId) {
  let url = `${apiUrl}getPastAppointments?typeOfUser=Profes&proId=` + profId;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

export async function getPastAppointmentsUser(profId) {
  let url = `${apiUrl}userPastAppointments?typeOfUser=User&proId=` + getAwsDetails().payload.sub;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

export async function getUpcomingAppointmentsUser(profId) {
  let url =
    `${apiUrl}userUpcomingAppointments?typeOfUser=User&proId=` + getAwsDetails().payload.sub;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

export async function getPendingAppointmentsUser(profId) {
  let url = `${apiUrl}userPendingAppointments?typeOfUser=User&proId=` + getAwsDetails().payload.sub;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

export async function confirmAppointment(AppID) {
  let url = `${apiUrl}confirmAppByProfes?AppID=` + AppID;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
}

export async function appintmentCancelByProfes(AppID) {
  let url = `${apiUrl}cancelAppByprofes?AppID=` + AppID;
  return axios
    .get(url) 
    .then((response) => response)
    .catch((error) => error);
}

export async function appintmentCancelByUser(AppID) {
  let url = `${apiUrl}cancelAppByUser?AppID=` + AppID;
  return axios
    .get(url) 
    .then((response) => response)
    .catch((error) => error);
}