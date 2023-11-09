import { Link } from "react-router-dom"
const BrandCard = (props) => {
    const {id, name, img, description} = props.data
    //console.log(img)
    return (
        <div className="bg-white border shadow-xl py-10 px-3 text-center font-semibold w-80">
          {/* <div className={`w-32 h-32 ${img} shadow-xl rounded-full mb-3 mx-auto`}></div> */}
          <img src={img.url} alt={img.alternativeText} className="w-32 h-32 shadow-xl rounded-full mb-3 mx-auto" />
          <h1 className="text-lg text-gray-700 mb-4">{name}</h1>
          <p className="text-sm text-gray-400 mt-4 mb-8">{description}</p>
          <Link className="bg-primary px-8 py-2 text-gray-100 hover:bg-secondary uppercase" 
          to={`/products/${id}`}>Visit store</Link>

        </div>
    )
}

export default BrandCard