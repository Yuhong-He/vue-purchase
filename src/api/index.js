import base from './base';
import axios from 'axios';

const api = {
  getHomeCount() {
    return axios.get(base.homeCount);
  }
}

export default api;
