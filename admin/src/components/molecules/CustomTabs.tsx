import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";

interface CustomTabsProps {
  labels: string[];
  children: React.ReactNode[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  labels,
  children,
  value,
  onChange,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={onChange} aria-label="Custom Tabs">
          {labels.map((label, index) => (
            <Tab label={label} key={index} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {children.map((child, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default CustomTabs;
