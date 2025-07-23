import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost/PMS-Backd/api/auth/',
  headers: { 'Content-Type': 'application/json' }
});
