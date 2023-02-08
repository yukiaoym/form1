interface IFormValuesDict {
    values: {
        [value: string]:string|number|any[];
    }
}

export default function Confirm(values:IFormValuesDict) {
    const inputed_values = values.values
    var names = []
    for (const key in inputed_values) {
        names.push(key)
    }
   
    return(
        <tbody>
            {names.map((item, index) => 
                { if(item !== 'SAML IdPメタデータ') {
                    return (
                        <tr key={index}>
                            <td>{item}</td>
                            <td>{inputed_values[item]}</td>
                        </tr>
                        )
                } else {
                    return (
                        <tr key={index}>
                            <td>{item}</td>
                            <td>{inputed_values[item][0].name}</td>
                        </tr>                        
                    )
                }}
            )}
        </tbody>
    )
}