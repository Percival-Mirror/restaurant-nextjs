import Link from "next/link";


export default function notFound() {
  return (
    <div className="text-center">
        <h2 className=" my-10">Producto no Encontrado</h2>
        <Link
        href='/admin/products'
        className=" bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold
        cursor-pointer w-full lg:w-auto">Volver a Productos</Link>
    </div>
  )
}
