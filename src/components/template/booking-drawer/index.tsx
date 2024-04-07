import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BookingCardProps } from "../booking-card";
import { ESidesheet, useSidesheet } from "@/store/sidesheet";
import { UserRating } from "../user-rating";

export function BookingDrawer(props: BookingCardProps) {
  const {
    id,
    status,
    price,
    address,
    description,
    type,
    picture,
    rating,
    showRating,
    hideBookNow,
  } = props;

  const { openSidesheet } = useSidesheet();

  return (
    <Drawer>
      <DrawerTrigger>
        <Button className="px-3 py-1 h-7 text-xs font-bold">View More</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="pb-1">{address}</DrawerTitle>
          <Badge
            className="w-fit"
            variant={
              status.toLowerCase() === "available" ? "secondary" : "destructive"
            }
          >
            {status}
          </Badge>

          <div className="flex mt-3">
            <div className="w-1/4">
              <img
                src={picture}
                alt="parking"
                className="w-full h-60 object-cover rounded-sm"
              />
              <div className="flex justify-between gap-2 mt-2">
                <Badge variant="secondary" className="w-fit">
                  {type}
                </Badge>
                <span className="text-xs inline-block self-start">
                  <span className="text-sm font-bold text-green-700 dark:text-green-500">
                    &#8360;{price}
                  </span>{" "}
                  /hr
                </span>
              </div>
            </div>
            <div className="px-4">
              <DrawerDescription>{description}</DrawerDescription>
              <UserRating
                readOnly={!showRating}
                initialRating={rating}
                id={id}
              />
            </div>
          </div>
        </DrawerHeader>
        <DrawerFooter className="flex flex-row justify-end pt-0">
          <DrawerClose>
            {!hideBookNow && (
              <Button
                className="mr-2"
                onClick={() => {
                  openSidesheet(ESidesheet.BOOK_SLOT, {
                    data: {
                      park_slot_id: id,
                      rate: price,
                    },
                  });
                }}
              >
                Book Now
              </Button>
            )}
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
