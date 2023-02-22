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
    var formData = new FormData();
    formData.append("file", data.SAML認証_メタデータ[0]);
    console.log(data.SAML認証_メタデータ[0])
    console.log(formData)

    try {
        const res = await axios.post(url, formData, { headers: headers });
        const result = Number(res.data);
        return result
    } catch (error) {
        const result = Number(400)
        return result
    }
}

