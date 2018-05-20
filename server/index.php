<?php

require("Toro.php");
require("login.php");
class DBHandler {
    function init() {
        try {
            $dbh = new PDO('sqlite:base.db');
            return $dbh;
        } catch (Exception $e) {
            die("Unable to connect: " . $e->getMessage());
        }
    }
 function obtenerconexion() {
        $file_db = new PDO('sqlite:base.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }
    function getFacturas($id = null) {
        $dbh = $this->init();
        try {
            if ($id != null) {
                $stmt = $dbh->prepare("SELECT * FROM factura WHERE numero = :id");
                $stmt->bindParam(':id', $id);
            } else {
                $stmt = $dbh->prepare("SELECT * FROM factura");
            }
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
        function obtenersubtotal($factura) {
        $porcentaje = 0;
        try {
            $file_db = $this->obtenerconexion();
            $statement = 'select sum(subtotal) subt from producto where factura=' . $factura . '';
            $result = $file_db->query($statement);
            foreach ($result as $row) {
                $porcentaje = $row['subt'];
            }
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
        return $porcentaje;
    }
 function actualizarrelacionfactura($factura, $producto, $cnx) {
        try {

            $update = "UPDATE producto 
            SET factura = :factura                         
                WHERE descripcion=:producto";

            $stmt = $cnx->prepare($update);
            $stmt->bindParam(':factura', $factura);
            $stmt->bindParam(':producto', $producto);
            $stmt->execute();

            return 'Se ha actualizado la informacion!';
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }
    function insertarfactura($data) {

        $numero = $data['numeroi'];
        $fecha = $data['fechai'];
        $cliente = $data['clientei'];
        try {
            $file_db = $this->init();
            if (isset($data['selectprods'])) {
                $vec = $data['selectprods'];
               // foreach ($vec as $selectedOption) {
                for($i=0;$i<count($vec);$i++){
                    $aux=$vec[$i];
                    $this->actualizarrelacionfactura($numero,$aux['descripcion'] , $file_db);
                }
            }
            $impuestos = $this->obtenersubtotal($numero) * 0.13;
            $montototal = $this->obtenersubtotal($numero) * (100 + 0.13) / 100;

            //Monto * (100 + porcentaje) / 100
            // Prepare INSERT statement to SQLite3 file db
            $insert = "INSERT INTO factura (numero, fecha, cliente,impuestos,montototal) 
                VALUES (:numero, :fecha, :cliente,:impuestos,:montototal)";
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':numero', $numero);
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':cliente', $cliente);
            $stmt->bindParam(':impuestos', $impuestos);
            $stmt->bindParam(':montototal', $montototal);
            $stmt->execute();
            return $data;
        } catch (PDOException $e) {
            // Print PDOException message
            return $e->getMessage();
        }
    }
    function modificarfactura($data) {
        $numero = $data['numerom'];
        $fecha = $data['fecham'];
        $cliente = $data['clientem'];
        //$impuestos = $data['impuestosm'];
        //$montototal = $data['montototalm'];
        try {
            $file_db = $this->obtenerconexion();
            // Prepare INSERT statement to SQLite3 file db
            $update = "UPDATE factura 
            SET cliente = :cliente, fecha = :fecha , montototal = :montototal, impuestos=:impuestos                         
                WHERE numero=:numero";

            $stmt = $file_db->prepare($update);
            $stmt->bindParam(':numero', $numero);
            $stmt->bindParam(':fecha', $fecha);
            $stmt->bindParam(':cliente', $cliente);
           // $stmt->bindParam(':impuestos', $impuestos);
           // $stmt->bindParam(':montototal', $montototal);
            $stmt->execute();

            echo 'Se ha actualizado la factura: ' . $numero;
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }
        function eliminarfactura($data) {
        $numero = $data['numeroe'];
        try {
            $file_db = $this->obtenerconexion();
            // Prepare INSERT statement to SQLite3 file db
            $insert = "DELETE FROM factura WHERE NUMERO=:numero";
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':numero', $numero);
            $stmt->execute();
            $this->eliminardependenciafactura($numero);
            echo 'Se ha eliminado el registro con el numero: ' . $numero;
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }
       function eliminardependenciafactura($factura) {
        try {
            $file_db = $this->obtenerconexion();
            // Prepare INSERT statement to SQLite3 file db
            $insert = "delete from producto where factura=:numero";
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':numero', $factura);
            $stmt->execute();

            return 'Se ha eliminado el registro con el numero: ' . $factura;
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }
    function getProductos($id = null) {
        $dbh = $this->init();
        try {
            if ($id != null) {
                $stmt = $dbh->prepare("SELECT * FROM producto WHERE numero = :id");
                $stmt->bindParam(':id', $id);
            } else {
                $stmt = $dbh->prepare("SELECT * FROM producto");
            }
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
 function insertarproducto($data) {
        $cantidad = $data['cantidad'];
        $descripcion = $data['descripcion'];
        $valoru = $data['valoru'];
        $subtotal = $cantidad * $valoru;
        $factura = 0;
        try {
            $file_db = $this->obtenerconexion();
            // Prepare INSERT statement to SQLite3 file db
            $insert = "INSERT INTO producto (cantidad, descripcion, valorunitario,subtotal, factura) 
                VALUES (:cantidad, :descripcion, :valorunitario, :subtotal, :factura)";
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':cantidad', $cantidad);
            $stmt->bindParam(':descripcion', $descripcion);
            $stmt->bindParam(':valorunitario', $valoru);
            $stmt->bindParam(':subtotal', $subtotal);
            $stmt->bindParam(':factura', $factura);
            $stmt->execute();
            return 'Se ha insertado la informacion!';
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }
    function get($id1 = null) {
       // $_GET = json_decode(file_get_contents('php://input'), True);
        $metodo=$_GET['metodo'];
        if ($metodo) {
            if ($metodo == 'login') {//OBTENER LOGIN
                $email=$_GET['email'];
                $password=$_GET['password'];
               return Login::obtenerusuario($email, $password);
            }
            if ($metodo == 2) {
                $this->getProductos($id);
            }
        }
         
    }

    function put($id = null) {
        
        try {
            $_PUT = json_decode(file_get_contents('php://input'), True);
           $this->insertarfactura($_PUT);
            echo 'Successfull';
        } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
        }
    }

    function delete($data) {
        try {
            
           $this->eliminarfactura($data);
            
        } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
        }
    }

    function post($id = null) {
        $dbh = $this->init();
        try {
            $_POST = json_decode(file_get_contents('php://input'), True);
            if ($_POST['method'] == 'login'){
                return Login::obtenerusuario('gerson@gmail.com', 'admin123');
            }
            else if ($_POST['method'] == 'delete'){
                return $this->delete($_POST);
            }
             else if ($_POST['method'] == 'insertarproducto'){
                return $this->insertarproducto($_POST);
            }
            
            else {
               $this->modificarfactura($_POST);
            }
           
        } catch (Exception $e) {
            $dbh->rollBack();
            echo "Failed: " . $e->getMessage();
        }
    }

}

Toro::serve(array(
    "/country/:alpha" => "DBHandler",
    "/login/:alpha" => "DBHandler",
    "/country/:alpha/:alpha" => "DBHandler",
));

