const CSV_CONTENT_HEADER =
	"data:text/csv;charset=utf-8, Bank Name, Policy Number, Agent Code, Policy Owner Name,Gender,Applicants Medical, Medical Require,Test Required, Test Name, Mobile, Address \r\n";

const CSV_DATA =
	"BBL, B1010108, BBBL47002,Kamrun Nahar, Female, Adult, False, True, Lipid Profile, 01234567899, Younus Garden Chattagram.";

export const downloadMultipleUserDemoCSV = () => {
	try {
		let csvContent = CSV_CONTENT_HEADER;
		csvContent += CSV_DATA;

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `MultipleUserCSV.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.log(error);
	}
};
