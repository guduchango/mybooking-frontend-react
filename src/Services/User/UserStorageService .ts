import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { UserModel } from "../../Models/User/UserModel";


export class UserStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(user: UserModel) {
        return await this.transaction('rw', this.users, async () => {
            console.log("store create user", user.toPlainObject())
            this.deleteAllItems();

            if ((await this.users.where({ id: user.id }).count()) === 0) {
                const id = await this.users.add(
                    user.toPlainObject()
                );
                console.log(`Added users with id ${id}`);
                return new UserModel(await this.getById(id));
            }
            return new UserModel()
        }).catch(e => {
            console.log(e.stack || e);
            return new UserModel()
        });
    }

    async update(id: number, user: UserModel) {
        return await this.transaction('rw', this.users, async () => {
            if ((await this.users.where({ id: user.id }).count()) !== 0) {
                const userId = await this.users.update(
                    id,
                    user.toPlainObject()
                );
                console.log(`Updated users with id ${userId}`);
                return new UserModel(await this.getById(userId));
            }
            return new UserModel()
        }).catch(e => {
            console.log(e.stack || e);
            return new UserModel()
        });
    }

    async getById(id: number) {
        return new UserModel(await this.users.where({ id: id }).first())
    }

    async getAll() {
        const items = await this.users.toArray();
        const itemsUserModel = [] as UserModel[];
        items.forEach(item => {
            itemsUserModel.push(new UserModel(
                item
            ))
        });

        return itemsUserModel;
    }


    async getLastItem() {
        let lastItem;
        try {
            lastItem = await this.users.orderBy('id').reverse().first()
    
        } catch (error) {
            console.error('Failed to retrieve the last item:', error);
        }
        return new UserModel(lastItem);
    }

    async deleteAllItems() {
        try {
          await this.users.clear();
          console.log('All items deleted successfully.');
        } catch (error) {
          console.error('Failed to delete all items:', error);
        }
      }

}