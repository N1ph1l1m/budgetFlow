export function formatDate(date: Date | string): string {
  const inputDate = typeof date === "string" ? new Date(date) : date;

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
