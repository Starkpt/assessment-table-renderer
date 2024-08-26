export type RowCategory = {
  category: string;
  categoryId: string;
  subCategories?: RowCategory[];
};

export type Header = {
  name: string;
  id: string;
  subHeaders?: Header[];
};

export type DataItem = {
  id: number;
  version: string;
  categoryId: string;
  subCategoryId: string;
  locationId: string;
  location: string;
  legalEntity: number;
  grossRevenue: number;
  units: number;
  unitPrice: UnitPrice[];
};

export type UnitPrice = {
  currencyCode: string;
  currency: string;
  value: number;
};
