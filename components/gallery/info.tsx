"use client";

import { Product } from "@/types";
import React, { useState } from "react";
import Currency from "../ui/currency";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { DateRangePicker as Datee } from "react-date-range";
import { DateRangePicker } from "rsuite";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Input } from "../ui/input";
interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handelSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const toggleRoomSelection = (room: number) => {
    if (selectedRooms.includes(room)) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms([room]);
    }
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
    timePicker: true,
  };
  console.log(selectedRooms);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between ">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <div className="flex flex-col gap-y-6">
        <hr className="my-4" />
        <div className="flex items-center gap-x-4">
          <span>
            <h4 className="font-semibold">Enter Customer Name</h4>
          </span>

          <Input className="flex" />
        </div>
        <div className="flex items-center gap-x-4">
          <span>
            <h4 className="font-semibold">Enter Customer Email</h4>
          </span>

          <Input className="flex" />
        </div>
        <div className="flex items-center gap-x-4">
          <span>
            <h4 className="font-semibold">Room Number</h4>
            <span className="text-gray-900 dark:text-white font-sm text-xs">
              Select room number to be offerd to customer{" "}
            </span>
          </span>

          {data.roomNumber.map((room) => (
            <Button
              key={room}
              className={`flex items-center gap-x-3 `}
              variant={selectedRooms.includes(room) ? "default" : "outline"}
              onClick={() => toggleRoomSelection(room)}
            >
              {room}
            </Button>
          ))}
        </div>
        <div>
          <span>
            <h4 className="font-semibold mb-2">Select date</h4>
          </span>
          {/* <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#808080"]}
            onChange={handelSelect}
          /> */}
          <DateRangePicker
            format={"MM/dd/yyyy HH:mm "}
            showOneCalendar
            placeholder={"Select Check In and Check Out Time"}
            onChange={(value) => console.log(value)}
          />
        </div>
        <hr className="my-4" />
        <div className="flex items-center gap-x-3">
          <Button className="flex items-center gap-x-2">
            Book Now <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
