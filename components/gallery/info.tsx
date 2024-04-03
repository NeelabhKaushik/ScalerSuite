"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TimePicker } from "../ui/time-picker";

interface InfoProps {
  data: Product;
}
const FormSchema = z.object({
  dates: z.any(),
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  guests: z.string().min(1),
  roomNo: z.string().min(1),
  fromTime: z.any(),
  toTime: z.any(),
});

const Info: React.FC<InfoProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
  });
  const [fromTime, setfromTime] = useState({ from: new Date() });
  const [toTime, settoTime] = useState({ to: new Date() });
  const fromDate = new Date(date?.from || "");
  const toDate = new Date(date?.to || "");

  const FromTime = fromTime;
  const ToTime = toTime;
  const combinedFromDate = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate(),
    FromTime.from.getHours(),
    FromTime.from.getMinutes(),
    FromTime.from.getSeconds(),
    FromTime.from.getMilliseconds()
  );

  const combinedToDate = new Date(
    toDate.getFullYear(),
    toDate.getMonth(),
    toDate.getDate(),
    ToTime.to.getHours(),
    ToTime.to.getMinutes(),
    ToTime.to.getSeconds(),
    ToTime.to.getMilliseconds()
  );
  function calculateHourGap(fromDate: Date, toDate: Date): number {
    const millisecondsPerHour = 1000 * 60 * 60; // Number of milliseconds in an hour

    // Convert both dates to milliseconds
    const fromTime = fromDate.getTime();
    const toTime = toDate.getTime();

    // Calculate the difference in milliseconds
    const timeDifference = Math.abs(toTime - fromTime);

    // Calculate the hour gap
    const hourGap = Math.floor(timeDifference / millisecondsPerHour);

    return hourGap;
  }

  // Example usage
  const hourGap = calculateHourGap(combinedFromDate, combinedToDate);

  console.log(date?.from, date?.to);
  const onSubmit = async (fromData: z.infer<typeof FormSchema>) => {
    form.setValue("dates", date);
    const dataToSend = {
      ...fromData,
      productId: data.id, // Assuming data contains the product ID
      dates: date, // Assuming date is in the required format for the server
    };
    try {
      setLoading(true);
      await axios.post(`/api/bookings`, dataToSend);
      router.refresh();
      router.push(`/bookings`);
      toast.success("Room Booked :)");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="md:grid md:grid-cols-1 gap-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Guest name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter guest's email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dates"
              render={({ ...field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick a Date</FormLabel>
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
                        onSelect={(selectedDate) => setDate(selectedDate)}
                        selected={date}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select A Check In and Check Out Date
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fromTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check In Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      disabled={loading}
                      {...field}
                      aria-label="from-time"
                      onChange={() => setfromTime(fromTime)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Out Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      disabled={loading}
                      {...field}
                      aria-label="to-time"
                      onChange={() => settoTime(toTime)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"Select Number of Guests"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Number Of Guests" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    No more than 5 members are allowed in a room{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Number</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Room Number" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.roomNumber.map((room) => (
                        <SelectItem value={room.toString()} key={room}>
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Room Number </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-blueGray-500 bg-transparent border border-solid border-blueGray-500 text-lg px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
              <span>
                <h2 className="flex flex-col font-bold text-lg ">
                  Total Bill :{" "}
                </h2>
                {hourGap > 0 ? (
                  <span>
                    Rs.{data.price}/- per Hour * {hourGap} Hours ={" "}
                    <span className="font-bold">
                      Rs.
                      {data.price * hourGap}
                    </span>
                  </span>
                ) : (
                  <h2> Rs 0.00/-</h2>
                )}
              </span>
            </div>
            <Button type="submit">Book Now</Button>
          </form>
        </Form>
      </div>
        
    </>
  );
};

export default Info;
