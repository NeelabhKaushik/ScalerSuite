"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { BookingColumn, columns } from "./columns";

interface BookingClientProps {
  data: BookingColumn[];
}

export const BookingClient: React.FC<BookingClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Bookings (${data.length})`}
          description="Manage Bookings from here."
        />
      </div>
      <Separator />
      <DataTable searchKey="roomNumber" columns={columns} data={data} />
    </>
  );
};
