export interface Category {
  id: string;
  name: string;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Banner {
  id: string;
  name: string;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subcategory {
  id: string;
  name: string;
  category: Category;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  categoryId(categoryId: any): unknown;
  subCategoryId(subCategoryId: any): unknown;
  id: string;
  name: string;
  price: number;
  category: Category;
  subcategory: Subcategory;
  subcategoryId: string;
  sizes: string[];
  colors: string[];
  photos: Photo[];
  status: string;
  desc: string;
  fulldesc: string;
  feature: string;
  flashsale: string;
  latest: string;
  discountType: string;
  discountPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogComment {
  id: string;
  userName: string;
  email: string;
  comment: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  id: string;
  name: string;
  desc: string;
  author: string;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  blogComments: BlogComment[];
}

export interface Advance {
  files: File[];
  id: string;
  name: string;
  number: string;
  email: string;
  students: string;
  ratio: string;
  topPart: string;
  topFab: string;
  bottomPart: string;
  bottomFab: string;
  address: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  photos: Photo[];
}

export interface CommonData {
  files?: any;
  id: string;
  name: string;
  photos: Photo[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseEditProps {
  params: {
    [key: string]: string;
  };
}

export interface Photo {
  title: string;
  src: string;
}

export interface ProductFormProps {
  subCategory: Product | null;
  selectedCategory: string;
  selectedSubCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSubCategory: React.Dispatch<React.SetStateAction<string>>;
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  colors: string[];
  setColors: React.Dispatch<React.SetStateAction<string[]>>;
  feature: string;
  setFeature: React.Dispatch<React.SetStateAction<string>>;
  flashsale: string;
  setFlashsale: React.Dispatch<React.SetStateAction<string>>;
  latest: string;
  setLatest: React.Dispatch<React.SetStateAction<string>>;
  discountType: string;
  setDiscountType: React.Dispatch<React.SetStateAction<string>>;
}
