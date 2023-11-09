import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "../tools/axiosInstance"
import OrderList from "../components/UI/OrderList"
const Orders = () => {

    const [orders, setOrders] = useState([])
    const jwt = useSelector(state => state.auth.jwt)
    const user = useSelector(state => state.auth.user)

    const qs = require('qs')

    const query = qs.stringify({
        populate:{
            users_permissions_user:{
                populate:"*"
            }
        },
        filters:{
            users_permissions_user:{
                id:{$eq:user.id}
            }
        },
        sort:['id:desc']
    })

    useEffect(()=>{
        axios.get(`/api/orders?${query}`, {
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        }).then(response => {
            console.log(response)
            setOrders(response.data.data)
        })
    }, [jwt, query])

    return <div>
        <h1 className="text-2xl text-gray-700 uppercase text-center mb-3">Order history</h1>
        <ul>
            {orders.map(order => (
                <OrderList key={order.id} order={order}></OrderList>
            ))}
            
        </ul>
    </div>
}

export default Orders