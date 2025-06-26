import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { useEffect, useState } from "react";
import { newObj } from "../../Utils/GeneralFunctions";
import {uni_doubleBed, uni_maxPeople, uni_rooms, uni_sigleBed } from "../../Utils/StaticData";
import { UnitModel } from "../../Models/Unit/UnitModel";
import { useTranslation } from "react-i18next";

export const UnitSave = () => {
    const { t } = useTranslation();  
    const [unit, setUnit] = useState<UnitInterface>(newObj<UnitInterface>);
    const location = useLocation()
    const { state } = location
    const unitId = state.uni_id;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();
    

    const onClickSave = async () => {

        const unitModel = new UnitModel(unit)
        if (unitModel.validate() === false) {
            setIsVisible(true)
            setShowMessages(unitModel.showMessages())
            throw new Error(unitModel.showMessages().toString());
        }else{
            await unitModel.saveOrUpdate(unitId);
            if(unitModel.showHttpMsj().length > 0){
                setIsVisible(true)
                setShowMessages(unitModel.showHttpMsj())
                throw new Error(unitModel.showHttpMsj().toString());
            }else{
                setIsVisible(false)
                navigate("/unit");
            }
        }
    };

    const setUnitFromCreate = async () => {
        if (unitId === 0) {
            setUnit(new UnitModel().toPlainObject());
        } else {
            setUnit(new UnitModel(await new UnitStorageService().getById(unitId)).toPlainObject());
        }
    }

    useEffect(() => {
        setUnitFromCreate();
    }, []);

    return (
        <Layout>

            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Unit save')}</h1>
                    <NavLink
                        to='/unit'
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                    {(unitId !== 0) && (
                        <NavLink
                        to='/price/calendar'
                        state={{ uni_id: unitId}}
                        >
                        <i className="icon-coin-dollar"></i>
                        </NavLink>
                    )}
                  
                </div>
            </div>
            <div className="save-form">
                <div className="field-group">
                    <label>{t('Name')}</label>
                    <input
                        value={unit.uni_name || ""}
                        onChange={(event) => setUnit({ ...unit, uni_name: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('Rooms')}</label>
                    <select
                        name="uni_rooms"
                        value={unit.uni_rooms || ""}
                        onChange={(event) => setUnit({ ...unit, uni_rooms: Number(event.target.value) })}
                    >
                        {uni_rooms.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>{t('Max People')}</label>
                    <select
                        name="uni_max_people"
                        value={unit.uni_max_people || ""}
                        onChange={(event) => setUnit({ ...unit, uni_max_people: Number(event.target.value) })}
                    >
                        {uni_maxPeople.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>{t('Single Beds')}</label>
                    <select
                        name="uni_single_bed"
                        value={unit.uni_single_bed || ""}
                        onChange={(event) => setUnit({ ...unit, uni_single_bed: Number(event.target.value) })}
                    >
                        {uni_sigleBed.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>{t('Doble Beds')}</label>
                    <select
                        name="uni_double_bed"
                        value={unit.uni_double_bed || ""}
                        onChange={(event) => setUnit({ ...unit, uni_double_bed: Number(event.target.value) })}
                    >
                        {uni_doubleBed.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
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