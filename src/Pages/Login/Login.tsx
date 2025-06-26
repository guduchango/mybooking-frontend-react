import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/Context"
import { UserModel } from "../../Models/User/UserModel";
import { UserHttpService } from "../../Services/User/UserHttpService";
import { UserStorageService } from "../../Services/User/UserStorageService ";
import { useNavigate } from "react-router-dom";
import { LayoutHome } from "../../Components/Layout/LayoutHome";
import { useTranslation } from "react-i18next";

export const Login = () => {
    const { t } = useTranslation();
    const { setUser, user } = useGlobalContext()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const onClickSave = async () => {
        const userModel = new UserModel(user);
        if(userModel.loginValidateZ() === false){
            setIsVisible(true)
            setShowMessages(userModel.showMessages())
            throw new Error(userModel.showMessages().toString());
        }else{

            const httpService = new UserHttpService();
            const userResponse = 
            await httpService.loginUser(userModel);
            if(httpService.showHttpMsj().length > 0){
                setIsVisible(true)
                console.log("<showHttpsMjs></showHttpsMjs>",httpService.showHttpMsj)
                setShowMessages(httpService.showHttpMsj())
                throw new Error(httpService.showHttpMsj().toString());
            }else{
                console.log("userResponse", userResponse);
                const data = userResponse.data.data;
                const user = new UserModel();
                user.id = data.id;
                user.name = data.name;
                user.email = data.email;
                user.token = data.token;
                await new UserStorageService().create(user) 
                setUser(user)
                navigate("/")
            }
            
        }

    };

    const setDefaultForm = async () => {
        setUser(new UserModel());
    }

    useEffect(() => {
        setDefaultForm();
    }, []);


    return (
        <LayoutHome>

            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Login')}</h1>
                </div>
            </div>

            <div className="save-form">
                <div className="field-group">
                    <label>{t('Email')}</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Password')}</label>
                    <input
                        type="password"
                        value={user.password || ""}
                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                    />
                </div>
                {isVisible && (
                        <div className="form-error">
                            <div className="formError-wrapper">
                            {showMessages.map((msj,key) => (
                                <ul>
                                    <li key={key}>{msj}</li>
                                </ul>
                            ))}
                            </div>
                        </div>
                    )}
                <div className="field-group">
                <button className="fieldGroup-button-save" onClick={onClickSave} >{t('Auth')}</button>
                </div>
            </div>

        </LayoutHome>
    )
}