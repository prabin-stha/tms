import { createFileRoute } from "@tanstack/react-router";

import { BookingCard } from "@/components/template/booking-card";
import { useSlots } from "@/store/slots";
import { FilterX, StarsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllParkSlots } from "@/lib/services/slots";
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { allSlots: slots, setSlots } = useSlots(({ allSlots, setSlots }) => ({
    allSlots,
    setSlots,
  }));

  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get("status");

    if (status) {
      if (status === "Completed") {
        setOpen(true);
        setMessage("Payment sucessfully done.");
      } else if (failedStatus.includes(status)) {
        setOpen(true);
        setMessage("Could not process your transaction!");
      }
      clearSearchParams();
    }
  }, []);

  const filterList = async (address?: string, type?: string) => {
    try {
      const slots = await getAllParkSlots(address, type);
      setSlots(slots);
    } catch (err) {
      // handle err
    }
  };

  return (
    <div className="my-5">
      <div className="flex justify-between gap-3 items-center mb-2">
        <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold">
          <StarsIcon className="text-yellow-500 dark:text-yellow-300" /> Hurry
          up and book your spot!
        </h1>
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Filter by address"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                filterList(searchText, selectedType);
              }
            }}
          />
          <Select
            onValueChange={(type) => {
              setSelectedType(type);
              filterList(searchText, type);
            }}
            value={selectedType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Car">Car</SelectItem>
              <SelectItem value="Bike">Bike</SelectItem>
              <SelectItem value="Truck">Truck</SelectItem>
              <SelectItem value="Van">Van</SelectItem>
              <SelectItem value="Bus">Bus</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setSearchText("");
              setSelectedType("");
              filterList();
            }}
          >
            <FilterX className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>
      <section className="grid grid-cols-5 gap-2">
        {!slots?.length && <p>No parking slots found.</p>}
        {slots?.map((slot) => <BookingCard key={slot.id} {...slot} />)}
      </section>
      <PaymentStatusDialog open={open} setOpen={setOpen} message={message} />
    </div>
  );
}

function PaymentStatusDialog({
  open,
  setOpen,
  message,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Khalti Payment Status</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
