<?php

class Propiedad {

    public static function obtenerconexion() {
        $file_db = new PDO('sqlite:base.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }
   public static function obtenerPropiedades() {
       //Ejemplo de consumo URL
       //http://localhost/proyecto2-progra-web/server/index.php/propiedad/1/?metodo=getpropiedades
        $dbh = Propiedad::obtenerconexion();
        try {
            
                $stmt = $dbh->prepare("SELECT * FROM PROPIEDAD");
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

}
