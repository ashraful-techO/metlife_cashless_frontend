"use client";
import { getUserProfile, getUserState } from "@/store/actions";
import { SidebarItem, sidebarItems } from "@/utils/constants/sidebarItems";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "./UserInfo";

export const Header = () => {
	const [filteredSidebarItems, setFilteredSidebarItems] = useState<SidebarItem[]>([]);
	const { userData } = useSelector(getUserState);
	const pathName = usePathname();

	const userType = userData?.userType ? userData.userType : "B2B_USER";

	const { status } = useSession();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === "authenticated") {
			getUserProfile(dispatch);
		}
	}, [status]);

	useEffect(() => {
		const matchingItems = sidebarItems.filter((item) => item.type === userType).flatMap((e) => e.item);
		setFilteredSidebarItems(matchingItems);
	}, [userType]);

	return (
		<nav className="flex justify-between items-center h-[68px] px-6 z-10 bg-white border-b-[1px] ">
			<div className="flex items-center gap-4">
				<Image src="/images/logo.webp" width={100} height={160} alt="" />

				{/* {filteredSidebarItems?.map((el, i) => (
					<Link href={el?.path} key={i}>
						<Button
							variant="text"
							className={`${
								pathName === el?.path ? "bg-primary" : ""
							} text-sm normal-case px-4 bg-transparent hover:bg-transparent`}
						>
							{el?.title}
						</Button>
					</Link>
				))} */}
			</div>

			<UserInfo />
		</nav>
	);
};
