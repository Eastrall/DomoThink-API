CREATE DATABASE  IF NOT EXISTS `domothink` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `domothink`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: db-domothink.timekube.net    Database: domothink
-- ------------------------------------------------------
-- Server version	5.5.52-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `devices` (
  `idDevice` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `status` decimal(1,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idDevice`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'name','optional',1),(2,'Device 2','Télé',0);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directives`
--

DROP TABLE IF EXISTS `directives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directives` (
  `idDirective` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8 NOT NULL,
  `creatorId` int(11) NOT NULL,
  `deviceId` int(11) NOT NULL,
  `actionId` int(11) NOT NULL,
  `periodicityType` int(11) NOT NULL,
  `periodicityData` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`idDirective`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directives`
--

LOCK TABLES `directives` WRITE;
/*!40000 ALTER TABLE `directives` DISABLE KEYS */;
INSERT INTO `directives` VALUES (1,'Directive 1',1,2,3,4,'{random: true}'),(6,'Directive 3',3,5,8,1,'{randomData: \'some text\'}');
/*!40000 ALTER TABLE `directives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plugins`
--

DROP TABLE IF EXISTS `plugins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plugins` (
  `idPlugin` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_bin NOT NULL,
  `status` decimal(1,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idPlugin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plugins`
--

LOCK TABLES `plugins` WRITE;
/*!40000 ALTER TABLE `plugins` DISABLE KEYS */;
INSERT INTO `plugins` VALUES (8,'coinslot-angular',1);
/*!40000 ALTER TABLE `plugins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeplugincomments`
--

DROP TABLE IF EXISTS `storeplugincomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeplugincomments` (
  `idComment` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(45) COLLATE utf8_bin NOT NULL,
  `rate` double NOT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `storeplugins_idPlugin` int(11) NOT NULL,
  PRIMARY KEY (`idComment`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeplugincomments`
--

LOCK TABLES `storeplugincomments` WRITE;
/*!40000 ALTER TABLE `storeplugincomments` DISABLE KEYS */;
INSERT INTO `storeplugincomments` VALUES (1,'John doe',4,'C\'est cool','2016-10-04 13:51:57',3),(2,'Gzanich',3.5,'C\'est bof','2016-10-04 14:21:23',3),(3,'Munsch',4.7,'J\'aime beaucoup ce plugin','2016-10-05 09:49:14',3),(4,'User de test',4.2,'Pas mal ça !','2016-10-05 13:40:00',3);
/*!40000 ALTER TABLE `storeplugincomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storeplugins`
--

DROP TABLE IF EXISTS `storeplugins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storeplugins` (
  `idPlugin` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_bin NOT NULL,
  `repository` varchar(255) COLLATE utf8_bin NOT NULL,
  `language` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPlugin`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storeplugins`
--

LOCK TABLES `storeplugins` WRITE;
/*!40000 ALTER TABLE `storeplugins` DISABLE KEYS */;
INSERT INTO `storeplugins` VALUES (1,'coinslot-angular','https://github.com/GuillaumeMunsch/Coinslot-Angular.git','JS','0000-00-00 00:00:00'),(2,'swim-mill','https://github.com/GuillaumeMunsch/CECS-326-swim-mill.git','C','0000-00-00 00:00:00'),(3,'libellus','https://github.com/TeamLibellus/webapp.git','js','0000-00-00 00:00:00'),(4,'swimmill-326','https://github.com/GuillaumeMunsch/CECS-326-swim-mill','c','2016-10-04 12:22:40'),(5,'swimmill-326','https://github.com/GuillaumeMunsch/CECS-326-swim-mill','c','2016-10-04 13:51:00');
/*!40000 ALTER TABLE `storeplugins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `boxKey` varchar(45) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `user_id_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test','gnzeiggneriu'),(2,'eastrall','helloworld','sdfgsdfgd'),(3,'munsch','helloworld','ksfjgnsignfs'),(4,'guigui.munsch@yahoo.com','test','example'),(5,'guigui.munsch@gmail.com','test','example'),(6,'guigui.munsch@hotmail.fr','test','example'),(7,'guigui.munsch@hotmail.com','test','example'),(8,'guigui.munsch@hotmail.org','test','example'),(9,'guigui.munsch@hotmail.example','test','example'),(10,'guigui.munsch@hotmail.net','test','example'),(11,'guigui.munsch@hotmail.dev','coucou','example'),(12,'name','newMd5hash','clef de la box');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-05 20:08:46
