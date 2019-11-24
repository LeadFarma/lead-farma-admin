const STAGES = {
  dev: {
    BASE_URL: "http://eb4e769c.ngrok.io/"
  },
  stg: {
    BASE_URL: "http://eb4e769c.ngrok.io/"
  },
  prd: {
    BASE_URL: "http://eb4e769c.ngrok.io/"
  }
};

const env = process.env.REACT_APP_STAGE || 'dev';
const config = STAGES[env];

export default config;
