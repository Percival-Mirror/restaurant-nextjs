'use client'

import { useMemo } from "react"
import { toast } from "react-toastify"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"


export default function OrderSummary() {

  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {

    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)

    console.log(result)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)

    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }

    toast.success('Pedido realizado correctamente')
    clearOrder()
  }

  return (
    <aside className=" lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-3 bg-pink-400">
      <h1 className=" font-black text-4xl text-center text-white">Mi Pedido</h1>
      {order.length === 0 ? <p className=" text-center p-5">Orden vacía</p>
        :
        <div className=" rounded-md mt-3 overflow-hidden">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item} />
          ))}
        </div>}

      {order.length === 0 ?
        ""
        :
        <>
          <hr className=" h-2 w-full border-white my-3"></hr>
          <p className=" text-xl bg-white rounded-md p-3 border border-pink-300">
            Total a pagar: {''}
            <span className=" text-3xl font-black text-pink-500">{formatCurrency(total)}</span>
          </p>
          <form
            action={handleCreateOrder}
            className=" w-full mt-5 space-y-3">
            <input
              type="text"
              placeholder="¿Cómo te llamas?"
              className=" bg-white border border-gray-50 p-2 w-full rounded-lg"
              name="name" />
            <input
              type="submit"
              className=" bg-pink-900 text-white py-2 rounded-md w-full text-center cursor-pointer font-black uppercase"
              value="Confirmar Pedido">
            </input>
          </form>
        </>}

    </aside>
  )
}
