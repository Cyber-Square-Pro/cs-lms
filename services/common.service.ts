import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";

export class CommonService extends APIService {

    private axiosObj: AxiosInstance;
  
      constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
      }
  
      async publishNotification(data:any): Promise<any> {

        return this.axiosObj.post(API_BASE_URL + "/api/notification/publish", data,{ headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }
async logout(): Promise<any> {
   

    }


 
}