import { Slot } from "@/lib/schema/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export enum ESidesheet {
  ADD_SLOT = "ADD_SLOT",
  BOOK_SLOT = "BOOK_SLOT",
}

export interface SideSheetPayload {
  isEditing?: boolean;
  data: SideSheetData;
}

interface SidesheetState {
  sidesheet: ESidesheet | null;
  payload?: SideSheetPayload | null;
}

type SideSheetData = Slot | { park_slot_id: number; rate: number };

interface SidesheetActions {
  openSidesheet: (sidesheet: ESidesheet, data?: SideSheetPayload) => void;
  closeSidesheet: () => void;
}

export const useSidesheet = create<SidesheetState & SidesheetActions>()(
  immer((set) => ({
    sidesheet: null,
    payload: null,
    openSidesheet: (sidesheet, payload) => {
      set((state) => {
        state.sidesheet = sidesheet;
        state.payload = payload;
      });
    },
    closeSidesheet: () => {
      set((state) => {
        state.sidesheet = null;
      });
    },
  }))
);
