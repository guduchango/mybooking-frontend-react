import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { Channel, Status } from "../../Models/Reservation/ReservationInterface";
import { useEffect, useMemo, useState } from "react";
import { daysBetween, shortDate, toFix } from "../../Utils/GeneralFunctions";
import Select from "react-select";
import { res_adults, res_advances, res_beds, res_channels, res_children } from "../../Utils/StaticData";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { useGlobalContext } from "../../Context/Context";
import { PromotionStorageService } from "../../Services/Promotion/PromotionStorageService";
import { PromotionInterface } from "../../Models/Promotion/PromotionInterface";
import { ReservationModel } from "../../Models/Reservation/ReservationModel";
import { useTranslation } from "react-i18next";
import { UnitPriceInterface } from "../../Models/Unit/UnitPriceInterface";

export const ReservationCreate = () => {
    const { t } = useTranslation();    
    const location = useLocation()
    const { state } = location
    const unitPrice = state?.unitPrice as UnitPriceInterface;
    const { reservation, setReservation, isReservationSeted,guest } = useGlobalContext()
    const [guests, setGuests] = useState<GuestInterface[]>([]);
    const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
    const [proValue, setProValue] = useState<number>(0);
    const [advance, setAdvance] = useState<number>(0)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);
    const navigate = useNavigate();

    const getGuests = async () => {
        const guestStorageService = new GuestStorageService()
        const guestStorage = await guestStorageService.getAll();
        setGuests(guestStorage)
    }

    const getPromotions = async () => {
        const promotionStorageService = new PromotionStorageService()
        const promotionsStorage = await promotionStorageService.getAll();
        const promotionStorage = await promotionStorageService.getById(1);
        reservation.promotion = promotionStorage as PromotionInterface;
        setPromotions(promotionsStorage)
    }

    const guestItems = guests.map(item => ({
        value: item.gue_id,
        label: item.gue_full_name
    }));

    const setInfo = async() => {
        const unitObj = {} as UnitInterface
        if (isReservationSeted === false) {
            reservation.res_start_date = unitPrice.upri_check_in
            reservation.res_end_date = unitPrice.upri_check_out
            reservation.res_adults = unitPrice.upri_people
            reservation.res_children = 0;
            reservation.res_beds = unitPrice.upri_people;
            reservation.res_nights = unitPrice.upri_night;
            reservation.res_children = 0;
            reservation.res_status = Status.approved;
            reservation.res_channel = Channel.direct;
            reservation.res_comments = "";
            reservation.res_uni_id = unitPrice.upri_uni_id;
            reservation.res_gue_id = 1;
            reservation.res_pro_id = 1;
            reservation.res_price = unitPrice.upri_price;
            reservation.res_advance_payment = 0;
            reservation.unit = unitObj;
            reservation.unit.uni_name = unitPrice.upri_name;
        }

        if(guest.gue_id !== 0){
            reservation.res_gue_id = guest.gue_id;
        }

        setReservation(reservation);
        //setIsReservationSeted(true)
    }

    const calculatePrice = () => {
        const price = reservation.res_price
        const finalPrice = price - (proValue * 0.01 * price)
        reservation.res_price_final = finalPrice;
        const finalAdvance = (advance * 0.01 * finalPrice)
        reservation.res_advance_payment = finalAdvance
        const promotionItem = promotions.find(promotion => promotion.pro_value === proValue);
        reservation.res_pro_id = promotionItem?.pro_id || 0
        reservation.res_nights = daysBetween(reservation.res_start_date,reservation.res_end_date)
        setReservation(reservation);
    }

    const onClickSave = async () => {
        const reservationModel = new ReservationModel(reservation)
        if (reservationModel.validate() === false) {
            setIsVisible(true)
            setShowMessages(reservationModel.showMessages())
            throw new Error(reservationModel.showMessages().toString());
        }else{
            await reservationModel.store();
            if(reservationModel.showHttpMsj().length > 0){
                setIsVisible(true)
                setShowMessages(reservationModel.showHttpMsj())
                throw new Error(reservationModel.showHttpMsj().toString());
            }else{
                setIsVisible(false)
                navigate("/reservation");
            }
        }
    };

    useMemo(() => {
        setInfo()
    },[])

    useEffect(() => {
        getPromotions()
        getGuests()
        calculatePrice()
    }, [reservation,advance,proValue]);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Reservation create')}</h1>
                    <NavLink
                        to={'/reservation/available-units'}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div className="save-form">
                <div className="field-group">
                    <div className="tableRow-header">
                        <h1>{reservation.unit.uni_name.toLocaleUpperCase()}</h1>
                        <h1 className="headerTitle-status">{t(reservation.res_status)}</h1>

                    </div>
                    <div className="tableRow-header">
                        <p><i className="icon-enter" /> {shortDate(reservation.res_start_date)}</p>
                        <p><i className="icon-exit" /> {shortDate(reservation.res_end_date)}</p>
                        <p><i className="icon-users" /> {reservation.res_adults}</p>
                    </div>
                </div>

                <div className="reservationPriceDetail-wrapper">
                    <div className="reservationPriceDetail">
                        <p>{t('Price')}: <span className="priceBold">{`$${toFix(reservation.res_price)}`}</span></p>
                        <p className="headerTitle-price">Total ({`-${proValue}%`}): <span className="priceBold">{`$${toFix(reservation.res_price_final)}`}</span></p>
                    </div>
                    <div className="reservationAdvanceDetail">
                        <p> <i className="icon-checkmark"></i> {t('Advance')}: <span className="priceBold">${toFix(reservation.res_advance_payment)}</span></p>
                    </div>
                </div>

                <div className="field-group">
                    <label>{t('Discount')}</label>
                    <select
                        //name="res_pro_id"
                        value={proValue || ""}
                        onChange={(event) => setProValue(Number(event.target.value))}
                    >
                        {promotions.map((obj, index) => (
                            <option value={obj.pro_value} key={index} >
                                {`${obj.pro_name}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field-group">
                    <label>{t('Percentaje of payment / advance')}</label>
                    <select
                        //name="advance"
                        value={advance || ""}
                        onChange={(event) => setAdvance(Number(event.target.value))}
                    >
                        {res_advances.map((obj, index) => (
                            <option value={obj.value} key={index} >
                                {`${obj.key}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field-group">
                    <label>{t('Guest')} </label>
                    <div className="fieldGroup-selectButton">
                        <div className="fieldGroupSelectButton-select">
                            <Select
                                className="guest-select"
                                options={guestItems}
                                onChange={(event) => setReservation({ ...reservation, res_gue_id: Number(event?.value) })}
                                value={guestItems.filter((option) => (option.value === reservation.res_gue_id))}
                            />
                        </div>
                        <div className="fieldGroupSelectButton-icon">
                            <NavLink
                                to='/guest/save'
                                state={{ gue_id: 0, fromPlace: 'reservationCreate' }}
                            >
                                <i className="icon-plus"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>


                <div className="field-group">
                    <label>{t('Adults')} </label>
                    <select
                        name="res_adults"
                        value={reservation.res_adults || ""}
                        onChange={(event) => setReservation({ ...reservation, res_adults: Number(event.target.value) })}
                    >
                        {res_adults.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>{t('Children')}</label>
                    <select
                        name="res_children"
                        value={reservation.res_children || ""}
                        onChange={(event) => setReservation({ ...reservation, res_children: Number(event.target.value) })}
                    >
                        {res_children.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>{t('Beds')}</label>
                    <select
                        name="res_beds"
                        value={reservation.res_beds || ""}
                        onChange={(event) => setReservation({ ...reservation, res_beds: Number(event.target.value) })}
                    >
                        {res_beds.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="field-group">
                    <label>{t('Channel')}</label>
                    <select
                        name="res_channel"
                        value={reservation.res_channel || ""}
                        onChange={(event) => setReservation({ ...reservation, res_channel: event.target.value })}
                    >
                        {res_channels.map((type, index) => (
                            <option value={type} key={index} >
                                {t(type)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>{t('Comments')}</label>
                    <textarea
                        rows={6}
                        name="res_comments"
                        onChange={(event) => setReservation({ ...reservation, res_comments: event.target.value })}
                        value={reservation.res_comments}
                    >
                    </textarea>
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
                    <button onClick={onClickSave} className="fieldGroup-button-save" >Save</button>
                </div>
            </div>
        </Layout>

    )

}
