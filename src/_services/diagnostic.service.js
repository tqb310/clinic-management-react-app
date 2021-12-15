import axiosClient from "./axiosClient";
import { diagnostic as diagnosticUrl } from "_constants/apiUrl";
import authentication from '_services/authentication.service'

const diagnostic = {
    async getRoom() {
        try {
            let room = await axiosClient.get(
                diagnosticUrl.getRoom,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return room
        } catch (error) {
            console.log(error)
        }
    },
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
    async getDiagnosticStack() {
        const mergeStack = (stack) => {
            return [...stack.room1.map(data => {
                const kq = {
                    room: 1,
                    data
                }
                return kq
            }), ...stack.room2.map(data => {
                const kq = {
                    room: 2,
                    data
                }
                return kq
            })]
        }

        try {
            let stacks = await axiosClient.get(
                diagnosticUrl.getDiagnostic,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return mergeStack(stacks)
        } catch (error) {
            console.log(error)
        }
    },

    async getAllDiagnostic() {
        try {
            let diagnostics = await axiosClient.get(
                diagnosticUrl.getAllDiagnostic,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
            return diagnostics
        }catch(error){

        }
    },

    async getDiagnosticStackByRoom(room) {
        try {
            let stack = await axiosClient.get(
                diagnosticUrl.getDiagnosticStackByRoom + `/${room}`,
                {
                    headers: { access_token: authentication.getCurrentUser().token }
                }
            )
            console.log(stack)
        } catch (error) {
            console.log(error)
        }
    },
    async updateDiagnostic(data) {
        try {
            await axiosClient.put(
                diagnosticUrl.updateDiagnostic,
                data,
                { headers: { access_token: authentication.getCurrentUser().token } }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

export default diagnostic;

export const mergeStack = (stack) => {
    return [...stack.room1.map(data => {
        const kq = {
            room: 1,
            data
        }
        return kq
    }), ...stack.room2.map(data => {
        const kq = {
            room: 2,
            data
        }
        return kq
    })]
}