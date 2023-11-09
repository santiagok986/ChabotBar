import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import CartItem from "../components/cart/CartItem"
import CartIcon from "../components/svg/CartIcon"
import Button from "../components/UI/Button"
import Modal from "../components/cart/Modal"

import FormCart from "../components/cart/FormCart"
const Checkout = () => {
    
    const items = useSelector(state => state.cart.items)
    const total = useSelector(state => state.cart.total)
    const isLoggedIn = useSelector(state => state.auth.loggedin)
    const [showModal, setShowModal] = useState(false)
    

    const toggleModal = () => {
        setShowModal(!showModal)
    }


    const cantItems = items.length
    const hasItems = cantItems > 0 ? true : false
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl text-gray-700 uppercase text-center mb-3">Checkout</h1>
            {!hasItems && <div className="text-center mt-10">
                <h2 className="text-stone-600 mb-2">Your cart is empty</h2>
                <div className="w-40 mx-auto mb-3 text-stone-600"><CartIcon></CartIcon></div>
                <Link className="bg-primary px-8 py-2 text-gray-100 hover:bg-secondary" to="/">Visit store</Link>
            </div>}
            {hasItems && <div className="bg-white p-4">
                <p className="text-right">Price</p>
                <ul>
                    {items.map((item) => (
                        <CartItem key={item.id} id={item.id} name={item.name} price={item.price} quant={item.quant} img={item.img}></CartItem>
                    ))}
                </ul>
                <div className="text-right">
                    <p className="m-0 text-stone-600 text-xs">Cant items : {cantItems} </p>
                    <p className="mt-0 mb-2 font-semibold text-lg">Total : <span className="text-primary">${total}</span></p>
                    {isLoggedIn && <Button label="Procced to payment" onClick={toggleModal}></Button>}
                    {!isLoggedIn && <Button label="Login" to="/login"></Button>}
                </div>

            </div>}

            {showModal && <Modal>
                <h1 className="text-xl text-center mb-5">Data payment</h1>
                <FormCart items={items} total={total} toggleModal={toggleModal}></FormCart>
                
            </Modal>}
        </div>
    )
}

export default Checkout