<?php

function conectarBD($host,$usuario,$contrasena){
    $mbd = new mysqli($host,$usuario,$contrasena);
    $mbd->set_charset("utf8");
    
    return $mbd;
}

function generarId($longitud){
    $patron="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $clave="";
    for($i=1;$i<=$longitud;$i++){
        $caracter=$patron[rand(0,strlen($patron)-1)];
        $clave=$clave.$caracter;
    
    }
    echo $clave;
    return $clave;
}
?>