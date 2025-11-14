

export const DateTime = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Guard against invalid date input
  
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "long" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}  ${hours}:${minutes}`;
};
