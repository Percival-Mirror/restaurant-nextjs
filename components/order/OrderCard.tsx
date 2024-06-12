import { completeOrder } from "@/actions/complete-order"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"

type OrderCardProps = {
    order: OrderWithProducts
}


export default function OrderCard({ order } : OrderCardProps) {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>{order.name} </p>
            <p className='text-lg font-medium text-gray-900'>Orden:</p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product => (
                    <div key={product.id} 
                    className=" flex items-center border-t gap-2 border-gray-200 pt-4">
                        <dt>
                            <span>{product.quantity}</span>
                        </dt>
                        <dd>{product.product.name}</dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dd className="text-base font-medium text-gray-900">Total:</dd>
                    <dt className="text-base font-medium text-gray-900">{formatCurrency(order.total)}</dt>
                </div>
            </dl>

            <form action={completeOrder}>
                <input
                type="hidden"
                value={order.id}
                name="order-Id">
                </input>
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}