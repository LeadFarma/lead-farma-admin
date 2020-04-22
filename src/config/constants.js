const STAGES = {
  dev: {
    BASE_URL: "https://lead-api-express.herokuapp.com/api/v1/"
  },
  stg: {
    BASE_URL: "https://lead-api-express.herokuapp.com/api/v1/"
    // BASE_URL: "http://leadfarma.com.br/api/v1/"
  },
  prd: {
    BASE_URL: "https://lead-api-express.herokuapp.com/api/v1/"
  }
};

const env = process.env.REACT_APP_STAGE || "dev";
const config = STAGES[env];

export default config;
