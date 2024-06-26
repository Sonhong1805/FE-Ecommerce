type TProductType = {
  name: string;
  slug: string;
  value: [
    {
      name: string;
      slug: string;
    }
  ];
};

type TProduct = {
  id: number;
  name: string;
  slug: string;
  images: string[];
  price: number;
  discount: number;
  type: TProductType[];
  color: string[];
  address: {
    name: string;
    value: string;
  };
  slugCategoryParent: string;
  slugCategoryChildren: string;
  sold: number;
  descriptions: string[];
  evaluates: TEvaluates[];
  tags: string[];
};
