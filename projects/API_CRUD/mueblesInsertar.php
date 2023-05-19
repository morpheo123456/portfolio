<?php
    //sleep(2);   
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
    
    

    if(isset($_REQUEST['title']) && isset($_REQUEST['company']) && isset($_REQUEST['image']) && isset($_REQUEST['price'])){
      
        
        
        $id=generarId(17);
        $titulo = $_REQUEST['title'];
        $compania = $_REQUEST['company'];
        $imagen= $_REQUEST['image'];
        $precio= $_REQUEST['price'];
        
        $sentencia=$conexion->prepare("INSERT INTO 
                                            $dbtable
                                            VALUES (?,?,?,?,?);");
                                            
        $sentencia->bind_param("ssssd",$id,
                                       $titulo,
                                       $compania,
                                       $imagen,
                                       $precio);
        
        $sentencia->execute();
        $filas_afectadas = $sentencia->affected_rows;
        
        if($filas_afectadas != 1){
            http_response_code(406);
        }
        
    }else{
        http_response_code(400);
    }

   
 ?>