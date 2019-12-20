import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "https://maps.googleapis.com/maps/api/geocode/json?address=52557&key=AIzaSyB8_5epjDcAbPIwZVp-3N-0y1zze4R27YM&fbclid=IwAR3m8wCa_X6OH-d2BIUqKcDdnB1486ONsshQK-IwQt5X3fBGn8HwPsbPhe0";

export function fetchLocation(zipCode){
    return http.get(apiEndpoint)
}

