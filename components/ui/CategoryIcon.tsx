'use client'

import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"


type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {

  const params = useParams()

  return (
    <Link 
    className={`${category.slug === params.category ? "bg-pink-300" : ""} flex items-center gap-4 w-full border-t border-gray-800 p-3 last-of-type:border-b`}
    href={`/order/${category.slug}`}>
        <Image 
        height={50}
        width={50} 
        src={`/icon_${category.slug}.svg`} 
        alt={`${category.name}-logo`}></Image>
        <p className=" text-xl font-black">{category.name}</p>
    </Link>
  )
}
