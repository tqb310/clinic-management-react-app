import {services as servicesUrl} from '_constants/apiUrl'
import axiosClient from "./axiosClient";
import authentication from '_services/authentication.service'

const employee = {
    async getAllServices(){
        try {
            let data = await axiosClient.get(
                servicesUrl.getAllServices,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return data
        } catch (error) {
            return null
        }
    },
    async getAllServicesUser(){
        try {
            let data = await axiosClient.get(
                servicesUrl.getAllServicesUser,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return data
        } catch (error) {
            return null
        }
    },
    async updateFee(id, fee){
        try {
            let data = await axiosClient.put(
                servicesUrl.updateFee,
                {id, fee},
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return data;
        } catch (error) {
            return null
        }
    },
    async postService(name, fee){
        try {
            let data = await axiosClient.post(
                servicesUrl.postService,
                {name, fee},
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return data;
        } catch (error) {
            return null
        }
    }
}

export default employee