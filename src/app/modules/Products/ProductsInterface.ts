export type TProduct = {
  name: string
  regular_price: string
  discount_price: string
  description: string
  images: string[]
  categoryId: string
  vendorId?: string
  shopId: string
  inventory: string
  productSize: productSize[]
  productColor: productColor[]
}

type productSize = {
  size: string
  stock: string
}
type productColor = {
  color: string
  colorCode: string
  colorStock: string
}
