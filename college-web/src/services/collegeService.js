import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/search";

export function searchCollege(body){
    return http.post(apiEndpoint,body)
}

