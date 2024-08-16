import * as React from "react";
import { Blog } from "@/services/types";
import CommonShowComponent from "../molecules/CommonDataTitle";

interface BlogShowProps {
  data: Blog;
}

const BlogShow: React.FC<BlogShowProps> = ({ data }) => {
  return <CommonShowComponent title="Blog" data={data} />;
};

export default BlogShow;
