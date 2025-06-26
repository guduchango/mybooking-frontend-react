import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-details.css'
import { useGlobalContext } from "../../Context/Context";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { useEffect, useState } from "react";
import { getOnlyDay, getPercentaje, getPercentajeByValue, getPercentajeOther } from "../../Utils/GeneralFunctions";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { PriceInterface } from "../../Models/Price/PriceInterface";
import { useTranslation } from "react-i18next";

export const ReservationDetails = () => {

    const { t } = useTranslation();
    const { reservation, setReservation, guest, setGuest, unit, setUnit, setPromotion } = useGlobalContext()
    const location = useLocation();
    const resId = location.state.res_id;
    const advancePercentaje = getPercentajeByValue(reservation.res_price_final, reservation.res_advance_payment);
    const advanceValue = getPercentaje(reservation.res_price_final, advancePercentaje)
    const [unitsArray, setUnitsArray] = useState<PriceInterface[]>([])


    const getReservation = async () => {
        const storageReservationService = new ReservationStorageService()
        const storageReservation = await storageReservationService.getById(resId);
        setReservation(storageReservation);
        setGuest(storageReservation.guest)
        setUnit(storageReservation.unit)
        setPromotion(storageReservation.promotion)
    }

    useEffect(() => {
        getReservation();
    }, []);

    useEffect(() => {
        const fetchPrices = async () => {
            if (reservation) {
                console.log("v1", reservation)
                const priceStorageService = new PriceStorageService();
                const pricesArray = await priceStorageService.getDatesPriceArray(
                    reservation.res_uni_id,
                    reservation.res_start_date,
                    reservation.res_end_date
                );
                console.log("unitsArray", unitsArray)
                setUnitsArray(pricesArray);
            }
        };
        setTimeout(() => {
            fetchPrices();
        }, 100); // 2 segundos de espera simulada

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Reservation details')}</h1>
                    <NavLink to='/reservation'>
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div className="table-reservationDetails">
                <div className="reservationDetails-header">
                    <div className="reservationDetails-header-left">
                        <h1>{guest.gue_full_name}</h1>
                        <h1>{unit.uni_name}</h1>
                    </div>
                    <div className="reservationDetails-header-right">
                        <h1 className="headerTitle-status">{t(reservation.res_status)}</h1>
                    </div>
                </div>

                <div className="reservationDetails-header-subtitle">
                    <p>{reservation.res_beauty_dates}</p>
                    <p><b>{t('People')}({reservation.res_adults})</b></p>
                    <p><b>{t('Nights')}({reservation.res_nights})</b></p>
                </div>

                <div className="reservationPriceDetail-wrapper">
                    
                    <div className="reservationPriceDetail">
                        <p>{t('Total price')}: <span className="priceBold">{`$${reservation.res_price}`}</span></p>
                        <p className="headerTitle-price">{t('Final price')} ({`-${getPercentajeOther(reservation.res_price, reservation.res_price_final)}%`}): <span className="priceBold">{`$${reservation.res_price_final}`}</span></p>
                    </div>
                    <div className="reservationPriceDetail">
                        <p></p>
                        <p className="headerTitle-price">{t('Advance')} {`(${getPercentajeByValue(reservation.res_price_final, reservation.res_advance_payment)}%): `}<span className="priceBold">${advanceValue}</span> / {t('Upon arrival')} <span className="priceBold">${parseFloat((reservation.res_price_final - reservation.res_advance_payment).toFixed(2))}</span></p>
                    </div>
                    <div className="fieldGroup-datePriceDetails">
                        {unitsArray.map((type, index) => (
                            <div key={index} >
                                <div key={index + 1} className="fieldGroupDatePriceDetails-wrapper">
                                    <span key={index + 2} >{getOnlyDay(type.pri_date)}</span>
                                    <span key={index + 3} >${type.pri_price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="reservationDetailsBody-guest">
                    <div className="reservationDetailsBody-field">
                        <p>{t('Phone')}</p>
                        <p>{guest.gue_phone_number}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>{t('Email')}</p>
                        <p>{guest.gue_email}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>{t('Channel')}</p>
                        <p>{t(reservation.res_channel)}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>{t('Adults')}</p>
                        <p>{reservation.res_adults}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>{t('Children')}</p>
                        <p>{reservation.res_children}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>{t('Beds')}</p>
                        <p>{reservation.res_beds}</p>
                    </div>
                </div>
                <div className="reservationDetails-footer">
                    <p>{t('Comments')}</p>
                    <p>{reservation.res_comments}</p>
                </div>
            </div>


            <div className="editDetail-button-wrapper">
                <NavLink
                    to='/reservation/edit'
                    state={{ res_id: reservation.res_id }}
                >
                    <button className="editDetail-button">{t('Edit')}</button>
                </NavLink>
            </div>

        </Layout>

    )
}