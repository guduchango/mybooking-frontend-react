import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Layout from '../../Components/Layout/Layout';
import { useEffect, useState } from 'react';
import { CalendarEvent } from '../../Models/Price/PriceInterface';
import { ReservationStorageService } from '../../Services/Reservation/ReservationStorageService';
import { NavLink } from 'react-router-dom';
import Select from "react-select";
import { UnitStorageService } from '../../Services/Unit/UnitStorageService';
import { UnitInterface } from '../../Models/Unit/UnitInterface';
import './reservation-calendar.css'
import 'moment/locale/es' 
import 'moment-timezone' 
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { useTranslation } from "react-i18next";


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

export const ReservationCalendar = () => {
    const { t } = useTranslation();    
    const [reservationEvents, setReservationEvents] = useState<CalendarEvent[]>([]);
    const [units, setUnits] = useState<UnitInterface[]>([]);
    const startEvents = async (uni_id?: number) => {
        const unitStorageService = new UnitStorageService()
        const unitFirst = await unitStorageService.getFirst()
        const reservationStorageService = new ReservationStorageService();
        const uniId = (!uni_id)?unitFirst?.uni_id:uni_id       
        const reservationEvents = await reservationStorageService.getReservationEvent(uniId)
        console.log('reservation',reservationEvents)
        setReservationEvents(reservationEvents)
    }

    const getUnits = async () => {
        const unitStorageService = new UnitStorageService()
        const unitsStorage = await unitStorageService.getAll();
        setUnits(unitsStorage)
    }

    const unitsItems = units.map(item => ({
        value: item.uni_id,
        label: item.uni_name
      }));
    

    useEffect(() => {
        startEvents();
        getUnits();
    }, []);
    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Reservation calendar')}</h1>
                    <NavLink
                        to='/reservation'
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={reservationEvents}
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
            <div className="field-group">
            <div className='reservationCalendar-unitLabel'>
                <p>{t('Select Unit')}</p>
            </div>
            <div className="reservationCalendar-unitSelect">
                <Select
                    options={unitsItems}
                    onChange={(event) => startEvents(Number(event?.value))}
                />
                <div className='reservationCalendarUnitSelect-height'>

                </div>
            </div>
            </div>
        </Layout>
    )
}
