import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CartIcon from '../svg/CartIcon'
const CartButton = () => {
    const items = useSelector(state => state.cart.items)
    const cant = items.length
    const hasItems = cant > 0 ? true:false

    const btn = "flex justify-around inline-block border border-black px-4 py-1 hover:border-transparent hover:bg-primary hover:text-white"

    const btnActive = "flex justify-around inline-block border border-primary text-primary px-4 py-1"

    return (
        <NavLink to="/checkout" className={({isActive})=>(isActive?btnActive:btn)}>
            <span className='w-6 h-6'><CartIcon item={hasItems}/> </span>
            <span>{cant}</span>
        </NavLink>
    )
}

export default CartButton