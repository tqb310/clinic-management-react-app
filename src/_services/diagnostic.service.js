import axiosClient from "./axiosClient";
import { diagnostic as diagnosticUrl } from "_constants/apiUrl";
import authentication from '_services/authentication.service'

const diagnostic = {
    async createDiagnostic(value) {
        try {
            let order = await axiosClient.post(
                diagnosticUrl.createDiagostic,
                value,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return order
        } catch (error) {
            console.log(error.response.status)
            return null
        }
    },
    async getDiagnosticStack(){
        try {
            let stacks = await axiosClient.get(
                diagnosticUrl.getDiagnostic,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            console.log(stacks)
        } catch (error) {
            console.log(error)
        }
    }
}

export default diagnostic;