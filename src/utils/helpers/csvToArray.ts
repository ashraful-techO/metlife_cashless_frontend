import { camelCaseToTitleCase, formatePhNumberForCSV, toBoolean, trimString } from "./format.helpers";

interface IData {
	success: boolean;
	data: any[];
}

// Helper: Proper CSV line splitter
function parseCSVLine(line: string, delimiter = ",") {
	const regex = new RegExp(`\\s*(?:\"([^"]*(?:\"\"[^"]*)*)\"|([^\"${delimiter}]*))\\s*(?:${delimiter}|$)`, "g");
	const values: string[] = [];
	line.replace(regex, (_, quoted, unquoted) => {
		values.push(quoted?.replace(/""/g, '"') ?? unquoted);
		return "";
	});
	return values;
}

export default async function csvToArray(str: string, delimiter = ","): Promise<IData> {
	const rows = str
		.slice(str.indexOf("\n") + 1)
		.split("\n")
		.filter((line) => line.trim() !== "");

	let arr: any[] = [];
	let errors: string[] = [];

	rows.forEach((element, idx) => {
		const values = parseCSVLine(element, delimiter);
		let info: any = {};

		if (values[0]) {
			try {
				info = {
					bankName: trimString(values[0]),
					policyNumber: trimString(values[1]),
					agentCode: trimString(values[2]),
					policyOwnerName: trimString(values[3]),
					gender: trimString(values[4]),
					applicantsType: trimString(values[5]),
					isRequiredMedical: toBoolean(values[6]),
					isRequiredTest: toBoolean(values[7]),
					requiredTest: trimString(values[8]),
					mobile: formatePhNumberForCSV(trimString(values[9])),
					address: trimString(values[10]),
				};

				for (const key in info) {
					if (key !== "gender" && info[key] === "") {
						errors.push(`Error at row ${idx + 2}: ${camelCaseToTitleCase(key)} is empty.`);
					}
				}
			} catch (err: any) {
				if (err.message === "Invalid Phone Number!") {
					errors.push(`Error at row ${idx + 2}: Invalid Phone Number!`);
				}
			}

			arr.push(info);
		}
	});

	if (errors.length > 0) {
		errors.forEach((el: any) => alert(el));
		return { success: false, data: [] };
	}

	return { success: true, data: arr };
}
