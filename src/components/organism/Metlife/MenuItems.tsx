import { Appoinmentdata } from "@/libs/api/interface/assuarace";
import Icon, { moreIcon } from "@/libs/Icons";
import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";

import { FC } from "react";

interface PropsType {
	data: Appoinmentdata;
	updateData: () => Promise<void>;
}

export const MenuItems: FC<PropsType> = ({ data }) => {
	return (
		<>
			<Menu placement="left">
				<MenuHandler>
					<Button className="bg-transparent shadow-none hover:shadow-none ml-[-20px] py-0">
						<Icon path={moreIcon} />
					</Button>
				</MenuHandler>
				<MenuList className="p-1">
					<MenuItem
						className="hover:bg-transparent"
						disabled={data?.overallStatus !== "COMPLETED"}
						// onClick={downloadFileAsZip}
					>
						Download Document
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};
