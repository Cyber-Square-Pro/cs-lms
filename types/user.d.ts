export interface IEmailPasswordFormValues {
  email: string;
  password: string;
  userType?: string;
};

export interface IStaff {

  staff_name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  nationality: string;
  address: string;
  experience: number;
  joining_date: string;
  role: string;
  pic?: File;

}

export interface ITeacherDetails{
 
  staff_id: string;
  highest_qualification: string;
  board_or_university: string;
  designation?: string;
  department?: string;
  subjects_assigned: string[];

}
 