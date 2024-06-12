import ProductSearchForm from "@/components/products/ProductSearchForm"
import ProductTable from "@/components/products/ProductsTable"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {

    const products = await searchProducts(searchParams.search)

    return (
        <>
            <h2 className=" mt-5 font-bold text-2xl">Busqueda: {searchParams.search}</h2>

            <div className=" mt-20 flex justify-between gap-4 flex-col-reverse lg:flex-row">
                <ProductSearchForm></ProductSearchForm>
                <Link
                    href={'/admin/products/new'}
                    className=' bg-amber-400 w-full lg:w-auto px-10 py-3 text-center font-bold'>
                    Crear Producto</Link>
            </div>

            {products.length ? (
                <ProductTable
                    products={products}></ProductTable>
            )
                :
                <p className=" text-center text-lg mt-10">No hay resultados.</p>}

        </>
    )
}
