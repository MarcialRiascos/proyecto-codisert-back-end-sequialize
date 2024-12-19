-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2024 a las 06:16:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_codisert`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `NumeroDocumento` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Rol_idRol` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(11) DEFAULT NULL,
  `Sexo_idSexo` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiario`
--

CREATE TABLE `beneficiario` (
  `idBeneficiario` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `NumeroDocumento` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Celular` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `FechaNacimiento` date NOT NULL,
  `FechaInicio` date NOT NULL,
  `FechaFin` date DEFAULT NULL,
  `CodigoDaneDpmto` varchar(45) NOT NULL,
  `Departamento` varchar(45) NOT NULL,
  `CodigoDaneMunicipio` varchar(45) NOT NULL,
  `Municipio` varchar(45) NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  `Barrio` varchar(45) DEFAULT NULL,
  `Anexo` varchar(255) DEFAULT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Estrato_idEstrato` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `Sexo_idSexo` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `idDocumentos` int(10) UNSIGNED NOT NULL,
  `NombreDocumento` varchar(45) NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL,
  `Url` varchar(255) NOT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(10) UNSIGNED NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estrato`
--

CREATE TABLE `estrato` (
  `idEstrato` int(10) UNSIGNED NOT NULL,
  `Estrato` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialcambio`
--

CREATE TABLE `historialcambio` (
  `idHistorialCambio` int(10) UNSIGNED NOT NULL,
  `Accion` varchar(45) NOT NULL,
  `ValorAnterior` varchar(700) NOT NULL,
  `ValorNuevo` varchar(700) DEFAULT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(10) UNSIGNED NOT NULL,
  `Rol` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE `sexo` (
  `idSexo` int(10) UNSIGNED NOT NULL,
  `Sexo` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`),
  ADD UNIQUE KEY `NumeroDocumento_UNIQUE` (`NumeroDocumento`),
  ADD KEY `fk_Persona_Estado1_idx` (`Estado_idEstado`),
  ADD KEY `fk_Administrador_Rol1_idx` (`Rol_idRol`),
  ADD KEY `fk_Administrador_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento`),
  ADD KEY `fk_Administrador_Sexo1_idx` (`Sexo_idSexo`);

--
-- Indices de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD PRIMARY KEY (`idBeneficiario`),
  ADD KEY `fk_Persona_Estado1_idx` (`Estado_idEstado`),
  ADD KEY `fk_Persona_Estrato1_idx` (`Estrato_idEstrato`),
  ADD KEY `fk_Beneficiario_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_Beneficiario_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento`),
  ADD KEY `fk_Beneficiario_Sexo1_idx` (`Sexo_idSexo`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`idDocumentos`),
  ADD KEY `fk_Dcumentos_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_Dcumentos_Beneficiario1_idx` (`Beneficiario_idBeneficiario`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `estrato`
--
ALTER TABLE `estrato`
  ADD PRIMARY KEY (`idEstrato`);

--
-- Indices de la tabla `historialcambio`
--
ALTER TABLE `historialcambio`
  ADD PRIMARY KEY (`idHistorialCambio`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`idSexo`);

--
-- Indices de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  ADD PRIMARY KEY (`idTipoDocumento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  MODIFY `idBeneficiario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `idDocumentos` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estrato`
--
ALTER TABLE `estrato`
  MODIFY `idEstrato` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historialcambio`
--
ALTER TABLE `historialcambio`
  MODIFY `idHistorialCambio` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sexo`
--
ALTER TABLE `sexo`
  MODIFY `idSexo` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idTipoDocumento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_Administrador_Rol1` FOREIGN KEY (`Rol_idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Administrador_Sexo1` FOREIGN KEY (`Sexo_idSexo`) REFERENCES `sexo` (`idSexo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Administrador_TipoDocumento1` FOREIGN KEY (`TipoDocumento_idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estado10` FOREIGN KEY (`Estado_idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD CONSTRAINT `fk_Beneficiario_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Beneficiario_Sexo1` FOREIGN KEY (`Sexo_idSexo`) REFERENCES `sexo` (`idSexo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Beneficiario_TipoDocumento1` FOREIGN KEY (`TipoDocumento_idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estado1` FOREIGN KEY (`Estado_idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estrato1` FOREIGN KEY (`Estrato_idEstrato`) REFERENCES `estrato` (`idEstrato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `fk_Dcumentos_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Dcumentos_Beneficiario1` FOREIGN KEY (`Beneficiario_idBeneficiario`) REFERENCES `beneficiario` (`idBeneficiario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
