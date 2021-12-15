import axiosClient from "./axiosClient";
import { auth } from "_constants/apiUrl";
import authentication from '_services/authentication.service'

const user = {
    async changePassword(data) {
        try {
            const result = await axiosClient.put(
                auth.changPass,
                data,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return result
        } catch (error) {
            switch(error.response.status){
                case 409:return undefined;break;
                case 500:return null;break;
            }
        }
    }
}

export default user