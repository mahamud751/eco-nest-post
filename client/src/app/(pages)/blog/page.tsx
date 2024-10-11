"use client";
import React from "react";
import UseFetch from "@/services/hooks/useFetch";
import { Blog } from "@/services/types";
import Image from "next/image";
import Link from "next/link";

const CategorySection = () => {
  const { data: blogs, loading, error } = UseFetch<Blog[]>("blogs");

  if (loading) return <div>Loading blogs...</div>;
  if (error || !blogs || blogs.length === 0) {
    return <div>Failed to load blogs or no blogs available</div>;
  }
  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3"></div>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Column me neatly.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            This is your life and it's ending one minute @ a time...
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {blogs.map((article) => (
            <Link
              href={`/blogDetails/${article.id}`}
              key={article.id}
              className="flex flex-col overflow-hidden rounded-lg shadow-lg"
            >
              <div className="flex-shrink-0">
                <Image
                  src={article.photos[0].src}
                  alt={article.name}
                  width={400}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <a href="#" className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">
                      {article.name}
                    </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: article?.desc.slice(0, 150),
                      }}
                      className="mt-3 text-base text-gray-500"
                    />
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href="#">
                      <span className="sr-only">{article.author}</span>
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href="#" className="hover:underline">
                        {article.author}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time
                        dateTime={new Date(article.createdAt).toISOString()}
                      >
                        {new Date(article.createdAt).toLocaleDateString()}
                      </time>
                      <span aria-hidden="true">·</span>
                      <span>6 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
