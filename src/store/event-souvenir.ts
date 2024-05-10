import { create } from "zustand";

export interface EventSouvenirStore {
  key: string;
  totalVoucher: number;
  totalRedeemed: number;
}

interface EventSouvenirAction {
  setTotalVoucher: (n: number) => void;
}

export const useEventSouvenirStore = create<
  EventSouvenirStore & EventSouvenirAction
>((set) => ({
  key: "",
  totalVoucher: 0,
  totalRedeemed: 0,
  setTotalVoucher: (n) => {
    set({ totalVoucher: n });
  },
}));
