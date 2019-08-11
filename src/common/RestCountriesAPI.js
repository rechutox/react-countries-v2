import axios from "axios";

const BASE_URL = "https://restcountries.eu/rest/v2/";

const io = axios.create({
  baseURL: BASE_URL,
});

export default {
  async getAll(fields = []) {
    const url = "all?fields=" + fields.join(";");
    try {
      const response = await io.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getByCode(code = "", fields = []) {
    const url = `alpha/${code}?fields=${fields.join(";")}`;
    try {
      const response = await io.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
