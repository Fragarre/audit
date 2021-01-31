import axios from "axios";

export const downloadExcel = (uri, data) => {
    return axios.post(uri + '/downloadExcel', data);
};
export const getFile = (uri) => {
    return axios.get(uri  + '/getfile');
}

 