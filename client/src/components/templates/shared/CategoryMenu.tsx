import { MenuItem, Paper, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import UseFetch from "@/services/hooks/useFetch";

interface Category {
  id: string;
  name: string;
  photos: { src: string; title: string }[];
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  photos: { src: string; title: string }[];
}

export const CategoryMenu = () => {
  const {
    data: categories,
    loading,
    error,
  } = UseFetch<Category[]>("categories");
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const [hoverCategory, setHoverCategory] = useState<number | null>(null);

  const handleCategoryClick = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    setHoverCategory(index);
  };

  const handleMouseLeave = () => {
    setHoverCategory(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;

  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  return (
    <Paper
      className="absolute top-full mt-1 z-50 bg-white shadow-lg"
      style={{ width: "300px", height: "400px" }}
    >
      {categories.map((category, index) => (
        <div
          key={category.id}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Link href={`/category/${category.id}`}>
            <MenuItem
              onClick={() => handleCategoryClick(index)}
              className="flex justify-between items-center px-4 py-2 hover:bg-[#EEF5FF] hover:text-[#088178]"
            >
              <span className="flex items-center space-x-2">
                <Image
                  src={category.photos[0]?.src || "/default-image.jpg"} // Default image if no photo
                  alt={category.photos[0]?.title || category.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <Typography variant="body2">{category.name}</Typography>
              </span>
            </MenuItem>
          </Link>
          {(hoverCategory === index || openSubMenu === index) &&
            category.subCategories.length > 0 && (
              <Paper className="absolute left-full top-0 p-4 bg-gray-100 shadow-md w-[400px]">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    {category.subCategories.map((sub) => (
                      <MenuItem
                        key={sub.id}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 hover:text-[#088178]"
                      >
                        <Typography variant="body2">{sub.name}</Typography>
                      </MenuItem>
                    ))}
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                    <Image
                      src={category.photos[0]?.src || "/default-image.jpg"}
                      alt="Category Image"
                      height={200}
                      width={200}
                      className="rounded border shadow-md"
                    />
                  </div>
                </div>
              </Paper>
            )}
        </div>
      ))}
    </Paper>
  );
};
