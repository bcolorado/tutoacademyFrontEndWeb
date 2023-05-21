export function getDateCalendar(fecha) {
    const [diaSemanaActual, rangoHoras] = fecha.split(", ");
  
    const diasSemanaIngles = {
      "Lunes": 1,
      "Martes": 2,
      "Miercoles": 3,
      "Jueves": 4,
      "Viernes": 5,
      "Sabado": 6,
      "Domingo": 7
    };
  
    const fechaActual = new Date();
    const diaSemanaActualIndex = fechaActual.getDay(); // Obtener el índice del día de la semana actual (0 para Domingo, 1 para Lunes, etc.)
    const diasDiferencia = diasSemanaIngles[diaSemanaActual] - diaSemanaActualIndex;
    
    // Ajustar la fecha actual sumando o restando la diferencia de días
    fechaActual.setDate(fechaActual.getDate() + diasDiferencia);
  
    const [horaInicio,horaFinal] = rangoHoras.split(" - ");
  
    const fechaInicioFormateada = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      fechaActual.getDate(),
      parseInt(horaInicio.split(":")[0]),
      parseInt(horaInicio.split(":")[1])
    );

    const fechaTerminacionFormateada = new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDate(),
        parseInt(horaFinal.split(":")[0]),
        parseInt(horaFinal.split(":")[1])
      );
  
    const fechaFinalFormateada = fechaInicioFormateada.toString();
    const diaSemanaAbreviado = fechaFinalFormateada.substring(0, 3); // Obtener las primeras tres letras del día de la semana

    const fechaFinalTerminacionFormateada = fechaTerminacionFormateada.toString();
    const diaSemanaTerminacionAbreviado = fechaFinalTerminacionFormateada.substring(0, 3); // Obtener las primeras tres letras del día de la semana
  

    const startDate = fechaFinalFormateada.replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/, diaSemanaAbreviado);
    const endDate = fechaFinalTerminacionFormateada.replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/, diaSemanaTerminacionAbreviado)

    return [startDate, endDate];

  }
  