import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/Context"
import { UserModel } from "../../Models/User/UserModel";
import { UserHttpService } from "../../Services/User/UserHttpService";
import { UserStorageService } from "../../Services/User/UserStorageService ";
import { useNavigate } from "react-router-dom";
import { LayoutHome } from "../../Components/Layout/LayoutHome";

export const Register = () => {

    const { setUser, user } = useGlobalContext()
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const onClickSave = async () => {
        const userModel = new UserModel(user);

        if (!userModel.registerValidateZ()) {
            setIsVisible(true);
            setShowMessages(userModel.showMessages());
            return;
        }

        try {
            let userResponse = await new UserHttpService().storeUser(userModel);
            const userStorageService = new UserStorageService();
            userResponse = await userStorageService.create(userResponse);

            setIsVisible(false);
            setUser(userResponse);
            navigate("/");
        } catch (error) {
            console.error("Error saving user:", error);
            setShowMessages(["Ocurrió un error al registrar."]);
            setIsVisible(true);
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
                    <h1>Register</h1>
                </div>
            </div>

            <div className="save-form">
                <div className="field-group">
                    <label>Name</label>
                    <input
                        value={user.name || ""}
                        onChange={(event) => setUser({ ...user, name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password || ""}
                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>Password confirmation</label>
                    <input
                        type="password"
                        value={user.password_confirmation || ""}
                        onChange={(event) => setUser({ ...user, password_confirmation: event.target.value })}
                    />
                </div>
                {isVisible && (
                    <div className="form-error">
                        <div className="formError-wrapper">
                            {showMessages.map((msj, key) => (
                                <ul key={key + 1}>
                                    <li key={key}>{msj}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                )}
                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave} >Save</button>
                </div>
            </div>

        </LayoutHome>
    )
}