import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { PromotionInterface } from '../../Models/Promotion/PromotionInterface';

export class PromotionStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(promotion: PromotionInterface) {
        this.transaction('rw', this.promotions, async () => {

            if ((await this.promotions.where({ pro_id: promotion.pro_id }).count()) === 0) {
                const id = await this.promotions.add(
                    promotion
                );
                console.log(`Added promotion with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(pro_id: number, promotion:PromotionInterface){
        this.transaction('rw', this.promotions, async () => {
            if ((await this.promotions.where({ pro_id: promotion.pro_id }).count()) !== 0) {
                const id = await this.promotions.update(
                    pro_id,
                    promotion
                );
                console.log(`Updated promotion with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(pro_id: number) {
        return await this.promotions.where({ pro_id: pro_id }).first()
    }

    async getAll(){
        return await this.promotions.toArray()
    }

}