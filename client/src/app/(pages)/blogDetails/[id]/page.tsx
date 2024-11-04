"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Blog } from "@/services/types/types";
import UseFetch from "@/services/hooks/useFetch";
import Link from "next/link";

interface BlogDetailsProps {
  params: {
    id: string;
  };
}

const ProductDetails = ({ params: { id } }: BlogDetailsProps) => {
  const { data: blogs } = UseFetch<Blog[]>("blogs");
  const [data, setData] = useState<Blog | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get<Blog>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {data?.name}
          </h1>
          <p className="text-gray-600">Published on</p>
          {data?.createdAt && (
            <time dateTime={new Date(data.createdAt).toISOString()}>
              {new Date(data.createdAt).toLocaleDateString()}
            </time>
          )}
        </div>
      </div>
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 px-4">
            {data?.photos.map((img, index) => (
              <div key={index} className="cursor-pointer">
                <Image
                  src={img.src}
                  alt={img.title}
                  width={2000}
                  height={100}
                  className="w-full"
                />
              </div>
            ))}

            <div className="prose max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.desc || "",
                }}
                className="mt-3 text-base text-gray-500"
              />
            </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <div className="bg-gray-100 p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Recent Posts
              </h2>
              <ul className="list-none">
                {blogs &&
                  blogs.map((blog) => (
                    <Link href={`/blogDetails/${blog.id}`} key={blog.id}>
                      <li className="mb-4 flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
                        <Image
                          src={blog.photos[0]?.src}
                          alt={blog.name}
                          width={80}
                          height={80}
                          className="mr-4 rounded"
                          style={{
                            height: 60,
                            width: 120,
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                        />
                        <a
                          href="#"
                          className="text-gray-700 text-sm hover:text-gray-900 transition-colors duration-200"
                        >
                          {blog.name}
                        </a>
                      </li>
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
