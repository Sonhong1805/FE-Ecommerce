export type TCategoriesChild = {
  id: string;
  name: string;
  slug: string;
};

export type TCategories = {
  id: string;
  name: string;
  slug: string;
  children: TCategoriesChild[];
};
