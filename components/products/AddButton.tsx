'use client'

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddButtonProps = {
    product: Product
}

export default function AddButton({ product } : AddButtonProps) {

    const addToOrder = useStore((state) =>  state.addToOrder)

    return (
        <button
            type="button"
            className=" w-full bg-pink-400 p-3 mt-3 uppercase font-bold rounded-md text-white"
            onClick={() => addToOrder(product)}>
            Agregar
        </button>
    )
}
