


---- CREACI'ON DE TABLAS DE BASE DE DATOS------------------

CREATE TABLE USUARIO (
			USERNAME TEXT,
			PASSWORD TEXT,
			LAST_MODIFIED TEXT,
			PRIMARY KEY(USERNAME) 
);

CREATE TABLE PROPIEDAD(
			
);


CREATE TABLE `factura` ( `numero` INTEGER, `fecha` TEXT, `cliente` TEXT, `impuestos` NUMERIC, `montototal` NUMERIC, PRIMARY KEY(`numero`) )