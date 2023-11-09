import React from 'react'

const Input = React.forwardRef((props, ref) => {
    const {id, label='Label for', placeholder='', type='text', extraClass, errors=null, ...rest } = props
    return (
        <div className="mb-3">
            <label htmlFor={id}
            className="block text-secondary font-bold text-sm tracking-wide"
            >{label}</label>
            <input type={type} id={id}
            className={`w-full mt-1 p-2 text-secondary outline-none text-base border focus focus-within:border-secondary transition duration-200 ease-in-out ${extraClass}`}
            placeholder={placeholder}
            {...rest}
            ref={ref}
            />
            {errors && <span className="text-error">{errors}</span>}
        </div>
    )
})

export default Input