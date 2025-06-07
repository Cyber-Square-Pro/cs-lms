import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff, ITeacherDetails } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";
import {  IClassLite } from "@/types/hm";

export class HMService extends APIService {

    private axiosObj: AxiosInstance;

    constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
    }


     
    async saveClassDetails(data:Partial<IClassLite>): Promise<any> {

        return this.axiosObj.post(API_BASE_URL + "/api/class/add/", data, { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

    async loadActiveClass(): Promise<any> {

        return this.axiosObj.get(API_BASE_URL + "/api/class/load/", { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }


    async assignClassTeacher(data:any): Promise<any> {

        return this.axiosObj.put(API_BASE_URL + "/api/class/assign/teacher",data, { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }
    

}