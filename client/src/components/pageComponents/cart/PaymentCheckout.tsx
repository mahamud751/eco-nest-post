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
  const [bkashChecked, setBkashChecked] = useState(false);
  const [rocketChecked, setRocketChecked] = useState(false);

  return (
    <Card className="space-y-4">
      <Accordion>
        <AccordionSummary
          aria-controls="cash-content"
          id="cash-header"
          className="bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <Checkbox />
            <Typography>Cash on delivery</Typography>
          </div>
        </AccordionSummary>
      </Accordion>

      <Accordion
        expanded={bkashChecked}
        onChange={() => setBkashChecked(!bkashChecked)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="bkash-content"
          id="bkash-header"
          className="bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={bkashChecked}
              onChange={() => setBkashChecked(!bkashChecked)}
            />
            <Typography>Bkash</Typography>
          </div>

          <Image
            src="https://i.ibb.co.com/2kDyHRB/1656227518bkash-logo-png.png"
            alt="Bkash"
            className="ml-auto"
            height={80}
            width={120}
          />
        </AccordionSummary>
        <AccordionDetails className="bg-white">
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
          <p>Account Number: 01760365319</p>
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
        expanded={rocketChecked}
        onChange={() => setRocketChecked(!rocketChecked)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rocket-content"
          id="rocket-header"
          className="bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={rocketChecked}
              onChange={() => setRocketChecked(!rocketChecked)}
            />
            <Typography>Rocket</Typography>
          </div>
          <Image
            src="https://i.ibb.co.com/vcQpgh3/mlogo.png"
            alt="Rocket"
            className="ml-auto"
            height={80}
            width={120}
          />
        </AccordionSummary>
        <AccordionDetails className="bg-white">
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
          <p>Account Number: 016895843368</p>
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
