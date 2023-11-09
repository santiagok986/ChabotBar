import { useDispatch } from "react-redux"
import { addItem, removeItem } from "../../store/cartSlice"
const CartItem = (props) => {
    const { name, price, quant, id, img } = props
    const totalItem = price * quant
    const dispatch = useDispatch()
    const add = () => {
        dispatch(addItem({...props, amount:1}))
    }
    const remove = () => {
        dispatch(removeItem(id))
    }
    return (
        <li className="my-2 pb-2 border-b border-secondary flex justify-between">
            <div className="flex">
                <img className={`w-16 h-16 rounded-full shadow-lg mr-2`} src={img.url} alt={name}/>
                <div>
                    <h3 className="text-xl font-bold">{name} </h3>
                    <div className="text-stone-600 text-sm">Unit : ${price}</div>
                    <button className="font-semibold text-sm text-stone-900 hover:text-primary" onClick={remove}>Remove</button>
                    <button className="font-semibold text-sm text-stone-900 hover:text-primary ml-1" onClick={add}>Add</button>
                </div>
            </div>
            <div className="text-right grid content-end">
                <span className="uppercase tracking-wide text-gray-700 text-xs font-bold"> Amount x({quant})</span>
                <span className="font-semibold text-lg text-primary">${totalItem}</span>
            </div>
        </li>
    )
}

export default CartItem