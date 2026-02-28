import axios from "axios";
import { PATHS } from "../constants/paths";

const get = async () => {
    const response = await axios.get(PATHS.GET_RESTAURANT);

    return response.data;
};

export default {
    get,
};
