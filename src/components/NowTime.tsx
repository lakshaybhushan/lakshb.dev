import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { getTimeOfDay } from "../utils/getTime";

const NowTime: React.FC = () => {
	const [location, setLocation] = useState<string>("Loading...");
	const [time, setTime] = useState<moment.Moment | null>(null);
	const [timeOfDay, setTimeOfDay] = useState<string>("");

	useEffect(() => {
		const fetchLocationAndTime = async () => {
			try {
				const locationData = { city: "New Delhi", timeZone: "Asia/Kolkata" };
				const currentTime = moment().tz(locationData.timeZone);
				setLocation(locationData.city);
				setTime(currentTime);
				setTimeOfDay(getTimeOfDay(currentTime));
			} catch (error) {
				console.error("Error fetching location or time:", error);
			}
		};

		fetchLocationAndTime();
	}, []);

	const renderSvg = () => {
		switch (timeOfDay) {
			case "morning":
				return (
					<img
						src="/icons/Morning.svg"
						alt="Morning Icon"
						width={12}
						height={12}
					/>
				);
			case "afternoon":
				return (
					<img
						src="/icons/Afternoon.svg"
						alt="Afternoon Icon"
						width={12}
						height={12}
					/>
				);
			case "night":
				return (
					<img src="/icons/Night.svg" alt="Night Icon" width={12} height={12} />
				);
			default:
				return null;
		}
	};

	return (
		<div className="flex items-center gap-2">
			<div>{renderSvg()}</div>
			{time && (
				<span className="text-xs text-body transition duration-150">
					{location}, {time.format("h")}
					<span className="animate-pulse">:</span>
					{time.format("mm A")}
				</span>
			)}
		</div>
	);
};

export default NowTime;
