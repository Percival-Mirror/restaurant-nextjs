import ProductSearchForm from "@/components/products/ProductSearchForm"
import ProductsPagination from "@/components/products/ProductsPagination"
import ProductTable from "@/components/products/ProductsTable"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  const page = + searchParams.page || 1

  const pageSize = 10

  if (page < 0) {
    redirect('/admin/products')
  }

  const productsData = await getProducts(page, pageSize)
  const totalProductsData = await productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) {
    redirect('/admin/products')
  }

  return (
    <>
      <h2 className=" mt-5 font-bold text-2xl">Administrar Productos</h2>

      <div className=" mt-20 flex justify-between gap-4 flex-col-reverse lg:flex-row">
        <ProductSearchForm></ProductSearchForm>
        <Link
          href={'/admin/products/new'}
          className=' bg-amber-400 w-full lg:w-auto px-10 py-3 text-center font-bold'>
          Crear Producto</Link>
      </div>

      <ProductTable
        products={products} />
      <ProductsPagination
        page={page}
        totalPages={totalPages}></ProductsPagination>
    </>
  )
}
