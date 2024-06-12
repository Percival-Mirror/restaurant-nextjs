import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"
import Logo from "../ui/Logo"

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {

  const categories = await getCategories()

  return (
    <aside className=" w-72 h-screen bg-white overflow-auto">
      <Logo></Logo>
      <nav className="">
        {categories.map(category => (
          <CategoryIcon
          key={category.id}
          category={category} 
          >
          </CategoryIcon>
        ))}
      </nav>
    </aside>
  )
}
