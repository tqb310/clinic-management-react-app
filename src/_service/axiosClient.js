import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 3000,
    headers: {
        'content-type': 'application/json',
    }
});

axiosClient.interceptors.request.use((config) => {
    // Handling token here ...
    return config;
});


axiosClient.interceptors.response.use((res) => {
    if(res && res.data){
        return res.data;
    }

    return res;
}, (err) => {
    //Handling errors ...
    throw err;
})

export default axiosClient;