import { Separator } from "@radix-ui/react-separator";
import { Heading, Trash } from "lucide-react";
import { Input } from "postcss";
import { title } from "process";
import React, { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { Button, Checkbox } from "rsuite";
import { AlertModal } from "../modals/alert-modal";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import ImageUpload from "../ui/image-upload";
import { Product } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
interface InfoProps {
  data: Product;
}

const formSchema = z.object({
  name: z.string().min(1),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  date: z
    .string()
    .min(1, { message: "mandatory" })
    // changes DD-MM-YYYY to YYYY-MM-DD
    .transform((v) => v.split("-").reverse().join("-"))
    // changes YYYY-MM-DD to YYYY-MM-DDT00:00:00.000Z
    .transform((v) => `${v}T00:00:00.000Z`)
    .pipe(z.string().datetime({ message: "incorrect format" })),
  roomNumber: z.string().min(1),
});

const infoo: React.FC<InfoProps> = ({ data }) => {
  const [loading, setLoading] = useLoading<boolean>(false);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={data.name} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Room name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Room type"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Numbers</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Room Numbers Seprated By Comma ( , )"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>On Maintainance</FormLabel>
                    <FormDescription>
                      This room will not appear anywhere in the suite.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default infoo;
