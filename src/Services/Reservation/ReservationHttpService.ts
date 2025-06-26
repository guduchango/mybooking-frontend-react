import { AxiosResponse } from "axios";
import { ReservationInterface } from "../../Models/Reservation/ReservationInterface";
import { HttpBaseService } from "../HttpBaseService";

export class ReservationHttpService extends HttpBaseService {

    readonly url: string = 'reservation';

    public async getReservations (): Promise<ReservationInterface[]> { 
        const response: AxiosResponse<{ data: ReservationInterface[] }> = await this.getPrivate(this.url)
        return response.data.data
    }
}
