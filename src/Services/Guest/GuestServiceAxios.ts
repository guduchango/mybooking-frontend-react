
import { ApiResponseInterface } from '../../Models/ApiResponseInterface';
import { GuestInterface } from '../../Models/Guest/GuestInterface';
import { ApiResponseListInterface } from '../../Models/ApiResponseListInterface';
import axiosClient from '../../Api/axiosClient';
import { AxiosError } from 'axios';



export async function fetchGuest(id: number): Promise<ApiResponseInterface<GuestInterface>> {
  const response = await axiosClient.get(`/guest/${id}`);
  return response.data;
}

export async function fetchAllGuests(): Promise<ApiResponseListInterface<GuestInterface>> {
  const response = await axiosClient.get(`/guest`);
  return response.data;
}

export async function saveGuest(guest: GuestInterface){
  const response = await axiosClient.post(`/guest/${guest.gue_id}`, guest);
  return response.data;
}

export async function updateGuest(guest: GuestInterface){

  return await axiosClient.put(`/guest/${guest.gue_id}`, guest)
  .then(response => {
    return response
  })
  .catch((error: AxiosError) => {
    console.log("axios error",error.response)
    return error.response
  });
}