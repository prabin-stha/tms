import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { BookedSlot, Slot } from "@/lib/schema/user";

interface SLotState {
  allSlots: Slot[] | null;
  mySlots: Slot[] | null;
  myBookings: BookedSlot[] | null;
}

interface SlotActions {
  setSlots: (slots: Slot[]) => void;
  setMySlots: (slots: Slot[]) => void;
  deleteSlot: (id: number) => void;
  createSlot: (slot: Slot) => void;
  updateSlot: (slot: Slot) => void;
  setMyBookings: (bookings: BookedSlot[]) => void;
  setBooking: (booking: BookedSlot) => void;
}

export const useSlots = create<SLotState & SlotActions>()(
  immer((set, get) => ({
    allSlots: null,
    mySlots: null,
    myBookings: null,
    setSlots(slots) {
      set((state) => {
        state.allSlots = slots;
      });
    },
    setMySlots(slots) {
      set((state) => {
        state.mySlots = slots;
      });
    },
    deleteSlot(id) {
      set((state) => {
        const { allSlots, mySlots } = get();
        if (allSlots)
          state.allSlots = allSlots.filter((slot) => slot.id !== id);
        if (mySlots) state.mySlots = mySlots.filter((slot) => slot.id !== id);
      });
    },
    createSlot(slot) {
      set((state) => {
        state.allSlots?.unshift(slot);
        state.mySlots?.unshift(slot);
      });
    },
    updateSlot(slot) {
      set((state) => {
        const { allSlots, mySlots } = get();
        if (allSlots)
          state.allSlots = allSlots.map((s) => {
            if (s.id === slot.id) return slot;
            return s;
          });
        if (mySlots)
          state.mySlots = mySlots.map((s) => {
            if (s.id === slot.id) return slot;
            return s;
          });
      });
    },
    setMyBookings(bookings) {
      set((state) => {
        state.myBookings = bookings;
      });
    },
    setBooking(booking) {
      set((state) => {
        state.myBookings?.push(booking);
      });
    },
  }))
);
