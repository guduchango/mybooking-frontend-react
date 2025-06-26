import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-edit.css'
import { useEffect, useState } from "react";
import { daysBetween, diffFloatNumber, getOnlyDay, getPercentajeByValue, getPercentajeOther, upperCaseFirst } from "../../Utils/GeneralFunctions";
import { res_adults, res_advances, res_beds, res_channels, res_children, res_status } from "../../Utils/StaticData";
import Select from "react-select";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { useGlobalContext } from "../../Context/Context";
import { PromotionStorageService } from "../../Services/Promotion/PromotionStorageService";
import { PromotionInterface } from "../../Models/Promotion/PromotionInterface";
import { ReservationModel } from "../../Models/Reservation/ReservationModel";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { PriceInterface } from "../../Models/Price/PriceInterface";
import { useTranslation } from "react-i18next";

export const ReservationEdit = () => {
  const { t } = useTranslation();
  const location = useLocation()
  const { state } = location
  const resId = state?.res_id
  const navigate = useNavigate();
  const { reservation, setReservation } = useGlobalContext()
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [guests, setGuests] = useState<GuestInterface[]>([]);
  const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
  const [proValue, setProValue] = useState<number>(0);
  const [proId, setProId] = useState<number>(0);
  const [resAdvancePayment, setResAdvancePayment] = useState<number>(0)
  const [resPrice, setResPrice] = useState<number>(0)
  const [resFinalPrice, setResFinalPrice] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showMessages, setShowMessages] = useState<string[]>([]);
  const [advance, setAdvance] = useState<number>(0)
  const [resFinalPricePercentaje, setResFinalPricePercentaje] = useState<number>(0)
  const [resStartDate, setResStartDate] = useState<string>("")
  const [resEndDate, setResEndDate] = useState<string>("")
  const [unitsArray, setUnitsArray] = useState<PriceInterface[]>([])
  const [unitId, setUnitId] = useState<number>(0)

  const today = new Date().toISOString().split('T')[0];
  

  const getUnits = async () => {
    const unitStorageService = new UnitStorageService()
    const unitsStorage = await unitStorageService.getAll();
    setUnits(unitsStorage)
  }

  const getGuests = async () => {
    const guestStorageService = new GuestStorageService()
    const guestStorage = await guestStorageService.getAll();
    setGuests(guestStorage)
  }

  const getReservation = async () => {
    const storageReservationService = new ReservationStorageService()
    const storageReservation = await storageReservationService.getById(resId);
    const advancePercentaje  = getPercentajeByValue(storageReservation.res_price_final,storageReservation.res_advance_payment)
    
    setReservation(storageReservation)
    setUnitId(storageReservation.res_uni_id)
    setResPrice(storageReservation.res_price)
    setResFinalPrice(storageReservation.res_price_final)
    setResAdvancePayment(storageReservation.res_advance_payment)
    setResStartDate(storageReservation.res_start_date)
    setResEndDate(storageReservation.res_end_date)
    setProValue(storageReservation.promotion.pro_value)
    setAdvance(advancePercentaje)
  }

  const getPromotions = async () => {
    const promotionStorageService = new PromotionStorageService()
    const storagePromotions = await promotionStorageService.getAll();
    setPromotions(storagePromotions);
  }

  const handlePromotionChange = (value: number): void => {
    setProId(value)
    console.log("promotion_value",value);
    const promotionItem = promotions.find(promotion => promotion.pro_id === value);
    console.log("promotion_item",promotionItem)
    const promotionValue = promotionItem?.pro_value ?? 0
    const finalPrice = resPrice - (promotionValue * 0.01) * resPrice
    const finalPricePercentaje = getPercentajeOther(resPrice, finalPrice);
    setResFinalPricePercentaje(finalPricePercentaje)
    setProValue(value)
    setResFinalPrice(finalPrice)
    setAdvance(0)
    setResAdvancePayment(0)
  };

  const handleFinalPriceChange = (value: number): void => {
    setResFinalPrice(value);
  };

  const handleAdvanceChange = (value: number): void => {
    setAdvance(value)
    const advanceConst = parseFloat((resFinalPrice * value * 0.01).toFixed(2));
    const fixedAdvanceConst = parseFloat(advanceConst.toFixed(2)) ?? 0
    setResAdvancePayment(fixedAdvanceConst)
  };

  const handleStartDateChange = async(value: string): Promise<void> => {
    const priceStorageService = new PriceStorageService()
    const price = await priceStorageService.calculateTotal(reservation.res_uni_id,value,resEndDate)
    const pricesArray = await priceStorageService.getDatesPriceArray(reservation.res_uni_id,value,resEndDate)
    setUnitsArray(pricesArray)
    setResPrice(price);
    setResStartDate(value)
    setProValue(0)
    setResAdvancePayment(0)
    setAdvance(0)
  };

  const handleEndDateChange = async(value: string): Promise<void> => {
    const priceStorageService = new PriceStorageService()
    const price = await priceStorageService.calculateTotal(reservation.res_uni_id,resStartDate,value)
    const pricesArray = await priceStorageService.getDatesPriceArray(reservation.res_uni_id,resStartDate,value)
    console.log("endDateFromChange",value);
    setUnitsArray(pricesArray)
    setResPrice(price);
    setResEndDate(value)
    setProValue(0)
    setResAdvancePayment(0)
    setAdvance(0)
  };

  const handleUnitChange = async(value: number): Promise<void> => {
    const priceStorageService = new PriceStorageService()
    const price = await priceStorageService.calculateTotal(value,resStartDate,resEndDate)
    const pricesArray = await priceStorageService.getDatesPriceArray(value,resStartDate,resEndDate)
    setUnitsArray(pricesArray)
    setResPrice(price);
    setResFinalPrice(price)
    setProValue(0)
    setResAdvancePayment(0)
    setAdvance(0)
    setUnitId(value)
  };

  const guestItems = guests.map(item => ({
    value: item.gue_id,
    label: item.gue_full_name
  }));

  const unitsItems = units.map(item => ({
    value: item.uni_id,
    label: item.uni_name
  }));

  const onClickSave = async () => {
    reservation.res_price = resPrice
    reservation.res_price_final = resFinalPrice
    reservation.res_advance_payment = resAdvancePayment
    reservation.res_nights = daysBetween(reservation.res_start_date, reservation.res_end_date)
    reservation.res_start_date = resStartDate;
    reservation.res_end_date = resEndDate;
    reservation.res_advance_payment = resAdvancePayment;
    reservation.res_pro_id = proValue;
    
    const reservationModel = new ReservationModel(reservation)
    if (reservationModel.validate() === false) {
      setIsVisible(true)
      setShowMessages(reservationModel.showMessages())
      throw new Error(reservationModel.showMessages().toString());
    }else{
      await reservationModel.update(resId);
      if(reservationModel.showHttpMsj().length > 0){
        setIsVisible(true)
        setShowMessages(reservationModel.showHttpMsj())
        throw new Error(reservationModel.showHttpMsj().toString());
      }else{
        setIsVisible(false)
        navigate("/reservation")
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      if(reservation){
        getGuests();
        getUnits();
        getPromotions();
        getReservation();
      }
    }

    init();
    
  }, []);

