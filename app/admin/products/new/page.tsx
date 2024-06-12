import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import React from 'react'

export default function CreateProduct() {
  return (
    <>
      <h2 className=" mt-5 font-bold text-2xl">Crear Nuevo Producto</h2>
      <AddProductForm>
        <ProductForm></ProductForm>
      </AddProductForm>
    </>
  )
}
