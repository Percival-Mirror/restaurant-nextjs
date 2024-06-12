'use client'

import OrderCard from "@/components/order/OrderCard"
import { OrderWithProducts } from "@/src/types"
import useSWR from "swr"

export default function AdminOrders() {

  const url = '/admin/orders/api'

  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  if(isLoading) return <p className=" p-2">Cargando...</p>

  if(data) return (
    <>
      <h2 className=" my-10 font-bold text-2xl">Ordenes</h2>

      {data.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 mt-3">
          {data.map(order => (
            <OrderCard
              key={order.id}
              order={order} />
          ))}
        </div>
      )

        :

        <p className=" text-center">No hay ordenes pendientes</p>

      }
    </>
  )
}
