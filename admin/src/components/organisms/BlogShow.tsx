import * as React from "react";

import { Blog } from "@/services/types";
import CommonDataShow from "../molecules/CommonDataShow";

interface BlogShowProps {
  data: Blog;
}

const BlogShow: React.FC<BlogShowProps> = ({ data }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Blog Details</h2>
      <CommonDataShow data={data} />
      <div style={{ maxWidth: "80%" }}>
        <div dangerouslySetInnerHTML={{ __html: data?.desc }} key={data.id} />
      </div>
    </>
  );
};

export default BlogShow;
