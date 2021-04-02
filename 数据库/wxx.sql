/*
 Navicat Premium Data Transfer

 Source Server         : mysql5
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : wxx

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 02/04/2021 16:39:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 41 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of collect
-- ----------------------------
INSERT INTO `collect` VALUES (7, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203741614.jpeg', 10);
INSERT INTO `collect` VALUES (8, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203741614.jpeg', 10);
INSERT INTO `collect` VALUES (9, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203744108.jpeg', 10);
INSERT INTO `collect` VALUES (10, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201019195634582.jpeg', 10);
INSERT INTO `collect` VALUES (24, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203735237.jpeg', 9);
INSERT INTO `collect` VALUES (25, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203736141.jpeg', 9);
INSERT INTO `collect` VALUES (26, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203738209.jpeg', 9);
INSERT INTO `collect` VALUES (27, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203739849.jpeg', 9);
INSERT INTO `collect` VALUES (28, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203741614.jpeg', 9);
INSERT INTO `collect` VALUES (29, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203742941.jpeg', 9);
INSERT INTO `collect` VALUES (30, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203744108.jpeg', 9);
INSERT INTO `collect` VALUES (31, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203745646.jpeg', 9);
INSERT INTO `collect` VALUES (32, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203748292.jpeg', 9);
INSERT INTO `collect` VALUES (33, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203750630.jpeg', 9);
INSERT INTO `collect` VALUES (34, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203754118.jpeg', 9);
INSERT INTO `collect` VALUES (35, 'https://cdn.zuimeix.com/wp-content/uploads/2020/11/20201106194939366.jpeg', 9);
INSERT INTO `collect` VALUES (38, 'https://cdn.zuimeix.com/wp-content/uploads/2021/01/20210112172412277.jpeg?x-oss-process=image/resize,m_fill,w_360,h_640', 9);
INSERT INTO `collect` VALUES (40, 'https://cdn.zuimeix.com/wp-content/uploads/2020/10/20201031203732333.jpeg', 9);

-- ----------------------------
-- Table structure for integration
-- ----------------------------
DROP TABLE IF EXISTS `integration`;
CREATE TABLE `integration`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of integration
-- ----------------------------

-- ----------------------------
-- Table structure for integration_log
-- ----------------------------
DROP TABLE IF EXISTS `integration_log`;
CREATE TABLE `integration_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `integration_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of integration_log
-- ----------------------------

-- ----------------------------
-- Table structure for sign
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `last_time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sign
-- ----------------------------
INSERT INTO `sign` VALUES (5, 10, 2, 1617152116339);
INSERT INTO `sign` VALUES (6, 9, 2, 1617242499070);

-- ----------------------------
-- Table structure for sign_log
-- ----------------------------
DROP TABLE IF EXISTS `sign_log`;
CREATE TABLE `sign_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `sign_time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sign_log
-- ----------------------------
INSERT INTO `sign_log` VALUES (8, 10, 1617111724538);
INSERT INTO `sign_log` VALUES (22, 10, 1617152116339);
INSERT INTO `sign_log` VALUES (23, 9, 1617171001266);
INSERT INTO `sign_log` VALUES (25, 9, 1617242499070);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session_key` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (9, '5e543256c480ac577d30f76f9120eb74', '5e543256c480ac577d30f76f9120eb74');
INSERT INTO `user` VALUES (10, 'afa1d770f5ef23de763f2f85ef923cef', '84a00be7630b7c3419c15aa5895c070c');

SET FOREIGN_KEY_CHECKS = 1;
