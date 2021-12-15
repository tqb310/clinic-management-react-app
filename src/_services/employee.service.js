import {employee as employeeUrl} from '_constants/apiUrl'
import axiosClient from "./axiosClient";
import { appointment as appoimentUrl } from "_constants/apiUrl";
import authentication from '_services/authentication.service'

const employee = {
    async getAllEmployee(){
        try {
            let data = await axiosClient.get(
                employeeUrl.getAllEmployee,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return data
        } catch (error) {
            return null
        }
    },
    async createEmployee(data){
        try {
            let result =  await axiosClient.post(
                employeeUrl.createEmployee,
                data,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default employee