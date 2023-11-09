import { Link } from "react-router-dom"
const Button = (props) => {
    const {type="button", to=false, onClick, label = "Btn", disabled=false, full=false, extraClass, outlined=false} = props

    const classBtn = `${outlined?'hover:text-white':'bg-primary text-white'} px-5 py-2 border border-primary hover:bg-secondary ${full?'w-full':''} ${disabled?'opacity-25':'opacity-100'} ${extraClass}`

    if(to){
        return <Link to={to} className={classBtn}>{label}</Link>
    }
    return (
        <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classBtn}>
            {label}
        </button>
    )
}

export default Button