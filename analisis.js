// Definición del Objeto rangosNormales para tener los rangos min y max de cada tipo de estudio
const rangosNormales = {
    'Vitamina D': { min: 30, max: 100 },
    'Glucosa': { min: 0.70, max: 1.10 },
    'TSH': { min: 0.40, max: 4.00 },
    'Triglicéridos': { min: 0, max: 150 },
    'Glóbulos Rojos': { min: 4.0, max: 6.0 },
    'Colesterol': { min: 0, max: 200 }
};
// Array de objetos para almacenar los datos de los análisis de sangre, son datos reales
const analisisSangre = [
    { fecha: '17-08-2018', tipoEstudio: 'Vitamina D', resultado: 25.2},
    { fecha: '17-08-2018', tipoEstudio: 'Glucosa', resultado: 0.77},
    { fecha: '17-08-2018', tipoEstudio: 'TSH', resultado: 2.80},
    { fecha: '17-08-2018', tipoEstudio: 'Triglicéridos', resultado:68},
    { fecha: '17-08-2018', tipoEstudio: 'Glóbulos Rojos', resultado: 4.79},
    { fecha: '17-08-2019', tipoEstudio: 'Vitamina D', resultado: 28.2},
    { fecha: '17-08-2019', tipoEstudio: 'Glucosa', resultado: 0.80},
    { fecha: '17-08-2019', tipoEstudio: 'TSH', resultado: 2.38},
    { fecha: '17-08-2019', tipoEstudio: 'Triglicéridos', resultado:98},
    { fecha: '17-08-2019', tipoEstudio: 'Glóbulos Rojos', resultado: 5.04},
    { fecha: '17-08-2019', tipoEstudio: 'Colesterol', resultado: 144},
    { fecha: '11-10-2022', tipoEstudio: 'Vitamina D', resultado: 29.2},
    { fecha: '11-10-2022', tipoEstudio: 'Glucosa', resultado: 0.83},
    { fecha: '11-10-2022', tipoEstudio: 'TSH', resultado: 1.81},
    { fecha: '11-10-2022', tipoEstudio: 'Triglicéridos', resultado: 85},
    { fecha: '11-10-2022', tipoEstudio: 'Glóbulos Rojos', resultado: 4.58},
    { fecha: '11-10-2022', tipoEstudio: 'Colesterol', resultado: 141.0},
    { fecha: '19-07-2023', tipoEstudio: 'Vitamina D', resultado: 32.3},
    { fecha: '19-07-2023', tipoEstudio: 'Glucosa', resultado: 0.86},
    { fecha: '19-07-2023', tipoEstudio: 'TSH', resultado: 4.207},
    { fecha: '19-07-2023', tipoEstudio: 'Triglicéridos', resultado: 40},
    { fecha: '19-07-2023', tipoEstudio: 'Glóbulos Rojos', resultado: 4.58},
    { fecha: '19-07-2023', tipoEstudio: 'Colesterol', resultado: 157.0},
    { fecha: '18-12-2023', tipoEstudio: 'Vitamina D', resultado: 31.0},
    { fecha: '18-12-2023', tipoEstudio: 'Glucosa', resultado: 0.90},
    { fecha: '18-12-2023', tipoEstudio: 'TSH', resultado: 2.791},
    { fecha: '18-12-2023', tipoEstudio: 'Triglicéridos', resultado: 66},
    { fecha: '18-12-2023', tipoEstudio: 'Glóbulos Rojos', resultado: 4.72},
    { fecha: '18-12-2023', tipoEstudio: 'Colesterol', resultado: 150.0},
    { fecha: '09-10-2024', tipoEstudio: 'Vitamina D', resultado: 30.00},
    { fecha: '09-10-2024', tipoEstudio: 'Glucosa', resultado: 0.83},
    { fecha: '09-10-2024', tipoEstudio: 'TSH', resultado: 3.05},
    { fecha: '09-10-2024', tipoEstudio: 'Triglicéridos', resultado: 59.0},
    { fecha: '09-10-2024', tipoEstudio: 'Glóbulos Rojos', resultado: 4.50},
    { fecha: '09-10-2024', tipoEstudio: 'Colesterol', resultado: 158.0},
];
// Guardar el array en el LocalStorage, primero lo convierte a formato JSON y luego lo guarda
localStorage.setItem('analisisSangre', JSON.stringify(analisisSangre));
// Leer  los datos desde localStorage
const datosAnalisis = JSON.parse(localStorage.getItem('analisisSangre')) || [];
// Referencia al div de las alertas dinámicas
const contenedorAlertas = document.getElementById('alertasResultados');
// Verificar si los datos existen en el localStorage y mostrarlos
if (datosAnalisis) {
    console.log(datosAnalisis);
} else {
    console.log('No hay datos guardados en localStorage.');
}
// Referencias a los elementos HTML
const tipoEstudioSelect = document.getElementById('tipoEstudio');
const fechaEstudioSelect = document.getElementById('fechaEstudio');
const consultarBtn = document.getElementById('consultar');
const graficoCanvas = document.getElementById('graficoEstudios');
// Funcion para enviar mensajes generales
function mostrarMensaje(texto, tipo, contenedorId) {
    const contenedorMensajes = document.getElementById(contenedorId);
    contenedorMensajes.innerHTML = texto;
    contenedorMensajes.className = `alert alert-${tipo}`; // Cambia la clase según el tipo de mensaje
    contenedorMensajes.style.display = 'block'; // Muestra el contenedor

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        contenedorMensajes.style.display = 'none';
    }, 10000);
}
// Función para generar el gráfico
function generarGrafico(labels, data, estadoResultados, tipoEstudio) {
    const ctx = graficoCanvas.getContext('2d');
    
    // Destruir gráfico anterior si existe
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: ` ${tipoEstudio}`, // Muestra el nombre del estudio
                data: data,
                backgroundColor: estadoResultados.map(estado => {
                    if (estado === 'normal') return 'rgba(54, 162, 235, 0.2)'; // Azul para normal
                    if (estado === 'alto') return 'rgba(255, 99, 132, 0.2)';  // Rojo para alto
                    if (estado === 'bajo') return 'rgba(255, 206, 86, 0.2)';  // Amarillo para bajo
                }),
                borderColor: estadoResultados.map(estado => {
                    if (estado === 'normal') return 'rgba(54, 162, 235, 1)'; // Azul para normal
                    if (estado === 'alto') return 'rgba(255, 99, 132, 1)';  // Rojo para alto
                    if (estado === 'bajo') return 'rgba(255, 206, 86, 1)';  // Amarillo para bajo
                }),
                borderWidth: 1,
                fill: true,
                pointBackgroundColor: estadoResultados.map(estado => {
                    if (estado === 'normal') return 'rgba(54, 162, 235, 1)'; // Azul para normal
                    if (estado === 'alto') return 'rgba(255, 99, 132, 1)';  // Rojo para alto
                    if (estado === 'bajo') return 'rgba(255, 206, 86, 1)';  // Amarillo para bajo
                })
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Resultados para: ${tipoEstudio}`, // Muestra el nombre del estudio en la parte superior
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}
// Función para verificar si el valor está en el rango normal, bajo o alto
function verificarEstado(tipoEstudio, resultado) {
    const rango = rangosNormales[tipoEstudio];
    
    if (resultado < rango.min) {
        return 'bajo';
    } else if (resultado > rango.max) {
        return 'alto';
    } else {
        return 'normal';
    }
}
// Función para agregar una alerta dinámica en el DOM
function agregarAlerta(tipoEstudio, resultado, fecha, estado) {
    // Crear el div de la alerta
    const alerta = document.createElement('div');
    alerta.classList.add('alert', 'alert-warning');
    alerta.role = 'alert';
    alerta.innerHTML = `El resultado del estudio de <strong>${tipoEstudio}</strong> de fecha <strong>${fecha}</strong>  es <strong>${resultado}</strong>, lo cual es <strong>${estado.toUpperCase()}</strong>.`;
    
    // Agregar la alerta al contenedor
    contenedorAlertas.appendChild(alerta);
}
// Función para limpiar las alertas del DOM
function limpiarAlertas() {
    contenedorAlertas.innerHTML = '';
}
// Función para consultar y mostrar resultados en el gráfico
function consultarResultados() {
    const tipoEstudio = tipoEstudioSelect.value;
    const fechaEstudio = fechaEstudioSelect.value;
    if (!tipoEstudio) {
        mostrarMensaje('Por favor, seleccione un tipo de estudio.', 'warning', 'contenedorMensajesGenerales');
        return;
    }
    // Filtrar los datos por tipo de estudio
    const estudiosFiltrados = datosAnalisis.filter(estudio => estudio.tipoEstudio === tipoEstudio);
    let estudiosPorFecha = [];
    if (fechaEstudio === 'Todas') {
        // Si se selecciona "Todas", tomar todos los estudios filtrados
        estudiosPorFecha = estudiosFiltrados;
    } else {
        // Filtrar por la fecha seleccionada
        estudiosPorFecha = estudiosFiltrados.filter(estudio => estudio.fecha === fechaEstudio);
    }
    if (estudiosPorFecha.length === 0) {
        mostrarMensaje('Por favor, seleccione opcion de fecha de estudio.', 'warning', 'contenedorMensajesGenerales');
        return;
    }
    // Limpiar las alertas previas
    limpiarAlertas();

    // Obtener las etiquetas (fechas) y los datos (resultados)
    const etiquetas = estudiosPorFecha.map(estudio => estudio.fecha);
    const resultados = estudiosPorFecha.map(estudio => estudio.resultado);

    // Evaluar el estado de cada resultado (normal, alto, bajo)
    const estadoResultados = estudiosPorFecha.map(estudio => {
        const estado = verificarEstado(estudio.tipoEstudio, estudio.resultado);
        
        // Si el resultado está fuera de rango, agregar una alerta, se activa la alerta dinámica
        if (estado !== 'normal') {
            agregarAlerta(estudio.tipoEstudio, estudio.resultado, estudio.fecha, estado);
        }
        
        return estado;
    });
    // Generar el gráfico con el estado de los resultados
    generarGrafico(etiquetas, resultados, estadoResultados,tipoEstudio);
}
// Agregar evento al botón de consultar
consultarBtn.addEventListener('click', consultarResultados);

