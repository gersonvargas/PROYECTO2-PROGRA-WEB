


---- CREACI'ON DE TABLAS DE BASE DE DATOS------------------
DROP TABLE PROPIEDAD;
CREATE TABLE PROPIEDAD (
	  NUMERO_PROPIEDAD NUMERIC,
      NOMBRE TEXT,
	  AUTOR TEXT, -- (PERSONA O EMPRESA)
	  TAMANO NUMERIC,
	  M_CUADRADOS NUMERIC,
	  TIPO_PROPIEDAD TEXT, -- (VIVIENDA, APARTAMENTO, EDIFICIO COMERCIAL, BODEGA, OTRO
	  TIPO_DISPONIBILIDAD TEXT,-- (ALQUILER, VENNTA, AMBOS)
	  ESTADO_CONSTRUCCION TEXT,
	  DESCRIPCION TEXT,
	  FECHA_PUBLICACION TEXT,
	  PRIMARY KEY(NUMERO_PROPIEDAD)
);

DROP TABLE LOCALIZACION;
CREATE TABLE LOCALIZACION(
	  ID_LOCALIZACION NUMERIC,
      LOCALIDAD TEXT,
	  CIUDAD  TEXT,
	  PROVINCIA TEXT,
	  PROPIEDAD NUMERIC,
	  PRIMARY KEY(ID_LOCALIZACION),
	  FOREIGN KEY(PROPIEDAD) REFERENCES PROPIEDAD(NUMERO_PROPIEDAD)
);

DROP TABLE VIVIENDA_APARTAMENTO;
CREATE TABLE VIVIENDA_APARTAMENTO(
      ID numeric,
      CANTIDAD_HABITACIONES NUMERIC,
	  CANTIDAD_BANOS NUMERIC,
	  CANTIDAD_COCHERAS NUMERIC,
	  CANTIDAD_PISOS NUMERIC,
	  PROPIEDAD NUMERIC,
	  PRIMARY KEY(ID),
	  FOREIGN KEY(PROPIEDAD) REFERENCES PROPIEDAD(NUMERO_PROPIEDAD)
);

DROP TABLE INTERESADO;
CREATE TABLE INTERESADO(
		NOMBRE TEXT,
		TELÉFONO TEXT,
		EMAIL TEXT,
		UBICACION TEXT,
		PASSWORD TEXT,
		PRIMARY KEY(EMAIL)
);

DROP TABLE CLIENTE;
CREATE TABLE CLIENTE(
		NOMBRE TEXT,
		TELEFONO TEXT,
		EMAIL TEXT,
		UBICACION TEXT,
		PROPIEDAD_REQUERIDA TEXT, --(VIVIENDA, APARTAMENTO, EDIFICIO COMERCIAL, BODEGA, ETC.).
		PASSWORD TEXT,
		PRIMARY KEY(EMAIL)
);

DROP TABLE PROP_APLICADAS;
CREATE TABLE PROP_APLICADAS(
       EMAIL_CLIENTE TEXT,
	   PROPIEDAD NUMERIC,
	   FECHA_APLICADA TEXT,
	   PRIMARY KEY(EMAIL_CLIENTE,PROPIEDAD),
	   FOREIGN KEY(PROPIEDAD) REFERENCES PROPIEDAD(NUMERO_PROPIEDAD),
	   FOREIGN KEY(EMAIL_CLIENTE) REFERENCES CLIENTE(EMAIL)
);

DROP TABLE USUARIO;
CREATE TABLE USUARIO (
			USERNAME TEXT,
			EMAIL TEXT,
			PASSWORD TEXT,
			LAST_MODIFIED TEXT,
			PRIMARY KEY(EMAIL) 
);




--CREATE TABLE `FACTURA` ( `NUMERO` INTEGER, `FECHA` TEXT, `CLIENTE` TEXT, `IMPUESTOS` NUMERIC, `MONTOTOTAL` NUMERIC, PRIMARY KEY(`NUMERO`) )