import { PrismaClient } from '@prisma/client'
import { categories } from '../app/model/categories'

const prisma = new PrismaClient()

async function main() {
  // create categories
  await Promise.all([
    categories.map(async (category) => {
      await prisma.category.create({
        data: {
          title: category.title,
          slug: category.slug,
        },
      })
    }),
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
