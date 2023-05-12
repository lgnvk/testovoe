import axios from 'axios';
import getMock from './mocks/getPayments';

const isMock = JSON.parse(process.env.VUE_APP_FETCHING_MODE);
/**
 * @var {Axios}
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */
const getPayments = isMock ? getMock : (params = {}) => instance.request({
  method: 'get',
  url: '/api/v1/payments',
  params,
});

export default {
  instance,
  getPayments,
};
