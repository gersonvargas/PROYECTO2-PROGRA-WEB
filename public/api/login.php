<?php

class Login {

    public static function obtenerconexion() {
        $file_db = new PDO('sqlite:bienesRaices.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }

   public static function obtenerUsuario($email = null, $password = null) {
        try {
            $dbh = Login::obtenerconexion();
            if ($email && $password) {
                $select = "SELECT * FROM USUARIO WHERE EMAIL = '" . $email . "' and PASSWORD = '" . $password . "';";
                $stmt = $dbh->prepare($select);
                $stmt->execute();
                $usuario = $stmt->fetchObject();
                echo json_encode($usuario);
            }
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

}
