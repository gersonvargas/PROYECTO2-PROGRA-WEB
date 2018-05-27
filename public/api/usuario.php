<?php

class Usuario {

    public static function obtenerconexion() {
        $file_db = new PDO('sqlite:bienesRaices.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }

    public static function insertarUsuario($data) {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/server/index.php/usuario/1
        /* POST ->
          {"method":"put","metodo2":"insertarUsuario","t_user":"2","nombre":"Gerson Vargas","telefono":"45632255","email":"gerson@gmail.com","provincia":"Alajuela","ubicacion":"La Guaria","password":"123"}
         */
        try {
            $tipo_usuario = $data['t_user']; // 1= cliente, 2= interesado
            $nombre = $data['nombre'];
            $telefono = $data['telefono'];
            $email = $data['email'];
            $provincia = $data['provincia'];
            $ubicacion = $data['ubicacion'];
            $pass = $data['password'];
            $file_db = Usuario::obtenerconexion();
            $insert = '';
            $propiedad = '';
            if ($tipo_usuario == '1') {
                $propiedad = $data['propiedad_requerida'];
                // Prepare INSERT statement to SQLite3 file db
                $insert = "INSERT INTO CLIENTE 
                VALUES (:nombre, :telefono, :email, :provincia, :ubicacion, :propiedad_requerida,:password)";
            } else if ($tipo_usuario == '2') {
                $insert = "INSERT INTO INTERESADO 
                VALUES (:nombre, :telefono, :email, :provincia, :ubicacion, :password)";
            }
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':telefono', $telefono);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':provincia', $provincia);
            $stmt->bindParam(':ubicacion', $ubicacion);
            $stmt->bindParam(':password', $pass);

            if ($tipo_usuario == '1') {
                $stmt->bindParam(':propiedad_requerida', $propiedad);
            }
            $stmt->execute();

            $fecha = date("Y-m-d");
            $insert2 = "INSERT INTO USUARIO 
                VALUES (:USERNAME, :EMAIL, :PASSWORD, :LAST_MODIFIED, :TIPO_USUARIO)";
            $stmt2 = $file_db->prepare($insert2);
            $stmt2->bindParam(':USERNAME', $nombre);
            $stmt2->bindParam(':EMAIL', $email);
            $stmt2->bindParam(':LAST_MODIFIED', $fecha);
            $stmt2->bindParam(':TIPO_USUARIO', $tipo_usuario);
            $stmt2->bindParam(':PASSWORD', $pass);
            $stmt2->execute();
            return 'Se ha insertado la informacion!';
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }

}
