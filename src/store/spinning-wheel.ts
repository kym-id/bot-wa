import { WheelDataType } from "@boriska420/react-custom-roulette";
import { toast } from "sonner";
import { create } from "zustand";

export interface SpinningWheelStore {
  spin: boolean;
  data: WheelDataType[];
  prizeNumber: number;
  showPrize: boolean;
}

interface SpinningWheelAction {
  startSpin: () => void;
  setSpin: (s: boolean) => void;
  setData: (data: WheelDataType[]) => void;
  showingPrize: () => void;
  reset: () => void;
}

export const useSpinningWheelStore = create<
  SpinningWheelStore & SpinningWheelAction
>((set, get) => ({
  spin: false,
  data: [],
  prizeNumber: 0,
  showPrize: false,
  startSpin: () => {
    if (!get().spin && !get().showPrize) {
      console.log(`Spin`);
      const newPrizeNumber = Math.floor(Math.random() * get().data.length);
      set({ spin: true, prizeNumber: newPrizeNumber, showPrize: false });
    } else {
      toast.error(`Anda hanya diperkenankan mengundi 1 kali`);
    }
  },
  setSpin: (spin) => {
    set({ spin });
  },
  setData: (data) => {
    set({ data });
  },
  showingPrize: () => {
    set({ showPrize: true });
  },
  reset: () => {
    if (!get().spin) {
      set({ showPrize: false });
    }
  },
}));
