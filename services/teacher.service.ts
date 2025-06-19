import { API_BASE_URL } from "@/config/server.api.config";
import { IEmailPasswordFormValues, IStaff, ITeacherDetails } from "@/types/user";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";
import { IStudent } from "@/types/student";
import { INotes } from "@/types/teacher";

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

    async uploadNotes(data:any): Promise<any> {

        return this.axiosObj.post(API_BASE_URL + "/api/teacher/upload/notes", data, { headers:  { Authorization: this.getToken() ,  'Content-Type': 'multipart/form-data',}} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }


     async fetchMaterials(selectedClass:string, selectedDivision:string): Promise<any> {
        console.log(selectedClass,selectedDivision,'**')
         const url = `/api/notes/list?cls=${selectedClass}&division=${selectedDivision}`;
         console.log(url)
        return this.axiosObj.get(API_BASE_URL + url , { headers:  { Authorization: this.getToken() ,  'Content-Type': 'multipart/form-data',}} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }


    async DeleteMaterials(materialId:number): Promise<any> {
        
        return this.axiosObj.delete(API_BASE_URL + `api/teacher/resource/delete/${materialId}` , { headers:  { Authorization: this.getToken() ,  'Content-Type': 'multipart/form-data',}} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

    async shareMaterials(data:any): Promise<any> {
        console.log(this.getToken(),'////')
        return this.axiosObj.post(API_BASE_URL + 'api/teacher/resource/share' , data, { headers:  { Authorization: this.getToken() , }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

        async loadAttendanceData(): Promise<any> {
        console.log(this.getToken(),'////')
        return this.axiosObj.get(API_BASE_URL + 'api/teacher/students/load' , { headers:  { Authorization: this.getToken() , }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

    async markAttendance(data: any): Promise<any> {
        console.log(this.getToken(),'////')
        console.log(data,'data')
        return this.axiosObj.post(API_BASE_URL + 'api/teacher/attendance/mark', data, { headers:  { Authorization: this.getToken() , }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }


     async loadAttendance(search_type:string, date:string,grade?:number, division?:string): Promise<any> {
        
        console.log(search_type,date);
        return this.axiosObj.get(API_BASE_URL + `api/attendance/load?search_type=${search_type}&grade=${grade}&division=${division}&date=${date}`, { headers:  { Authorization: this.getToken() , }} )
            .then((response) => {
                return response?.data;
            })
            .catch((error) => {
                throw error?.response?.data;
            });
    }

}