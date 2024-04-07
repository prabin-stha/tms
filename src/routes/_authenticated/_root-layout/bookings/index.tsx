import { BookedCard } from "@/components/template/booked-card";
import { useSlots } from "@/store/slots";
import { createFileRoute } from "@tanstack/react-router";
import { StarsIcon } from "lucide-react";

export const Route = createFileRoute(
  "/_authenticated/_root-layout/bookings/"
)({
  component: Cart,
});

function Cart() {
  const bookings = useSlots((state) => state.myBookings);

  return (
    <div className="my-5">
      <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold">
        <StarsIcon className="text-yellow-500 dark:text-yellow-300" /> My
        Bookings
      </h1>
      {!bookings?.length && <p>You don't have any bookings yet.</p>}
      <section className="grid grid-cols-5 gap-2 w-100">
        {bookings?.map((booking) => (
          <BookedCard key={booking.id} {...booking} />
        ))}
      </section>
    </div>
  );
}
