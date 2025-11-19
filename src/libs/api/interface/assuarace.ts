// export interface IAllAppoinmentdata {
//   success: boolean;
//   data: {
//     items: AppointmentData[];
//     nextPage: number | null;
//     total: number;
//     totalPages: number;
//     pageNumber: number;
//   };
//   message: string | null;
// }

export interface IAllAppoinmentdata {
  items: AppointmentData[];
  nextPage: number | null;
  total: number;
  totalPages: number;
  pageNumber: number;
  message?: string | null;
  success?: boolean;
}

export interface AppointmentData {
  status: "PENDING" | "POSTPONED" | "APPROVED" | string;
  employeeId: string;
  employeeName: string;
  employeeDepartment: string;
  doctorName: string;
  complaints: string[];
  medicines: MedicineItem[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MedicineItem {
  name: string;
  dosage: string;
  quantity: string;
  instructions: string;
}

export interface MedicalDocument {
  documentName: string;
  url: string;
}

export interface UserPolicyDocument {
  documentName: string;
  url: string;
}

export interface AppoinmentUpdatePayload {
  medicalAppointmentDate: string;
  testAppointmentDate: string;
  diagnosticInfo: string;
  comment: string;
}

export interface IAuth {
  accessToken: string;
  id: string;
  phone: string;
  userType: string;
}

export interface SignInPayload {
  phone: string;
  password: string;
}

export interface UserData {
  id: string;
  name: string;
  phone: string;
  userType: string;
}
interface AddPolicyDataDTO {
  policyNumber: string;
  policyOwnerName: string;
  mobile: string;
  gender: string;
  address: string;
  applicantsType: string;
  requiredTest: string;
}

export interface IPolicyResponse {
  success: boolean;
  data: PolicyData;
  message: string | null;
}

interface PolicyData {
  policyNumber: string;
  policyOwnerName: string;
  mobile: string;
  gender: string;
  address: string;
  applicantsType: string;
  requiredTest: string;
  appointmentLink: string;
  medicalStatus: string;
  testStatus: string;
  overallStatus: string;
  paymentStatus: string;
  medicalDocument: any[]; // If documents have a specific structure, replace 'any' with that type
  testDocument: any[]; // Same as above
  csAppointmentStatus: string;
  isSMSSent: boolean;
  smsCount: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
