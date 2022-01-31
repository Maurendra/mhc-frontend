import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

const Provider = {
  _axios: null,
  getBaseUrl: function () {
    return API_BASE_URL;
  },
  getHeaders: function () {
    return this._axios.defaults.headers;
  },
  setHeaders: function () {
    this._axios.defaults.headers["Accept"] = "application/json";
  },
  init: function () {
    this._axios = axios.create({
      baseURL: this.getBaseUrl(),
    });
    this.setHeaders();
  },
  get: function (path, queryParams) {
    return this._axios.get(path, {
      params: queryParams,
    });
  },
  post: function (path, body, queryParams) {
    return this._axios.post(path, body, {
      params: queryParams,
    });
  },
  put: function (path, body) {
    return this._axios.put(path, body);
  },
  delete: function (path) {
    return this._axios.delete(path);
  },
};

export default Provider;
