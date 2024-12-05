export type TAdmin = {
  name: string
  email: string
  password: string
  profilePhoto?: string
  contactNumber: string
}

export interface TVendor extends TShop {
  name: string
  email: string
  password: string
  profilePhoto?: string
  contactNumber: string
}

export type TShop = {
  shopName: string
  shopLogo: string
  shopCover: string
  description?: string
  vendorId: string
  address: string
  registrationNumber: string
  categoryId: string
}

export type VendorShop = {
  name: string
  email: string
  password: string
  profilePhoto?: string
  contactNumber: string
  shopName: string
  shopLogo: string
  shopCover: string
  description?: string
  vendorId: string
  address: string
  registrationNumber: string
  categoryId: string
}
