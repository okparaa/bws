<?php

namespace Repository;

use Ants\Worker\EntityRepository;

class __repository__Repository extends EntityRepository {
	public function get__repository__() {
		$conn = $this->getConnection();
		$sql = "SELECT r.* FROM <TABLE>";
		$stmt = $conn->prepare($sql);
		$stmt->execute([]);
		$results = $stmt->fetchAll();
		return $results;
    }
}