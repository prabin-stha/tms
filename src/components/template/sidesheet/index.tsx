import { ESidesheet, useSidesheet } from "@/store/sidesheet";
import { Sheet } from "@/components/ui/sheet";
import { AddSlotSidesheet } from "./add-slot-sidesheet";
import { BookingSidesheet } from "./booking-sidesheet";

export function SideSheet() {
  const { sidesheet, closeSidesheet } = useSidesheet(
    ({ sidesheet, closeSidesheet }) => ({
      sidesheet,
      closeSidesheet,
    })
  );

  return (
    <Sheet open={Boolean(sidesheet)} onOpenChange={closeSidesheet}>
      {sidesheet === ESidesheet.ADD_SLOT && <AddSlotSidesheet />}
      {sidesheet === ESidesheet.BOOK_SLOT && <BookingSidesheet />}
    </Sheet>
  );
}
