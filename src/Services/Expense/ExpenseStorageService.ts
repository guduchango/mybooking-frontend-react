import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { ExpenseInterface } from '../../Models/Expense/ExpenseInterface';

export class ExpenseStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(expense: ExpenseInterface) {
        this.transaction('rw', this.expenses, async () => {

            if ((await this.expenses.where({ exp_id: expense.exp_id }).count()) === 0) {
                const id = await this.expenses.add(
                    expense
                );
                console.log(`Added expense with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(exp_id: number, expense:ExpenseInterface){
        this.transaction('rw', this.expenses, async () => {
            if ((await this.expenses.where({ exp_id: expense.exp_id }).count()) !== 0) {
                const id = await this.expenses.update(
                    exp_id,
                    expense
                );
                console.log(`Updated expense with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(exp_id: number) {
        return await this.expenses.where({ exp_id: exp_id }).first()
    }

    async getAll(){
        return await this.expenses.toArray()
    }

}