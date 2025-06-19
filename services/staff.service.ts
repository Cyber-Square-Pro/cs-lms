import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";

export class StaffService extends APIService {

    private axiosObj: AxiosInstance;
  
      constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
      }
  
async staffRegister(data:any): Promise<any> {
    console.log(data)
      return this.axiosObj.post(API_BASE_URL + "/api/admin/staff/register/", data, { headers: {} })
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }


async loadStaff(data:any): Promise<any> {
    console.log(data)
      return this.axiosObj.get(API_BASE_URL + "/api/admin/staff/load")
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

}