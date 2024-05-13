import { WheelDataType } from "@boriska420/react-custom-roulette";
import { toast } from "sonner";
import { create } from "zustand";
import { weightedRandom } from "~/lib/other";

export type RawWheelData = WheelDataType & { total: number };

export interface SpinningWheelStore {
  spin: boolean;
  rawData: RawWheelData[];
  data: WheelDataType[];
  prizeNumber: number;
  showPrize: boolean;
}

interface SpinningWheelAction {
  startSpin: () => void;
  setSpin: (s: boolean) => void;
  setRawData: (data: RawWheelData[]) => void;
  setData: (data: WheelDataType[]) => void;
  showingPrize: () => void;
  reset: () => void;
}

function convertRawDataToData(raw: RawWheelData[]): WheelDataType[] {
  const data = raw.filter((d) => d.total > 0);
  if (data.length > 3) return data;
  return [...data, ...data];
}

export const useSpinningWheelStore = create<
  SpinningWheelStore & SpinningWheelAction
>((set, get) => ({
  spin: false,
  rawData: [],
  data: [],
  prizeNumber: 0,
  showPrize: false,
  startSpin: () => {
    if (!get().spin && !get().showPrize) {
      console.log(`Spin`);
      const rawData = get().rawData.filter((d) => d.total > 0);
      const weights = rawData.map((d) => d.total);
      const selected = weightedRandom(rawData, weights);

      if (selected.index === -1) {
        toast.error(`Error spinning`);
        return;
      }

      const newPrizeNumber = selected.index;
      const data = get().data;
      if (data[newPrizeNumber].option === selected.item.option) {
        const newRawData = rawData.map((d) => {
          if (d.option === selected.item.option) {
            return { ...d, total: d.total - 1 };
          }
          return d;
        });
        set({
          spin: true,
          prizeNumber: newPrizeNumber,
          showPrize: false,
          rawData: newRawData,
        });
      } else {
        toast.error(`Different prize`);
      }
    } else {
      toast.error(`Anda hanya diperkenankan mengundi 1 kali`);
    }
  },
  setSpin: (spin) => {
    set({ spin });
  },
  setRawData: (rawData) => {
    const data = convertRawDataToData(rawData);
    set({ rawData, data });
  },
  setData: (data) => {
    // set({ data });
  },
  showingPrize: () => {
    set({ showPrize: true });
  },
  reset: () => {
    if (!get().spin) {
      const data = convertRawDataToData(get().rawData);
      set({ showPrize: false, data });
    }
  },
}));
