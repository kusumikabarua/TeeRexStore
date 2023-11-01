
import axios from "axios";
export const BACKEND_ENDPOINT=" https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart";

export const fetchCatalogue = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENDPOINT}/catalogue.json`);
        return res.data;
    }catch(err){
        console.error(err);
    }
}