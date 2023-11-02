
import axios from "axios";
import {BACKEND_ENDPOINT} from '../constants/constants'

export const fetchCatalogue = async() => {
    try{
        const res = await axios.get(`${BACKEND_ENDPOINT}/catalogue.json`);
        return res.data;
    }catch(err){
        console.error(err);
    }
}