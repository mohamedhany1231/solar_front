import axios from "axios";
import * as dateFns from "date-fns";

const base_url = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
  withXSRFToken: true,
});

export const getLatestReading = async function (id, date = new Date()) {
  if (dateFns.isSameDay(date, new Date())) date = new Date();

  const res = await instance.get(`/readings/${id}/latest/${date}`);

  return res.data.data.reading;
};

export const getRecentReadings = async function (id, date = new Date()) {
  if (dateFns.isSameDay(date, new Date())) date = new Date();

  const res = await instance.get(`/readings/${id}/recent/${date}`);
  return res.data.data.readings;
};

export const getMonthlyEnergy = async function (id, date = new Date()) {
  if (dateFns.isSameDay(date, new Date())) date = new Date();

  const res = await instance.get(`/readings/${id}/monthly/${date}`);
  return res.data.data.readings;
};

export const getPeakPerformanceTime = async function () {
  const res = await instance.get(`/readings/peak-time`);
  return res.data.data.time;
};

export const getTotalEnergy = async function () {
  const res = await instance.get(`/readings/total-energy`);
  return res.data.data.reading;
};

export const getWeekly = async function () {
  const res = await instance.get(`/readings/weekly`);
  return res.data.data.readings;
};
