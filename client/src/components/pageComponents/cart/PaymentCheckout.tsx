import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";

const PaymentCheckout = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [bkashChecked, setBkashChecked] = useState(false);
  const [nagadChecked, setNagadChecked] = useState(false);
  const [rocketChecked, setRocketChecked] = useState(false);
  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : null);
    };
  return (
    <Card
      className="space-y-4  mt-12"
      sx={{
        border: "1px solid #ccc",
      }}
    >
      <Accordion
        expanded={expanded === "cash"}
        onChange={handleAccordionChange("cash")}
        sx={{
          borderTop: "1px solid #ccc",
          background: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary aria-controls="cash-content" id="cash-header">
          <div className="flex items-center space-x-2">
            <Checkbox
              sx={{
                "&.Mui-checked": {
                  color: "white",
                  backgroundColor: "red",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "white",
                },
                borderRadius: "50%",
              }}
            />
            <Typography>Cash on delivery</Typography>
          </div>
        </AccordionSummary>
      </Accordion>

      <Accordion
        expanded={expanded === "bkash"}
        onChange={handleAccordionChange("bkash")}
        sx={{
          borderTop: "1px solid #ccc",
          background: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="bkash-content"
          id="bkash-header"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={bkashChecked}
              onChange={() => setBkashChecked(!bkashChecked)}
              sx={{
                "&.Mui-checked": {
                  color: "white",
                  backgroundColor: "red",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "white",
                },
                borderRadius: "50%",
                color: "red",
                backgroundColor: "red",
              }}
            />
            <Typography>Bkash</Typography>
          </div>

          <Image
            src="https://i.ibb.co.com/2kDyHRB/1656227518bkash-logo-png.png"
            alt="Bkash"
            className="ml-auto"
            height={80}
            width={120}
            style={{ height: 40, width: 120 }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to your bKash app or Dial *247#</li>
              <li>Choose “Send Money”</li>
              <li>Enter below bKash Account Number</li>
              <li>Enter total amount</li>
              <li>
                Now enter your bKash Account PIN to confirm the transaction
              </li>
              <li>
                Copy Transaction ID from payment confirmation message and paste
                that Transaction ID below
              </li>
            </ol>
          </Typography>
          <p className="text-green-600">
            You need to send us <strong>৳ 2020.00</strong>
          </p>
          <p>Account Type: Merchant Number</p>
          <p>Account Number: 01789999751</p>
          <TextField
            label="Your bKash Account Number"
            variant="outlined"
            fullWidth
            placeholder="01XXXXXXXXXX"
            type="number"
            className="my-2"
            name="bkashNumber"
          />
          <TextField
            label="Bkash Transaction ID"
            fullWidth
            placeholder="23562"
            type="text"
            className="my-2"
            name="transactionId"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "nagad"}
        onChange={handleAccordionChange("nagad")}
        sx={{
          borderTop: "1px solid #ccc",
          background: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="nagad-content"
          id="nagad-header"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={nagadChecked}
              onChange={() => setNagadChecked(!nagadChecked)}
              sx={{
                "&.Mui-checked": {
                  color: "white",
                  backgroundColor: "red",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "white",
                },
                borderRadius: "50%",
                color: "red",
                backgroundColor: "red",
              }}
            />
            <Typography>Nagad</Typography>
          </div>

          <Image
            src="https://i.ibb.co.com/8nwnqPB/Nagad-Logo-wine.png"
            alt="Nagad"
            className="ml-auto"
            height={80}
            width={120}
            style={{ height: 40, width: 120 }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to your Nagad app or Dial *167#</li>
              <li>Choose “Send Money”</li>
              <li>Enter below nagad Account Number</li>
              <li>Enter total amount</li>
              <li>
                Now enter your nagad Account PIN to confirm the transaction
              </li>
              <li>
                Copy Transaction ID from payment confirmation message and paste
                that Transaction ID below
              </li>
            </ol>
          </Typography>
          <p className="text-green-600">
            You need to send us <strong>৳ 2020.00</strong>
          </p>
          <p>Account Type: Merchant Number</p>
          <p>Account Number: 01789999751</p>
          <TextField
            label="Your nagad Account Number"
            variant="outlined"
            fullWidth
            placeholder="01XXXXXXXXXX"
            type="number"
            className="my-2"
            name="nagadNumber"
          />
          <TextField
            label="Nagad Transaction ID"
            fullWidth
            placeholder="23562"
            type="text"
            className="my-2"
            name="transactionId"
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "rocket"}
        onChange={handleAccordionChange("rocket")}
        sx={{
          borderTop: "1px solid #ccc",
          background: "none",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rocket-content"
          id="rocket-header"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={rocketChecked}
              onChange={() => setRocketChecked(!rocketChecked)}
              sx={{
                "&.Mui-checked": {
                  color: "white",
                  backgroundColor: "red",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  color: "white",
                },
                borderRadius: "50%",
                color: "red",
                backgroundColor: "red",
              }}
            />
            <Typography>Rocket</Typography>
          </div>
          <Image
            src="https://i.ibb.co.com/vcQpgh3/mlogo.png"
            alt="Rocket"
            className="ml-auto"
            height={80}
            width={120}
            style={{ height: 40, width: 120 }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol className="list-decimal list-inside space-y-1">
              <li>Go to your Rocket app or Dial *322#</li>
              <li>Choose “Send Money”</li>
              <li>Enter below Rocket Account Number</li>
              <li>Enter total amount</li>
              <li>
                Now enter your Rocket Account PIN to confirm the transaction
              </li>
              <li>
                Copy Transaction ID from payment confirmation message and paste
                that Transaction ID below
              </li>
            </ol>
          </Typography>
          <p className="text-green-600">
            You need to send us <strong>৳ 2020.00</strong>
          </p>
          <p>Account Type: Merchant Number</p>
          <p>Account Number: 01789999751</p>
          <TextField
            label="Your Rocket Account Number"
            variant="outlined"
            fullWidth
            placeholder="01XXXXXXXXXX"
            type="number"
            className="my-2"
            name="rocketNumber"
          />
          <TextField
            label="Rocket Transaction ID"
            variant="outlined"
            fullWidth
            placeholder="23562"
            type="text"
            className="my-2"
            name="transactionId"
          />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default PaymentCheckout;
