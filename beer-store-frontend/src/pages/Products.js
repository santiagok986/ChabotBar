import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import axiosURL from "../tools/axiosInstance"
import ProductItem from "../components/UI/ProductItem"
import Section from "../components/UI/Section"
import HasError from '../components/svg/HasError'
import Spinner from '../components/svg/Spinner'
const Products = () => {
    const params = useParams()
    const [brand, setBrand] = useState(null)
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const id = params.id

    const qs  = require('qs')
    const query = qs.stringify({
        populate:{
            img:{
                populate:'*'
            },
            beers:{
                populate:'*'
            }
        }
    },{
        encodeValuesOnly: true, 
    })
   // console.log(query)
    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        axiosURL.get(`/api/brands/${id}?${query}`, {
            signal:controller.signal
        })
            .then((response) => {
               // console.log(response)
                setBrand(response.data.data)
                setLoading(false)
            }).catch((error)=>{
             //   console.log(error)
                if(axios.isCancel(error)){
                   // console.log('request cancelled')
                    return
                }
                setHasError(true)
                setLoading(false)
            })

            return () => {
                // isCancelled = true
                controller.abort()
             }

    }, [id, query])

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
    if (!brand) {
        return <>
            <div className="text-center">
                <p>No products found</p>
                <Link to="/" className="btn-primary">Back to home</Link>
            </div>
        </>
    }
    const productsList = brand.beers
    return <>
        <div className="text-center mb-3">
            {/* <div className={`w-24 h-24 rounded-full ${brand.img} mx-auto shadow-lg`}></div> */}
            <img src={brand.img.url} alt={`logo of ${brand.name}`} className={`w-24 h-24 rounded-full mx-auto shadow-lg`} />
            <h1 className="text-2xl text-gray-700 uppercase">{brand.name}</h1>
            <p className='text-sm font-semibold my-2 text-stone-600'>{brand.description}</p>
        </div>
        <Section>
            <ul>
                {productsList.map((product) => (
                    <ProductItem key={product.id} data={product}></ProductItem>
                ))}
            </ul>
            {productsList.length <= 0 && <div className='text-center'>No beers were found!</div>}
        </Section>
        <div className="text-center mt-3">
            <Link to="/" className="bg-primary px-2 py-1 text-gray-100 hover:bg-secondary">Back</Link>
        </div>

    </>
}

export default Products