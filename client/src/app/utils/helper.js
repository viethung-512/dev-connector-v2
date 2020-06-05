import axios from 'axios';
import moment from 'moment';

export const setAuthToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const formatDate = string => moment(string).format('YYYY-MM-DD');

export const formatRowData = dataSource =>
  dataSource.map((data, index) => ({
    ...data,
    key: index,
    year: `${formatDate(data.from)} - ${data.to ? formatDate(data.to) : 'Now'}`,
  }));

export const setDefaultAxios = () => {
  const token = localStorage.getItem('token');
  // const PORT = process.env.PORT || 5000;

  // axios.defaults.baseURL = `http://localhost:${PORT}/api`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
