import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff, ITeacherDetails } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";
import { IStudent } from "@/types/student";

export class TeacherService extends APIService {

    private axiosObj: AxiosInstance;

    constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
    }


    async loadTeachers(): Promise<any> {

        return this.axiosObj.get(API_BASE_URL + "/api/teachers/list",)
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }
    async saveAcademicDetails(data: ITeacherDetails): Promise<any> {

        return this.axiosObj.post(API_BASE_URL + "/api/hm/teacher/academic/details", data, { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }


    async loadActiveTeachers(): Promise<any> {

        return this.axiosObj.get(API_BASE_URL + "/api/teachers/list",  { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

    async registerStudent(data: any): Promise<any> {

        return this.axiosObj.post(API_BASE_URL + "/api/teacher/student/add", data, { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

    async loadActiveStudents(): Promise<any> {

        return this.axiosObj.get(API_BASE_URL + "/api/students/list",  { headers:  { Authorization: this.getToken() }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

}