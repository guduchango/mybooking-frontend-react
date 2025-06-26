import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { GuestModel } from "../../Models/Guest/GuestModel";

export class GuestStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(guest: GuestModel) {
        return await this.transaction('rw', this.guests, async () => {

            if ((await this.guests.where({ gue_id: guest.gue_id }).count()) === 0) {
                const id = await this.guests.add(
                    guest.toPlainObject()
                );
                console.log(`Added guests with id ${id}`);
                return new GuestModel (await this.getById(id));
            }
            return new GuestModel()
        }).catch(e => {
            console.log(e.stack || e);
            return new GuestModel()
        });
    }

    async update(gue_id: number, guest:GuestModel){
        return await this.transaction('rw', this.guests, async () => {
            if ((await this.guests.where({ gue_id: guest.gue_id }).count()) !== 0) {
                const id = await this.guests.update(
                    gue_id,
                    guest.toPlainObject()
                );
                console.log(`Updated guests with id ${id}`);
                return new GuestModel (await this.getById(id));
            }
            return new GuestModel()
        }).catch(e => {
            console.log(e.stack || e);
            return new GuestModel()
        });
    }

    async getById(gue_id: number) {
        return new GuestModel(await this.guests.where({ gue_id: gue_id }).first())
    }

    async getAll(){
        const items = await this.guests.toArray();
        const itemsGuestModel = [] as GuestModel[];
        items.forEach(item => {
            itemsGuestModel.push(new GuestModel(
                item
            ))
        });

        return  itemsGuestModel;
    }

}