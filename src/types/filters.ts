type TMetadataChildren = {
  id: number;
  name: string;
  slug: string;
  quantity: number;
};

type TMetadata = {
  id: string;
  name: string;
  slug: string;
  quantity: number;
  value?: string;
  children: TMetadataChildren[];
};

type TFilters = {
  name: string;
  metadata: TMetadata[];
};
