// Función para guardar operaciones en el historial
function saveOperationToHistory(operation, result) {
    // Obtener el usuario actual desde sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
        // Obtener el historial actual desde localStorage
        const history = JSON.parse(localStorage.getItem('operationsHistory')) || [];

        // Crear un nuevo registro de operación
        const newRecord = {
            user: currentUser.username, // Nombre de usuario
            operation: operation,       // Operación realizada (ej: "5 + 3")
            result: result,             // Resultado de la operación (ej: 8)
            timestamp: new Date().toLocaleString() // Fecha y hora
        };

        // Agregar el nuevo registro al historial
        history.push(newRecord);

        // Guardar el historial actualizado en localStorage
        localStorage.setItem('operationsHistory', JSON.stringify(history));
    }
}