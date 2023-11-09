import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "../../tools/axiosInstance"
//import { useForm } from "react-hook-form"
import Button from "../UI/Button"
import { clearStore } from "../../store/cartSlice"
//import Input from "../UI/Input"
import Notification from "../cart/Notification"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const FormCart = (props) => {
    const {items, total, toggleModal} = props
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const jwt = useSelector(state => state.auth.jwt)
    const [notification, setNotification] = useState({ show: false, type: 'success', message: 'Thank you for your order' })
    // const { register, handleSubmit, formState: { errors } } = useForm()

    // const minValidation = {
    //     required: "This field is required",
    //     minLength: {
    //         value: 3,
    //         message: "Min 3 letters"
    //     }
    // }

    const initialOptions = { 
        "client-id":"AVjSdfBgz7kgZEQOmLG0WkB4EH1SLd5GfMhO5EgT56xrAkxldGKw1p_GK_Z1cy10wudTXOKkwsFC0sHw",
        currency:"USD"
    }

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units:[{
                amount:{value:total}
            }]
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(details => {
            console.log(details)
            const _items = items.map(item => ({id:item.id, name:item.name, quant:item.quant, price:item.price}))
        const dataOrder = {
            address: details.purchase_units[0].shipping.address.address_line_1,
            city: details.purchase_units[0].shipping.address.admin_area_2,
            items:_items,
            amount: total,
            users_permissions_user: user.id
        }
        axios.post('api/orders', { data: dataOrder }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
            .then(response => {
                console.log(response)
                setNotification((prevState) => {
                    return {
                        ...prevState,
                        show: true
                    }
                })
                dispatch(clearStore())
            }).catch(error => {
                console.log(error)
                setNotification((prevState) => {
                    return {
                        ...prevState,
                        show: true,
                        type: 'error',
                        message: 'Sorry something went wrong, try again later'
                    }
                })
            })
        })
    }

    

    return <>
        {!notification.show && <div className="overflow-auto max-h-96">
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons createOrder={createOrder} onApprove={onApprove}></PayPalButtons>
                    </PayPalScriptProvider>
                    <div className="px-2"><Button label="Cancel" full onClick={toggleModal} outlined extraClass="mr-2"></Button></div>
                </div>}
                {notification.show && <div className="text-center">
                    <Notification notification={notification}></Notification>
                    <Button label="Close" onClick={toggleModal} extraClass="mt-2"></Button>
                    </div>}
    </>
}

export default FormCart

/*
<form className="w-8/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Address"
                        placeholder="123 fake street"
                        {...register("address", minValidation)}
                        errors={errors.address ? errors.address.message : null}
                    ></Input>
                    <Input
                        label="City"
                        placeholder="Springfield"
                        {...register("city", minValidation)}
                        errors={errors.city ? errors.city.message : null}
                    ></Input>
                    <div className="text-right">
                        
                        <Button label="Checkout" type="submit"></Button>
                    </div>
                </form>
*/