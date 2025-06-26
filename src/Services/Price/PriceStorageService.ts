import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { CalendarEvent, PriceInterface } from '../../Models/Price/PriceInterface';
import { newDate, newObj } from "../../Utils/GeneralFunctions";

export class PriceStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(price: PriceInterface) {
        this.transaction('rw', this.prices, async () => {

            if ((await this.prices.where({ pri_id: price.pri_id }).count()) === 0) {
                const id = await this.prices.add(
                    price
                );
                console.log(`Added price with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(pri_id: number, price:PriceInterface){
        this.transaction('rw', this.prices, async () => {
            if ((await this.prices.where({ pri_id: price.pri_id }).count()) !== 0) {
                const id = await this.prices.update(
                    pri_id,
                    price
                );
                console.log(`Updated price with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(pri_id: number) {
        return await this.prices.where({ pri_id: pri_id }).first()
    }

    async getAll(){
        return await this.prices.toArray()
    }

    async createOrUpdate(price: PriceInterface){
        console.log(price);
        const priId = price.pri_id;

        const findPrice = await this.getById(priId);
        console.log('findPrice',findPrice)

        if(findPrice === undefined){
            await this.create(price)
        }else{
            await this.update(priId,price);
        }

        return price;
    }

    async  calculateTotal (uni_id: number, check_in: string, check_out: string) {

        console.log('caltotal_check-in',check_in)
        console.log('caltotal_check-out',check_out)
        console.log('uni_id',uni_id);

        const total = await this.prices
            .where('pri_uni_id')
            .equals(uni_id)
            .and(record => record.pri_date >= check_in && record.pri_date < check_out)
            .toArray()
            .then(records => records.reduce((sum, record) => sum + record.pri_price, 0));

        return total;
    }

    async getPriceByUnit(uni_id: number){

        return await this.prices
            .where('pri_uni_id')
            .equals(uni_id)
            .toArray()
    }

    async getDatesPriceArray(uni_id: number, check_in: string, check_out: string){

        const total = await this.prices
            .where('pri_uni_id')
            .equals(uni_id)
            .and(record => record.pri_date >= check_in && record.pri_date < check_out)
            .toArray();

        return total;
    }

    async getPriceUnitEvent(uni_id: number){
        const pricesByUnit = await this.getPriceByUnit(uni_id)
        const events: CalendarEvent[] = [];
        for(const item of pricesByUnit){
            const event: CalendarEvent = newObj<CalendarEvent>()
            event.start = newDate(item.pri_date);
            event.end = newDate(item.pri_date);
            event.title = `$${String(item.pri_price)}`
            event.color = "#ccc"
            events.push(event);
        }

        return  events;
    }

}
