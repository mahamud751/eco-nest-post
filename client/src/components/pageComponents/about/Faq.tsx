"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UseFetch from "@/services/hooks/useFetch";

interface FaqItem {
  id: number;
  title: string;
  desc: string;
}

const Faq: React.FC = () => {
  const { data: faq } = UseFetch<FaqItem[]>(`faq`);
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleToggle = (index: number) => {
    setExpanded(expanded === index ? false : index);
  };

  useEffect(() => {
    if (faq && faq.length > 0) {
      setExpanded(0); // Set the first accordion to be open initially
    }
  }, [faq]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      {faq?.map((data: FaqItem, i: number) => (
        <Accordion
          key={data.id}
          expanded={expanded === i}
          onChange={() => handleToggle(i)}
          className="border border-gray-300 rounded-lg mb-4"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="bg-gray-100 px-4 py-2"
          >
            <Typography className="font-semibold">{data.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className="px-4 py-2 bg-white">
            <Typography className="text-gray-700">{data.desc}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
