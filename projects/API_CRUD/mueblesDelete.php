<?php
    //Cabeceras
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    include "functions.php";
    include "config.php";
     
    //PARA SIMULAR EL RETARDO DEL SERVIDOR
    sleep(1);  
      
    $conexion=conectarBD($dbhost,$dbuser,$dbpass);
    $conexion->select_db($dbname);
    

    if(isset($_REQUEST['id'])){
        $id = $_REQUEST['id'];
  
        
        $sentencia=$conexion->prepare("DELETE FROM $dbtable WHERE id=?");
        $sentencia->bind_param("s",$id);
        
        $sentencia->execute();
        
        $filas_afectadas = $sentencia->affected_rows;
        
        if($filas_afectadas != 1){
            http_response_code(404);
        }
        
    }else{
        http_response_code(400);
    }
 ?>