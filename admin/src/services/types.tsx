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
export interface Faq {
  id: string;
  title: string;
  desc: string;
  position: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Dynamic {
  id: string;
  name: string;
  desc: string;
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
  userInfo?: any;
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
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  photos: Photo[];
  vendors: User[];
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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userId?: string;
  refferCode?: string;
  gender: Gender;
  password: string;
  address?: string;
  role: UserRole;
  status: UserStatus;
  branchId?: string;
  createdAt: Date;
  updatedAt: Date;
  photos: Photo[];
  advances?: Advance[];
}

export interface School {
  id: string;
  name: string;
  photos: Photo[];
  email?: string;
  password?: string;
  location?: string;
  status: SchoolStatus;
  students: Student[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  mobile: string;
  total: string;
  category: string;
  height: number;
  shoulder: number;
  sleeveLength: number;
  collar: number;
  length: number;
  armhole: number;
  sleeveOpening: number;
  waist: number;
  waistSize: number;
  halfBody?: number;
  bottomHem?: number;
  hips?: number;
  schoolId: string;
  school: School;
  createdAt: Date;
  updatedAt: Date;
}

export type SchoolStatus = "pending" | "processing" | "delivery" | "canceled";

export type Gender = "Male" | "Female" | "Other";

export type UserRole =
  | "superAdmin"
  | "admin"
  | "user"
  | "manager"
  | "vendor"
  | "schoolManager";

export type UserStatus = "active" | "deactive" | "blocked";

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

export interface UserFormProps {
  user: User | null;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}
export interface StudentFormProps {
  student: Student | null;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedSchool: string;
  setSelectedSchool: React.Dispatch<React.SetStateAction<string>>;
}
