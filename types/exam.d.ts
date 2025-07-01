export interface IExam {
  exam_name: string;
  start_date: string;
  end_date: string;
  exam_time: string;
  exam_mark: string;
  min_grade: string;
  max_grade: string;
}


export interface IExamLite {
  exam_name: string;
  start_date: string; // format: "YYYY-MM-DD"
  end_date: string;   // format: "YYYY-MM-DD"
  exam_time: string;  // format: "HH:mm:ss"
  exam_mark: number;
  min_grade: number;
  max_grade: number;
  created_by: string;
  created_at: string;
  id:number
}