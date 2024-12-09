export type TOrder = {
  customerId: string
  city: string
  deliveryAddress: string
  deliveryArea: string
  email: string
  fullName: string
  paymentType: 'COD' | 'ADV'
  phoneNumber: string
  postalCode: number
  products: Products[]
  quantity: number
  totalAmount: number
}

type Products = {
  orderId: string
  productId: string
  price: number
  size?: string
  color?: string
  quantity: number
}
