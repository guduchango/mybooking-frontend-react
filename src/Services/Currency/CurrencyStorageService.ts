import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { CurrencyInterface } from '../../Models/Currency/CurrencyInterface';

export class CurrencyStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(expense: CurrencyInterface) {
        this.transaction('rw', this.currencies, async () => {

            if ((await this.currencies.where({ cur_id: expense.cur_id }).count()) === 0) {
                const id = await this.currencies.add(
                    expense
                );
                console.log(`Added expense with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(cur_id: number, expense:CurrencyInterface){
        this.transaction('rw', this.currencies, async () => {
            if ((await this.currencies.where({ cur_id: expense.cur_id }).count()) !== 0) {
                const id = await this.currencies.update(
                    cur_id,
                    expense
                );
                console.log(`Updated expense with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(cur_id: number) {
        return await this.currencies.where({ cur_id: cur_id }).first()
    }

    async getAll(){
        return await this.currencies.toArray()
    }

}