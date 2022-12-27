-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2022 at 10:42 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `Question` varchar(255) DEFAULT NULL,
  `Answer` varchar(255) DEFAULT NULL,
  `Option2` varchar(255) DEFAULT NULL,
  `Option3` varchar(255) DEFAULT NULL,
  `Option4` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `Question`, `Answer`, `Option2`, `Option3`, `Option4`) VALUES
(1, 'What is the past tense of the verb \'to go\'', 'went', '1', '2', '3'),
(2, 'How do you form the possessive case of a noun?', '\'s', '2', '1', '4'),
(3, 'What is the plural form of the noun \'child\'?', 'children', '42', '1', '3'),
(4, 'What is the past participle of the verb \'to eat\'?', 'eaten', '1', '2', '4'),
(5, 'What is the third-person singular present tense of the verb \'to have\'?', 'has', '1', '2', '3'),
(6, 'What is the comparative form of the adjective \'good\'?', 'better', '1', '2', '32'),
(7, 'What is the superlative form of the adjective \'bad\'?', 'worst', '1', '3', '2'),
(8, 'What is the present participle of the verb \'to write\'?', 'writing', '1', '3', '2'),
(9, 'What is the direct object of the sentence \'She read the book\'?', 'the book', '1', '2', '3'),
(10, 'What is the subject of the sentence \'The cat chased the mouse\'?', 'The cat', '1', '2', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
