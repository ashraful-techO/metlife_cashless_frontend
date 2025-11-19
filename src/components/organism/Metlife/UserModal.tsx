import { FormInput } from "@/components/atomic";
import { ControlerFormInput, ControlerMultiLineForm, ReusableModal } from "@/components/molecules";
import { CustomDatePicker } from "@/components/molecules/CustomDatePicker";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { formattedDate, getLocalDate } from "@/utils/helpers/format.helpers";
import { Button } from "@material-tailwind/react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DocumentsUpload } from "../MedicalAssessment";

interface PropsType {
	selectdata: Appoinmentdata;
	close: () => void;
	updateData: () => Promise<void>;
}
export const UserModal: FC<PropsType> = ({ selectdata, close, updateData }) => {
	const [loading, setIsLoading] = useState(false);
	const [medicalSchedule, setMedicalSchedule] = useState<Date>(() =>
		getLocalDate(selectdata?.medicalAppointmentDate)
	);
	const [testSchedule, setTestSchedule] = useState<Date>(() => getLocalDate(selectdata?.testAppointmentDate));
	const [document, setDocument] = useState([]);

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<Appoinmentdata>();

	// { resolver: yupResolver(signInValidation) }

	const [text, setText] = useState({
		diagnosticInfo: `${selectdata?.diagnosticInfo || ""}`,
		comments: `${selectdata?.comment || ""}`,
	});

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText((prev: any) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const submitHandler = async (value: Appoinmentdata) => {
		const payload = {
			medicalAppointmentDate: formattedDate(medicalSchedule),
			testAppointmentDate: formattedDate(testSchedule),
			diagnosticInfo: text?.diagnosticInfo,
			comment: text?.diagnosticInfo,
		};

		console.log(value);

		setIsLoading(true);
		// try {
		// 	const { success, data, message } = await assuranceAPI.updateAppoinmnetList(selectdata?.id, payload);
		// 	if (success) {
		// 		// setUpdateSuccess(true);
		// 		updateData();
		// 		toastSuccess({ message: "Information updated successfully" });
		// 	}
		// } catch (err) {
		// 	console.log(err);
		// } finally {
		// 	setIsLoading(false);
		// }
	};

	useEffect(() => {
		if (selectdata) {
			setValue("policyNumber", selectdata?.policyNumber);
			setValue("mobile", selectdata?.mobile);
			setValue("policyOwnerName", selectdata?.policyOwnerName);
			setValue("gender", selectdata?.gender);
			setValue("applicantsType", selectdata?.applicantsType);
			setValue("address", selectdata?.address);
			setValue("requiredTest", selectdata?.requiredTest);
			setValue("medicalAppointmentDate", selectdata?.medicalAppointmentDate);
			setValue("testAppointmentDate", selectdata?.testAppointmentDate);
			setValue("testAppointmentDate", selectdata?.testAppointmentDate);
			setValue("comment", selectdata?.comment);
			setValue("diagnosticInfo", selectdata?.diagnosticInfo);

			setText({
				diagnosticInfo: selectdata?.diagnosticInfo || "",
				comments: selectdata?.comment || "",
			});
		}
	}, [selectdata]);

	return (
		<ReusableModal onOpen={selectdata} onClose={close}>
			<form action="" onSubmit={handleSubmit(submitHandler)}>
				<div className="p-6  bg-white rounded-md min-w-[800px] max-h-[600px] overflow-y-auto">
					<div className="grid grid-cols-2 gap-x-4 ">
						<ControlerFormInput control={control} name="policyNumber" label="Policy Number" />

						<ControlerFormInput control={control} name="mobile" label="Mobile Number" />

						<ControlerFormInput control={control} name="policyOwnerName" label="Name" />

						<div className="grid grid-cols-2 gap-x-4">
							<ControlerFormInput control={control} name="gender" label="Gender" />

							<ControlerFormInput control={control} name="applicantsType" label="Applicant's Medical" />
						</div>
					</div>

					<ControlerFormInput control={control} name="address" label="Address" />

					<ControlerFormInput control={control} name="requiredTest" label="Required Lab Test" />

					<div className="grid grid-cols-2 gap-x-4 ">
						{selectdata?.requiredTest && (
							<>
								<CustomDatePicker
									label="Lab Test Schedule Date"
									placeholder="Select a date"
									startDate={testSchedule}
									setStartDate={setTestSchedule as any}
								/>
								<FormInput
									onChange={handleChange}
									disabled
									name="testStatus"
									label="Lab Test Status"
									value={selectdata?.testStatus}
								/>
							</>
						)}

						<CustomDatePicker
							label="Medical Schedule Date"
							placeholder="Select a date"
							startDate={medicalSchedule}
							setStartDate={setMedicalSchedule as any}
						/>

						<FormInput
							disabled
							onChange={handleChange}
							name="medicalStatus"
							label="Medical Status"
							value={selectdata?.medicalStatus}
						/>

						<div className="mt-5">
							<ControlerMultiLineForm
								control={control}
								label="Diagnostic Center Info"
								name="diagnosticInfo"
							/>
						</div>

						<div className="mt-5">
							<ControlerMultiLineForm control={control} label="Comments" name="comment" />
						</div>
					</div>
					<DocumentsUpload document={document} setDocument={setDocument} />

					<div className="mt-11 flex gap-4">
						<Button type="submit">Update</Button>
					</div>
				</div>
			</form>
		</ReusableModal>
	);
};
