<?php
require_once "App.php";

class Usuario extends App
{

    public static function obtenerconexion()
    {
        $file_db = new PDO('sqlite:bienesRaices.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }

    public static function insertarUsuario($data)
    {
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


            $select = "SELECT EMAIL FROM USUARIO where email = '" . $email . "'";
            $stmt = $file_db->prepare($select);
            $stmt->execute();
            $usuario = $stmt->fetchObject();
            if($usuario){
                return Usuario::error("Este correo ya esta registrado. Intente con otro.");
            }

            if ($tipo_usuario == '1') {
                $propiedad = $data['propiedad_requerida'];
                $insert = "INSERT INTO CLIENTE 
                VALUES (:nombre, :telefono, :email, :provincia, :ubicacion, :propiedad_requerida)";
            } else if ($tipo_usuario == '2') {
                $insert = "INSERT INTO INTERESADO 
                VALUES (:nombre, :telefono, :email, :provincia, :ubicacion)";
            }
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':telefono', $telefono);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':provincia', $provincia);
            $stmt->bindParam(':ubicacion', $ubicacion);

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
            return Usuario::success('Se ha insertado el usuario');
        } catch (PDOException $e) {
            return Usuario::error($e->getMessage());
        }
    }
    public static function actualizarUsuario($data)
    {
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
                $insert = "UPDATE CLIENTE 
                SET NOMBRE=:nombre,
                TELEFONO=:telefono,
                PROVINCIA=:provincia,
                UBICACION=:ubicacion,
                PROPIEDAD_REQUERIDA=:propiedad_requerida
                WHERE 
                EMAIL=:email
                ";
            } else if ($tipo_usuario == '2') {
                $insert = "UPDATE INTERESADO 
                SET NOMBRE=:nombre,
                TELEFONO=:telefono,
                PROVINCIA=:provincia,
                UBICACION=:ubicacion
                WHERE 
                EMAIL=:email
                ";
            }
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':telefono', $telefono);
            $stmt->bindParam(':provincia', $provincia);
            $stmt->bindParam(':ubicacion', $ubicacion);
            $stmt->bindParam(':email', $email);

            if ($tipo_usuario == '1') {
                $stmt->bindParam(':propiedad_requerida', $propiedad);
            }
            $stmt->execute();

            $fecha = date("Y-m-d");
            $insert2 = "UPDATE USUARIO 
            SET 
            USERNAME=:USERNAME,
            PASSWORD=:PASSWORD,
            LAST_MODIFIED=:LAST_MODIFIED,
            TIPO_USUARIO=:TIPO_USUARIO
            WHERE 
            EMAIL=:EMAIL";
            $stmt2 = $file_db->prepare($insert2);
            $stmt2->bindParam(':USERNAME', $nombre);
            $stmt2->bindParam(':EMAIL', $email);
            $stmt2->bindParam(':LAST_MODIFIED', $fecha);
            $stmt2->bindParam(':TIPO_USUARIO', $tipo_usuario);
            $stmt2->bindParam(':PASSWORD', $pass);
            $stmt2->execute();
            return Usuario::success('Se ha modificado el usuario.');
        } catch (PDOException $e) {
            return Usuario::error($e->getMessage());
        }
    }
    public static function eliminarUsuario($usuario,$tipo_usuario)
    {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/public/api/index.php/propiedad/1/?metodo=obtenerPropiedadesUsuario&email=gersonvargas@gmail.com
        $dbh = Usuario::obtenerconexion();
        try {
            $stmt = $dbh->prepare("DELETE FROM USUARIO where EMAIL=:user");
            $stmt->bindParam(':user', $usuario);
            $stmt->execute();
            
            $delteuser='';
            if ($tipo_usuario == '1') {
                $delteuser='DELETE FROM CLIENTE where EMAIL=:user';
                $delteapli='DELETE FROM PROP_APLICADAS where EMAIL_CLIENTE=:user';
                $apli = $dbh->prepare($delteapli);
                $apli->bindParam(':user', $usuario);
                $apli->execute();
            }else 
            if($tipo_usuario == '2'){
                $delteuser='DELETE FROM INTERESADO where EMAIL=:user';
                $delteuser3='DELETE FROM PROPIEDAD where AUTOR=:user';
                $stmt3 = $dbh->prepare($delteuser3);
                $stmt3->bindParam(':user', $usuario);
                $stmt3->execute();
            }
            $stmt2 = $dbh->prepare($delteuser);
            $stmt2->bindParam(':user', $usuario);
            $stmt2->execute();
            return Usuario::success('Se ha eliminado el usuario.');
        } catch (PDOException $e) {
            // Print PDOException message
            return Usuario::error($e->getMessage());
        }
    }

}
