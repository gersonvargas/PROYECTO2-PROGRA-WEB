<?php

class Propiedad {

    public static function obtenerconexion() {
        $file_db = new PDO('sqlite:bienesRaices.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }
    public static function insertarPropiedad($data) {
        //ejemplo de consumo:
        /*
         * http://localhost/proyecto2-progra-web/server/index.php/propiedad/1
          {
          "metodo2":"insertarPropiedad",
          "method":"insertarPropiedad",
          "numero_propiedad":"1",
          "nombre":"Propiedad 1",
          "autor":"user2@gmail.com",
          "tamano":"435",
          "m_cuadrados":"100",
          "tipo_propiedad":"BODEGA",
          "tipo_disponibilidad":"ALQUILER",
          "estado_construccion":"Bueno",
          "descripcion":"Bodega para alquilar",
          "fecha_publicacion":"24/05/2018"
          }
         */
        try {
            $numero_propiedad = $data['numero_propiedad']; // 1= cliente, 2= interesado
            $nombre = $data['nombre'];
            $autor = $data['autor'];
            $tamano = $data['tamano'];
            $m_cuadrados = $data['m_cuadrados'];
            $tipo_propiedad = $data['tipo_propiedad'];
            $tipo_disponibilidad = $data['tipo_disponibilidad'];
            $estado_construccion = $data['estado_construccion'];
            $descripcion = $data['descripcion'];
            $fecha_publicacion = $data['fecha_publicacion'];
            $file_db = Usuario::obtenerconexion();

            $insert = "INSERT INTO PROPIEDAD 
                VALUES (:NUMERO_PROPIEDAD, :NOMBRE, :AUTOR, :TAMANO,
                :M_CUADRADOS, 
                :TIPO_PROPIEDAD,
                :TIPO_DISPONIBILIDAD,
                :ESTADO_CONSTRUCCION,
                :DESCRIPCION,
                :FECHA_PUBLICACION
                )";
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':NUMERO_PROPIEDAD', $numero_propiedad);
            $stmt->bindParam(':NOMBRE', $nombre);
            $stmt->bindParam(':AUTOR', $autor);
            $stmt->bindParam(':TAMANO', $tamano);
            $stmt->bindParam(':M_CUADRADOS', $m_cuadrados);
            $stmt->bindParam(':TIPO_PROPIEDAD', $tipo_propiedad);
            $stmt->bindParam(':TIPO_DISPONIBILIDAD', $tipo_disponibilidad);
            $stmt->bindParam(':ESTADO_CONSTRUCCION', $estado_construccion);
            $stmt->bindParam(':DESCRIPCION', $descripcion);
            $stmt->bindParam(':FECHA_PUBLICACION', $fecha_publicacion);
            $stmt->execute();
            return 'Se ha insertado la informacion!';
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
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

    //select count(*) aplicadas from PROP_APLICADAS WHERE PROP_APLICADAS.PROPIEDAD=2;
    public static function obtenerCantidadAplicadas($numero_propiedad) {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/server/index.php/propiedad/1/?metodo=obtenerCantidadAplicadas&numero_propiedad=1
         $dbh = Propiedad::obtenerconexion();
         try {            
                 $stmt = $dbh->prepare("select count(*) aplicadas from PROP_APLICADAS WHERE PROP_APLICADAS.PROPIEDAD=:numero");
                 $stmt->bindParam(':numero', $numero_propiedad);
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
      //select count(*) aplicadas from PROP_APLICADAS WHERE PROP_APLICADAS.PROPIEDAD=2;
    public static function obtenerTodasAplicadas() {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/server/index.php/propiedad/1/?metodo=obtenerTodasAplicadas
         $dbh = Propiedad::obtenerconexion();
         try {            
                 $stmt = $dbh->prepare("select PROPIEDAD,count(*) aplicadas from PROP_APLICADAS group by PROPIEDAD");
              
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
