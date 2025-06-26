import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './guest-create.css'
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/Context";
import { GuestModel } from "../../Models/Guest/GuestModel";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

export const GuestSave = () => {
    const { t } = useTranslation();
    const { setGuest, guest } = useGlobalContext()
    const location = useLocation()
    const { state } = location
    const gueId = state.gue_id;
    const fromPlace = state.fromPlace;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const onClickSave = async () => {
        const guestModel = new GuestModel(guest)
        if (guestModel.validate() === false) {
            setIsVisible(true)
            setShowMessages(guestModel.showMessages())
            throw new Error(guestModel.showMessages().toString());
        }
        const guestResponse = await guestModel.saveOrUpdate(gueId);
        if(guestResponse instanceof AxiosError){
            setIsVisible(true)
            setShowMessages(guestModel.showMessages())
            throw new Error(guestModel.showMessages().toString());
        }

        setIsVisible(false)
        setGuest(guestResponse)
        navigate(backUrl());

    };

    const setGuestFromCreate = async () => {
        if (gueId === 0) {
            setGuest(new GuestModel().toPlainObject());
        } else {
            setGuest(new GuestModel(await new GuestStorageService().getById(gueId)).toPlainObject());
        }
    }

    const backUrl = () => {
        let backUrlValue = "/";
        switch (fromPlace) {
            case "reservationCreate":
                backUrlValue = "/reservation/create";
                break;
            case "reservationEdit":
                backUrlValue = "/reservation/edit";
                break;
            case "guest":
                backUrlValue = "/guest";
                break;
        }

        return backUrlValue;
    }

    useEffect(() => {
        setGuestFromCreate();
    }, []);

    return (
        <Layout>

            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Guest save')}</h1>
                    <NavLink
                        to={backUrl()}
                        state={{ gue_id: gueId }}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>

            <div className="save-form">
                <div className="field-group">
                    <label>{t('Name')}</label>
                    <input
                        value={guest.gue_name || ""}
                        onChange={(event) => setGuest({ ...guest, gue_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Last name')}</label>
                    <input
                        value={guest.gue_last_name || ""}
                        onChange={(event) => setGuest({ ...guest, gue_last_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Phone')}</label>
                    <input
                        value={guest.gue_phone_number || ""}
                        onChange={(event) => setGuest({ ...guest, gue_phone_number: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Identity document')}</label>
                    <input
                        value={guest.gue_identity_document || ""}
                        onChange={(event) => setGuest({ ...guest, gue_identity_document: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Email')}</label>
                    <input
                        value={guest.gue_email || ""}
                        onChange={(event) => setGuest({ ...guest, gue_email: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Date of birth')}</label>
                    <input type="date"
                        value={guest.gue_birthday || ""}
                        onChange={(event) => setGuest({ ...guest, gue_birthday: event.target.value })}
                    />
                </div>
                {isVisible && (
                    <div className="form-error">
                        <div className="formError-wrapper">
                            {showMessages.map((guest) => (
                                <ul>
                                    <li>{guest}</li>
                                </ul>
                            ))}
                        </div>
                    </div>
                )}
                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave} >{t('Save')}</button>
                </div>
            </div>

        </Layout>
    )
}
