import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type recordProps = {
    [key:string]:{
        "value": string
    }
}
type dataProps = {
    [key:string] : string
}

const url = 'http://172.22.8.39:8081/form';
const headers = {
    "Content-type": "application/json",
}

export default async function SendAPI(data:dataProps) {
    const record:recordProps = {}
    for (const key in data) {
        record[key] = {"value": data[key]}
    }
    const response_data = {
        "app": 73,
        "record": record
    }

    try {
        const res = await axios.post(url, response_data, { headers: headers });
        const result = Number(res.data);
        return result
    } catch (error) {
        const result = Number(400)
        return result
    }
}

