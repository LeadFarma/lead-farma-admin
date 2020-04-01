import Axios from "axios";
import config from "../config/constants";

const getCategories = () => {
  return Axios.get(config.BASE_URL + "categories").then(res => res.data);
};

export default {
  getCategories
};

//  ProductService;
