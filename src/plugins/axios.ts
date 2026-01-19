import axios from 'axios';
import { Cookies, Notify } from 'quasar';

const auth = Cookies.get('auth');
const Authorization = auth ? `Bearer ${auth}` : null;

const instance = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:8000/api' : '/api',
});
instance.interceptors.response.use(
  (res) => {
    //console.log(res.config.method, ':', res.config.url, res.data);
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      return;
    }
    console.log(error.response.data);
    Notify.create({ message: JSON.stringify(error.response.data), color: 'red' });
    return { data: { error: error.response.data } };
  },
);

const authHeaders = () => ({
  Authorization: Cookies.get('auth') ? `Bearer ${Cookies.get('auth')}` : null,
});

export default {
  post(url: string, data: object) {
    return instance.post(url, data, { headers: authHeaders() });
  },
  patch(url: string, data: object) {
    return instance.patch(url, data, { headers: authHeaders() });
  },
  get(url: string) {
    return instance.get(url, { headers: authHeaders() });
  },
};
