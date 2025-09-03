import { useEffect, useState } from 'react'


function useCurrenecyInfo(currenecy){
    const [data, setdata] = useState({})

    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currenecy}.json`)
        .then((res)=> res.json())
        .then((res)=> setdata(res[currenecy]))
        console.log(data)
    },[currenecy])

    return data;
}

export default useCurrenecyInfo;