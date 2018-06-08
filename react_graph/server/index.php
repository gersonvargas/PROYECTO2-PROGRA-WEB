<?php
	require("Toro.php");
	class DBHandler {
		function init() {
			try {
				$dbh = new PDO('sqlite:test.db');
				return $dbh;
			} catch (Exception $e) {
				die("Unable to connect: " . $e->getMessage());
			}            
		}
		function get($id=null) {
			$dbh = $this->init();
			try {
				if ($id!=null) {
					$stmt = $dbh->prepare("SELECT * FROM countries WHERE id = :id");
					$stmt->bindParam(':id', $id);
				} else {
					$stmt = $dbh->prepare("SELECT * FROM countries");
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
		function put($id=null) {
			$dbh = $this->init();
			try {
				$_PUT=json_decode(file_get_contents('php://input'), True);
				$name = $_PUT['name'];
				$area = $_PUT['area'];
				$population = $_PUT['population'];
				$density = $_PUT['density'];
				$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$stmt = $dbh->prepare("INSERT INTO countries (name,area,population,density) 
												VALUES (:name,:area,:population,:density)");
				$stmt->bindParam(':name', $name);
				$stmt->bindParam(':area', $area);
				$stmt->bindParam(':population', $population);
				$stmt->bindParam(':density', $density);
				$dbh->beginTransaction();
				$stmt->execute();
				$dbh->commit();
				echo 'Successfull';
			} catch (Exception $e) {
				$dbh->rollBack();
				echo "Failed: " . $e->getMessage();
			}
		}
		function delete($id=null) {
			$dbh = $this->init();
			try {
				$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$stmt = $dbh->prepare("DELETE FROM countries WHERE id = :id");
				$stmt->bindParam(':id', $id);
				$dbh->beginTransaction();
				$stmt->execute();
				$dbh->commit();
				echo 'Successfull';
			} catch (Exception $e) {
				$dbh->rollBack();
				echo "Failed: " . $e->getMessage();
			}
		}
		function post($id=null) {
			$dbh = $this->init();
			try {
				$_POST=json_decode(file_get_contents('php://input'), True);
				if ($_POST['method']=='put')
					return $this->put($id);
				else if ($_POST['method']=='delete')
					return $this->delete($id);
				$name = $_POST['name'];
				$area = $_POST['area'];
				$population = $_POST['population'];
				$density = $_POST['density'];
				$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$stmt = $dbh->prepare("UPDATE countries SET area=:area,
										population=:population, density=:density,
										name=:name WHERE id = :id");
				$stmt->bindParam(':id', $id);
				$stmt->bindParam(':area', $area);
				$stmt->bindParam(':population', $population);
				$stmt->bindParam(':density', $density);
				$stmt->bindParam(':name', $name);
				$dbh->beginTransaction();
				$stmt->execute();
				$dbh->commit();
				echo 'Successfull';
			} catch (Exception $e) {
				$dbh->rollBack();
				echo "Failed: " . $e->getMessage();
			}
		}
	}
	Toro::serve(array(
		"/country" => "DBHandler",
		"/country/:alpha" => "DBHandler",
	));
?>
