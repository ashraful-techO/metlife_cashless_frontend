export interface CreateSingleUserForm {
	firstName: string;
	lastName: string;
	mobileNumber: string;
	gender?: string;
	packageType?: string;
}
export interface CreateMultiUserForm {
	packageType: string;
	batchNumber: string;
}

export interface SignInForm {
	phone: string;
	password: string;
}

export interface CreateUserForm {
	policyNumber: string;
	policyOwnerName: string;
	mobile: string;
	gender: string;
	address: string;
	applicantsType: string;
	isRequiredMedical: boolean;
	isRequiredTest: boolean;
	requiredTest?: string;
	bankName: string;
	agentCode: string;
}
