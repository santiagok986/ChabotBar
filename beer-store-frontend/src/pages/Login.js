import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import Input from "../components/UI/Input"
import Spinner from '../components/svg/Spinner'
import Button from "../components/UI/Button"
const Login = () => {
    const loading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorMessageUsername, setErrorMessageUsername] = useState(null)

    const [errorPassword, setErrorPassword] = useState(false)
    const [errorMessagePassword, setErrorMessagePassword] = useState(null)

    const [errorLogin, setErrorLogin] = useState(false)

    const classUsername = errorUsername?'border-error':''
    const classPassword = errorPassword?'border-error':''
    const usernameInput = useRef()
    const passwordInput = useRef()
    const userLogin = (event) => {
      setErrorLogin(false)
      event.preventDefault()
      const username = usernameInput.current.value
      const password = passwordInput.current.value

      const usernameIsValid = username.trim() !== ""
      const passwordIsValid = password.trim() !== ""

      const formIsValid = usernameIsValid && passwordIsValid

      if(!formIsValid){
        if(!usernameIsValid){
          setErrorUsername(true)
          setErrorMessageUsername("This field is required!")
        }
        if(!passwordIsValid){
          setErrorPassword(true)
          setErrorMessagePassword("This field is required!")
        }
        return
      }
      const data = {identifier:username, password}
      dispatch(login(data))
      .unwrap()
      .then(response => {
        console.log('good ', response)
        navigate("/checkout")
      }).catch(error => {
        console.log('bad', error)
        setErrorLogin(true)
        usernameInput.current.value = ""
        passwordInput.current.value = ""
      })
      //console.log('Send data ', username, ' ', password)
    }

    if(loading){
      return <div className="w-24 mx-auto"><Spinner></Spinner></div>
    }

    return (
        <>
          <h1 className="text-2xl text-gray-700 uppercase text-center mb-3">Login</h1>
          <div className="bg-white mx-auto w-4/12 p-10">
             <form onSubmit={userLogin}>
               <Input id="username" label="Username" placeholder="Jondoe" ref={usernameInput} extraClass={classUsername} onChange={()=>{setErrorUsername(false); setErrorMessageUsername(null)}} errors={errorMessageUsername}></Input>
               <Input id="password" label="Password" placeholder="******" type="password" ref={passwordInput} errors={errorMessagePassword} extraClass={classPassword} onChange={()=>{setErrorPassword(false); setErrorMessagePassword(null)}}></Input>
              {errorLogin && <div className="bg-red-200 p-2 mb-2">Wrong password or username</div>}

              <Button type="submit" label="Send" full></Button>
             </form>
          </div>
        </>
    )



}

export default Login