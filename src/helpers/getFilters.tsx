import FilterAttribute from "@/components/FilterAttribute";
import FilterCategory from "@/components/FilterCategory";
import FilterPrice from "@/components/FilterPrice";

export const getFilters = (
  id: string,
  data: TFilters,
  categoryChild: string
) => {
  if (!data) {
    return null;
  }

  const { name, metadata } = data;
  switch (id) {
    case "category-menu":
      return (
        <FilterCategory
          name={name}
          metadata={metadata}
          categoryChild={categoryChild}
        />
      );
    case "filter-price":
      return <FilterPrice name={name} />;
    case "filter-color":
    case "filter-address":
    case "filter-size":
    case "filter-brand":
    case "filter-age":
    case "filter-feature":
    case "filter-language":
    case "filter-material":
      return <FilterAttribute id={id} name={name} metadata={metadata} />;
    default:
      return null;
  }
};
