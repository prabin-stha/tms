import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { bookSlot } from "@/lib/services/slots";
import { useSidesheet } from "@/store/sidesheet";

const isFutureDate = (date: Date) => date > new Date();
const isEndTimeGreaterThanStartTime = (startTime: Date, endTime: Date) =>
  endTime > startTime;

const formSchema = z
  .object({
    park_slot_id: z.number().optional(),
    start_time: z.string().refine((value) => isFutureDate(new Date(value)), {
      message: "Start date time must be greater than time right now!",
    }),
    end_time: z.string(),
  })
  .refine(
    ({ start_time, end_time }) =>
      isEndTimeGreaterThanStartTime(new Date(start_time), new Date(end_time)),
    {
      message: "End date must be greater than start time!",
      path: ["end_time"],
    }
  );
export type BookingSlot = z.infer<typeof formSchema>;

export function BookingSidesheet() {
  const { toast } = useToast();
  const { closeSidesheet, payload } = useSidesheet(
    ({ closeSidesheet, payload }) => ({ closeSidesheet, payload })
  );

  const form = useForm<BookingSlot>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: BookingSlot) => {
    try {
      const data = payload?.data as { park_slot_id: number };
      const booking = await bookSlot({
        ...values,
        park_slot_id: data.park_slot_id,
      });
      const khaltiUrl = booking.payment_url;
      if (khaltiUrl) {
        window.open(khaltiUrl, "_self");
      }
      // update state

      closeSidesheet();
    } catch (err) {
      toast({
        title: "Booking Failure",
        description: "Error booking slot!",
      });
    }
  };

  const data = payload?.data as { rate: number };
  const price = (() =>
    calculateCost(
      form.getValues("start_time"),
      form.getValues("end_time"),
      data.rate
    ))();

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Claim your parking slot.</SheetTitle>
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input required type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input required type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <span className="text-sm inline-block self-start">
                  Total Price:&nbsp;
                  <span className="text-sm font-bold text-green-700 dark:text-green-500">
                    &#8360;{price}
                  </span>
                </span>
              </div>
              <Button
                className="bg-[#5c2d91] hover:bg-[#4d257a] w-full"
                type="submit"
              >
                Pay via Khalti
              </Button>
            </form>
          </Form>
        </CardContent>
      </SheetHeader>
    </SheetContent>
  );
}

function calculateCost(
  startTime: string,
  endTime: string,
  rate: number
): number {
  if (!startTime || !endTime || !rate) return 0;
  const start = new Date(startTime);
  const end = new Date(endTime);

  const durationMs = end.getTime() - start.getTime();

  const durationHours = durationMs / (1000 * 60 * 60);

  const cost = durationHours * rate;

  return Math.round(cost * 100) / 100;
}
