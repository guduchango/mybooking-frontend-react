import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { NavLink } from "react-router-dom";
import { GuestModel } from "../../Models/Guest/GuestModel";
import { useTranslation } from "react-i18next";

export const GuestList = () => {
    const { t } = useTranslation();  
    const [guests, setGuests] = useState<GuestModel[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<GuestModel[]>(guests);

    const getGuests = async () => {
        const storageGuestService = new GuestStorageService()
        const storageGuests = await storageGuestService.getAll();
        setGuests(storageGuests);
        setFilteredResults(storageGuests);
    }
    
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
        setFilteredResults(guests);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        if (value === '') {
            setFilteredResults(guests);
        } else {
            const filtered = guests.filter(guest =>
                guest.gue_name.toLowerCase().includes(value) || 
                guest.gue_last_name.toLowerCase().includes(value) || 
                guest.gue_phone_number.toLowerCase().includes(value)
            );
            setFilteredResults(filtered);
        }
    };


    useEffect(() => {
        console.log('getGuests')
        getGuests();
      },[]);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Guests')}</h1>
                    <NavLink 
                    to='/guest/save'
                    state={{ gue_id: 0, fromPlace: "guest" }}
                    >
                        <i className="icon-plus"></i>
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
                            <input 
                            type="text"
                            placeholder={t('Search...')}
                            onChange={handleInputChange}
                            value={searchTerm}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="table">
                {filteredResults.map((guest) => (
                    <div key={guest.gue_id} className="table-row" >
                        <NavLink
                            to='/guest/save'
                            state={{ gue_id: guest.gue_id, fromPlace: "guest" }}
                            >
                             <div className="tableRow-wrapper">
                            <p className="tableRow-title">{guest.gue_full_name}</p>
                            <p>{t('phone')}: {guest.gue_phone_number}</p>
                            <p>{t('email')}: {guest.gue_email}</p>
                            <p>{t('age')}: {guest.gue_age}</p>
                        </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </Layout>
    )
}