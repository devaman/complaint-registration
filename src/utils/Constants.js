export const MAINTAINANCE = 0;
export const ELECTRICITY = 1;
export const HOSTEL = 2;
export const CSE=11;
export const ECE=12;
export const KAILASH=13;
export const stringify = (num) => {
    num = parseInt(num)
    
    if (num === MAINTAINANCE)
        return "Maintainance"
    else if (num === ELECTRICITY)
        return "Electricity"
    else if (num === HOSTEL)
        return "Hostel"
    else if (num === CSE)
        return "CSE"
    else if (num === ECE)
        return "ECE"
    else if (num === KAILASH)
        return "Kailash"
    else return "Wrong Value"
}