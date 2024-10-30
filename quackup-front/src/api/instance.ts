import axios from 'axios';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

let token = process.env.REACT_APP_TEST_USER_TOKEN;

if (!process.env.REACT_APP_TEST_USER_TOKEN) {
  const { initDataRaw } = retrieveLaunchParams();
  token = initDataRaw;
}

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `tma ${token}`,
  },
});
