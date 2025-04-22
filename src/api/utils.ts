
import { ENDPOINTS } from "./endpoints"
import { Product } from "./types"
import axios from "axios"


export const fetchProducts = async () =>{
    try {
        const response = await fetch(`${ENDPOINTS.BASE_ENDPOINT}/${ENDPOINTS.PRODUCTS}`)
        const responseData = await response.json()
        return responseData as Product[]
    } catch (error) {
        return null
    }
}

export const axiosConnectionInstance = axios.create({
    baseURL:`${ENDPOINTS.BASE_ENDPOINT}`,
    timeout: 5000,
    headers:{
        Authorization: localStorage.getItem('access_token') ?
        'JWT '+ localStorage.getItem("access_token"):
        null,
        "Content-Type":'application/json',
        Accept:"application/json"
    }
})



