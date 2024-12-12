-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-12-2024 a las 00:29:07
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
  `Password` varchar(100) NOT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Rol_idRol` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdministrador`, `Nombre`, `Apellido`, `TipoDocumento_idTipoDocumento`, `NumeroDocumento`, `Telefono`, `Correo`, `Password`, `Estado_idEstado`, `Rol_idRol`, `Administrador_idAdministrador`, `createdAt`, `updatedAt`) VALUES
(1, 'Super', 'Admin', 1, '1', '1111111111', 'admin@admin.com', '$2b$10$ZnRWbhXJ8BBrtY7Lm46mbu3uizHJPRdM5pQm6r8hWEtu0ITSOrOJC', 1, 1, NULL, '2024-12-11 01:27:55', '2024-12-12 13:29:16'),
(4, 'Registrador', 'Admin', 1, '2', '2222222222', 'adminr@adminr.com', '$2b$10$ZnRWbhXJ8BBrtY7Lm46mbu3uizHJPRdM5pQm6r8hWEtu0ITSOrOJC', 1, 2, 1, '2024-12-11 01:27:55', '2024-12-12 16:16:54'),
(8, 'Juan', 'Pérez', 1, '3', '987654321', 'juan.perez@correo.com', '$2b$10$w2KLbTgPdtW8j1PYZmGG6u050i2/2HJYHobR0FiUZnV5LH13rAhVK', 1, 3, 1, '2024-12-11 01:27:55', '2024-12-12 16:51:52'),
(9, 'Cristian', 'Castro', 1, '10', '987654321', 'cristian@correo.com', '$2b$10$gZItk./6Xp7eVCCQS5Hv2.z018h3EUd6senLsFN9bq/OTtoKTJt1.', 1, 1, 1, '2024-12-11 01:27:55', '2024-12-11 01:27:55'),
(10, 'Camilo', 'jurado', 1, '11', '987654321', 'camilo@correo.com', '$2b$10$ZnRWbhXJ8BBrtY7Lm46mbu3uizHJPRdM5pQm6r8hWEtu0ITSOrOJC', 1, 1, 1, '2024-12-11 01:27:55', '2024-12-11 01:27:55'),
(11, 'Daniel', 'prado', 1, '12', '987654321', 'daniel@correo.com', '$2b$10$ZnRWbhXJ8BBrtY7Lm46mbu3uizHJPRdM5pQm6r8hWEtu0ITSOrOJC', 1, 1, 9, '2024-12-11 01:27:55', '2024-12-11 01:41:32'),
(12, 'Daniela', 'palma', 1, '13', '987654321', 'daniela@correo.com', '$2b$10$VmxrOQIWakO1kfBwOaUQpucWqG/1xNIuziHdAhFRvaAf51HN37khm', 2, 1, 11, '2024-12-11 01:27:55', '2024-12-11 01:27:55'),
(18, 'Junior', 'Riascos', 3, '15', '1878', 'junior@correo.com', '$2b$10$wnuFCZshimOxsRS415oPyO8xWdzRq.koi2CA9ptjPNEyZ4iS5lhye', 1, 2, 11, '2024-12-11 01:27:55', '2024-12-11 01:27:55'),
(21, 'NuevoNombre', 'NuevoApellido', 1, '101', '2', '2@correo.com', '$2b$10$PVyhjOSiW5DQjaccCMy7Su6ydt/xoKUr1xZOxt/c6GcXappZlkpbC', 1, 2, 11, '2024-12-11 01:27:55', '2024-12-11 01:27:55');

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
  `Correo` varchar(45) NOT NULL,
  `Estrato` varchar(45) NOT NULL,
  `FechaInicio` varchar(45) NOT NULL,
  `FechaFin` varchar(45) DEFAULT NULL,
  `CodigoDaneDpmto` varchar(45) NOT NULL,
  `Departamento` varchar(255) DEFAULT NULL,
  `CodigoDaneMunicipio` varchar(45) NOT NULL,
  `Municipio` varchar(255) DEFAULT NULL,
  `Direccion` varchar(45) NOT NULL,
  `Barrio` varchar(45) DEFAULT NULL,
  `Anexo` varchar(255) DEFAULT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Estrato_idEstrato` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `beneficiario`
--

INSERT INTO `beneficiario` (`idBeneficiario`, `Nombre`, `Apellido`, `TipoDocumento_idTipoDocumento`, `NumeroDocumento`, `Telefono`, `Celular`, `Correo`, `Estrato`, `FechaInicio`, `FechaFin`, `CodigoDaneDpmto`, `Departamento`, `CodigoDaneMunicipio`, `Municipio`, `Direccion`, `Barrio`, `Anexo`, `Estado_idEstado`, `Estrato_idEstrato`, `Administrador_idAdministrador`, `createdAt`, `updatedAt`) VALUES
(13, 'Juan', 'Pérez', 1, '123456789', '123456789', '987654321', 'juan.perez@example.com', '3', '2024-01-01', '2024-12-31', '123', 'Antioquia', '456', 'Medellín', 'Calle 123', 'El Poblado', 'Anexo 1', 1, 2, 11, '2024-12-11 07:17:27', '2024-12-11 07:17:27'),
(14, 'Juan', 'Pérez', 1, '1234567890', '123456789', '987654321', 'juan.perez@example.com', '3', '2024-01-01', '2024-12-31', '123', 'Antioquia', '456', 'Medellín', 'Calle 123', 'El Poblado', 'Anexo 1', 1, 2, 11, '2024-12-11 07:17:27', '2024-12-11 07:17:27'),
(16, 'Juan', 'Pérez', 1, '123456789', '123456789', '987654321', 'juan.perez@example.com', '3', '2024-01-01', '2024-12-31', '123', 'Antioquia', '456', 'Medellín', 'Calle 123', 'El Poblado', 'Anexo 1', 2, 2, 11, '2024-12-11 07:17:27', '2024-12-11 07:17:27'),
(17, 'Juan', 'Pérez', 1, '123456789', '123456789', '987654321', 'juan.perez@example.com', '3', '2024-01-01', '2024-12-31', '123', 'Antioquia', '456', 'Medellín', 'Calle 123', 'El Poblado', 'Anexo 1', 2, 2, 11, '2024-12-11 07:17:27', '2024-12-11 07:17:27'),
(18, 'Juan', 'Pérez', 1, '123456789', '123456789', '987654321', 'juan.perez@example.com', '3', '2024-01-01', '2024-12-31', '123', 'Antioquia', '456', 'Medellín', 'Calle 123', 'El Poblado', 'Anexo 1', 2, 2, 11, '2024-12-11 07:17:27', '2024-12-11 07:17:27'),
(19, 'Juan', 'Pérez', 1, '123456789', '123456789', '987654321', 'juan.perez@example.com', '3', '2024-01-01', '2024-12-31', '123', 'Antioquia', '456', 'Medellín', 'Calle 123', 'El Poblado', 'Anexo 1', 2, 2, 11, '2024-12-11 07:17:27', '2024-12-11 07:17:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `idDocumentos` int(10) UNSIGNED NOT NULL,
  `NombreDocumento` varchar(45) NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL,
  `Url` varchar(45) NOT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`idDocumentos`, `NombreDocumento`, `TipoDocumento`, `Url`, `Beneficiario_idBeneficiario`, `Administrador_idAdministrador`, `createdAt`, `updatedAt`) VALUES
(1, 'Cedula', 'PDF', 'uploads\\1733858914949-852023543.jpeg', 13, 11, '2024-12-12 19:10:37', '2024-12-12 19:10:37'),
(2, 'Cedula', 'PDF', 'uploads\\1733870336535-678046882.pdf', 13, 11, '2024-12-12 19:10:37', '2024-12-12 19:10:37'),
(3, 'Cedula', 'PDF', 'uploads\\1733870912432-456415893.pdf', 13, 11, '2024-12-12 19:10:37', '2024-12-12 19:10:37'),
(4, 'Cedula', 'PDF', 'uploads\\1733871106603-266543819.pdf', 13, 11, '2024-12-12 19:10:37', '2024-12-12 19:10:37'),
(5, 'Cedula', 'PDF', 'uploads\\1733872193293-147109169.pdf', 13, 11, '2024-12-12 19:10:37', '2024-12-12 19:10:37'),
(6, 'Cedula', 'PDF', 'uploads\\1733872291954-193520338.pdf', 14, 11, '2024-12-12 19:10:37', '2024-12-12 19:10:37'),
(13, 'Cedula', 'PDF', 'uploads\\1734035917188-640804863.pdf', 13, 8, '2024-12-12 20:38:37', '2024-12-12 20:38:37'),
(15, 'Cedula', 'PDF', 'uploads\\1734038165099-989858453.pdf', 13, 1, '2024-12-12 21:16:05', '2024-12-12 21:16:05'),
(16, 'Cedula', 'PDF', 'uploads\\1734038716742-201205924.pdf', 13, 4, '2024-12-12 21:25:16', '2024-12-12 21:25:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(10) UNSIGNED NOT NULL,
  `Estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `Estado`) VALUES
