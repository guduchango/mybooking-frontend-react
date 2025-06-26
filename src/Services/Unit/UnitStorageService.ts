import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { UnitInterface } from '../../Models/Unit/UnitInterface';

export class UnitStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(unit: UnitInterface) {
        this.transaction('rw', this.units, async () => {

            if ((await this.units.where({ uni_id: unit.uni_id }).count()) === 0) {
                const id = await this.units.add(
                    unit
                );
                console.log(`Added unit with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(uni_id: number, unit:UnitInterface){
        this.transaction('rw', this.units, async () => {
            if ((await this.units.where({ uni_id: unit.uni_id }).count()) !== 0) {
                const id = await this.units.update(
                    uni_id,
                    unit
                );
                console.log(`Updated unit with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(uni_id: number) {
        return await this.units.where({ uni_id: uni_id }).first() as UnitInterface
    }

    async getAll(){
        return await this.units.toArray()
    }

    async getFirst() {
        return await this.units.toCollection().first();
    }

}