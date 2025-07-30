export interface ITeacherLite {
    id: number;
    staff_name: string;
    staff_id: number;
}

export interface IAssignClass {
    teacher_id: number;
    class?: string;
    division?: number;
}

export interface INotes {
  title: string;            
  description?: string; 
  subject?: string;     
  grade:string;
  division:string;
//   file:string;          
}

export interface INoteDisplay {
  id:number;
  title: string;            
  description?: string; 
  teacher_name:string;
  uploaded_on:string;
  subject?: string;     
  file_type:string;
  grade:string;
  division:string;
  file:string;          
}

export interface IShareNotes {
  cls:string;
  division:string;         
}

export interface IAttendance {
  id:number;
  student_name:string; 
  status:string;
  date:string;        
}