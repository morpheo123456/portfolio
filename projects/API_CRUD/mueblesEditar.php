<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    include "functions.php";
    include "config.php";
      
    //PARA SIMULAR EL RETARDO DEL SERVIDOR
    sleep(1);  
      
    $conexion=conectarBD($dbhost,$dbuser,$dbpass);
    $conexion->select_db($dbname);
    
    //EL IF ES PARA PROBARLO A MANO
    //EN TEORIA EL FORMULARIO COMPRUEBA QUE LOS DATOS SON CORRECTOS 
    
    if(isset($_REQUEST['id']) && isset($_REQUEST['title']) && isset($_REQUEST['company']) && isset($_REQUEST['image']) && isset($_REQUEST['price'])){
      
        $id=$_REQUEST['id'];
        $titulo = $_REQUEST['title'];
        $compania = $_REQUEST['company'];
        $imagen= $_REQUEST['image'];
        $precio= $_REQUEST['price'];
        
        $sentencia=$conexion->prepare("UPDATE $dbtable 
                                          SET title=?,
                                              company=?,
                                              image=?,
                                              price=?
                                           WHERE id = ?;");

        $sentencia->bind_param("sssds",$titulo,
                                        $compania,
                                        $imagen,
                                        $precio,
                                        $id);
        $sentencia->execute();

        $filas_afectadas = $sentencia->affected_rows;
        if($filas_afectadas != 1){
            http_response_code(406);
        }
        
    }else{
        http_response_code(400);
    }
   
 ?>