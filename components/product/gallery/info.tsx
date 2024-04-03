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
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { TimePicker } from "../../ui/time-picker";
import { Booking } from "@/types";

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
  const [fromtime, setfromtime] = React.useState<string>();
  const [totime, settoTime] = React.useState<string>();

  const combineDate = (
    fromTimeString: string | undefined,
    toTimeString: string | undefined,
    fromDate: Date | undefined,
    toDate: Date | undefined
  ) => {
    if (!fromTimeString || !toTimeString || !fromDate || !toDate) {
      return null;
    }
    const [fromHours, fromMinutes, fromSeconds] = fromTimeString
      .split(":")
      .map(Number);

    // Parse time strings for to time
    const [toHours, toMinutes, toSeconds] = toTimeString.split(":").map(Number);

    // Combine from date with from time
    const fromDateWithTime: Date = new Date(fromDate);
    fromDateWithTime.setHours(fromHours, fromMinutes, fromSeconds);

    // Combine to date with to time
    const toDateWithTime: Date = new Date(toDate);
    toDateWithTime.setHours(toHours, toMinutes, toSeconds);

    const date: { from: Date; to: Date } = {
      from: fromDateWithTime,
      to: toDateWithTime,
    };
    return date;
  };

  function calculateHourGap(
    fromDate: Date | undefined,
    toDate: Date | undefined
  ): number {
    // Calculate the difference in milliseconds between the two dates

    if (!fromDate || !toDate) {
      return 0;
    }
    const timeDifferenceMs: number = toDate.getTime() - fromDate.getTime();

    // Convert milliseconds to hours
    const hourGap: number = timeDifferenceMs / (1000 * 60 * 60);

    return hourGap;
  }
  const happy = combineDate(fromtime, totime, date?.from, date?.to);
  const hourGap = calculateHourGap(happy?.from, happy?.to);

  function findCoincidingBookings(
    bookings: Booking[] | undefined,
    fromTime: Date | undefined,
    toTime: Date | undefined
  ) {
    if (!bookings || !fromTime || !toTime) {
      return null; // Return null if any of the parameters are undefined
    }

    const coincidingBookings: Booking[] = [];

    bookings.forEach((booking) => {
      if (booking.isCancelled) return;
      const bookedFrom = new Date(booking.bookedFrom);
      const bookedTo = new Date(booking.bookedTo);

      // Check if the booking overlaps with the given time range
      if (
        (bookedFrom <= toTime && bookedTo >= fromTime) ||
        (bookedFrom >= fromTime && bookedFrom <= toTime)
      ) {
        coincidingBookings.push(booking);
      }
    });

    return coincidingBookings; // Return the array of coinciding bookings
  }

  const coinsidingBooking = findCoincidingBookings(
    data.bookings,
    happy?.from,
    happy?.to
  );

  const onSubmit = async (fromData: z.infer<typeof FormSchema>) => {
    const happy = combineDate(fromtime, totime, date?.from, date?.to);
    const dataToSend = {
      ...fromData,
      productId: data.id,
      dates: happy,
      price: data.price * Math.floor(hourGap),
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
                      onChange={(value) => setfromtime(value.toString())}
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
                      onChange={(value) => settoTime(value.toString())}
                    />
                  </FormControl>
                  {hourGap < 0 && (
                    <FormDescription className="text-red-500">
                      Error: Check-out time cannot be before check-in time.
                      Adjust your booking details.
                    </FormDescription>
                  )}
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
                        <SelectItem
                          value={room.toString()}
                          key={room}
                          {...(coinsidingBooking?.find(
                            (booking) => booking.roomNumber === room
                          ) && { disabled: true })}
                        >
                          {room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {data.roomNumber.map((room) =>
                    coinsidingBooking?.find(
                      (booking) => booking.roomNumber === room
                    ) ? (
                      <FormDescription key={room}>
                        Room number {room} is already booked for the selected
                        dates
                      </FormDescription>
                    ) : null
                  )}

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
                    Rs.{data.price}/- per Hour * {Math.floor(hourGap)} Hours ={" "}
                    <span className="font-bold">
                      Rs.
                      {data.price * Math.floor(hourGap)}/-
                    </span>
                  </span>
                ) : (
                  <h2> Rs 0.00/-</h2>
                )}
              </span>
            </div>
            <Button type="submit" disabled={hourGap < 0}>
              Book Now
            </Button>
          </form>
        </Form>
      </div>
        
    </>
  );
};

export default Info;
