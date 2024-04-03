"use client";

import { CalendarIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { BookingColumn, columns } from "./columns";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addDays, format } from "date-fns";

interface BookingClientProps {
  data: BookingColumn[];
}

export const BookingClient: React.FC<BookingClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
  });
  const [RoomNumber, setRoomNumber] = useState<number | null>(null);
  const [Type, setType] = useState<string | null>(null);

  // Filter by room number
  if (RoomNumber !== null) {
    data = data.filter((item) =>
      item.roomNumber.toString().includes(RoomNumber.toString())
    );
  }

  // Filter by date range
  if (date?.from && date?.to && date.from?.getTime() !== new Date().getTime()) {
    data = data.filter((item) => {
      const bookedFrom = new Date(item.bookedFrom);
      return (
        date.from && date.to && bookedFrom >= date.from && bookedFrom <= date.to
      );
    });
  }

  // Filter by room type
  console.log(Type);
  if (Type !== null) {
    data = data.filter((item) => item.type === Type);
  }
  console.log(data);

  // 'data' now contains the filtered data based on the provided criteria
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Bookings (${data.length})`}
          description="Manage Bookings from here."
        />
      </div>
      <Separator />
      <div className="flex mb-1">
        <div className="mr-2">
          <Input
            className="w-[180px]"
            type="number"
            placeholder="Room Number"
            onChange={(e) => {
              setRoomNumber(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="mr-2 w-[180px]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type A B or C" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A" onChange={() => setType("A")}>
                A
              </SelectItem>
              <SelectItem value="B" onChange={() => setType("B")}>
                B
              </SelectItem>
              <SelectItem value="C" onChange={() => setType("C")}>
                C
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <DataTable searchKey="roomNumber" columns={columns} data={data} />
    </>
  );
};
