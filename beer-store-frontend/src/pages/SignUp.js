import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userRegister } from "../store/authSlice"
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import Input from "../components/UI/Input"
import HolyBeer from "../components/svg/HolyBeer"
import Spinner from "../components/svg/Spinner"
import Button from "../components/UI/Button"

const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loading = useSelector(state => state.auth.loading)
    const [errorRegister, setErrorRegister] = useState(null)

    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    const _password = useRef({})
    _password.current = watch("password", "")
    
    const minValidation = {
        required: 'This field is required',
        minLength: {
            value: 5,
            message: 'Min 5'
        }
    }
    const onSubmit = (data) => {
        setErrorRegister(null)
        const infoRegister = {username:data.username, email:data.email, password:data.password}
        dispatch(userRegister(infoRegister))
        .unwrap()
        .then(()=>{
            navigate('/checkout')
        })
        .catch(error => {
            setErrorRegister(error.response.data.error.message)
        })
        console.log(data)
    }

    if(loading){
        return <div className="w-24 mx-auto"><Spinner></Spinner></div>
    }

    return (
        <>
            <h1 className="text-2xl text-gray-700 uppercase text-center mb-3">Sign up</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-6 gap-2 bg-white">
                <div className="col-span-3 p-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input {...register("username", minValidation)}
                            label="Username"
                            placeholder="santy"
                            extraClass={errors.username ? 'border-error' : ''}
                            errors={errors.username ? errors.username.message : null}
                        ></Input>
                        <Input {...register("email", {
                            required: 'This field is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Invalid email address'
                            }
                        })}
                            label="Email"
                            placeholder="santy@test.ca"
                            extraClass={errors.email ? 'border-error' : ''}
                            errors={errors.email ? errors.email.message : null}
                        ></Input>
                        <Input {...register("password", minValidation)}
                            label="Password"
                            placeholder="****"
                            extraClass={errors.password ? 'border-error' : ''}
                            errors={errors.password ? errors.password.message : null}
                        ></Input>
                        <Input {...register("confirmPassword", {
                            required: "This field is required",
                            validate: value => value === _password.current || "Passwords do not match"
                        })}
                            label="Confirm Password"
                            placeholder="****"
                            extraClass={errors.confirmPassword ? 'border-error' : ''}
                            errors={errors.confirmPassword ? errors.confirmPassword.message : null}
                        ></Input>
                        {errorRegister && <div className="bg-red-200 p-2 mb-2">{errorRegister}</div>}
                        <Button type="submit" label="Send" full></Button>
                    </form>
                </div>
                <div className="col-span-3 grid content-center justify-items-center">
                    <div className="w-56 h-56"><HolyBeer></HolyBeer></div>
                </div>
            </div>
        </>
    )
}

export default SignUp