import { AxiosResponse } from "axios";
import { UserModel } from "../../Models/User/UserModel";
import { HttpBaseService } from "../HttpBaseService";
import { UserInterface } from '../../Models/User/UserInterface';


export class UserHttpService extends HttpBaseService {

    readonly register: string = 'user/create';
    readonly login: string = 'user/login';

    public async storeUser(guest: UserModel): Promise<UserModel> { 
        const response: AxiosResponse<{data: UserModel},Error> = 
        await this.post<UserInterface,UserModel>(this.register,guest.toPlainObject())
        .catch((error) => {
            this.addHttpMsj(error)
            return error
        })
        return new UserModel(response.data.data)
    }

    public async loginUser(guest: UserModel):  Promise<AxiosResponse> { 
            console.log("loginUSer",guest)
            return await this.post<UserInterface,UserModel>(this.login,guest.toPlainObject())
            .catch((error) => {
                console.log("loginUserErro",guest)
                this.addHttpMsj(error)
                throw error
            })
           
    }

}
