import { API_BASE_URL } from "@/config/server.api.config";
import { IExam } from "@/types/exam";
import axios, { AxiosInstance } from "axios";
import { APIService } from "./api.service";

export class ExamService extends APIService {

    private axiosObj: AxiosInstance;

    constructor() {
        super(API_BASE_URL);
        this.axiosObj = axios.create();
    }

    async saveExamDetails(data: IExam): Promise<any> {
        return this.axiosObj.post(API_BASE_URL + "/api/hm/exam/add/", data, { headers: { Authorization: this.getToken() } })
            .then((response) => response?.data)
            .catch((error) => { throw error?.response?.data; });
    }

    async loadActiveExams(): Promise<any> {
        return this.axiosObj.get(API_BASE_URL + "/api/exam/view/", { headers: { Authorization: this.getToken() } })
            .then((response) => response?.data)
            .catch((error) => { throw error?.response?.data; });
    }

    //Get exam details by ID
    async getExamDetails(examId: string | string[]): Promise<any> {
        return this.axiosObj.get(API_BASE_URL + `/api/exam/${examId}/`, {
            headers: { Authorization: this.getToken() }
        })
        .then((response) => response?.data)
        .catch((error) => { throw error?.response?.data; });
    }

    // Upload question paper
    async uploadQuestionPaper(formData: FormData): Promise<any> {
        return this.axiosObj.post(API_BASE_URL + '/api/exam/upload/question-paper/', formData, 
            { headers: { Authorization: this.getToken() } 
        })
        .then((response) => response?.data)
        .catch((error) => { throw error?.response?.data; });
    }

    //Fetch uploaded question papers by examId
    async getExamQuestionPapers(examId: string | string[]): Promise<any> {
        return this.axiosObj.get(API_BASE_URL + `/api/exam/${examId}/questions/`, {
            headers: { Authorization: this.getToken() }
        })
        .then((response) => response?.data)
        .catch((error) => { throw error?.response?.data; });
    }

    // Load question papers for HM
    async loadExamQuestionPapers(examId: string | string[]): Promise<any> {
    return this.axiosObj.get(`${API_BASE_URL}/api/exam/${examId}/questions/`, {
      headers: { Authorization: this.getToken() },
    })
    .then((response) => response?.data)
    .catch((error) => {
      throw error?.response?.data;
    });
}

}
