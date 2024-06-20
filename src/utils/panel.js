import axios from "axios";

const base_url = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
  withXSRFToken: true,
});

export const getPanels = async function (page) {
  const res = await instance.get(`/panels/myPanels?page=${page}&limit=10`);
  return res.data.data;
};
export const getAllPanels = async function (page) {
  const res = await instance.get(
    `/panels?page=${page}&limit=10&sort=-createdAt`,
  );
  return res.data.data;
};

export const getPanel = async function (id) {
  const res = await instance.get(`/panels/${id}`);
  return res.data.data.panel;
};
export const editPanel = async function (params) {
  console.log(params);
  const res = await instance.patch(`/panels/${params.id}`, params.data);
  return res.data.data.panel;
};
export const getBestPanel = async function () {
  const res = await instance.get("/panels/best-panel");
  return res.data.data.panel;
};

export const addViewer = async function (data) {
  try {
    await instance.post("/panels/addUser", data);
  } catch (err) {
    return {
      error: err.response.data.message,
    };
  }
};
export const removeViewer = async function (data) {
  try {
    await instance.post("/panels/removeUser", data);
  } catch (err) {
    return {
      error: err.response.data.message,
    };
  }
};
