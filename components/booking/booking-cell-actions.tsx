"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CancelModal } from "../ui/cancel-modal";
import { BookingColumn } from "./columns";
import { CoinfirmModal } from "./coinfirm-modal";

interface CellActionProps {
  data: BookingColumn;
}
function calculateRefund(bookedFrom: string): string {
  // Get current date and time
  const currentTime: Date = new Date();

  // Convert booked start time to Date object
  const bookedStartTime: Date = new Date(bookedFrom);

  // Calculate time difference in milliseconds
  const timeDifference: number =
    bookedStartTime.getTime() - currentTime.getTime();

  // Calculate total hours difference
  const totalHoursDifference: number = timeDifference / (1000 * 3600);

  // Determine refund amount based on time difference
  let refundCategory: string;
  if (totalHoursDifference > 48) {
    refundCategory = "A";
  } else if (totalHoursDifference >= 24 && totalHoursDifference <= 48) {
    refundCategory = "B";
  } else {
    refundCategory = "C";
  }

  return refundCategory;
}

export const BookingCellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailOpen, setemailOpen] = useState(false);
  const [type, setType] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onConfirm = async () => {
    try {
      setLoading(true);
      if (data.id) {
        toast.success("Product deleted.");
        await axios.delete(`/api/bookings/${data.id}/delete`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {data.isCancelled ? (
        <></>
      ) : (
        <>
          <CancelModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
            refundCategory={calculateRefund(data.bookedFrom)}
            bookingAmt={data.bookingPrice}
          ></CancelModal>
          <CoinfirmModal
            isOpen={emailOpen}
            onClose={() => setemailOpen(false)}
            type={type}
            emailAddress= {data.email}
            username ={data.username}
            userId = {data.id}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setemailOpen(true);
                  setType(false);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Update Name
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setemailOpen(true);
                  setType(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" /> Update Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" /> Cancel Booking
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
};
