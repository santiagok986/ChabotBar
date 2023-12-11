import { useRef, useState } from "react"
import {useDispatch} from 'react-redux'
import { addItem } from "../../store/cartSlice"
const ProductItem = (props) => {
    const dispatch = useDispatch()
    const {img, name, description, price, id} = props.data
    const [amountIsValid, setAmountIsValid] = useState(true)
    const numberInput = useRef(null)
    // const testInput = (event) => {
    //     console.log(event.target.value)
    // }

    const addNewItem = (event) => {
        event.preventDefault()
        const enteredAmount = numberInput.current.value
        const amount = +enteredAmount
        if(amount === 0 || amount < 1 || amount > 6){
            setAmountIsValid(false)
            return
        }
        setAmountIsValid(true)
        const item = {name, price, amount, id, img}
        dispatch(addItem(item))

    }

    return <li className="flex justify-between border-b border-secondary my-2">
        <div className="flex">
            {/* <div className={`w-14 h-14 rounded-full shadow-lg ${img}`}></div> */}
            <img src={`/${img}`} alt={`logo of the beer ${name}`} className="w-14 h-14 rounded-full shadow-lg "/>
            <div className="ml-2">
                <h3 className="text-xl font-bold">{name} </h3>
                <div className="font-light">{description}</div>
                <p className="font-semibold text-lg text-primary">$ {price}</p>
            </div>
        </div>

       <div>
            <form className="text-right" onSubmit={addNewItem} noValidate>
                <div className="mb-2">
                    <label htmlFor="amount"
                    className="block uppercase text-gray-500 text-xs font-bold mb-2 tracking-wide"
                    >Amount</label>
                    <input 
                    type="number" 
                    id="amount"
                    className="w-12 border border-gray-500 pl-1"
                    max={6}
                    min={1}
                    defaultValue={1}
                    ref={numberInput}
                    />
                </div>
                <button className="bg-primary px-2 py-1 text-gray-100 hover:bg-secondary">add</button>
                {!amountIsValid && <p className="text-red-800 text-sm mt-2">Please enter a value (1-6)</p>}
            </form>
       </div>
    </li>
}
export default ProductItem