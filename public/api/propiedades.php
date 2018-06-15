<?php
require_once "App.php";

class Propiedad extends App
{

    public static function obtenerconexion()
    {
        $file_db = new PDO('sqlite:bienesRaices.db');
        // Set errormode to exceptions
        $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $file_db;
    }

    public static function modificarPropiedad($data)
    {
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
            $localidad = $data['localidad'];
            $cliudad = $data['ciudad'];
            $provincia = $data['provincia'];
            $precio=$data['precio'];
            $file_db = Propiedad::obtenerconexion();

            if ($tipo_propiedad == 'Apartamento' || $tipo_propiedad == 'Vivienda') {
                $cantidad_banos = $data['cantidad_banos'];
                $cantidad_habitaciones = $data['cantidad_habitaciones'];
                $cantidad_cocheras = $data['cantidad_cocheras'];
                $cantidad_pisos = $data['cantidad_pisos'];
            } else {
                $cantidad_banos = 0;
                $cantidad_habitaciones = 0;
                $cantidad_cocheras = 0;
                $cantidad_pisos = 0;
            }

            $insert = "UPDATE PROPIEDAD 
                SET 
                NOMBRE=:NOMBRE,
                AUTOR=:AUTOR,
                TAMANO=:TAMANO,
                M_CUADRADOS=:M_CUADRADOS,
                TIPO_PROPIEDAD=:TIPO_PROPIEDAD,
                TIPO_DISPONIBILIDAD=:TIPO_DISPONIBILIDAD,
                ESTADO_CONSTRUCCION=:ESTADO_CONSTRUCCION,
                DESCRIPCION=:DESCRIPCION,
                LOCALIDAD=:LOCALIDAD,
                CIUDAD=:CIUDAD,
                CANTIDAD_HABITACIONES=:CANTIDAD_HABITACIONES,
                CANTIDAD_BANOS=:CANTIDAD_BANOS,
                CANTIDAD_COCHERAS=:CANTIDAD_COCHERAS,
                CANTIDAD_PISOS=:CANTIDAD_PISOS,
                PROVINCIA=:PROVINCIA,
                PRECIO=:PRECIO
                WHERE NUMERO_PROPIEDAD=:NUMERO_PROPIEDAD";

            $stmt = $file_db->prepare($insert);

            $stmt->bindParam(':NOMBRE', $nombre);
            $stmt->bindParam(':AUTOR', $autor);
            $stmt->bindParam(':TAMANO', $tamano);
            $stmt->bindParam(':M_CUADRADOS', $m_cuadrados);
            $stmt->bindParam(':TIPO_PROPIEDAD', $tipo_propiedad);
            $stmt->bindParam(':TIPO_DISPONIBILIDAD', $tipo_disponibilidad);
            $stmt->bindParam(':DESCRIPCION', $descripcion);
            $stmt->bindParam(':ESTADO_CONSTRUCCION', $estado_construccion);
            $stmt->bindParam(':LOCALIDAD', $localidad);
            $stmt->bindParam(':CIUDAD', $cliudad);
            $stmt->bindParam(':PROVINCIA', $provincia);
            $stmt->bindParam(':CANTIDAD_HABITACIONES', $cantidad_habitaciones);
            $stmt->bindParam(':CANTIDAD_BANOS', $cantidad_banos);
            $stmt->bindParam(':CANTIDAD_COCHERAS', $cantidad_cocheras);
            $stmt->bindParam(':CANTIDAD_PISOS', $cantidad_pisos);
            $stmt->bindParam(':PRECIO', $precio);
            $stmt->bindParam(':NUMERO_PROPIEDAD', $numero_propiedad);
            $stmt->execute();

            return App::success('Se ha modificado la informacion.');
        } catch (PDOException $e) {
            // Print PDOException message
            return App::error($e->getMessage());
        }
    }

    public static function insertarPropiedad($data)
    {
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
            $localidad = $data['localidad'];
            $cliudad = $data['ciudad'];
            $provincia = $data['provincia'];
            $precio=$data['precio'];
            $file_db = Propiedad::obtenerconexion();
            if ($tipo_propiedad == 'Apartamento' || $tipo_propiedad == 'Vivienda') {
                $cantidad_banos = $data['cantidad_banos'];
                $cantidad_habitaciones = $data['cantidad_habitaciones'];
                $cantidad_cocheras = $data['cantidad_cocheras'];
                $cantidad_pisos = $data['cantidad_pisos'];
            } else {
                $cantidad_banos = 0;
                $cantidad_habitaciones = 0;
                $cantidad_cocheras = 0;
                $cantidad_pisos = 0;
            }

            $insert2 = "INSERT INTO PROPIEDAD 
                 VALUES (:NUMERO_PROPIEDAD, 
                :NOMBRE,
                :AUTOR, 
                :TAMANO,
                :M_CUADRADOS, 
                :TIPO_PROPIEDAD,
                :TIPO_DISPONIBILIDAD,
                :ESTADO_CONSTRUCCION,
                :DESCRIPCION,
                :LOCALIDAD,
                :CIUDAD,
                :PROVINCIA,
                :CANTIDAD_HABITACIONES, 
                :CANTIDAD_BANOS,
                :CANTIDAD_COCHERAS,
                :CANTIDAD_PISOS,
                :FECHA_PUBLICACION,
                :PRECIO
                 )";
            $stmt2 = $file_db->prepare($insert2);
            $stmt2->bindParam(':NUMERO_PROPIEDAD', $numero_propiedad);
            $stmt2->bindParam(':NOMBRE', $nombre);
            $stmt2->bindParam(':AUTOR', $autor);
            $stmt2->bindParam(':TAMANO', $tamano);
            $stmt2->bindParam(':M_CUADRADOS', $m_cuadrados);
            $stmt2->bindParam(':TIPO_PROPIEDAD', $tipo_propiedad);
            $stmt2->bindParam(':TIPO_DISPONIBILIDAD', $tipo_disponibilidad);
            $stmt2->bindParam(':ESTADO_CONSTRUCCION', $estado_construccion);
            $stmt2->bindParam(':DESCRIPCION', $descripcion);
            $stmt2->bindParam(':LOCALIDAD', $localidad);
            $stmt2->bindParam(':CIUDAD', $cliudad);
            $stmt2->bindParam(':PROVINCIA', $provincia);
            $stmt2->bindParam(':CANTIDAD_HABITACIONES', $cantidad_habitaciones);
            $stmt2->bindParam(':CANTIDAD_BANOS', $cantidad_banos);
            $stmt2->bindParam(':CANTIDAD_COCHERAS', $cantidad_cocheras);
            $stmt2->bindParam(':CANTIDAD_PISOS', $cantidad_pisos);
            $stmt2->bindParam(':FECHA_PUBLICACION', $fecha_publicacion);
            $stmt2->bindParam(':PRECIO', $precio);
            $stmt2->execute();

            return Propiedad::success('Se ha insertado la informacion.');
        } catch (PDOException $e) {
            // Print PDOException message
            return Propiedad::error($e->getMessage());
        }
    }

    public static function insertarPostulacion($data)
    {
        //ejemplo de consumo:
        /*
         * http://localhost/proyecto2-progra-web/public/api/index.php/propiedad/1
          {
"metodo2":"insertarPostulacion",
"method":"put",
"numero_propiedad":"2",
"mensaje":"Estoy interesado en esta propeiedad, contacteme 1",
"email":"gersonvargas1@gmail.com",
"fecha":"24/05/2018"
}
         */
        try {
            $numero_propiedad = $data['numero_propiedad']; // 1= cliente, 2= interesado
            $email = $data['email'];
            $mensaje = $data['mensaje'];
            $fecha = $data['fecha'];
            $file_db = Propiedad::obtenerconexion();
            $insert = "INSERT INTO PROP_APLICADAS VALUES (:EMAIL_CLIENTE,:PROPIEDAD,:MENSAJE,:FECHA_APLICADA)";
            $stmt = $file_db->prepare($insert);
            $stmt->bindParam(':EMAIL_CLIENTE', $email);
            $stmt->bindParam(':PROPIEDAD', $numero_propiedad);
            $stmt->bindParam(':MENSAJE', $mensaje);
            $stmt->bindParam(':FECHA_APLICADA', $fecha);
            $stmt->execute();
            return 'Se ha insertado la informacion!';
        } catch (PDOException $e) {
            // Print PDOException message
            echo $e->getMessage();
        }
    }

    public static function obtenerPropiedades()
    {
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

    public static function obtenerPropiedadesUsuario($email)
    {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/public/api/index.php/propiedad/1/?metodo=obtenerPropiedadesUsuario&email=gersonvargas@gmail.com
        $dbh = Propiedad::obtenerconexion();
        try {
            $stmt = $dbh->prepare("SELECT * FROM PROPIEDAD where AUTOR=:EMAIL");
            $stmt->bindParam(':EMAIL', $email);
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
    public static function obtenerCantidadAplicadas($numero_propiedad)
    {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/public/api/index.php/propiedad/1/?metodo=obtenerCantidadAplicadas&numero_propiedad=1
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
    public static function obtenerTodasAplicadas()
    {
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

    public static function eliminarPropiedad($numero)
    {
        //Ejemplo de consumo URL
        //http://localhost/proyecto2-progra-web/public/api/index.php/propiedad/1/?metodo=obtenerPropiedadesUsuario&email=gersonvargas@gmail.com
        $dbh = Propiedad::obtenerconexion();
        try {
            $stmt = $dbh->prepare("DELETE FROM PROPIEDAD where NUMERO_PROPIEDAD=:numero");
            $stmt->bindParam(':numero', $numero);
            $stmt->execute();
            $stmt2 = $dbh->prepare("DELETE FROM PROP_APLICADAS where PROPIEDAD=:numero");
            $stmt2->bindParam(':numero', $numero);
            $stmt2->execute();
            return App::success('Se ha eliminado la informacion');
        } catch (PDOException $e) {
            // Print PDOException message
            return App::error($e->getMessage());
        }
    }

    // select * from PROP_APLICADAS WHERE PROPIEDAD=1
    public static function obtenerMensajesPropiedad($propiedad)
    {
        //Ejemplo de consumo URL
        //api/index.php/propiedad/1/?metodo=obtenerMensajesPropiedad&propiedad=1
        $dbh = Propiedad::obtenerconexion();
        try {
            $stmt = $dbh->prepare("select * from PROP_APLICADAS WHERE PROPIEDAD=:propiedad");
            $stmt->bindParam(':propiedad', $propiedad);
            $stmt->execute();
            $data = Array();
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $data[] = $result;
            }
            echo json_encode($data);
        } catch (Exception $e) {
            return App::error($e->getMessage());
        }
    }

    public static function getDataCharts()
    {
        $dbh = Propiedad::obtenerconexion();
        try {
            $data = array();

            $selectTipoPropiedad = "SELECT TIPO_PROPIEDAD, COUNT(*) AS QTY FROM PROPIEDAD GROUP BY TIPO_PROPIEDAD ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectTipoPropiedad);
            $stmt->execute();
            $resultTipoPropiedad = $stmt->fetchAll();
            $dataTipoPropiedad = array();
            foreach ($resultTipoPropiedad as $rtp) {
                $dataTipoPropiedad[$rtp['TIPO_PROPIEDAD']] = $rtp['QTY'];
            }
            $data['dataTipoPropiedad'] = $dataTipoPropiedad;

            $selectDisponibilidadPropiedad = "SELECT TIPO_DISPONIBILIDAD, COUNT(*) AS QTY FROM PROPIEDAD GROUP BY TIPO_DISPONIBILIDAD ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectDisponibilidadPropiedad);
            $stmt->execute();
            $resultDisponibilidadPropiedad = $stmt->fetchAll();
            $dataDisponibilidadPropiedad = array();
            foreach ($resultDisponibilidadPropiedad as $rdp) {
                $dataDisponibilidadPropiedad[$rdp['TIPO_DISPONIBILIDAD']] = $rdp['QTY'];
            }
            $data['dataDisponibilidadPropiedad'] = $dataDisponibilidadPropiedad;

            $selectProvinciaPropiedad = "SELECT PROVINCIA, COUNT(*) AS QTY FROM PROPIEDAD GROUP BY PROVINCIA ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectProvinciaPropiedad);
            $stmt->execute();
            $resultProvinciaPropiedad = $stmt->fetchAll();
            $dataProvinciaPropiedad = array();
            foreach ($resultProvinciaPropiedad as $rpp) {
                $dataProvinciaPropiedad[$rpp['PROVINCIA']] = $rpp['QTY'];
            }
            $data['dataProvinciaPropiedad'] = $dataProvinciaPropiedad;


            $selectPropiedadCliente = "SELECT PROPIEDAD_REQUERIDA, COUNT(*) AS QTY FROM CLIENTE GROUP BY PROPIEDAD_REQUERIDA ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectPropiedadCliente);
            $stmt->execute();
            $resultPropiedadCliente = $stmt->fetchAll();
            $dataPropiedadCliente = array();
            foreach ($resultPropiedadCliente as $rpc) {
                $dataPropiedadCliente[$rpc['PROPIEDAD_REQUERIDA']] = $rpc['QTY'];
            }
            $data['dataPropiedadCliente'] = $dataPropiedadCliente;

            $selectProvinciaCliente = "SELECT PROVINCIA, COUNT(*) AS QTY FROM CLIENTE GROUP BY PROVINCIA ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectProvinciaCliente);
            $stmt->execute();
            $resultProvinciaCliente = $stmt->fetchAll();
            $dataProvinciaCliente = array();
            foreach ($resultProvinciaCliente as $rpc2) {
                $dataProvinciaCliente[$rpc2['PROVINCIA']] = $rpc2['QTY'];
            }
            $data['dataProvinciaCliente'] = $dataProvinciaCliente;

            $selectPrecioProvincia = "SELECT PROVINCIA, PRECIO, COUNT(*) as QTY FROM PROPIEDAD GROUP BY PRECIO ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectPrecioProvincia);
            $stmt->execute();
            $resultPrecioProvincia = $stmt->fetchAll();
            $dataPrecioProvincia = array();
            foreach ($resultPrecioProvincia as $ppc) {
                $dataPrecioProvincia[$ppc['PROVINCIA']]['name'] = $ppc['PROVINCIA'];
                $dataPrecioProvincia[$ppc['PROVINCIA']]['data'][$ppc['PRECIO']] = $ppc['QTY'];
            }
            $data['dataPrecioProvincia'] = array_values($dataPrecioProvincia);

            $selectPrecioPropiedad = "SELECT TIPO_PROPIEDAD, PRECIO, COUNT(*) as QTY FROM PROPIEDAD GROUP BY PRECIO ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectPrecioPropiedad);
            $stmt->execute();
            $resultPrecioPropiedad = $stmt->fetchAll();
            $dataPrecioPropiedad = array();
            foreach ($resultPrecioPropiedad as $pp) {
                $dataPrecioPropiedad[$pp['TIPO_PROPIEDAD']]['name'] = $pp['TIPO_PROPIEDAD'];
                $dataPrecioPropiedad[$pp['TIPO_PROPIEDAD']]['data'][$pp['PRECIO']] = $pp['QTY'];
            }
            $data['dataPrecioPropiedad'] = array_values($dataPrecioPropiedad);

            $selectPrecioHabitaciones = "SELECT CANTIDAD_HABITACIONES, PRECIO, COUNT(*) as QTY FROM PROPIEDAD WHERE CANTIDAD_HABITACIONES IS NOT NULL AND CANTIDAD_HABITACIONES != 0 GROUP BY PRECIO ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectPrecioHabitaciones);
            $stmt->execute();
            $resultPrecioHabitaciones = $stmt->fetchAll();
            $dataPrecioHabitaciones = array();
            foreach ($resultPrecioHabitaciones as $ph) {
                $dataPrecioHabitaciones[$ph['CANTIDAD_HABITACIONES']]['name'] = $ph['CANTIDAD_HABITACIONES'];
                $dataPrecioHabitaciones[$ph['CANTIDAD_HABITACIONES']]['data'][$ph['PRECIO']] = $ph['QTY'];
            }
            $data['dataPrecioHabitaciones'] = array_values($dataPrecioHabitaciones);

            $selectPrecioPisos = "SELECT CANTIDAD_PISOS, PRECIO, COUNT(*) as QTY FROM PROPIEDAD GROUP BY PRECIO ORDER BY COUNT(*) DESC;";
            $stmt = $dbh->prepare($selectPrecioPisos);
            $stmt->execute();
            $resultPrecioPisos = $stmt->fetchAll();
            $dataPrecioPisos = array();
            foreach ($resultPrecioPisos as $ppi) {
                $dataPrecioPisos[$ppi['CANTIDAD_PISOS']]['name'] = $ppi['CANTIDAD_PISOS'];
                $dataPrecioPisos[$ppi['CANTIDAD_PISOS']]['data'][$ppi['PRECIO']] = $ppi['QTY'];
            }
            $data['dataPrecioPisos'] = array_values($dataPrecioPisos);

            //Lets add some emotion
            sleep(1);
            return self::success($data);
        } catch (Exception $e) {
            return self::error("Problemas con la base de datos.");
        }
    }
}
