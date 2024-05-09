import { create } from "zustand";

export interface EventSouvenirStore {
  totalVoucher: number;
  totalRedeemed: number;
}

export const useEventSouvenirStore = create<EventSouvenirStore>(() => ({
  totalVoucher: 0,
  totalRedeemed: 0,
}));
