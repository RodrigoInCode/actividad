<?php

include("conexion.php");
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$respuesta = array('success' => false, 'mensaje' => '');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // $usuario = $_POST['usuario'];
    $nombre = $_POST['nombre'];
    $apellidoP = $_POST['apellidoP'];
    $apellidoM = $_POST['apellidoM'];
    $carrera = $_POST['carrera'];
    $estatura = $_POST['estatura'];
    $correo = $_POST['correo'];
    $grupo = $_POST['grupo'];
    $edad = $_POST['edad'];

    
    
    
    

    
    $stmt = $conn->prepare("INSERT INTO `alumno`(`nombre`, `apellidoP`, `apellidoM`, `carrera`, `estatura`, `email`, `grupo`, `edad`) VALUES (?,?,?,?,?,?,?,?)");
    if ($stmt === false) {
        $respuesta['mensaje'] = "Error_al_preparar_la_consulta:" . $conex->error;
        echo json_encode($respuesta);
    }else {
        $stmt->bind_param("ssssissi",$nombre,$apellidoP,$apellidoM,$carrera,$estatura, $correo,$grupo,$edad);
    }

    if ($stmt->execute()) {
        
        $respuesta['mensaje'] = "Formulario_recibido_con_exito";
        $respuesta['success']=true;
    } else {
       
        $respuesta['mensaje']= "Error:".$stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método de solicitud no válido.";
    echo json_encode(['message'=> 'Método de solicitud no válido']);
}
echo json_encode($respuesta);

?>