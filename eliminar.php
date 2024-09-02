<?php
include("conexion.php");
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);

    $sql = "DELETE FROM alumno WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo "Estudiante eliminado correctamente";
    } else {
        echo "Error al eliminar estudiante: " . $conn->error;
    }
}

$conn->close();
?>