useEffect(() => {
  const fetchPrices = async () => {
    if (reservation) { 
      const priceStorageService = new PriceStorageService();
      const pricesArray = await priceStorageService.getDatesPriceArray(
        reservation.res_uni_id,
        resStartDate,
        resEndDate
      );
      setUnitsArray(pricesArray);
    }
  };

  fetchPrices();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [reservation]);

  return (
    <Layout>
      <div className="page-back">
        <div className="pageback-wrapper">
          <h1>{t('Edit reservation')}</h1>
          <NavLink
            to={resId !== 0 ? '/reservation/details' : '/reservation/'}
            state={{ res_id: resId }}
          >
            <i className="icon-arrow-left"></i>
          </NavLink>
        </div>
      </div>



      <div className="save-form">
        <div className="saveForm-fielset">
          <p>{t('Reservation detail')}</p>
        </div>
        <div className="saveForm-wrapper">
          <div className="field-group">
            <label>{t('Guest')}</label>
            <div className="field-group">

              <Select
                className="guest-select"
                options={guestItems}
                onChange={(event) => setReservation({ ...reservation, res_gue_id: Number(event?.value) })}
                value={guestItems.filter((option) => (option.value === reservation.res_gue_id))}
              />

            </div>
          </div>
          <div className="field-group">
            <label>{t('Unity')}</label>
            <Select
              options={unitsItems}
              onChange={(event) => handleUnitChange(Number(event?.value))}
              //onChange={(event) => setReservation({ ...reservation, res_uni_id: Number(event?.value) })}
              value={unitsItems.filter((option) => (option.value === unitId))}
              isDisabled={(resId == 0) ? true : false}
            />
          </div>
          <div className="field-group">
            <label>{t('Check-In')}</label>
            <input
              name="res_start_date"
              value={resStartDate}
              type="date"
              min={today}
              onChange={(event) => handleStartDateChange(event.target.value)}
            />
          </div>
          <div className="field-group">
            <label>{t('Check-Out')} </label>
            <input
              name="res_end_date"
              value={resEndDate}
              type="date"
              min={today}
              onChange={(event) => handleEndDateChange(event.target.value)}
            />
          </div>

          <div className="field-group">
            <label>{t('Adults')} </label>
            <select
              name="res_adults"
              value={reservation.res_adults}
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
            <label> {t('Children')}</label>
            <select
              name="res_children"
              value={reservation.res_children}
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
              value={reservation.res_beds}
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
            <label>{t('Reservation status')}</label>
            <select
              name="res_status"
              value={reservation.res_status}
              onChange={(event) => setReservation({ ...reservation, res_status: event.target.value })}
            >
              {res_status.map((type, index) => (
                <option value={type} key={index} >
                  {upperCaseFirst(type)}
                </option>
              ))}
            </select>

          </div>
          <div className="field-group">
            <label>{t('Channel')}</label>
            <select
              name="res_channel"
              value={reservation.res_channel}
              onChange={(event) => setReservation({ ...reservation, res_channel: event.target.value })}
            >
              {res_channels.map((type, index) => (
                <option value={type} key={index} >
                  {upperCaseFirst(t(type))}
                </option>
              ))}
            </select>
          </div>

        </div>
        <div className="saveForm-fielset">
          <p>{t('Payment detail')}</p>
        </div>
        <div className="saveForm-wrapper">
          <div className="field-group">
            <div className="field-readOnly">
              <label>{t('Total (without discount)')}</label>
              <p>{`${reservation.res_nights} ${t('nights')} =  $${resPrice}`}</p>
            </div>
          </div>

          <div className="fieldGroup-datePriceDetails">
          {unitsArray.map((type, index) => (
                <div key={index} >
                  <div key={index+1} className="fieldGroupDatePriceDetails-wrapper">
                    <span key={index+2} >{getOnlyDay(type.pri_date)}</span>
                    <span key={index+3} >${type.pri_price}</span>
                  </div>
                </div>
              ))}
          </div>

          <div className="field-group">
            <label>{t('Discount')}</label>
            <select
              //name="res_pro_id"
              value={proId}
              onChange={(event) => handlePromotionChange(Number(event.target.value))}
            >
              {promotions.map((obj, index) => (
                <option value={obj.pro_id} key={index} >
                  {`${obj.pro_name}`}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>{t('Final price')} {`${t('with')} (${resFinalPricePercentaje}%) ${t('of discount')}`}</label>
            <input
              //name="res_price_final"
              value={resFinalPrice}
              type="number"
              onChange={(event) => handleFinalPriceChange(Number(event.target.value))}
            />
          </div>
          <div className="field-group">
            <label>{t('Percentaje of payment / advance')}</label>
            <select
              //name="res_pro_id"
              value={advance}
              onChange={(event) => handleAdvanceChange(Number(event.target.value))}
            >
              {res_advances.map((obj, index) => (
                <option value={obj.value} key={index} >
                  {`${obj.key}`}
                </option>
              ))}
            </select>
          </div>
          <div className="field-group">
            <div className="field-readOnly">
              <p>$ {(`${resAdvancePayment}`)} ({t('payment / advance')}) </p>
              <p>$ {(`${diffFloatNumber(resFinalPrice, resAdvancePayment)}`)} ({t('pay on arrival')})</p>
            </div>
          </div>

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
              {showMessages.map((msj) => (
                <ul>
                  <li key={msj}>{msj}</li>
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