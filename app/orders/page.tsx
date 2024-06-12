'use client'

import LatestOrderItem from '@/components/order/LatestOrderItem'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types'
import useSWR from 'swr'

export default function OrdersPage() {

    const url = '/orders/api'

    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

    const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p className=' m-2'>Cargando...</p>

    if (data) return (
        <div className=' bg-amber-900 p-20'>
            <h1 className=' text-center text-6xl font-black text-white'>Ordenes Listas</h1>
            <Logo />

            {data.length ? (
                <div className='grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10'>
                    {data.map(order => (
                        <LatestOrderItem 
                        key={order.id}
                        order={order}/>
                    ))}
                </div>
            )
            :
            <p className=' text-center my-10'>Sin Ordenes Listas</p>
        
        }
        </div>
    )
}
