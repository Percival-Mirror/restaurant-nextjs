import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products
}

export default async function OrderPage({ params }: { params: { category: string } }) {

  const products = await getProducts(params.category)
  console.log(products)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 p-3">
        {products.map(product => (
          <ProductCard
          key={product.id}
          product={product}></ProductCard>
        ))}
      </div>
    </>
  )
}
