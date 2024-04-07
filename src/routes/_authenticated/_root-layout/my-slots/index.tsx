import { BookingCard } from "@/components/template/booking-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";
import { ESidesheet, useSidesheet } from "@/store/sidesheet";
import { useSlots } from "@/store/slots";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { StarsIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_root-layout/my-slots/")({
  component: MySlots,
  beforeLoad() {
    const { user } = useAuth.getState();

    if (user?.role_type !== "provider")
      throw redirect({
        to: "/",
      });
  },
});

function MySlots() {
  const slots = useSlots((state) => state.mySlots);
  const openSidesheet = useSidesheet((state) => state.openSidesheet);
  return (
    <div className="my-5">
      <h1 className="mb-2 flex items-center gap-2 text-3xl font-bold">
        <StarsIcon className="text-yellow-500 dark:text-yellow-300" /> My
        Parking Slots
      </h1>
      <Button
        className="mb-4"
        onClick={() => openSidesheet(ESidesheet.ADD_SLOT)}
      >
        Add New Slot
      </Button>
      <section className="grid grid-cols-5 gap-2">
        {!slots?.length && <p>You don't have any slots.</p>}
        {slots?.map((slot) => (
          <BookingCard key={slot.id} showActions hideBookNow {...slot} />
        ))}
      </section>
    </div>
  );
}
