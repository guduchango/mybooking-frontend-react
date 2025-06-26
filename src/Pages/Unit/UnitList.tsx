import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const UnitList = () => {
    const { t } = useTranslation();  
    const [units, setUnits] = useState<UnitInterface[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredResults, setFilteredResults] = useState<UnitInterface[]>(units);

    const getUnits = async () => {
        const storageUnitService = new UnitStorageService();
        const storageUnits = await storageUnitService.getAll();
        setUnits(storageUnits);
        setFilteredResults(storageUnits);
    }

    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
        setFilteredResults(units);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        if (value === '') {
            setFilteredResults(units);
        } else {
            const filtered = units.filter(unit =>
                unit.uni_name.toLowerCase().includes(value)
            );
            setFilteredResults(filtered);
        }
    };

    useEffect(() => {
        getUnits();
    }, []);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>{t('Units')} </h1>
                    <NavLink
                        to='/unit/save'
                        state={{ uni_id: 0 }}
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
                            >

                            </input>
                        </div>
                    )}
                </div>
            </div>
            <div className="table">
                {filteredResults.map((unit) => (
                    <div key={unit.uni_id} className="table-row" >
                        <NavLink
                            to='/unit/save'
                            state={{ uni_id: unit.uni_id }}
                        >
                            <div className="tableRow-wrapper">
                                <p className="tableRow-title">{unit.uni_name}</p>
                                <p>{t('max people')}: {unit.uni_max_people}</p>
                                <p>{t('rooms')}: {unit.uni_rooms}</p>
                                <p>{t('single bed')}: {unit.uni_rooms}</p>
                                <p>{t('double bed')}: {unit.uni_rooms}</p>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </Layout>
    )
}