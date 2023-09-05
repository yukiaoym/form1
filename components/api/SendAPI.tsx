import axios from "axios";

type dataProps = {
    [key:string] : any
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
        // const res = await axios.post(url, formData, { headers: headers });
        // const result = Number(res.data);
        const result = Number(200);
        return result
    } catch (error) {
        const result = Number(400)
        return result
    }
}

