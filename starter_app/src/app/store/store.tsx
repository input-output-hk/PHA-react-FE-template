//Zustand Imports
import { create } from "zustand";

//Local Imports
import { AlertInfo } from "./types";

export type State = {
  currentUser: string;
  alertInfo: AlertInfo; 
};

export type Actions = {
  changeAlertInfo: (alertInfo: AlertInfo) => void;
  changeActiveUser: (user: string) => void;
};

const useStore = create<State & Actions>((set) => ({
    currentUser: 'Astrid',
    alertInfo: {
      open: false,
      message: 'Transaction sent successfully!',
      severity: 'success',
    },

    changeActiveUser: (user: string) => {
      set({ currentUser: user });
    },
    
    changeAlertInfo: (partial: Partial<AlertInfo>) => {
      set((state) => ({
        alertInfo: {
          ...state.alertInfo,
          ...partial,
        },
      }));
    },
}));  

export default useStore;