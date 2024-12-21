export function getFormattedDateTimeInChile() {
	const date = new Date();

	// Obtener componentes de la fecha
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	// Obtener componentes de la hora
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	// Milisegundos y convertirlos a microsegundos
	const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
	const microseconds = milliseconds + '000'; // Para representar 6 dígitos

	// Obtener la zona horaria de Chile
	const offsetMinutes = date.getTimezoneOffset();
	const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
	const offsetMins = Math.abs(offsetMinutes) % 60;
	const sign = offsetMinutes > 0 ? '-' : '+';
	const timezone = `${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

	// Formatear la fecha completa
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds} ${timezone}`;
}
