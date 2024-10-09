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
      setExpanded(0);
    }
  }, [faq]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-16 bg-[#1f2937] rounded-lg p-16 mb-20">
      <Typography className="text-center text-3xl font-bold text-[#00d1b2] mb-8">
        Frequently Asked Questions
      </Typography>
      {faq?.map((data: FaqItem, i: number) => (
        <Accordion
          key={data.id}
          expanded={expanded === i}
          onChange={() => handleToggle(i)}
          className={`border border-gray-700 rounded-lg mb-6 transition-all duration-300 ${
            expanded === i
              ? "bg-gradient-to-r from-teal-500 to-purple-500"
              : "bg-[#374151]"
          }`}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-[#00d1b2]" />}
            className="px-4 py-2 text-white"
          >
            <Typography className="font-semibold text-lg sm:text-xl">
              {data.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="px-4 py-2 bg-[#111827] text-gray-300 rounded-b-lg">
            <Typography className="text-base sm:text-lg leading-relaxed">
              {data.desc}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
