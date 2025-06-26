import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { UnitInterface } from "./UnitInterface";
import { UnitPriceInterface } from "./UnitPriceInterface";

export class UnitPriceCalculate {
    // Properties
    private unit: UnitInterface;
    private checkIn: string
    private checkOut: string;
    private people: number;
  
    // Constructor to initialize the properties
    constructor(unit: UnitInterface, checkIn: string, checkOut: string, people: number) {
      this.unit = unit;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.people = people;
    }

    public async getUnitPriceInfo(): Promise<UnitPriceInterface> {
        const unitPrice: UnitPriceInterface = {} as UnitPriceInterface;
        unitPrice.upri_uni_id = this.unit.uni_id
        unitPrice.upri_name = this.unit.uni_name
        unitPrice.upri_max_people = this.unit.uni_max_people
        unitPrice.upri_single_bed = this.unit.uni_single_bed
        unitPrice.upri_double_bed = this.unit.uni_double_bed
        unitPrice.upri_max_people = this.unit.uni_max_people
        unitPrice.upri_rooms = this.unit.uni_rooms
        unitPrice.upri_check_in = this.checkIn
        unitPrice.upri_check_out = this.checkOut
        unitPrice.upri_people = this.people
        unitPrice.upri_price = await this.calculatePrice();

        return unitPrice;
    }

    public calculatePrice() {
        const priceStorageService = new PriceStorageService()
        return priceStorageService.calculateTotal(this.unit.uni_id,this.checkIn,this.checkOut)
    }
  }