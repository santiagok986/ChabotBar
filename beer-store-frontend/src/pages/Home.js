import { useState, useEffect } from "react"
import axios from "axios"
import axiosURL from "../tools/axiosInstance"
import BrandCard from "../components/UI/BranCard"
import Spinner from "../components/svg/Spinner"
import HasError from "../components/svg/HasError"
const Home = () => {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    useEffect(()=>{
       // let isCancelled = false
       const controller = new AbortController()
        setLoading(true)
        axiosURL.get('/api/brands?populate=*', 
        {
            signal:controller.signal
        })
        .then((response)=>{
            //if(!isCancelled){
              //  console.log(response)
                setBrands(response.data.data)
                setLoading(false)
           // }
        }).catch((error)=> {
           // console.log(error)
            if(axios.isCancel(error)){
                ///console.log('request cancelled')
                return
            }
            setHasError(true)
            setLoading(false)
        })
       
        return () => {
           // isCancelled = true
           controller.abort()
        }

    },[])

    if(loading){
        return <div className="w-24 mx-auto"><Spinner></Spinner></div>
    }

    if(hasError){
        return <div>
            <h1 className="text-2xl text-gray-700 uppercase text-center mb-3">404!</h1>
            <h2 className="text-stone-600 text-center mb-2">Please try again later</h2>
            <HasError></HasError>
        </div>
    }

    return (
        <div className="flex justify-around flex-wrap">
            
            {brands.map((brand)=>(
                <BrandCard key={brand.id} data={brand}></BrandCard>
            ))}
            {brands.length <= 0 && <p>No beer data disponible</p>}
        </div>
    )
}

export default Home