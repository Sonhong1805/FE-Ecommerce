type TCart = {
  id: number;
  name: string;
  image: string;
  slug: string;
  slugCategoryChildren: string;
  currentPrice: number;
  newPrice: number;
  quantity: number;
  discount: number;
  firstChoice?: string;
  secondChoice?: string;
  status: boolean;
};

type TDataCart = {
  id: number;
  name: string;
  image: string;
  slug: string;
  slugCategoryChildren: string;
  price: number;
  quantity: number;
  discount: number;
  firstChoice?: string;
  secondChoice?: string;
  status: boolean;
};
