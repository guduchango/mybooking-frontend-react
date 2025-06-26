
import { createContext,useContext, useEffect, useState } from 'react';
import { GuestInterface } from '../Models/Guest/GuestInterface.ts';
import { ReservationInterface } from '../Models/Reservation/ReservationInterface.ts';
//import { ExpenseInterface } from '../Models/Expense/ExpenseInterface.ts';
//import { PriceInterface } from '../Models/Price/PriceInterface.ts';
//import { PromotionInterface } from '../Models/Promotion/PromotionInterface.ts';
import { UnitInterface } from '../Models/Unit/UnitInterface.ts';
//import { CurrencyInterface } from '../Models/Currency/CurrencyInterface.ts';
import { SyncService } from '../Services/SyncService.ts';
import { newObj } from '../Utils/GeneralFunctions.ts';
import { UserInterface } from '../Models/User/UserInterface.ts';
import { UnitPriceInterface } from '../Models/Unit/UnitPriceInterface.ts';
import { UnitAvailableInterface } from '../Models/Unit/UnitAvailableInterface.ts';
import { PromotionInterface } from '../Models/Promotion/PromotionInterface.ts';
import i18n from '../i18n.ts';

interface GlobalContextProps {
  //objects
  reservation: ReservationInterface,
  setReservation: (item: ReservationInterface) => void; 
  guest: GuestInterface,
  setGuest: (item: GuestInterface) => void; 
  unit: UnitInterface,
  setUnit: (item: UnitInterface) => void; 
  availableUnits: UnitInterface[],
  setAvailableUnits: (item: UnitInterface[]) => void; 
  unitAvailableRequest: UnitAvailableInterface,
  setUnitAvailableRequest: (item: UnitAvailableInterface) => void; 
  unitPrice: UnitPriceInterface,
  setUnitPrice: (item: UnitPriceInterface) => void;
  resId: number,
  setResId: (item: number) => void;
  isReservationSeted: boolean,
  setIsReservationSeted: (item: boolean) => void;
  user: UserInterface,
  setUser: (item: UserInterface) => void;
  promotion: PromotionInterface,
  setPromotion: (item: PromotionInterface) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

type Props = {
  children?: React.ReactNode
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const GlobalContextProvider = ({ children }: Props) => {
  //Objects
  const [reservation,setReservation] = useState<ReservationInterface>(newObj<ReservationInterface>());
  const [unit,setUnit] = useState<UnitInterface>(newObj<UnitInterface>());
  const [guest,setGuest] = useState<GuestInterface>(newObj<GuestInterface>());
  const [availableUnits,setAvailableUnits] = useState<UnitInterface[]>(newObj<UnitInterface[]>());
  const [unitAvailableRequest, setUnitAvailableRequest] = useState<UnitAvailableInterface>(newObj<UnitAvailableInterface>);
  const [unitPrice, setUnitPrice] = useState<UnitPriceInterface>(newObj<UnitPriceInterface>);
  const [resId, setResId] = useState<number>(0)
  const [isReservationSeted, setIsReservationSeted] = useState<boolean>(false)
  const [user, setUser] = useState<UserInterface>(newObj<UserInterface>);
  const [promotion, setPromotion] = useState<PromotionInterface>(newObj<PromotionInterface>);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const getData = async () => {
    const syncService = new SyncService();
    await syncService.setTables();
  }
 
  useEffect(() => {
    i18n.changeLanguage('en');
    getData();
  },[unitPrice]);

  const contextValue: GlobalContextProps = {
    reservation,
    setReservation,
    guest,
    setGuest,
    unit,
    setUnit,
    availableUnits,
    setAvailableUnits,
    unitAvailableRequest,
    setUnitAvailableRequest,
    unitPrice,
    setUnitPrice,
    resId,
    setResId,
    isReservationSeted,
    setIsReservationSeted,
    user,
    setUser,
    promotion,
    setPromotion,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}


export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a useGlobalProvider"
    );
  }
  return context;
}