import axios from "axios";

type dataProps = {
    [key:string] : any
}

//const url = 'http://172.22.8.39:8081/form';
const url = 'https://sub.cybersolutions.co.jp:8081/form'
const headers = {
    //"Content-type": "application/json",
    "Content-type": "multipart/form-data"
}


export function getBase64(file:File) {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const encorded_file = reader.result
            resolve(encorded_file)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    });
}



export default async function SendAPI(data:dataProps) {
    const formData = new FormData();
    for (const key in data) {
        if (key == 'SAML認証_メタデータ') {
            formData.append(key, data[key][0]);
        } else {
            formData.append(key, data[key]);
        }
    }
    try {
        const res = await axios.post(url, formData, { headers: headers });
        const result = Number(res.data);
        return result
    } catch (error) {
        const result = Number(400)
        return result
    }
}

