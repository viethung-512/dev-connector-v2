import axios from 'axios';
import moment from 'moment';

export const setAuthToken = () => {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const formatDate = string => moment(string).format('YYYY-MM-DD');

export const formatRowData = dataSource =>
  dataSource.map((data, index) => ({
    ...data,
    key: index,
    year: `${formatDate(data.from)} - ${data.to ? formatDate(data.to) : 'Now'}`,
  }));
