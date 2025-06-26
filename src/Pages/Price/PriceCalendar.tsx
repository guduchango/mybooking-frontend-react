import { NavLink, useLocation } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { useEffect, useState } from "react";
import { newObj } from "../../Utils/GeneralFunctions";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { Calendar,Views } from 'react-big-calendar';
import './price-calendar.css'
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { PriceRangeModel } from "../../Models/Price/PriceRangeModel";
import { useTranslation } from "react-i18next";
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { PriceRageInterface } from "../../Models/Price/PriceRangeInterface";
import { CalendarEvent } from "../../Models/Price/PriceInterface";

const locales = {
    'en-US': enUS,
    'es': es,
  };
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
  });

export const PriceCalendar = () => {
    const { t } = useTranslation();  
    const [priRange, setPriRange] = useState<PriceRageInterface>(newObj<PriceRageInterface>);
    const [dayPrices, setDayPrices] = useState<CalendarEvent[]>();    
    const location = useLocation()
    const { state } = location
    const uniId = state.uni_id;
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showMessages, setShowMessages] = useState<string[]>([]);

    const startEvents = async() => {
        const priceStorageService = new PriceStorageService();
        const priceEvents = await priceStorageService.getPriceUnitEvent(uniId)
        const reservationStorageService = new ReservationStorageService();
        const reservationEvents = await reservationStorageService.getReservationEvent(uniId)
        
        const concatArray = 
        [...priceEvents, ...reservationEvents];

        setDayPrices(concatArray)
    }


    useEffect(() => {
        startEvents();
    }, []);


    const onClickSave = async () => {
        const priceRangeModel = new PriceRangeModel(priRange)
        priceRangeModel.pri_uni_id = uniId

        if (priceRangeModel.validate() === false) {
            setIsVisible(true)
            setShowMessages(priceRangeModel.showMessages())
            throw new Error(priceRangeModel.showMessages().toString());
        }else{
            await priceRangeModel.storeRangePrice();
            if(priceRangeModel.showHttpMsj().length > 0){
                setIsVisible(true)
                setShowMessages(priceRangeModel.showHttpMsj())
                throw new Error(priceRangeModel.showHttpMsj().toString());
            }else{
                setIsVisible(false)
                startEvents()
            }
        }
    };

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Change prices')}</h1>
                    <NavLink
                        to='/unit/save'
                        state={{ uni_id: uniId }}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div className="price-calendar">
            <Calendar
                    localizer={localizer}
                    events={dayPrices}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={Views.MONTH}
                    style={{ height: 500 }}
                    culture="es" 
                    messages={{
                        next: ">>",
                        previous: "<<",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                      }}
                />
            </div>
        
            <div className="save-form">
                <div className="field-group">
                    <label>{t('Price')}</label>
                    <input
                        type="string"
                        value={priRange.pri_value}
                        onChange={(event) => setPriRange({ ...priRange, pri_value: Number(event.target.value) })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('From')}</label>
                    <input
                        type="date"
                        value={priRange.pri_from}
                        onChange={(event) => setPriRange({ ...priRange, pri_from: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>{t('To')}</label>
                    <input
                        type="date"
                        value={priRange.pri_to}
                        onChange={(event) => setPriRange({ ...priRange, pri_to: event.target.value })}
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
                    <button className="fieldGroup-button-save" onClick={onClickSave}>{t('Save')}</button>
                </div>
            </div>

        </Layout>
    )
}