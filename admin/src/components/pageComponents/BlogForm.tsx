import React, { useState, useEffect } from "react";
import { Blog } from "@/services/types";
import { Grid, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_MCE_EDITOR_INIT } from "@/services/utils/constants";

interface BlogFormProps {
  blog: Blog | null;
  onDetailsChange: (desc: string) => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onDetailsChange }) => {
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (blog) {
      setDesc(blog.desc || "");
    }
  }, [blog]);

  return (
    <>
      <Grid item xs={8}>
        <TextField
          id="blog-name"
          label="Blog Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={blog?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={10} my={4}>
        <Editor
          apiKey="9i9siri6weyxjml0qbccbm35m7o5r42axcf3lv0mbr0k3pkl"
          init={TINY_MCE_EDITOR_INIT}
          value={desc}
          onEditorChange={(newValue) => {
            setDesc(newValue);
            onDetailsChange(newValue);
          }}
        />
      </Grid>
    </>
  );
};

export default BlogForm;
