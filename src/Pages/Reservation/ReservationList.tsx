import './reservation.css'
import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import { NavLink } from "react-router-dom";
import { ReservationStorageService } from '../../Services/Reservation/ReservationStorageService';
import { ReservationInterface } from '../../Models/Reservation/ReservationInterface';
import { useGlobalContext } from '../../Context/Context';
import { useTranslation } from 'react-i18next';



export const ReservationList: React.FC = () => {
    const { t } = useTranslation();
    const [reservations, setReservations] = useState<ReservationInterface[]>([]);
    const { setIsReservationSeted } = useGlobalContext()
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectTerm, setSelectTerm] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<ReservationInterface[]>(reservations);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        if (value === '') {
            setFilteredResults(reservations);
        } else {
            const filtered = reservations.filter(reservation =>
                reservation.guest.gue_name.toLowerCase().includes(value) ||
                reservation.guest.gue_last_name.toString().includes(value) ||
                reservation.res_start_date.toLowerCase().includes(value) ||
                reservation.res_end_date.toLowerCase().includes(value)
            );
            setFilteredResults(filtered);
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value.toLowerCase();
        setSelectTerm(value);

        if (value === '') {
            setFilteredResults(reservations);
        } else {
            const filtered = reservations.filter(reservation =>
                reservation.res_status.toLowerCase().includes(value)
            );
            setFilteredResults(filtered);
        }
    };

    const getReservation = async () => {
        const storageReservationService = new ReservationStorageService()
        const storageReservations = await storageReservationService.getAll();
        setReservations(storageReservations);
        setFilteredResults(storageReservations);
        setIsReservationSeted(false)
    }

    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
        setFilteredResults(reservations);
    };

    useEffect(() => {
        getReservation();
    }, []);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Reservations')}</h1>
                    <NavLink
                        to='/reservation/check'
                        state={{ res_id: 0 }}
                    >
                        <i className="icon-plus"></i>
                    </NavLink>
                    <NavLink
                        to='/reservation/calendar'
                    >
                        <i className="icon-calendar"></i>
                    </NavLink>
                </div>
            </div>
            <div className="filter-wrapper">
                <div className="filter-icons">
                    {showFilter && (
                        <a onClick={closeFilter}>
                            <i className="icon-cross"></i>
                        </a>
                    )}
                    {!showFilter && (
                        <a onClick={openFilter}>
                            <i className="icon-search"></i>
                        </a>
                    )}
                </div>
                <div className="filter-input">
                    {showFilter && (
                        <div className="showBox">
                            <div className='showBox-input'>
                                <input
                                    type="text"
                                    placeholder={t('Search...')}
                                    onChange={handleInputChange}
                                    value={searchTerm}
                                ></input>
                            </div>
                            <div className='showBox-select'>
                                <select name="cars" id="cars"
                                    onChange={handleSelectChange}
                                    value={selectTerm}
                                >
                                    <option value="">{t('All')}</option>
                                    <option value="approved">{t('approved')}</option>
                                    <option value="pending">{t('pending')}</option>
                                    <option value="finished">{t('finished')}</option>
                                    <option value="canceled">{t('canceled')}</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="table">
                {filteredResults.length > 0 ? (
                    filteredResults.map((reservation) => (
                        <div key={reservation.res_id} className="table-row">
                            <NavLink
                                to='/reservation/details'
                                state={{ res_id: reservation.res_id }}
                            >
                                <div className="tableRowReservartion-wrapper">
                                    <div className='tableRowReservartion-left'>
                                        <p className="tableRow-title">
                                            {reservation.guest.gue_name + " " + reservation.guest.gue_last_name}
                                        </p>
                                        <p>{reservation.res_beauty_dates}</p>
                                        <p>{reservation.res_nights} {t('nights')}</p>
                                        <p>{reservation.res_adults} {t('adults')}, {reservation.res_children} {t('children')}</p>
                                        <p>{reservation.unit.uni_name}</p>
                                    </div>
                                    <div className='tableRowReservartion-right'>
                                        <div className={`status-${reservation.res_status}`}>
                                            <p>{t(reservation.res_status)}</p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <div key="1" className="tableRow-NotResult">
                        <p>{t('Not result found')}</p>
                    </div>
                )}
            </div>
        </Layout>
    )
}