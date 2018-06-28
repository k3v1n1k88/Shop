/*
 Navicat Premium Data Transfer

 Source Server         : triplev
 Source Server Type    : MySQL
 Source Server Version : 100131
 Source Host           : localhost:7000
 Source Schema         : triplevshop

 Target Server Type    : MySQL
 Target Server Version : 100131
 File Encoding         : 65001

 Date: 28/06/2018 15:22:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts`  (
  `user` char(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `product` char(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `quantity` int(5) NULL DEFAULT NULL,
  PRIMARY KEY (`user`, `product`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `status` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `date` date NULL DEFAULT NULL,
  `user` char(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `recivername` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NULL DEFAULT NULL,
  `reciverphone` int(11) NOT NULL,
  `reciveraddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, 'Đã giao', '2018-06-27', 'vulh', 'Lê Hoàng Vũ', 12346789, '123 Q1');
INSERT INTO `orders` VALUES (2, 'Đang giao', '2018-06-20', '00003', 'Lê Văn A', 45678913, '456 Q2');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` char(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `image` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  `view` int(11) NULL DEFAULT NULL,
  `buy` int(11) NULL DEFAULT NULL,
  `origin` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `manufacturer` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `date` date NULL DEFAULT NULL,
  `quantity` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('BG0001', 'Louis Vuitton', 'Louis Vuitton.jpg', 1450000, 0, 0, 'Pháp', 'Louis Vuitton', 'Chiếc túi được trang trí bằng những hạt cườm thêu đính bằng tay,kết hợp với những vòng đai được trang trí xung quanh làm cho chiếc túi sang trọng,quý phái.', 'Da', '2018-04-22', 10);
INSERT INTO `products` VALUES ('BG0002', 'Saint Laurent', 'Saint Laurent.jpg', 970000, 0, 0, 'Pháp', 'Saint Laurent', 'Chiếc túi được  trang trí bằng những họa tiết nhỏ,đáng yêu nên rất hợp cho các bạn tuổi teen', 'Da', '2018-04-22', 20);
INSERT INTO `products` VALUES ('BG0003', 'Dior', 'Dior.jpg', 1050000, 0, 0, 'Mỹ', 'Dior', 'Với thiết kế nhẹ nhàng nhưng lại rất tinh tế kèm vào đó là những cho tiết tỉ mỉ,dây mắc xích làm cho sản phẩm rất thời trang', 'Da', '2018-04-22', 45);
INSERT INTO `products` VALUES ('BG0004', 'Alexander McQueen', 'Alexander McQueen.jpg', 890000, 0, 0, 'Anh', 'Alexander McQueen', 'Với chiếc bóp được thiết kế theo dạng bo tròn kèm theo đó là những hạt cườm được đính bằng tay rất tỉ mỉ làm cho sản phẩm nhìn rất sang trọng.', 'Da', '2018-04-22', 60);
INSERT INTO `products` VALUES ('BG0005', 'Jimmy Choo', 'Jimmy Choo.jpg', 1240000, 0, 0, 'Mỹ', 'Jimmy Choo', 'Thật không có gì sang trọng hơn khi mang bên mình một chiếc ví với chất liệu vải được thêu họa tiết cực kì tỉ mỉ,thêm vào đó là dây đeo mắc xích.', 'Vải thiêu', '2018-04-22', 2);
INSERT INTO `products` VALUES ('BG0006', 'Valentino', 'Valentino.jpg', 1070000, 0, 0, 'Malaysia', 'Valentino', 'Với mẫu túi xách Valentino luôn là phong cách Italy nhẹ nhàng và thanh tao,rất phù hợp cho những bạn làm công sở ', 'Vải', '2018-04-22', 72);
INSERT INTO `products` VALUES ('BG0007', 'Gucci', 'Gucci.jpg', 2065000, 0, 0, 'Italy', 'Gucci', 'Kết hợp với họa tiết thêu có đắp da cá sấu,Gucci là một lựa chọn không thể thiếu của các chị em phụ nữ rồi.', 'Da', '2018-04-22', 10);
INSERT INTO `products` VALUES ('BG0008', 'Bottega Veneta', 'Bottega Veneta.jpg', 986000, 0, 0, 'Vicenza', 'Bottega Veneta', 'Bottega Veneta là một lựa chọn không thể thiếu với các quý bà sang trọng bởi thiết kế tinh tế,họa tiết thì lại phong phú.', 'Da', '2018-04-22', 2);
INSERT INTO `products` VALUES ('BG0009', 'Stella Mcartney', 'Stella Mcartney.jpg', 795000, 0, 0, 'Pháp', 'Stella Mcartney', 'Với những chiếc mắc xích được gắn lên xung quanh chiếc túi xách thêm vào đó là những chi tiết độc đáo làm cho chiếc túi xách trông thật là fashion.', 'Da', '2018-04-22', 45);
INSERT INTO `products` VALUES ('BG0010', 'Bulgari', 'Bulgari.jpg', 1350000, 0, 0, 'Ý', 'Bulgari', 'Bulgari là sự kết hợp những họa tiết hoa cỏ tự nhiên được làm nên từ những sợi chỉ nhiều màu và rất nhiều hạt đá quý lấp lánh.', 'Da', '2018-04-22', 6);
INSERT INTO `products` VALUES ('BG0011', 'Bally', 'Bally.jpg', 650000, 0, 0, 'Thủy Điển', 'Bally', 'Bạn hãy xem từng đường chỉ viền may xung quanh túi vừa thời trang vừa chắc chắn này có quen thuộc với bạn không? Vâng, đó chính là điểm đặt trưng không sai vào đâu được của thương hiệu túi xách hàng hiệu Bally', 'Da', '2018-04-22', 12);
INSERT INTO `products` VALUES ('BG0012', 'Victoria Beckham', 'Victoria Beckham.jpg', 3095000, 0, 0, 'Mỹ', 'Victoria Beckham', 'Những mẫu túi đặc sắc, thiết kế nắp gập, màu sắc thanh nhã luôn được Victoria giới thiệu trong các bộ sưu tập túi mới.', 'Da', '2018-04-22', 47);
INSERT INTO `products` VALUES ('BG0013', 'Burberry', 'Burberry.jpg', 976000, 0, 0, 'Pháp', 'Burberry', 'Với thiết kế nhỏ gọn và sang chảnh rất phù hợp cho các bạn trẻ dạo phố,check in.', 'Vải', '2018-04-22', 2);
INSERT INTO `products` VALUES ('BG0014', 'Dries Van Noten', 'Dries Van Noten.jpg', 2010000, 1, 0, 'Bỉ', 'Dries Van Noten', 'Về chất liệu,những chiếc túi độc đáo, bên cạnh thuộc da phổ biến. Những họa tiết in và vật trang trí độc đáo cũng là sự khám phá mới của làng thời trang.', 'Vải thiêu', '2018-04-22', 1);
INSERT INTO `products` VALUES ('BG0015', 'Salvatore Ferragamo', 'Salvatore Ferragamo.jpg', 925000, 0, 0, 'Ý', 'Salvatore Ferragamo', 'Túi xách nữ thời trang cao cấp Salvatore Ferragamo: Kiểu dáng thời trang, thanh lịch, đi kèm với quai da mảnh mai, trẻ trung. Tone màu đen sang trọng cùng chất liệu da cao cấp trong một thiết kế hoàn hảo. ', 'Da', '2018-04-22', 24);
INSERT INTO `products` VALUES ('BG0016', 'Da pu', 'Da pu.jpg', 685000, 0, 0, 'Trung Quốc', 'Da pu', ' Đối với những quý cô chuộng mốt, ưa thích sự thay đổi và không muốn chịu sự chi phối của trào lưu, các mẫu túi xách nữ da PU chế tác thủ công chính là một lựa chọn hoàn hảo để đáp ứng nhu cầu làm mới phong cách mỗi ngày.', 'Da', '2018-04-22', 7);
INSERT INTO `products` VALUES ('BG0017', 'Da pu', 'da Pu 02.jpg', 590000, 0, 0, 'Trung Quốc', 'Da pu', 'Với hàng trăm mẫu túi da PU được nhập khẩu từ các nước nổi tiếng trên thế giới, mang đến cho quý khách hàng những mẫu túi da pu cao cấp, sành điệu tôn vinh dáng vẻ thanh tao, lãng mạn nhưng cũng không kém phần tinh tế', 'Da', '2018-04-22', 36);
INSERT INTO `products` VALUES ('BG0030', 'Túi xách Nice', 'Nice.jpg', 555000, 0, 0, 'Mỹ', 'Nice', 'Túi xách nữ thời trang cao cấp Nice. Kiểu dáng thời trang, thanh lịch, đi kèm với quai da mảnh mai, trẻ trung. Tone màu sang trọng cùng chất liệu da cao cấp trong một thiết kế hoàn hảo. ', 'Da', '2018-04-02', 45);
INSERT INTO `products` VALUES ('BG0031', 'TÚI XÁCH MEIDONE', 'Meidone.jpg', 750000, 0, 0, 'Hàn Quốc', 'MeiDone', 'Phong cách thời trang Âu Mỹ,phù jopwj với mọi lứa tuổi', 'Da ', '2018-04-24', 10);
INSERT INTO `products` VALUES ('BG0032', 'Túi quả chuông', 'txhika.jpg', 200000, 0, 0, 'Hàn Quốc', 'HiKa', 'Trong thế giới thời trang của phái đẹp, chiếc túi luôn chiếm một vị trí quan trọng. Từ những cô nàng bình thường nhất cho tới những ngôi sao hàng đầu, tất cả đều chia sẻ một tình yêu vĩ đại với những chiếc túi\r\n', 'Da', '2018-04-28', 150);
INSERT INTO `products` VALUES ('BG0033', 'TÚI CARTOON A.N', 'AN.jpg', 250000, 0, 0, 'Hàn Quốc', 'HiKa', 'Trong thế giới thời trang của phái đẹp, chiếc túi luôn chiếm một vị trí quan trọng. Từ những cô nàng bình thường nhất cho tới những ngôi sao hàng đầu, tất cả đều chia sẻ một tình yêu vĩ đại với những chiếc túi\r\n', 'Da', '2018-04-09', 70);
INSERT INTO `products` VALUES ('BG0034', 'Túi xách nữ', 'tx_naza.jpg', 270000, 0, 0, 'Hàn Quốc', 'NaZa', '. NaZa fashion khuyên bạn nên cân nhắc kĩ lưỡng trước khi quyết định bởi hiện tại trên thị trường Việt Nam hàng nhái, hàng kém chất lượng đang tràn ngập. Chúc bạn lựa chọn và mua được sản phẩm ưng ý.', 'Vải Thêu', '2018-04-11', 36);
INSERT INTO `products` VALUES ('BG018', 'Tommy Hilfiger 2', 'Tommy.jpg', 1578900, 0, 0, 'Mỹ', 'Tommy', ' Túi gồm 1 ngăn lớn và nhiều ngăn nhỏ bên trong.Logo thương hiệu trước túi,trang trí cách điệu.\r\n', 'Vải dù', '2018-04-27', 20);
INSERT INTO `products` VALUES ('BG019', 'Calvin Klein', 'Calvin Klein.jpg', 485250, 0, 0, 'Mỹ', 'Calvin Klein', 'Logo thương hiệu trước túi, trang trí cách điệu.', 'Da', '2018-04-27', 12);
INSERT INTO `products` VALUES ('BG020', 'Michael Kors', 'Michael Kors.jpg', 3989000, 0, 0, 'Mỹ', 'Michael Kors', ' Đối với những quý cô chuộng mốt, ưa thích sự thay đổi và không muốn chịu sự chi phối của trào lưu, các mẫu túi xách nữ Michael Kors chế tác thủ công chính là một lựa chọn hoàn hảo để đáp ứng nhu cầu làm mới phong cách mỗi ngày.', 'Da', '2018-04-28', 4);
INSERT INTO `products` VALUES ('BG021', 'Tommy Hilfiger', 'Tommy Hilfiger_02.jpg', 1987000, 1, 1, 'Mỹ', 'Tommy', 'Túi gồm 1 ngăn lớn và nhiều ngăn nhỏ bên trong,Túi dạng đeo chéo. Logo thương hiệu trước túi, trang trí cách điệu', 'Da thật', '2018-04-10', 4);
INSERT INTO `products` VALUES ('BG022', 'Calvin Klein', 'Calvin Klein_02.jpg', 1058700, 0, 0, 'Mỹ', 'Calvin Klein', 'Logo thương hiệu trước túi, trang trí cách điệu.', 'Da thật', '2018-04-18', 15);
INSERT INTO `products` VALUES ('BG023', 'Coach', 'Coach.jpg', 890000, 0, 0, 'Mỹ', 'Coach', 'Những mẫu túi đặc sắc, thiết kế nắp gập, màu sắc thanh nhã luôn được Coach giới thiệu trong các bộ sưu tập túi mới.', 'Da cá sấu', '2018-04-16', 2);
INSERT INTO `products` VALUES ('BG024', 'Michael Kors', 'Michael.jpg', 2040000, 0, 0, 'Mỹ', ' Michael Kors ', ' Đối với những quý cô chuộng mốt, ưa thích sự thay đổi và không muốn chịu sự chi phối của trào lưu, các mẫu túi xách nữ Michael Kors chế tác thủ công chính là một lựa chọn hoàn hảo để đáp ứng nhu cầu làm mới phong cách mỗi ngày.', 'Da', '2018-04-23', 15);
INSERT INTO `products` VALUES ('BG025', 'Nine West', 'Nine West.jpg', 1430000, 0, 0, 'Mỹ', 'Nine West', 'Túi xách nữ thời trang cao cấp Nine West. Kiểu dáng thời trang, thanh lịch, đi kèm với quai da mảnh mai, trẻ trung. Tone màu đen sang trọng cùng chất liệu da cao cấp trong một thiết kế hoàn hảo. ', 'Vải cứng', '2018-04-23', 45);
INSERT INTO `products` VALUES ('BG026', 'Michael Kors T', 'Kors.jpg', 2070000, 0, 1, 'Mỹ', 'Michael Kors', ' Đối với những quý cô chuộng mốt, ưa thích sự thay đổi và không muốn chịu sự chi phối của trào lưu, các mẫu túi xách nữ Michael Kors chế tác thủ công chính là một lựa chọn hoàn hảo để đáp ứng nhu cầu làm mới phong cách mỗi ngày.', 'Da thật', '2018-04-02', 7);
INSERT INTO `products` VALUES ('BG027', 'HARAS', 'Haras.jpg', 523000, 0, 0, 'Việt Nam', 'Haras', 'Một chiếc túi xách nữ cao cao cấp không chỉ giúp phái nữ đựng đồ dùng, trang thiết bị cá nhân mà còn khoe ra sự đẳng cấp, thời thượng. Hiểu được điều đó, mới đây, thương hiệu thời trang công sở cao cấp HARAS đã cho ra đời dòng sản phẩm túi xách da thời trang mới nhất với vẻ đẹp hoàn mỹ và tinh tế của một thương hiệu thời trang hàng đầu luôn gắn liền với sự sang trọng, xa hoa cũng như những kỹ năng bậc thầy của những người thợ lành nghề – Túi xách nữ công sở cao cấp HARAS - TXS037.', 'Da', '2018-04-17', 12);
INSERT INTO `products` VALUES ('BG028', 'TÚI MINI CẦU VỒNG - T434 - T434\r\n Mini cầu vòng', 'HiKa.jpg', 150000, 0, 0, 'Korea', 'HiKa', 'Trong thế giới thời trang của phái đẹp, chiếc túi luôn chiếm một vị trí quan trọng. Từ những cô nàng bình thường nhất cho tới những ngôi sao hàng đầu, tất cả đều chia sẻ một tình yêu vĩ đại với những chiếc túi\r\n', 'Nhựa dẻo', '2018-04-28', 5);
INSERT INTO `products` VALUES ('BG029', 'T60567', 'TxNaza.jpg', 750000, 0, 0, 'Hàn Quốc', 'NaZa', 'From dáng chuẩn hình\r\n-Chi tiết khóa kéo trơn tru\r\n-Họa tiết túi đúng chuẩn hình\r\n-Chất liệu: da PU\r\n-Đường may chắc chắn tỉ mĩ\r\n-Phù hợp cho mọi hoàn cảnh.', 'Da', '2018-04-28', 15);
INSERT INTO `products` VALUES ('BL0001', 'Sakos', 'Sakos zen.jpg', 750000, 0, 0, 'Mỹ', 'Sakos', 'Với chất liệu polyester mang ại cảm giác êm và dễ chịu cho ngời đeo ba lô.', 'Polyester', '2018-04-22', 23);
INSERT INTO `products` VALUES ('BL0002', 'K Swiss', 'K Swiss.jpg', 650000, 1, 0, 'Mỹ', 'K Swiss', 'Bạn sẽ dễ dàng nhận thấy kiểu dáng vuông vức của các sản phẩm balo laptop, dáng vẻ to của balo thể thao hay sự gọn nhẹ của.Cùng với đó là xu hướng, có vẻ ngoài độc đáo nhưng phải tiện dụng, dễ phối đồ như balo một quai, balo bình nước, balo nhỏ gọn,…', 'Hi-Tech', '2018-04-22', 1);
INSERT INTO `products` VALUES ('BL0003', 'NaZa', 'NaZa.jpg', 890000, 0, 0, 'Hàn Quốc', 'NaZa', 'Thiết kế đa dạng,bắt mắt đã tạo cho chiếc túi xách thêm phần sang trọng.', 'Da', '2018-04-22', 5);
INSERT INTO `products` VALUES ('BL0004', 'Ba lô Da pu', 'Linoza.jpg', 560000, 0, 0, 'Trung Quốc', 'Da pu', 'Chiếc túi được  trang trí bằng những họa tiết đơn giản,tinh tế,đáng yêu nên rất hợp cho các bạn tuổi teen', 'Da ', '2018-04-22', 14);
INSERT INTO `products` VALUES ('BL0005', 'BALO ĐINH TÁN', 'BLhiKa.jpg', 550000, 1, 0, 'Korea', 'HiKa', 'Trong thế giới thời trang của phái đẹp, chiếc túi luôn chiếm một vị trí quan trọng. Từ những cô nàng bình thường nhất cho tới những ngôi sao hàng đầu, tất cả đều chia sẻ một tình yêu vĩ đại với những chiếc túi', 'Vải dù', '2018-04-30', 7);
INSERT INTO `products` VALUES ('BL0006', 'Túi Đeo Chéo', 'blHaras.jpg', 850000, 0, 0, 'Việt Nam', 'Haras', 'Túi Đeo Chéo HARAS được gia công bằng chất liệu Da Phối vải Polyester đảm bảo độ bền chắc theo thời gian. Loại chất liệu này góp phần hạn chế tối đa tình trạng sờn cũ, phai màu sau một thời gian dài sử dụng.', 'Da', '2018-04-09', 20);

-- ----------------------------
-- Table structure for productsinorder
-- ----------------------------
DROP TABLE IF EXISTS `productsinorder`;
CREATE TABLE `productsinorder`  (
  `order` int(6) NOT NULL AUTO_INCREMENT,
  `product` char(6) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `quantity` int(5) NULL DEFAULT NULL,
  PRIMARY KEY (`order`, `product`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of productsinorder
-- ----------------------------
INSERT INTO `productsinorder` VALUES (1, 'BG0001', 10);
INSERT INTO `productsinorder` VALUES (1, 'BG0002', 5);
INSERT INTO `productsinorder` VALUES (1, 'BG0003', 6);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` char(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` char(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` char(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `phone` int(12) NULL DEFAULT NULL,
  `displayname` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `birthday` date NULL DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', NULL, NULL, 'Admin', NULL);
INSERT INTO `users` VALUES ('vulh', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'elhoangvu@gmail.com', 1639421192, 'Lê Hoàng Vũ', '1997-01-31');

SET FOREIGN_KEY_CHECKS = 1;
