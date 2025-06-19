import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IPassword } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";

export class AuthService extends APIService {

    private axiosObj: AxiosInstance;
  
      constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
      }
  
async userSignIn(data:IEmailPasswordFormValues): Promise<any> {
    console.log(data)
      return this.axiosObj.post(API_BASE_URL + "/api/user/login/", data, { headers: {} })
        .then((response) => {
            if (response?.data?.statusCode === 200) {
                const token = response?.data?.token;
                localStorage.setItem("userToken", token);
                if(response?.data?.userRole === 'student'){
                localStorage.setItem("class", response?.data.class);
                localStorage.setItem("division", response?.data.division);


                }
            }
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }


async changeUserPassword(data:IPassword): Promise<any> {
    console.log(data)
      return this.axiosObj.put(API_BASE_URL + "/api/account/password/change", data,  { headers:  { Authorization: this.getToken()}})
        .then((response) => {
          return response?.data;
        })
        .catch((error) => {
          throw error?.response?.data;
        });
    }

}