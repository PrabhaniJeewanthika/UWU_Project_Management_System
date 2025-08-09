import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost/new_backend/uwu_pms_backend',
  headers: { 'Content-Type': 'application/json' }
});
