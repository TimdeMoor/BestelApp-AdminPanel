import axios from "axios";

//TODO: Change api settings to config file
const apiHost = "localhost";
const apiPort = 8080;
const apiVersion = 1;

export const ApiDestination = `http://${apiHost}:${apiPort}/api/v${apiVersion}`

const requester = axios.create({
    baseURL: ApiDestination
})

export default requester
