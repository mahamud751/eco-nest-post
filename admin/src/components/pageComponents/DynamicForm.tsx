import { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import { Dynamic } from "@/services/types";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_MCE_EDITOR_INIT } from "@/services/utils/constants";

interface FaqFormProps {
  dynamic: Dynamic | null;
  onDetailsChange: (desc: string) => void;
}
const DynamicForm: React.FC<FaqFormProps> = ({ dynamic, onDetailsChange }) => {
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (dynamic) {
      setDesc(dynamic.desc || "");
    }
  }, [dynamic]);
  return (
    <>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Page Name"
          name="name"
          fullWidth
          defaultValue={dynamic?.name || ""}
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

export default DynamicForm;
