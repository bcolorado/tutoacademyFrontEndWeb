export function getDayOfWeek(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado','Domingo'];
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }

