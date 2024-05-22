-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2024 at 06:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodorderingwesitedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(45) NOT NULL,
  `admin_email` varchar(45) NOT NULL,
  `admin_password` varchar(45) NOT NULL,
  `admin_mobile` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`, `admin_mobile`) VALUES
(1, 'admin_fury', 'admin_fury@gmail.com', '123456789', '7563259210');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(45) NOT NULL,
  `item_category` varchar(45) NOT NULL,
  `item_price` int(11) NOT NULL,
  `item_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`item_id`, `item_name`, `item_category`, `item_price`, `item_img`) VALUES
(1, 'Burger Bò phô mai đặc biệt', 'burger', 56000, 'banh-burger/burger-bo-pho-mai-dac-biet.png'),
(2, 'Burger Gà Nhỏ Mayo', 'burger', 36000, 'banh-burger/burger-ga-nho-mayo.png'),
(3, 'Burger Bò miếng lớn phô-mai', 'burger', 79000, 'banh-burger/burger-bo-mieng-lon-pho-mai.png'),
(4, 'Burger Xúc Xích - 337 Kcal', 'burger', 36000, 'banh-burger/burger-xuc-xich-337-kcal.png'),
(5, 'Burger 2 lớp bò, phô-mai', 'burger', 66000, 'banh-burger/burger-2-lop-bo-pho-mai.png'),
(6, 'Burger Big Mac', 'burger', 76000, 'banh-burger/burger-big-mac.png'),
(7, 'Burger Phi lê Cá phô mai', 'burger', 56000, 'banh-burger/burger-phi-le-ca-pho-mai.png'),
(8, 'Burger Gà phô-mai đặc biệt', 'burger', 69000, 'banh-burger/burger-ga-pho-mai-dac-biet.png'),
(9, 'Burger Bò Hoàng Gia Đặc Biệt', 'burger', 89000, 'banh-burger/burger-bo-hoang-gia-dac-biet.png'),
(10, 'Burger phi-lê gà cay đặc biệt', 'burger', 89000, 'banh-burger/burger-phi-le-ga-cay-dac-biet.png'),
(11, 'Burger Gà Mayo', 'burger', 59000, 'banh-burger/burger-ga-mayo.png'),
(12, 'Bánh Tiramisu', 'dessert', 55000, 'banh-trang-mieng/banh-tiramisu.png'),
(13, 'Bánh Macaron Dừa 1 cái', 'dessert', 15000, 'banh-trang-mieng/banh-macaron-dua-1-cai.png'),
(14, 'Bánh Quy Sôcôla', 'dessert', 25000, 'banh-trang-mieng/banh-quy-socola.png'),
(15, 'Bánh nướng vị Chuối', 'dessert', 30000, 'banh-trang-mieng/banh-nuong-vi-chuoi.png'),
(16, 'Bánh Brownie Sô-cô-la', 'dessert', 30000, 'banh-trang-mieng/banh-brownie-so-co-la.png'),
(17, 'Bánh Macaron Dừa 2 cái', 'dessert', 25000, 'banh-trang-mieng/banh-macaron-dua-2-cai.png'),
(18, 'Bánh Phô mai nướng', 'dessert', 35000, 'banh-trang-mieng/banh-pho-mai-nuong.png'),
(19, 'Bánh Sừng Trâu', 'dessert', 30000, 'banh-trang-mieng/banh-sung-trau.png'),
(20, 'Combo 2A', 'combo', 131000, 'combo/combo-2a.png'),
(21, 'Combo 2C', 'combo', 189000, 'combo/combo-2c.png'),
(22, 'Combo 3B', 'combo', 289000, 'combo/combo-3b.png'),
(23, 'Combo 3A', 'combo', 279000, 'combo/combo-3a.png'),
(24, 'Combo 2B', 'combo', 179000, 'combo/combo-2b.png'),
(25, '20 miếng Gà McNuggets™', 'chicken', 121000, 'ga-ran/20-mieng-ga-mcnuggets-tm.png'),
(26, '10 Miếng Cánh Gà McWings™', 'chicken', 179000, 'ga-ran/10-mieng-canh-ga-mcwings-tm.png'),
(27, '6 miếng Gà McNuggets™', 'chicken', 49000, 'ga-ran/6-mieng-ga-mcnuggets-tm.png'),
(28, '6 Miếng Cánh Gà McWings™', 'chicken', 125000, 'ga-ran/6-mieng-canh-ga-mcwings-tm.png'),
(29, '3 miếng  Cánh Gà McWings™', 'chicken', 69000, 'ga-ran/3-mieng-canh-ga-mcwings-tm.png'),
(30, '9 miếng  Gà McNuggets™', 'chicken', 69000, 'ga-ran/9-mieng-ga-mcnuggets-tm.png'),
(31, '5 miếng gà rán', 'chicken', 176000, 'ga-ran/5-mieng-ga-ran.png'),
(32, '1 miếng gà rán - 183 Kcal', 'chicken', 37000, 'ga-ran/1-mieng-ga-ran-183-kcal.png'),
(33, '3 miếng gà rán', 'chicken', 103000, 'ga-ran/3-mieng-ga-ran.png'),
(34, '9 miếng gà rán', 'chicken', 289000, 'ga-ran/9-mieng-ga-ran.png'),
(35, 'Phần ăn 2 miếng gà rán', 'chicken', 92000, 'ga-ran/phan-an-2-mieng-ga-ran.png'),
(36, 'Kem ốc quế', 'icecream', 10000, 'kem/kem-oc-que.png'),
(37, 'Kem McSundae™ xốt Sôcôla', 'icecream', 29000, 'kem/kem-mcsundae-tm-xot-socola.png'),
(38, 'Kem McSundae™ xốt Dâu', 'icecream', 29000, 'kem/kem-mcsundae-tm-xot-dau.png'),
(39, 'Kem Xay Bánh Oreo™ Trà Xanh', 'icecream', 39000, 'kem/kem-xay-banh-oreo-tm-tra-xanh.png'),
(40, 'Kem Xay Bánh Oreo™', 'icecream', 39000, 'kem/kem-xay-banh-oreo-tm.png'),
(41, 'Khoai Tây Chiên (size nhỏ) - 206 Kcal', 'snackfood', 19000, 'mon-an-nhe/khoai-tay-chien-size-nho-206-kcal.png'),
(42, 'Kem McSundae™ xốt Sôcôla', 'snackfood', 29000, 'mon-an-nhe/kem-mcsundae-tm-xot-socola.png'),
(43, 'Kem McSundae™ xốt Dâu', 'snackfood', 29000, 'mon-an-nhe/kem-mcsundae-tm-xot-dau.png'),
(44, 'Khoai Tây Chiên (size vừa)', 'snackfood', 29000, 'mon-an-nhe/khoai-tay-chien-size-vua.png'),
(45, 'Khoai Tây Chiên (size lớn)', 'snackfood', 39000, 'mon-an-nhe/khoai-tay-chien-size-lon.png'),
(46, 'Burger Xúc Xích - 337 Kcal', 'snackfood', 36000, 'mon-an-nhe/burger-xuc-xich-337-kcal.png'),
(47, 'Burger bò phô-mai - 323 Kcal', 'snackfood', 46000, 'mon-an-nhe/burger-bo-pho-mai-323-kcal.png'),
(48, 'Salad lắc', 'snackfood', 35000, 'mon-an-nhe/salad-lac.png'),
(49, 'Burger bò truyền thống', 'snackfood', 36000, 'mon-an-nhe/burger-bo-truyen-thong.png'),
(50, 'Burger Gà Nhỏ Mayo', 'snackfood', 36000, 'mon-an-nhe/burger-ga-nho-mayo.png'),
(51, 'Sữa tươi', 'colddrink', 22000, 'thuc-uong-lanh/sua-tuoi.png'),
(52, 'Fanta®', 'colddrink', 22000, 'thuc-uong-lanh/fanta-r.png'),
(53, 'Coca-Cola® - 150 Kcal', 'colddrink', 22000, 'thuc-uong-lanh/coca-cola-r-150-kcal.png'),
(54, 'Nước suối', 'colddrink', 22000, 'thuc-uong-lanh/nuoc-suoi.png'),
(55, 'Sprite®', 'colddrink', 22000, 'thuc-uong-lanh/sprite-r.png'),
(56, 'Milo™ - 110 Kcal', 'colddrink', 22000, 'thuc-uong-lanh/milo-tm-110-kcal.png'),
(57, 'Cà phê sữa đá Việt Nam', 'colddrink', 35000, 'thuc-uong-lanh/ca-phe-sua-da-viet-nam.png'),
(58, 'Trà Vải', 'colddrink', 49000, 'thuc-uong-lanh/tra-vai.png'),
(59, 'Cà phê Latte đá', 'colddrink', 55000, 'thuc-uong-lanh/ca-phe-latte-da.png'),
(60, 'Trà Kem Sữa', 'colddrink', 49000, 'thuc-uong-lanh/tra-kem-sua.png'),
(61, 'Cà phê đen đá Việt Nam', 'colddrink', 35000, 'thuc-uong-lanh/ca-phe-den-da-viet-nam.png'),
(62, 'Trà Đào', 'colddrink', 49000, 'thuc-uong-lanh/tra-dao.png'),
(63, 'Cà phê Americano đá', 'colddrink', 45000, 'thuc-uong-lanh/ca-phe-americano-da.png'),
(64, 'Tắc muối mơ ngâm hạt chia', 'colddrink', 39000, 'thuc-uong-lanh/tac-muoi-mo-ngam-hat-chia.png'),
(65, 'Matcha Latte đá', 'colddrink', 69000, 'thuc-uong-lanh/matcha-latte-da.png'),
(66, 'Sữa chua Dâu', 'colddrink', 59000, 'thuc-uong-lanh/sua-chua-dau.png'),
(67, 'Sữa chua Kiwi', 'colddrink', 59000, 'thuc-uong-lanh/sua-chua-kiwi.png'),
(68, 'Trà xanh đá xay', 'colddrink', 79000, 'thuc-uong-lanh/tra-xanh-da-xay.png'),
(69, 'Caramen đá xay', 'colddrink', 69000, 'thuc-uong-lanh/caramen-da-xay.png'),
(70, 'Mocha Đá Xay', 'colddrink', 69000, 'thuc-uong-lanh/mocha-da-xay.png'),
(71, 'Latte Đá Xay', 'colddrink', 69000, 'thuc-uong-lanh/latte-da-xay.png'),
(72, 'Americano', 'hotdrink', 39000, 'thuc-uong-nong/americano.png'),
(73, 'Latte nóng', 'hotdrink', 49000, 'thuc-uong-nong/latte-nong.png'),
(74, 'Sô cô la nóng', 'hotdrink', 49000, 'thuc-uong-nong/so-co-la-nong.png'),
(75, 'Cà phê Mocha', 'hotdrink', 59000, 'thuc-uong-nong/ca-phe-mocha.png'),
(76, 'Matcha Latte Nóng', 'hotdrink', 60000, 'thuc-uong-nong/matcha-latte-nong.png'),
(77, 'Cappucino', 'hotdrink', 49000, 'thuc-uong-nong/cappucino.png');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `item_id`, `quantity`, `price`, `datetime`) VALUES
('049993ec-7d6b-48d3-b0f9-a016fa7cbaf8', 3, 1, 1, 37000, '2024-05-19 23:41:22'),
('17601995-896f-42a0-b166-311ca3123c98', 3, 1, 1, 37000, '2024-05-19 23:41:25'),
('179a12b2-ec87-4b4c-a320-dfb2b49ea6b0', 3, 18, 1, 100, '2024-05-19 05:35:53'),
('24fe0056-ee8d-4dcb-b4b7-f9e2105f6913', 3, 1, 1, 37000, '2024-05-19 23:41:49'),
('2bce6e49-d97f-4965-b5e5-3e92cadfeab1', 3, 1, 1, 37000, '2024-05-19 23:41:22'),
('38977cb4-4fc2-4db9-9fb2-b279dd6217c6', 3, 18, 1, 100, '2024-05-19 06:09:52'),
('3b170acc-109e-4e2a-9eb7-4272552e03c4', 3, 1, 1, 37000, '2024-05-19 23:41:16'),
('3b95df54-9bec-4aaf-bfef-f8e47fbb806e', 3, 1, 1, 60, '2024-05-19 06:09:52'),
('45e5ac4d-e989-4d20-ab6b-71a47fd806ff', 3, 20, 3, 207000, '2024-05-21 21:51:33'),
('4e68bf2a-9a76-49b6-96b0-3ec932cd7bab', 3, 1, 1, 37000, '2024-05-21 21:51:33'),
('52f5a485-882a-4d76-a2db-add98b8bd3f4', 3, 7, 1, 100, '2024-05-19 05:35:53'),
('5ad0f832-7512-47c5-8c38-363a58decddd', 3, 6, 1, 200, '2024-05-19 06:09:52'),
('5b4a82dc-9723-447b-8945-87eae530bac3', 3, 7, 1, 100, '2024-05-19 06:09:52'),
('681e89b7-1747-4b9c-b02d-94dae533e487', 3, 20, 1, 69000, '2024-05-21 21:51:33'),
('6dd67781-be23-48c1-b216-c8d11af49df9', 3, 1, 1, 37000, '2024-05-19 23:41:49'),
('70350c30-73ff-4968-b3dc-92910f498bfd', 2, 6, 1, 200, '2022-06-24 15:42:16'),
('8443c635-015f-43a2-b8ae-4ffdaf5ef673', 3, 7, 1, 100, '2024-05-19 06:09:52'),
('84534aed-f193-4a4b-ac10-a9a897870b98', 3, 6, 1, 200, '2024-05-19 06:09:52'),
('88cec9b5-6281-4cf5-b280-221672c696a0', 2, 9, 1, 200, '2022-06-24 13:17:46'),
('8e5e4050-13b7-41d0-90ff-37a19098b815', 3, 2, 1, 40, '2024-05-19 06:09:52'),
('90a78095-3321-4b35-8e7d-4c9b1933d15f', 3, 1, 1, 56000, '2024-05-21 23:44:56'),
('96029bcf-3750-4fad-b585-76f36f4cf29e', 3, 1, 1, 37000, '2024-05-19 23:41:16'),
('97a2a7f5-ce99-4afb-b37e-4b39037a7252', 3, 1, 1, 37000, '2024-05-19 23:41:25'),
('aaaa9abb-861a-4292-95ed-c5ccd8411a55', 3, 1, 1, 37000, '2024-05-21 21:51:33'),
('ad2408f2-5b93-41af-957d-47fe3dbeebb5', 3, 1, 1, 37000, '2024-05-19 23:40:57'),
('af3ed128-c08e-48e8-9307-7a4a6824dd19', 3, 2, 1, 40, '2024-05-19 05:35:53'),
('bb52ce71-d32c-4f63-aaed-a5096412fc36', 3, 1, 1, 37000, '2024-05-19 23:40:57'),
('c877ac00-ecd2-4ab1-91be-d0aad7a9232a', 3, 15, 1, 60, '2024-05-19 06:09:52'),
('d153762b-181c-4d9f-aa45-9589f0fde0e6', 3, 9, 1, 200, '2024-05-19 05:35:53'),
('d1dbd494-2d27-4851-855d-1f9b2a65eb5e', 3, 2, 1, 36000, '2024-05-21 23:44:56'),
('d6d48ec1-ab9b-4007-bd0e-44f681681c3d', 2, 6, 1, 200, '2022-06-24 13:21:37'),
('edbd7e5f-7c0e-4193-85b2-43336f3013d0', 3, 7, 1, 100, '2024-05-19 06:09:52'),
('f780cf13-1c3b-4169-9ce6-1018b5c83d82', 3, 16, 1, 90, '2024-05-19 05:35:53');

-- --------------------------------------------------------

--
-- Table structure for table `order_dispatch`
--

CREATE TABLE `order_dispatch` (
  `order_id` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_dispatch`
--

INSERT INTO `order_dispatch` (`order_id`, `user_id`, `item_id`, `quantity`, `price`, `datetime`) VALUES
('01434da8-d937-41e7-a763-c3521fd33d7c', 2, 6, 1, 200, '2022-06-24 15:34:11'),
('9c059a01-adda-47e8-aefa-464f81e8842a', 2, 13, 1, 60, '2022-06-24 15:46:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_address` varchar(255) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(1000) NOT NULL,
  `user_mobileno` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_address`, `user_email`, `user_password`, `user_mobileno`) VALUES
(1, 'Tom Holland', 'B-54, Downtown, Queens, Newyork', 'iamspiderman@gmail.com', '123456789', '9632012542'),
(2, 'Ironman', 'LA', 'iamironman@gmail.com', '123456789', '7854120365'),
(3, ' vo', 'HN', 'ab@gmail.com', '123123', '12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_dispatch`
--
ALTER TABLE `order_dispatch`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
