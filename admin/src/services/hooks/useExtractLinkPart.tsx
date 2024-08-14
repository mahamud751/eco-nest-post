import { useState, useEffect } from "react";

const useExtractLinkPart = (url: string) => {
  const [firstPart, setFirstPart] = useState<string>("");

  useEffect(() => {
    const extractLinkAddPart = (url: string) => {
      const parts = url.split("-");
      return parts[0];
    };

    setFirstPart(extractLinkAddPart(url));
  }, [url]);

  return firstPart;
};

export default useExtractLinkPart;
