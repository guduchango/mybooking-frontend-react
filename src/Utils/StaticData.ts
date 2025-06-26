export const res_status: string[] = ['pending', 'approved', 'finished', 'canceled']
export const res_channels: string[] = ['direct', 'booking', 'airbnb']
export const res_beds: number[] = [0, 1, 2, 3, 4]
export const res_children: number[] = [0, 1, 2, 3, 4]
export const res_adults: number[] = [1, 2, 3, 4, 5]
export const uni_availableQuantity: number[] = [0, 1, 2, 3, 4, 5]
export const uni_maxPeople: number[] = [0,1, 2, 3, 4, 5]
export const uni_sigleBed: number[] = [0, 1, 2, 3, 4, 5]
export const uni_doubleBed: number[] = [0, 1, 2, 3, 4, 5]
export const uni_rooms: number[] = [0,1, 2, 3, 4, 5]

export enum HTTP_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204
}

export interface KeyValue {
  key: string;
  value: number;
}

// Create an array of key-value pairs
export const res_promotions: KeyValue[] = [
  { key: 'nothing', value: 0 },
  { key: 'old client', value: 10 },
  { key: '5 days', value: 20 },
  { key: 'new guest', value: 30 },
];

// Create an array of key-value pairs
export const res_advances: KeyValue[] = [
  { key: '0%', value: 0 },
  { key: '5%', value: 5 },
  { key: '10%', value: 10 },
  { key: '20%', value: 20 },
  { key: '30%', value: 30 },
  { key: '40%', value: 40 },
  { key: '50%', value: 50 },
  { key: '60%', value: 60 },
  { key: '70%', value: 70 },
  { key: '80%', value: 80 },
  { key: '90%', value: 90 },
  { key: '100%', value: 100 },
];


