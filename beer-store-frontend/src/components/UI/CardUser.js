import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authLogout } from "../../store/authSlice"
import { Link } from "react-router-dom"
const CardUser = () => {
    const divRef = useRef()
    const btnRef = useRef()
    const dispatch = useDispatch()
    const userinfo = useSelector(state => state.auth.user)
    const [menuActive, setMenuActive] = useState(false)

    const activeClass = menuActive ? 'absolute':'hidden'
    const btnClass = menuActive ? 'border-transparent text-white bg-primary':'text-black border-black'


    useEffect(()=>{
        
        const outsiderClick = (event) => {
            if(menuActive && divRef.current && !divRef.current.contains(event.target) && !btnRef.current.contains(event.target)){
                setMenuActive(false)
            }
        }

        if(menuActive){
            document.addEventListener("mousedown", outsiderClick)
        }

        return () => {
            document.removeEventListener("mousedown", outsiderClick)
        }

    },[menuActive])

    const toggleMenu = () => {
        setMenuActive(!menuActive)
    }

    const logout = () => {
        dispatch(authLogout())
    }
    return <div>
        <button ref={btnRef} onClick={toggleMenu} className={`border ${btnClass} px-4 py-1 mr-2 hover:border-transparent hover:text-white hover:bg-primary`}>
            {userinfo && userinfo.username}
        </button>
        <div ref={divRef} className={`${activeClass} bg-white mt-2 px-5 py-2 shadow-lg`}>
            <h3> {userinfo && userinfo.username}</h3>
            <p className="text-sm text-gray-500 mb-2"> {userinfo && userinfo.email}</p>
            <Link to="/orders" onClick={toggleMenu}>Order History</Link>
            <hr className="my-2" />
            <button onClick={logout}>Log out</button>
        </div>
    </div>
}

export default CardUser