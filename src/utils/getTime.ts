import moment from "moment-timezone";

export const getTimeOfDay = (time: moment.Moment): string => {
	const hour = time.hour();
	if (hour >= 5 && hour < 12) {
		return "morning";
	} else if (hour >= 12 && hour < 17) {
		return "afternoon";
	} else if (hour >= 17 && hour < 20) {
		return "evening";
	} else {
		return "night";
	}
};
