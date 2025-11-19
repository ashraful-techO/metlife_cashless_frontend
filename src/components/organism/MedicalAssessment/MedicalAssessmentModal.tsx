import { FormInput } from "@/components/atomic";
import { ReusableModal } from "@/components/molecules";
import { FileUpload } from "@/components/molecules/FileUpload";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { formatAddUnderscores } from "@/utils/helpers/format.helpers";
import { toastSuccess } from "@/utils/helpers/toast.helpers";
import { Button } from "@material-tailwind/react";
import dateformat from "dateformat";
import { FC, useState } from "react";

interface PropsType {
	selectdata: Appoinmentdata;
	close: () => void;
	updateData: () => Promise<void>;
}
export const MedicalAssessmentModal: FC<PropsType> = ({ selectdata, close, updateData }) => {
	const [document, setDocument] = useState({
		policyDoc:
			selectdata?.medicalDocument?.find(
				(el) => formatAddUnderscores(el?.documentName) === "USER_POLICY_SCREEN_SHOT"
			)?.url || "",
		medicalDoc:
			selectdata?.medicalDocument?.find((el) => formatAddUnderscores(el?.documentName) === "MEDICAL_REPORT")
				?.url || "",
	});

	console.log(document?.medicalDoc);
	console.log(document?.policyDoc);

	const [loading, setIsLoading] = useState(false);

	const hanldeSubmit = async () => {
		const payload = {
			medicalDocument: [
				{ documentName: "Medical Report", url: document?.medicalDoc },
				{ documentName: "User Policy Screen Shot", url: document?.policyDoc },
			],
		};

		setIsLoading(true);
		try {
			const { success, data, message } = await assuranceAPI.uploadDocuments(selectdata?.id, payload);
			if (success) {
				close();
				updateData();
				toastSuccess({ message: "Document upload successfully" });
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ReusableModal onOpen={selectdata} onClose={close}>
			<div className="p-6  bg-white rounded-md min-w-[800px] max-h-[600px] overflow-y-auto">
				<div className="grid grid-cols-2 gap-x-4 ">
					<FormInput disabled label="Policy Number" value={selectdata?.policyNumber} />

					<FormInput disabled label="Mobile Number" value={selectdata?.mobile} />

					<FormInput disabled label="Name" value={selectdata?.policyOwnerName} />

					<div className="grid grid-cols-2 gap-x-4">
						<FormInput disabled label="Gender" value={selectdata?.gender} />
						<FormInput disabled label="Applicant's Medical" value={selectdata?.applicantsType} />
					</div>
				</div>

				<FormInput disabled label="Address" value={selectdata?.address} />

				<FormInput disabled label="Required Lab Test" value={selectdata?.requiredTest} />

				<div className="grid grid-cols-2 gap-x-4 ">
					<FormInput
						disabled
						label="Medical Schedule Date"
						value={
							selectdata?.medicalAppointmentDate &&
							dateformat(selectdata?.medicalAppointmentDate, "mmmm dd, yyyy")
						}
					/>

					<FormInput disabled label="Medical Status" value={selectdata?.medicalStatus} />
				</div>

				<div className="grid grid-cols-2 gap-x-4">
					<FileUpload
						label="User Policy Screenshot Upload"
						imageURL={document?.policyDoc}
						setValue={(url: string) =>
							setDocument((prev: any) => ({
								...prev,
								policyDoc: url,
							}))
						}
					/>

					<FileUpload
						label="Medical Assessment Scan Copy"
						imageURL={document.medicalDoc}
						setValue={(url: string) =>
							setDocument((prev: any) => ({
								...prev,
								medicalDoc: url,
							}))
						}
					/>
				</div>

				{/* <DocumentsUpload document={document} setDocument={setDocument} /> */}

				<div className="flex justify-end">
					<Button className="bg-primary mt-5" onClick={hanldeSubmit}>
						Submit
					</Button>
				</div>
			</div>
		</ReusableModal>
	);
};