(1, 'Activo'),
(2, 'Inactivo '),
(3, 'Operativo'),
(4, 'Suspendido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estrato`
--

CREATE TABLE `estrato` (
  `idEstrato` int(10) UNSIGNED NOT NULL,
  `Estrato` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estrato`
--

INSERT INTO `estrato` (`idEstrato`, `Estrato`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5'),
(6, '6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialcambios`
--

CREATE TABLE `historialcambios` (
  `idHistorialCambios` int(10) UNSIGNED NOT NULL,
  `Accion` varchar(45) NOT NULL,
  `ValorAnterior` varchar(45) NOT NULL,
  `ValorNuevo` varchar(45) DEFAULT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED DEFAULT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(10) UNSIGNED NOT NULL,
  `Rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `Rol`) VALUES
(1, 'admin_super'),
(2, 'admin_registrador'),
(3, 'admin_lector');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`idTipoDocumento`, `TipoDocumento`) VALUES
(1, 'Cedula de ciudadanía '),
(2, 'Cedula de ciudadanía extranjera'),
(3, 'Pasaporte');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`),
  ADD UNIQUE KEY `NumeroDocumento` (`NumeroDocumento`),
  ADD KEY `fk_Persona_Estado1_idx` (`Estado_idEstado`),
  ADD KEY `fk_Administrador_Rol1_idx` (`Rol_idRol`),
  ADD KEY `fk_Administrador_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento`);

--
-- Indices de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD PRIMARY KEY (`idBeneficiario`),
  ADD KEY `fk_Persona_Estado1_idx` (`Estado_idEstado`),
  ADD KEY `fk_Persona_Estrato1_idx` (`Estrato_idEstrato`),
  ADD KEY `fk_Beneficiario_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_Beneficiario_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`idDocumentos`),
  ADD KEY `fk_Detalle_Persona1_idx` (`Beneficiario_idBeneficiario`),
  ADD KEY `fk_Dcumentos_Administrador1_idx` (`Administrador_idAdministrador`);

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
-- Indices de la tabla `historialcambios`
--
ALTER TABLE `historialcambios`
  ADD PRIMARY KEY (`idHistorialCambios`),
  ADD KEY `fk_HistorialCambios_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_HistorialCambios_Beneficiario1_idx` (`Beneficiario_idBeneficiario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`);

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
  MODIFY `idAdministrador` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  MODIFY `idBeneficiario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `idDocumentos` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estrato`
--
ALTER TABLE `estrato`
  MODIFY `idEstrato` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `historialcambios`
--
ALTER TABLE `historialcambios`
  MODIFY `idHistorialCambios` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipodocumento`
--
ALTER TABLE `tipodocumento`
  MODIFY `idTipoDocumento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_Administrador_Rol1` FOREIGN KEY (`Rol_idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Administrador_TipoDocumento1` FOREIGN KEY (`TipoDocumento_idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estado10` FOREIGN KEY (`Estado_idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD CONSTRAINT `fk_Beneficiario_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Beneficiario_TipoDocumento1` FOREIGN KEY (`TipoDocumento_idTipoDocumento`) REFERENCES `tipodocumento` (`idTipoDocumento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estado1` FOREIGN KEY (`Estado_idEstado`) REFERENCES `estado` (`idEstado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Persona_Estrato1` FOREIGN KEY (`Estrato_idEstrato`) REFERENCES `estrato` (`idEstrato`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `fk_Dcumentos_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Detalle_Persona1` FOREIGN KEY (`Beneficiario_idBeneficiario`) REFERENCES `beneficiario` (`idBeneficiario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `historialcambios`
--
ALTER TABLE `historialcambios`
  ADD CONSTRAINT `fk_HistorialCambios_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_HistorialCambios_Beneficiario1` FOREIGN KEY (`Beneficiario_idBeneficiario`) REFERENCES `beneficiario` (`idBeneficiario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
