import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  params: {
    key: 'AIzaSyCAFeDM96Ex3l5tjwPAJD4jr3PjkHJvTkA'
  }
});

export default instance;