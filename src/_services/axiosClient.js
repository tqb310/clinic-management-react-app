import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,    
    timeOut: 3000,
    headers: {
        'content-type': 'application/json',
    }
});

axiosClient.interceptors.request.use((config) => {
    
    return config;
});


axiosClient.interceptors.response.use((res) => {
    if(res && res.data){
        return res.data;
        
    }

    return res;
}, (err) => {
    //Handling errors ...
    // authentication.logout();
    // window.location.reload();    
    throw err;
})

export default axiosClient;