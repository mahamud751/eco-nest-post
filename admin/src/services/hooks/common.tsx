import { useState } from "react";

const PHONE_REGEX = /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/;

export const useBangladeshPhoneValidation = () => {
  const [error, setError] = useState<string | null>(null);

  const validatePhoneNumber = (phone: string) => {
    if (!phone) {
      setError("Phone number is required.");
      return false;
    }
    if (!PHONE_REGEX.test(phone)) {
      setError("Invalid Bangladesh phone number.");
      return false;
    }
    setError(null);
    return true;
  };

  return { error, validatePhoneNumber };
};
