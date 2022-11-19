const baseUrl = process.env.REACT_APP_ENV === "production"
    ? 'https://taiwanhouseprice.herokuapp.com'
    : 'http://localhost:5000';

export default baseUrl;
