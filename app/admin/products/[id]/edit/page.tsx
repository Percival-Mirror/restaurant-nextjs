import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import { prisma } from "@/src/lib/prisma"
import { notFound, redirect } from "next/navigation"


async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if(!product){
        notFound()
    }

    return product
}

export default async function EditProductPage({ params }: { params: { id: string } }) {

    const product = await getProductById(+params.id)

    console.log(product)
    
    return (
        <>
            <h2 className=" my-10 font-bold text-2xl">Editar Producto: {product.name}</h2>
            <GoBackButton></GoBackButton>
            <EditProductForm>
                <ProductForm
                product={product}></ProductForm>
            </EditProductForm>
        </>
    )
}
