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
  
async logout(): Promise<any> {
   

    }


 
}