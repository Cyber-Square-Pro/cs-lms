import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff, ITeacherDetails } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";
import { IClassLite } from "@/types/hm";
import { IExam } from "@/types/exam";

export class ExamService extends APIService {

    private axiosObj: AxiosInstance;

    constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
    }



    async saveExamDetails(data: IExam): Promise<any> {

        return this.axiosObj.post(API_BASE_URL + "/api/hm/exam/add/", data, { headers: { Authorization: this.getToken() } })
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }


    async loadActiveExams(): Promise<any> {

        return this.axiosObj.get(API_BASE_URL + "/api/exam/view/", { headers: { Authorization: this.getToken() } })
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }




}