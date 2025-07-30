import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";
import { Console } from "console";

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
  
      return this.axiosObj.get(API_BASE_URL + "/api/admin/staff/load", { headers:  { Authorization: this.getToken() }})
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }


    async loadAdminDashboardData(): Promise<any> {
console.log(API_BASE_URL ,';;;;;;;;;;;;;;;;;')
      return this.axiosObj.get(API_BASE_URL + "/api/admin/dashboard/data", { headers:  { Authorization: this.getToken() }})
        .then((response) => {
          console.log(response?.data, "*********");
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }
}