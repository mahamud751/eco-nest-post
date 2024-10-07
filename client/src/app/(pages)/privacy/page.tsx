"use client";
import UseFetch from "@/services/hooks/useFetch";
import { Dynamic } from "@/services/types";
import { Box } from "@mui/material";

const Terms = () => {
  const { data } = UseFetch<Dynamic[]>("dynamics");
  const terms = data?.find((item) => item.name === "Privacy");

  return (
    <Box className="container mx-auto py-10 flex gap-8">
      <div className="container">
        <h3 className="text-xl font-bold whitespace-normal text-center">
          Privacy Policy
        </h3>
        <div className="my-10">
          {terms && <div dangerouslySetInnerHTML={{ __html: terms.desc }} />}
        </div>
      </div>
    </Box>
  );
};

export default Terms;
