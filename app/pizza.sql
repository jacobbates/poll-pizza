-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2017 at 02:48 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizza`
--

-- --------------------------------------------------------

--
-- Table structure for table `poll`
--

CREATE TABLE `poll` (
  `poll_id` int(11) NOT NULL,
  `title` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `question` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `creator` varchar(38) COLLATE utf8_unicode_ci NOT NULL,
  `poll_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `poll_ip` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `option_1` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `option_2` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `option_3` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL,
  `option_4` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `poll`
--

INSERT INTO `poll` (`poll_id`, `title`, `question`, `url`, `creator`, `poll_timestamp`, `poll_ip`, `option_1`, `option_2`, `option_3`, `option_4`) VALUES
(1, 'Best Pizza Poll', 'Which pizza do you like?', 'pizza', 'Jacob', '2017-10-10 21:56:38', '192.168.1.1', 'Margherita', 'Hawaiian', 'Supreme', 'Meatlovers'),
(2, 'Two Options', 'Which option do you prefer?', 'two', 'John Smith', '2017-10-16 23:43:07', '::1', 'Option 1!', 'Option 2!', NULL, NULL),
(3, 'Three Options!', 'Which option do you prefer?', 'three', 'Anonymous', '2017-10-16 23:44:05', '::1', 'Option A', 'Option B', 'Option C', NULL),
(4, 'James Cameron', 'What\'s the best James Cameron Movie?', 'movie', 'James', '2017-10-16 23:46:33', '::1', 'Avatar', 'Titanic', 'Terminator 2', 'Aliens');

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `vote_id` int(11) NOT NULL,
  `poll_id` int(11) NOT NULL,
  `voter` varchar(38) COLLATE utf8_unicode_ci NOT NULL,
  `vote_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `vote_ip` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `vote` set('1','2','3','4') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`vote_id`, `poll_id`, `voter`, `vote_timestamp`, `vote_ip`, `vote`) VALUES
(1, 1, 'Jacob', '2017-10-10 21:57:58', '192.168.1.1', '2'),
(2, 1, 'Ally', '2017-10-10 23:46:23', '192.168.1.1', '1'),
(3, 1, 'Anonymous', '2017-10-16 23:32:59', '::1', '2'),
(4, 1, 'Anonymous', '2017-10-16 23:33:11', '::1', '1'),
(5, 1, 'Anonymous', '2017-10-16 23:33:16', '::1', '1'),
(6, 1, 'John', '2017-10-16 23:33:22', '::1', '4'),
(7, 1, 'Sam', '2017-10-16 23:33:30', '::1', '2'),
(8, 1, 'Emma', '2017-10-16 23:33:47', '::1', '2'),
(9, 1, 'Olivia', '2017-10-16 23:33:56', '::1', '3'),
(10, 1, 'Sophia', '2017-10-16 23:34:10', '::1', '4'),
(11, 1, 'Mia', '2017-10-16 23:34:17', '::1', '4'),
(12, 1, 'Anonymous', '2017-10-16 23:34:20', '::1', '1'),
(13, 1, 'Anonymous', '2017-10-16 23:34:23', '::1', '1'),
(14, 1, 'Anonymous', '2017-10-16 23:35:00', '::1', '3'),
(15, 2, 'Anonymous', '2017-10-16 23:43:11', '::1', '1'),
(16, 2, 'Anonymous', '2017-10-16 23:43:21', '::1', '2'),
(17, 3, 'Anonymous', '2017-10-16 23:44:08', '::1', '1'),
(18, 3, 'Anonymous', '2017-10-16 23:44:12', '::1', '2'),
(19, 3, 'John Smith', '2017-10-16 23:44:19', '::1', '3'),
(20, 4, 'Arnie', '2017-10-16 23:46:43', '::1', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `poll`
--
ALTER TABLE `poll`
  ADD PRIMARY KEY (`poll_id`);

--
-- Indexes for table `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`vote_id`),
  ADD KEY `poll_id` (`poll_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `poll`
--
ALTER TABLE `poll`
  MODIFY `poll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `vote`
--
ALTER TABLE `vote`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `vote`
--
ALTER TABLE `vote`
  ADD CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`poll_id`) REFERENCES `poll` (`poll_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
