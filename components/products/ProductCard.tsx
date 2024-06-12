import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddButton from "./AddButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard( { product } : ProductCardProps ) {

  const imagePath = getImagePath(product.image)

  return (
    <div className=" bg-white rounded-md">
        <Image
            width={500}
            height={300}
            src={imagePath}
            alt={`Imagen ${product.name}`}
            style={{borderRadius: "0.375rem"}}></Image>
        <div className="p-3">         
            <h3 className=" font-black text-xl">{product.name}</h3>
            <hr className=" my-2 bg-pink-400 border-pink-200"></hr>
            <p className=" font-bold text-2xl text-pink-600">{formatCurrency(product.price)}</p> 
            <AddButton
            product={product}></AddButton>   
        </div>
    </div>
  )
}
