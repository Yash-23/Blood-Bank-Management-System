import axios from 'axios';
import * as Constants from '../utils/constants';

const BackendApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    timeout: 5000,
    timeoutErrorMessage: Constants.BACKEND_API_TIMEOUT_ERROR,
});

export default BackendApi;
