import axios from "axios"
import config from "./Config"
import {Order} from "./components/Entities";

const apiHost = config.BackEndAPIHost
const apiPort = config.BackEndAPIPort
const apiVersion = config.BackEndAPIVersion

export const ApiDestination = `http://${apiHost}:${apiPort}/api/v${apiVersion}`

const requester = axios.create({
	baseURL: ApiDestination
})


export async function getOrders(): Promise<Array<Order>>{
	return (await requester.get("/orders/incomplete")).data
}

export default requester
