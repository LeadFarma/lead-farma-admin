import { CREATE, GET_LIST, GET_ONE, GET_MANY, UPDATE, DELETE } from "ra-core";
import config from "../config/constants";
import Axios from "axios";

export default () => {
  Axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
  const convertDataRequestToHTTP = (type, resource, params) => {
    let options = { response: true, queryStringParameters: {} };
    let method;

    switch (type) {
      case GET_LIST: {
        const queryStringParameters = {
          pagination_page: params.pagination.page,
          pagination_perPage: params.pagination.perPage,
          sort_field: params.sort.field,
          sort_order: params.sort.order,
          filter_field: Object.keys(params.filter)[0],
          filter_value: Object.values(params.filter)[0]
        };

        Object.keys(queryStringParameters).forEach(key => {
          if (queryStringParameters[key] && queryStringParameters[key] !== "id")
            options.queryStringParameters[key] = queryStringParameters[key];
        });

        method = "GET";
        break;
      }
      case GET_ONE: {
        method = "GET";
        break;
      }
      case GET_MANY: {
        method = "GET";
        break;
      }
      case UPDATE: {
        options = {
          ...params.data,
          entity_id: params.data.id
        };
        delete options.id;
        method = "PUT";
        break;
      }
      case CREATE: {
        options = params.data;
        method = "POST";
        break;
      }
      case DELETE: {
        options.body = params.data;
        method = "DELETE";
        break;
      }
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { method, options };
  };

  const convertHTTPResponse = (response, type, resource, params) => {
    const data = response.data.data;

    switch (type) {
      case GET_LIST:
        // if (!response.headers.hasOwnProperty("content-range")) {
        //   throw new Error(
        //     "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
        //   );
        // }
        return {
          data: data.map(value => ({ id: value._id, ...value })),
          total: data.length
          // total: parseInt(
          //   response.headers["content-range"].split("/").pop(),
          //   10
          // )
        };
      case GET_ONE:
        console.log(response);
        return {
          data: { id: data._id, ...data }
        };
      case UPDATE:
        return { data: { ...data, id: data._id } };
      case CREATE:
        return { data: { ...data, id: data._id } };
      case DELETE:
        return { data: { previousData: params.data, id: params.id } };
      default:
        return { data: data.data };
    }
  };

  return (type, resource, params) => {
    const { method, options } = convertDataRequestToHTTP(
      type,
      resource,
      params
    );
    const id = params.id ? "/" + params.id : "";
    options.response = true;

    switch (method) {
      case "GET":
        return Axios.get(
          config.BASE_URL + resource + id,
          options
        ).then(response =>
          convertHTTPResponse(response, type, resource, params)
        );
      case "PUT":
        return Axios.put(config.BASE_URL + resource + id, options)
          .then(response =>
            convertHTTPResponse(response, type, resource, params)
          )
          .catch(error => console.log("ERROR PUT :: ", error));
      case "POST":
        return Axios.post(config.BASE_URL + resource, options).then(response =>
          convertHTTPResponse(response, type, resource, params)
        );
      case "DELETE":
        return Axios.delete(
          config.BASE_URL + resource + id,
          options
        ).then(response =>
          convertHTTPResponse(response, type, resource, params)
        );
      default:
        throw new Error("Método não encontrado");
    }
  };
};
