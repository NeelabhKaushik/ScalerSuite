"use client";

import { formatter } from "@/lib/utils";
import React from "react";

interface CurrencyProps {
  value?: string | number;
}
const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
