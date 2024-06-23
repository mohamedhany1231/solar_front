import axios from "axios";

const base_url = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_URL
  : import.meta.env.VITE_DEV_URL;

const instance = axios.create({
  baseURL: base_url,
  withCredentials: true,
  withXSRFToken: true,
});

const login = async function (loginCredentials) {
  try {
    await instance.post(`users/login`, loginCredentials);
  } catch (err) {
    return {
      error:
        err?.response?.data?.message ||
        "unexpected error occurred , try again in a few seconds",
    };
  }
};

const logout = async function () {
  await instance.get(`users/logout`);
  return;
};

const getUser = async function () {
  try {
    const res = await instance.get("users/me");
    return res.data.data.user;
  } catch (err) {
    if (err.response.status === 401) return {};
  }
};
const addUser = async function (data) {
  try {
    const res = await instance.post("users/", data);
    return res.data.data.user;
  } catch (err) {
    if (err.response?.data?.message?.includes("email_1 dup key")) {
      return {
        error: "email already registered",
        field: "email",
      };
    }
    return {
      error: "unexpected error occurred",
    };
  }
};

const getPanelViewers = async function (panelId) {
  try {
    const res = await instance.get(`/users/panel-viewers/${panelId}`);
    return res.data.data.users;
  } catch (err) {
    if (err.response.status === 401) return {};
  }
};

const updateSettings = async function (settings) {
  try {
    const res = await instance.patch(`users/update-settings`, settings);
    return res.data;
  } catch (err) {
    return err?.response?.data?.message || "unexpected error occurred";
  }
};

const updateUser = async function (data) {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((field) => {
      if (field === "photo") formData.append("photo", data.photo[0]);
      else formData.append(field, data[field]);
    });

    const res = await instance.patch(`users/updateMe`, formData);
    return res.data;
  } catch (err) {
    return {
      error: err?.response?.data?.message || "unexpected error occurred",
    };
  }
};

export {
  login,
  getUser,
  logout,
  addUser,
  getPanelViewers,
  updateSettings,
  updateUser,
};
