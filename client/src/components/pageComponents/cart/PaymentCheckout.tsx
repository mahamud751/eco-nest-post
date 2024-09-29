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

interface PaymentOptionProps {
  handleOnBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PaymentCheckout: React.FC<PaymentOptionProps> = ({ handleOnBlur }) => {
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
          {/* <img src="assets/images/dollar.png" alt="cash" className="ml-auto" /> */}
        </AccordionSummary>
      </Accordion>

      {/* Bkash Payment */}
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
          <img
            src="https://dsmartuniforms.com/wp-content/plugins/bangladeshi-payment-gateways//assets/images/bKash.png"
            alt="Bkash"
            className="ml-auto"
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
            required
            onBlur={handleOnBlur}
            type="number"
            className="my-2"
          />
          <TextField
            label="Bkash Transaction ID"
            variant="outlined"
            fullWidth
            placeholder="23562"
            required
            onBlur={handleOnBlur}
            type="text"
            className="my-2"
          />
        </AccordionDetails>
      </Accordion>

      {/* Rocket Payment */}
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
          <img
            src="https://dsmartuniforms.com/wp-content/plugins/bangladeshi-payment-gateways//assets/images/Rocket.png"
            alt="Rocket"
            className="ml-auto"
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
            required
            onBlur={handleOnBlur}
            type="number"
            className="my-2"
          />
          <TextField
            label="Rocket Transaction ID"
            variant="outlined"
            fullWidth
            placeholder="23562"
            required
            onBlur={handleOnBlur}
            type="text"
            className="my-2"
          />
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default PaymentCheckout;
