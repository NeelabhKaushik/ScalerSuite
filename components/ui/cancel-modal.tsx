"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface cancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  refundCategory: string;
  bookingAmt: number;
}

export const CancelModal: React.FC<cancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  refundCategory,
  bookingAmt,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isMounted, setIsMounted] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure to cancel this booking"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      {refundCategory === "A" && (
        <p>Guest will recive a 100% return of Rs. {bookingAmt}.</p>
      )}
      {refundCategory === "B" && (
        <p>Guest will recive a 50% return of Rs.{(bookingAmt * 1) / 2}.</p>
      )}
      {refundCategory === "C" && <p>Guest will get no refund.</p>}

      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
