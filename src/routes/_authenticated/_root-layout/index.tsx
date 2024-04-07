import { createFileRoute } from "@tanstack/react-router";

import { BookingCard } from "@/components/template/booking-card";
import { useSlots } from "@/store/slots";
import { StarsIcon } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const Route = createFileRoute("/_authenticated/_root-layout/")({
  component: Index,
});

const clearSearchParams = () => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const failedStatus = [
  "Expired",
  "User canceled",
  "Not found.",
  "Refunded",
  "Partially Refunded",
];

function Index() {
  const slots = useSlots((state) => state.allSlots);
  const { toast } = useToast();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get("status")?.toLowerCase();

    if (status) {
      if (status === "completed") {
        toast({
          title: "Success",
          description: "Payment sucessfully completed!",
        });
        console.log("status", status);
        // clearSearchParams();
      } else if (failedStatus.includes(status)) {
        toast({
          title: "Booking Failure",
          description: "Error processing payment!",
        });
        // clearSearchParams();
      }
    }
  }, [toast]);

  return (
    <div className="my-5">
      <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold">
        <StarsIcon className="text-yellow-500 dark:text-yellow-300" /> Hurry up
        and book your spot!
      </h1>
      <section className="grid grid-cols-5 gap-2">
        {slots?.map((slot) => <BookingCard key={slot.id} {...slot} />)}
      </section>
    </div>
  );
}
