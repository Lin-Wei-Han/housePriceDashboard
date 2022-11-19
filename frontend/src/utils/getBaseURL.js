const baseUrl = process.env.PROJECT_ENV === "production"
    ? 'https://taiwanhouseprice.herokuapp.com'
    : 'http://localhost:5000';

export default baseUrl;
