export function upperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function newObj<T>() {
    return {} as T
}

export function getCurrentDate(): string {
    const date: Date = new Date();
    let day: number | string = date.getDate();
    let month: number | string = date.getMonth() + 1; // Months are zero-based
    const year: number = date.getFullYear();

    // Ensure day and month are two digits
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${year}-${month}-${day}`;
}

export const shortDate = (dateString: string): string => {
    const [month, day] = dateString.split('-');
    return `${day}-${month}`;
  };

export function getFriendlyDate(dateString: string): string {

    let friendlyDate = "";
    try{
        const dateObj = newDate(dateString)
        const fullYear = dateObj.getFullYear();


        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long"
          };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(dateObj);
        friendlyDate = `${formattedDate.split(' ')[0]} ${formattedDate.split(' ')[1]} (${fullYear.toString().slice(-2)}) `;
    } catch(error){
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }

        friendlyDate = dateString
    }

    return friendlyDate;
}

export function daysBetween(date1: string, date2: string): number {
    // Parse the dates
    const firstDate = newDate(date1);
    const secondDate = newDate(date2);

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(secondDate.getTime() - firstDate.getTime());

    // Convert milliseconds to days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    console.log("diffDays", diffInDays)

    return diffInDays;
}

export function getPercentajeByValue(maxValue: number, minValue: number) {

    try {
        const result = (minValue / maxValue) * 100; //((maxValue - minValue) * 100) / maxValue;
        return parseFloat(result.toFixed(2)) ?? 0
    } catch (e) {
        return 0;
    }

}

export function getPercentajeOther(maxValue: number, minValue: number){
    try {
        const result =  (((maxValue - minValue) * 100) / maxValue);
        return parseFloat(result.toFixed(2)) ?? 0
    } catch (e) {
        return 0;
    }
}

export function diffFloatNumber(max: number, min: number){
    try {
        const result = max - min
        return parseFloat(result.toFixed(2)) ?? 0
    } catch (e) {
        return 0;
    }
}

export function getPercentaje(value: number, percentaje: number){

    try{
        const result = (value * (percentaje * 0.01))
        return parseFloat(result.toFixed(2)) ?? 0 
    }catch(e){
        return 0;
    }
    
}

export function toFix(value: number) {

    let result: number = 0;
    try {
        result = parseFloat(value.toFixed(2))
    } catch (error) {

        if (error instanceof Error) {
            console.error('Error message:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }

        result = value
    }


    return result;
}

export function isValidDOB(dob: string): boolean {
    // Parse the date of birth string to a Date object
    const birthDate = new Date(dob);
    const today = new Date();

    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
        return false;
    }

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if the birth date hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    // Check if age is between 18 and 100
    return age >= 18 && age < 100;
}

export function isValidPositiveInteger(str: string): boolean {
    // Regular expression to match a string that represents a positive integer
    const positiveIntegerRegex = /^\d+$/;
    return positiveIntegerRegex.test(str);
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

export function validateReservationDates(checkInDate: string, checkOutDate: string): boolean {
    const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore the time to compare only dates

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  // Check if check-in and check-out are valid dates
  if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
    console.error("Invalid dates");
    return false;
  }

  // Check that the check-in date is not before today
  if (checkIn < today) {
    console.error("The check-in date cannot be earlier than today");
    return false;
  }

  // Check that the check-out date is after the check-in date
  if (checkOut <= checkIn) {
    console.error("The check-out date must be after the check-in date");
    return false;
  }

  // If all validations pass
  return true;
}

export function newDate(date: string){
    try{
        return new Date(date.replace(/-/g, '/'));
    }catch(error){
        if (error instanceof Error) {
            console.log('error funcion newDate'+ error.message)
        } else {
            console.error('Unexpected error:', error);
        }
        return new Date(date);
    }

}
export function validateDateRange(checkIn: string, checkOut: string): { valid: boolean, message: string } {
    const maxDays = 20;

    // Convertir las fechas de check-in y check-out a objetos Date
    const fechaCheckIn: Date = new Date(checkIn);
    const fechaCheckOut: Date = new Date(checkOut);

    // Verificar que la fecha de check-out sea posterior a la de check-in
    if (fechaCheckOut <= fechaCheckIn) {
        return {
            valid: false,
            message: 'La fecha de check-out debe ser posterior a la de check-in.'
        };
    }

    // Calcular la diferencia en milisegundos entre las dos fechas
    const diferenciaTiempo: number = fechaCheckOut.getTime() - fechaCheckIn.getTime();

    // Convertir la diferencia de tiempo de milisegundos a días
    const diferenciaDias: number = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

    // Validar si la diferencia es mayor que el número máximo de días permitidos
    if (diferenciaDias > maxDays) {
        return {
            valid: false,
            message: `El rango de fechas no puede ser mayor a ${maxDays} días.`
        };
    }

    return {
        valid: true,
        message: 'El rango de fechas es válido.'
    };
}

export function statusColor(status: string){
    switch (status) {
        case 'pending':
            return ''
            break;
    
        default:
            break;
    }
}

export function getOnlyDay(date: string){
    try{
        const dateParts = date.split('-'); // Dividimos la cadena por los guiones
        return dateParts[2]; 
    }catch(e){
        return "";
    }
}

