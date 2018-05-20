<?php

class Login {

    public static function obtenerconexion() {
        $file_db = new PDO('sqlite:base.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }

   public static function obtenerusuario($email = null, $password = null) {
       //Ejemplo de consumo URL
       //http://localhost/proyecto2-progra-web/server/index.php/login/1/?metodo=login&email=gerson@gmail.com&password=admin123
        $dbh = Login::obtenerconexion();
        try {
            if ($email && $password) {
                $stmt = $dbh->prepare("SELECT * FROM USUARIO WHERE EMAIL = :email and PASSWORD = :password");
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':password', $password);
                $stmt->execute();
                $data = Array();
                while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    $data[] = $result;
                }
                echo json_encode($data);
            }
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

}
