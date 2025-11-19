import { FileUploaderDnd } from "@/components/molecules";
import { assuranceAPI } from "@/libs/api";
import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import { Button } from "@material-tailwind/react";
import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface PropsType {
	setValue: UseFormSetValue<Appoinmentdata>;
	testDocument: string[];
}

export const TestDocumentUpload: FC<PropsType> = ({ setValue, testDocument }) => {
	const [uploaders, setUploaders] = useState<number[]>([1]);
	const [testDocuments, setTestDocuments] = useState<string[]>(testDocument || []);
	const [success, setSuccess] = useState(false);
	console.log(testDocument);

	const handleUploadTestImage = async (file: File | null) => {
		if (file) {
			try {
				const payload = new FormData();
				payload.append("file", file);
				payload.append("type", "DOCUMENT");

				const { success, data } = await assuranceAPI.uploadImage(payload);
				if (success) {
					setSuccess(true);
					const updated = [...testDocuments, data];
					setTestDocuments(updated);
					setValue("testDocument", updated);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const addMoreUploader = () => {
		setSuccess(false);
		setUploaders([1]);
	};

	return (
		<div>
			<div className="grid grid-cols-2 gap-x-4">
				{!success &&
					uploaders.map((id) => (
						<FileUploaderDnd
							key={id}
							getFileHandler={handleUploadTestImage}
							fileFormat={["image/jpeg", "image/jpg", "image/png", "application/pdf"]}
							supportFormat="jpeg, jpg, png, pdf"
							label="Lab Test Document"
						/>
					))}
			</div>

			{testDocuments.length > 0 && (
				<div className="mt-4">
					<p className="font-normal mb-1">Uploaded Lab Test Documents</p>
					<div className="grid grid-cols-3 gap-2">
						{testDocument.map((doc, index) => (
							<a
								href={doc}
								key={index}
								target="_blank"
								key={index}
								rel="noopener noreferrer"
								className="bg-gray-200 text-blue-500 underline-offset-8 h-[159px] max-h-[159px] flex items-center justify-center rounded-lg"
							>
								Click to open the file
							</a>
						))}
					</div>
				</div>
			)}

			<Button onClick={addMoreUploader} variant="outlined" size="sm" className="mt-4 border-primary text-primary">
				Add More Lab Test
			</Button>
		</div>
	);
};
