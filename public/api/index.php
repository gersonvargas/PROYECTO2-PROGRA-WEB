<?php

require("Toro.php");
require("login.php");
require("propiedades.php");
require("usuario.php");

class DBHandler {

    function init() {
        try {
            $dbh = new PDO('sqlite:bienesRaices.db');
            return $dbh;
        } catch (Exception $e) {
            die("Unable to connect: " . $e->getMessage());
        }
    }

    function obtenerconexion() {
        $file_db = new PDO('sqlite:bienesRaices.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }

    
    function get($id = null) {
        $metodo = $_GET['metodo'];
        if ($metodo) {
            if ($metodo == 'login') {
                $email = $_GET['email'];
                $password = $_GET['password'];
                return Login::obtenerUsuario($email, $password);
            } else if ($metodo == 'getpropiedades') {
                return Propiedad::obtenerPropiedades();
            }
            else if ($metodo == 'obtenerCantidadAplicadas') {
                $numero_propiedad = $_GET['numero_propiedad'];
                return Propiedad::obtenerCantidadAplicadas($numero_propiedad);
            }
            else if ($metodo == 'obtenerTodasAplicadas') {
                return Propiedad::obtenerTodasAplicadas();
            }else if ($metodo == 'obtenerPropiedadesUsuario') {
                $user = $_GET['email'];
                return Propiedad::obtenerPropiedadesUsuario($user);
            }//obtenerMensajesPropiedad
            else if ($metodo == 'obtenerMensajesPropiedad') {
                $propiedad = $_GET['propiedad'];
                return Propiedad::obtenerMensajesPropiedad($propiedad);
            }
        }
    }

    function put($_DATA) {

        try {
            // $_PUT = json_decode(file_get_contents('php://input'), True);
            $metodo = $_DATA['metodo2'];
            if ($metodo == 'insertarUsuario') {
                Usuario::insertarUsuario($_DATA);
            }else if ($_POST['metodo2'] == 'insertarPostulacion') {
                return Propiedad::insertarPostulacion($_POST);
             }
            echo 'Successfull';
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    function delete($data) {
        try {
            $metodo = $data['metodo2'];
            if($metodo=='eliminarPropiedad'){
                $numero=$data['numero_propiedad'];
                Propiedad::eliminarPropiedad($numero);
            }else if($metodo=='eliminarUsuario'){
                $email=$data['email'];
                $tipo_usuario=$data['tipo_usuario'];
                Usuario::eliminarUsuario($email,$tipo_usuario);
            }
        } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
        }
    }

    function post($id = null) {

        try {
            $_POST = json_decode(file_get_contents('php://input'), True);
            if ($_POST['method'] == 'login') {
                return Login::obtenerusuario('gerson@gmail.com', 'admin123');
            } else if ($_POST['method'] == 'delete') {
                return $this->delete($_POST);
            } else if ($_POST['method'] == 'put') {
                return $this->put($_POST);
            } else if ($_POST['method'] == 'insertarPropiedad') {
               return Propiedad::insertarPropiedad($_POST);
            }else if ($_POST['method'] == 'modificarPropiedad') {
                return Propiedad::modificarPropiedad($_POST);
             } 
            
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }
}

Toro::serve(array(
    "/login" => "DBHandler",
    "/propiedad/:alpha" => "DBHandler",
    "/usuario/:alpha" => "DBHandler",
    "/country/:alpha/:alpha" => "DBHandler",
));

