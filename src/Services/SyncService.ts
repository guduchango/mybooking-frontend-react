import { CurrencyInterface } from "../Models/Currency/CurrencyInterface";
import { ExpenseInterface } from "../Models/Expense/ExpenseInterface";
import { GuestInterface } from "../Models/Guest/GuestInterface";
import { PriceInterface } from "../Models/Price/PriceInterface";
import { PromotionInterface } from "../Models/Promotion/PromotionInterface";
import { ReservationInterface } from "../Models/Reservation/ReservationInterface";
import { UnitInterface } from "../Models/Unit/UnitInterface";
import { CurrencyHttpService } from "./Currency/CurrencyHttpService";
import { CurrencyStorageService } from "./Currency/CurrencyStorageService";
import { ExpenseStorageService } from "./Expense/ExpenseStorageService";
import { ExpenseHttpService } from "./Expense/ExpensetHttpService";
import { GuestHttpService } from "./Guest/GuestHttpService";
import { GuestStorageService } from "./Guest/GuestStorageService";
import { PriceStorageService } from "./Price/PriceStorageService";
import { PriceHttpService } from "./Price/PriceHttpService";
import { PromotionStorageService } from "./Promotion/PromotionStorageService";
import { PromotionHttpService } from "./Promotion/PromotiontHttpService";
import { ReservationHttpService } from "./Reservation/ReservationHttpService";
import { ReservationStorageService } from "./Reservation/ReservationStorageService";
import { UnitHttpService } from "./Unit/UnitHttpService";
import { UnitStorageService } from "./Unit/UnitStorageService";
import { GuestModel } from "../Models/Guest/GuestModel";

export class SyncService {

    httpUnitItems: UnitInterface[]
    httpExpenseItems: ExpenseInterface[]
    httpCurrencyItems: CurrencyInterface[]
    httpReservationItems: ReservationInterface[]
    httpGuestItems: GuestModel[]
    httpPromotionItems: PromotionInterface[]
    httpPriceItems: PriceInterface[]

    storageUnitItems: UnitInterface[]
    storageExpenseItems: ExpenseInterface[]
    storageCurrencyItems: CurrencyInterface[]
    storageReservationItems: ReservationInterface[]
    storageGuestItems: GuestInterface[]
    storagePromotionItems: PromotionInterface[]
    storagePriceItems: PriceInterface[]

    /* HTTP service variables */

    get getHttpUnitItems(): UnitInterface[]{
        return this.httpUnitItems;
    }

    get getHttpExpenseItems(): ExpenseInterface[]{
        return this.httpExpenseItems;
    }

    get getHttpCurrencyItems(): CurrencyInterface[]{
        return this.httpCurrencyItems;
    }

    get getHttpReservationItems(): ReservationInterface[]{
        return this.httpReservationItems;
    }

    get getHttpGuestItems(): GuestInterface[]{
        return this.httpGuestItems;
    }

    get getHttpPromotionItems(): PromotionInterface[]{
        return this.httpPromotionItems;
    }

    get getHttpPriceItems(): PriceInterface[]{
        return this.httpPriceItems;
    }

    /* Storage Service variables */

    get getStorageUnitItems() {
        return this.storageUnitItems
    }

    get getStorageExpenseItems() {
        return this.storageExpenseItems;
    }

    get getStorageCurrencyItems(){
        return this.storageCurrencyItems;
    }

    get getStoragePromotionItems() {
        return this.storagePromotionItems;
    }

    get getStorageGuestItems(){
        return this.storageGuestItems;
    }

    get getStorageReservationItems() {
        return this.storageReservationItems;
    }

    get getStoragePriceItems(){
        return this.storagePriceItems;
    }



    async setTables(){

        /* Http variables  */
        const unitHttpService = new UnitHttpService();
        const expenseHttpService = new ExpenseHttpService();
        const currencyHttpService = new CurrencyHttpService();
        const reservationHttpService = new ReservationHttpService();
        const guestHttpService  = new GuestHttpService();
        const promotionHttpService  = new PromotionHttpService();
        const priceHttpService = new PriceHttpService();
        /* Storage variables */
        const unitStorageService = new UnitStorageService();
        const expenseStorageService = new ExpenseStorageService();
        const currencyStorageService = new CurrencyStorageService();
        const reservationStorageService = new ReservationStorageService();
        const guestStorageService = new GuestStorageService();
        const promotionStorageService = new PromotionStorageService();
        const priceStorageService = new PriceStorageService();

        this.httpUnitItems = await unitHttpService.getUnits();
        for(const item of this.httpUnitItems ){
            await unitStorageService.create(item)
        }
        //this.storageUnitItems = await unitStorageService.getAll();

        this.httpExpenseItems = await expenseHttpService.getExpenses();
        for(const item of this.httpExpenseItems ){
            await expenseStorageService.create(item)
        }
        //this.storageExpenseItems = await expenseStorageService.getAll();

        this.httpCurrencyItems = await currencyHttpService.getCurrencys();
        for(const item of this.httpCurrencyItems ){
            await currencyStorageService.create(item)
        }
        //this.storageCurrencyItems = await currencyStorageService.getAll();

        this.httpReservationItems = await reservationHttpService.getReservations();
        for(const item of this.httpReservationItems ){
            await reservationStorageService.create(item)
        }
        //this.storageReservationItems = await reservationStorageService.getAll();

        this.httpGuestItems = await guestHttpService.getGuests();
        for(const item of this.httpGuestItems ){
            await guestStorageService.create(item);
        }
        //this.storageGuestItems = await guestStorageService.getAll();

        this.httpPromotionItems = await promotionHttpService.getPromotions();
        for(const item of this.httpPromotionItems ){
            await promotionStorageService.create(item);
        }
        //this.storagePromotionItems = await promotionStorageService.getAll();

        this.httpPriceItems = await priceHttpService.getPrices();
        for(const item of this.httpPriceItems ){
            await priceStorageService.create(item)
        }
        //this.storagePriceItems = await priceStorageService.getAll();
    }

  

}