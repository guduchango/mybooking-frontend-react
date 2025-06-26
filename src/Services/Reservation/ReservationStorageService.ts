import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { ReservationInterface } from '../../Models/Reservation/ReservationInterface';
import { CalendarEvent } from "../../Models/Price/PriceInterface";
import { newDate, newObj } from "../../Utils/GeneralFunctions";

export class ReservationStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(reservation: ReservationInterface) {
        this.transaction('rw', this.reservations, async () => {

            if ((await this.reservations.where({ res_id: reservation.res_id }).count()) === 0) {
                const id = await this.reservations.add(
                    reservation
                );
                console.log('reservationBySync',reservation)
                console.log(`Added reservation with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(res_id: number, reservation: ReservationInterface) {
        this.transaction('rw', this.reservations, async () => {
            if ((await this.reservations.where({ res_id: reservation.res_id }).count()) !== 0) {
                const id = await this.reservations.update(
                    res_id,
                    reservation
                );
                console.log(`Updated reservation with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(res_id: number) {
        return await this.reservations.where({ res_id: res_id }).first() as ReservationInterface
    }

    async getAll() {
        return await this.reservations.toArray()
    }

    async getReservationByUnit(uni_id?: number) {
        return this.reservations.where({ res_uni_id: uni_id })
        .filter(item => item.res_status === 'approved')
        .toArray()
    }


    async getReservationEvent(uni_id?: number){
        const unitReservations = await this.getReservationByUnit(uni_id)

        const events: CalendarEvent[] = [];
        for(const item of unitReservations){
            const event: CalendarEvent = newObj<CalendarEvent>()
            event.start = newDate(item.res_start_date);
            event.end = newDate(item.res_end_date);
            event.title = `${item.guest.gue_name} $${item.res_price}`;
        
            events.push(event);
        }

        return  events;
    }


}