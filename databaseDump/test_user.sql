-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `secondName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photoPath` varchar(255) DEFAULT NULL,
  `registrationDate` int DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('01b960de-a1d9-492b-8c54-462647b26e5c','Женское имя','Фамилия','test2@test.com','123456789','./photos/01b960de-a1d9-492b-8c54-462647b26e5c.jpeg',1710690393,'Женский'),('2205e585-a86c-4529-b21c-8cbaa4b63a07','Artem','Artem','test1@test.com','123456789','./photos/2205e585-a86c-4529-b21c-8cbaa4b63a07.jpeg',1710690383,'Женский'),('24bf377f-d37b-4f1f-87a8-438752bf0d26','Test',NULL,'test5@test.com','$2b$05$cmUKheN3UdKtehRFl5Qeke7yle/6g7t8Per9miWjkJDDPCPGRduFu',NULL,1710690397,NULL),('30407577-bed7-4ce4-b398-bfe8dc56993c','Test',NULL,'test9@test.com','$2b$05$z7hDSr7WKZM1K8/Tin56ZOu1JGIzdeUcu3AO4MUFp0EO40ZT0FmEm',NULL,1710690405,NULL),('4905fd71-a2a3-42e8-8009-d16de5053446','Test',NULL,'test@test.com','$2b$05$OGgcltQkeRSeUQSNuc/snu.0ZdbrHK.OlwoSLxR1GwQsezdnRfT6e',NULL,1710690391,NULL),('4e374ee6-c334-45b6-a904-3756c2569719','Test',NULL,'test0@test.com','$2b$05$Cs54boRPdVDQz5el0gZHIuWJgrqAFK8UOXu6PP/Elx9RGjpDoBdli',NULL,1710690407,NULL),('4eb626e5-5cfb-4853-8e49-8ecbc6baedef','Test',NULL,'test7@test.com','$2b$05$CDdLw5nc5Ijb.EI.UD7UoOPDjdNE8cXig6uhD0PeKmteLbG/TJllq',NULL,1710690401,NULL),('a1e58fff-f5c4-43a8-989f-1a05a6f8f450','Test',NULL,'test4@test.com','$2b$05$Z5FPPp0QVpk6ax6bKWjZG.8D/9UvgHZA2WzDkFEb6eK7T6mU.O02a',NULL,1710690396,NULL),('a8470bab-83e8-49ec-86b7-33f9dc9cda5a','Artem','Artem','test6@test.com','123456789','./photos/a8470bab-83e8-49ec-86b7-33f9dc9cda5a.jpeg',1710690399,'Мужской'),('bbbf3a83-96d3-437d-a31d-2bea5b21c704','Test','TestovayaFamiliya','test11@test.com','123456789','./photos/bbbf3a83-96d3-437d-a31d-2bea5b21c704.jpeg',1710690410,'Мужской'),('d5f091d2-9877-48d1-9629-184e71304c18','Test',NULL,'test8@test.com','$2b$05$kL3Mx5SHuchhNFYwXKzLAOaV5C50g.vjKpzkYF92EdEo43Aa8u/Xy',NULL,1710690403,NULL),('fbf2a43f-98f8-4c80-921e-22e07dfcec46','Artem','Artem','test3@test.com','123456789','./photos/fbf2a43f-98f8-4c80-921e-22e07dfcec46.jpeg',1710690395,'Мужской');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 19:41:08
