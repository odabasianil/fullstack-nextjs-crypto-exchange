export function customFormatDate(date: string, format: string): string {
  const d = new Date(date);
  const map: { [key: string]: string } = {
    'YYYY': d.getFullYear().toString(),
    'MM': ('0' + (d.getMonth() + 1)).slice(-2),
    'DD': ('0' + d.getDate()).slice(-2),
    'HH': ('0' + d.getHours()).slice(-2),
    'mm': ('0' + d.getMinutes()).slice(-2),
    'ss': ('0' + d.getSeconds()).slice(-2),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
}