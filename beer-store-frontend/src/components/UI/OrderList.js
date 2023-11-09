const OrderList = props => {
    const {address, city, amount, items, createdAt} = props.order

    const date = new Date(createdAt)

    const formatDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    return <li className="bg-white border-b border-primary p-2">
        <p className="text-sm mb-0 text-stone-800"><strong>Address</strong> : {address}</p>
        <p className="text-sm mb-0 text-stone-800"><strong>City</strong> : {city}</p>
        <p className="text-sm mb-0 text-stone-800"><strong>List of beers</strong> : </p>
        <ul className="text-sm ml-5">
            {items.map(item => (
                <li key={`item-${item.id}`}>{item.name} (x {item.quant})</li>
            ))}
        </ul>
        <p className="text-sm mb-0 text-red-800"><strong>Amount</strong> : {amount}</p>
        <p className="text-sm mb-0 text-stone-800"><strong>{formatDate}</strong> </p>
        
    </li>
}

export default OrderList