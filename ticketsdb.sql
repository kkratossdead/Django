-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 28 mai 2025 à 19:46
-- Version du serveur : 11.7.2-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ticketsdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('4902a4e989e38519060e56e75e1ae458f9442c53', '2025-05-16 20:11:34.456211', 7),
('8c598e79421c35fca896f83083d7c71f2d1df317', '2025-05-18 19:33:02.976387', 4),
('919ae824030ab932716cef3d81aa20e3b24299b0', '2025-05-22 18:59:59.157143', 14),
('a298fadcd4d72badff156041b594d5482daeb22a', '2025-05-22 18:56:42.228091', 12),
('c97e56f8132c107dd1b65bf1f9b35f8128fd02f1', '2025-05-16 19:34:49.806345', 1),
('ce7ce4041421c4aad1af3c8fd00b3d8e53a5caa0', '2025-05-18 18:42:20.364262', 9),
('e58d839dcde2c000407ad98bac4a8d9755ec27dc', '2025-05-22 18:57:58.495595', 13);

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add ticket', 7, 'add_ticket'),
(26, 'Can change ticket', 7, 'change_ticket'),
(27, 'Can delete ticket', 7, 'delete_ticket'),
(28, 'Can view ticket', 7, 'view_ticket'),
(29, 'Can add message', 8, 'add_message'),
(30, 'Can change message', 8, 'change_message'),
(31, 'Can delete message', 8, 'delete_message'),
(32, 'Can view message', 8, 'view_message'),
(33, 'Can add accounts', 9, 'add_accounts'),
(34, 'Can change accounts', 9, 'change_accounts'),
(35, 'Can delete accounts', 9, 'delete_accounts'),
(36, 'Can view accounts', 9, 'view_accounts'),
(37, 'Can add Token', 10, 'add_token'),
(38, 'Can change Token', 10, 'change_token'),
(39, 'Can delete Token', 10, 'delete_token'),
(40, 'Can view Token', 10, 'view_token'),
(41, 'Can add token', 11, 'add_tokenproxy'),
(42, 'Can change token', 11, 'change_tokenproxy'),
(43, 'Can delete token', 11, 'delete_tokenproxy'),
(44, 'Can view token', 11, 'view_tokenproxy');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$720000$OOyV2qHF8oVkMyX7xUAs9p$EJc5ql0fPBNLFNR/xLRXKo6Bjt5qBdvLn5NPc5zh2PA=', '2025-05-27 19:52:32.721280', 1, 'aymane', '', '', 'idk@gmail.com', 1, 1, '2025-05-07 15:51:38.219032'),
(2, 'pbkdf2_sha256$1000000$yyskbEz2VZDa5dmFW6ABsM$7lA14a0Fbh73fC/BKY60ZQEahBoZhOKU5oOL7FyrEAI=', '2025-05-09 14:12:19.612513', 1, 'hamid', '', '', 'iddk@gmail.com', 1, 1, '2025-05-09 14:11:30.251457'),
(3, 'pbkdf2_sha256$1000000$61PoWctHCbaVJh31aNU4Am$1N+5urMV2i0XjDy5PtGuHy7G2JD1ug8vGRZ4bE2etsY=', '2025-05-15 17:38:27.742744', 1, 'kkrat', '', '', '', 1, 1, '2025-05-15 17:33:48.101712'),
(4, 'pbkdf2_sha256$720000$i6qfcVIVUJQgxenNFH422V$QhDaB48UNv1sz4r1W5zV4IG7Y8AIIpNwud0Gw0Z1tpI=', '2025-05-15 17:38:03.578809', 0, 'aymane2004', '', '', '', 0, 1, '2025-05-15 17:38:03.256769'),
(5, 'pbkdf2_sha256$1000000$kC20HwDyWbXaWrF4AVJMnK$l9XDZH5L4mOQTqOTT6O9qxHyzdZHUfGsJcS5bVOpcE8=', '2025-05-15 18:39:47.330753', 0, 'kkratoss', '', '', '', 0, 1, '2025-05-15 18:11:26.994386'),
(6, 'pbkdf2_sha256$720000$8E29RQBVXvuGzd8yDJAPOq$MPQxQY2bnw64G9yROtQqZO4qU73Rgpf9Qj52MxBqmEw=', NULL, 0, 'mehdiAB', '', '', '', 0, 1, '2025-05-16 20:09:31.978763'),
(7, 'pbkdf2_sha256$720000$fkJGVk4BD7yDNTnEDzFOi1$9E1x7GgbfhhYqZy424sM4fUcF76BRjjRNhIXUl1FgrE=', NULL, 0, 'hamadaspi', '', '', '', 0, 1, '2025-05-16 20:11:12.977645'),
(8, 'pbkdf2_sha256$720000$hUmRposEf5W22EiREZdWUm$MTz0RPSks7Zhb12wk3ef87RhqNxMkR8DMYpGowd6Foc=', '2025-05-18 18:33:03.493503', 0, 'aymane2', '', '', 'aymane2@gmail.com', 0, 1, '2025-05-18 18:32:50.625790'),
(9, 'pbkdf2_sha256$720000$4PCcpezv6eeoUkxK0bL43p$QLy198W31VycgL/jn7xWBn5ZmH9fN2mDlEitSLfhXrI=', NULL, 0, 'idkkkk', '', '', '', 0, 1, '2025-05-18 18:42:12.598080'),
(10, 'pbkdf2_sha256$720000$O2Nd603lPUC1ywrrLBTIFG$k9QYs31L1Z2NaBYH+JX3l2scpeaC5GAxJ3Hugr4ef3U=', NULL, 0, 'mehdiABb', '', '', '', 0, 1, '2025-05-22 18:52:37.830320'),
(11, 'pbkdf2_sha256$720000$eVyz1olBDBGeAy5WXM9nL0$Rjuddr5sZXyezXhe+UOeFaKW7jNvz4s4xcux4rQJkjM=', NULL, 0, 'aymane12', '', '', '', 0, 1, '2025-05-22 18:54:50.971431'),
(12, 'pbkdf2_sha256$720000$HJXyK5MWv10WdOrbcMmZkD$nxuC3q6HUySuiCaRtbGfadWeNb+GdU4Y6eDiapC0RSM=', NULL, 0, 'testuser2', '', '', '', 0, 1, '2025-05-22 18:56:32.120189'),
(13, 'pbkdf2_sha256$720000$WDXcBjGChUOsUUmfa1qPtT$irKl3PGyJW1aLvGP/uf4x9/nG0nS7abMAdCbjOG2b7E=', NULL, 0, 'azazaz', '', '', '', 0, 1, '2025-05-22 18:57:51.591060'),
(14, 'pbkdf2_sha256$720000$gBBpYjjeubTc341iLLBDnh$BkXCOn4YOtmO5efTi3iugBEtXrgtlLjLyg7Q6ry7SFY=', NULL, 0, 'test42', '', '', 'azerazeraze@gmail.com', 0, 1, '2025-05-22 18:59:51.315743');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-05-07 15:55:33.223572', '1', 'idk', 1, '[{\"added\": {}}]', 7, 1),
(2, '2025-05-07 15:55:40.296620', '2', 'az', 1, '[{\"added\": {}}]', 7, 1),
(3, '2025-05-07 15:55:42.552802', '3', 'ze', 1, '[{\"added\": {}}]', 7, 1),
(4, '2025-05-07 15:55:45.077807', '4', 'azedazed', 1, '[{\"added\": {}}]', 7, 1),
(5, '2025-05-07 15:55:50.646078', '5', 'azefqsdfqsdf', 1, '[{\"added\": {}}]', 7, 1),
(6, '2025-05-15 18:35:11.691202', '3', 'kkrat', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 4, 3),
(7, '2025-05-15 18:45:09.593506', '1', 'aymane', 2, '[{\"changed\": {\"fields\": [\"password\"]}}]', 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(10, 'authtoken', 'token'),
(11, 'authtoken', 'tokenproxy'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(9, 'Tickets', 'accounts'),
(8, 'Tickets', 'message'),
(7, 'Tickets', 'ticket');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-05-07 15:49:29.887769'),
(2, 'auth', '0001_initial', '2025-05-07 15:49:30.110645'),
(3, 'admin', '0001_initial', '2025-05-07 15:49:30.164356'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-05-07 15:49:30.169360'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-05-07 15:49:30.173869'),
(6, 'contenttypes', '0002_remove_content_type_name', '2025-05-07 15:49:30.216742'),
(7, 'auth', '0002_alter_permission_name_max_length', '2025-05-07 15:49:30.238059'),
(8, 'auth', '0003_alter_user_email_max_length', '2025-05-07 15:49:30.252628'),
(9, 'auth', '0004_alter_user_username_opts', '2025-05-07 15:49:30.257633'),
(10, 'auth', '0005_alter_user_last_login_null', '2025-05-07 15:49:30.275725'),
(11, 'auth', '0006_require_contenttypes_0002', '2025-05-07 15:49:30.276727'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2025-05-07 15:49:30.281725'),
(13, 'auth', '0008_alter_user_username_max_length', '2025-05-07 15:49:30.295451'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2025-05-07 15:49:30.310503'),
(15, 'auth', '0010_alter_group_name_max_length', '2025-05-07 15:49:30.324725'),
(16, 'auth', '0011_update_proxy_permissions', '2025-05-07 15:49:30.328723'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2025-05-07 15:49:30.341767'),
(18, 'sessions', '0001_initial', '2025-05-07 15:49:30.361478'),
(19, 'Tickets', '0001_initial', '2025-05-07 15:53:42.408839'),
(20, 'Tickets', '0002_message', '2025-05-09 13:25:15.554881'),
(21, 'Tickets', '0003_message_pseudo_alter_message_auteur', '2025-05-11 19:15:26.909589'),
(22, 'Tickets', '0004_accounts', '2025-05-15 17:33:26.343843'),
(23, 'authtoken', '0001_initial', '2025-05-16 19:19:01.873774'),
(24, 'authtoken', '0002_auto_20160226_1747', '2025-05-16 19:19:01.890772'),
(25, 'authtoken', '0003_tokenproxy', '2025-05-16 19:19:01.892485'),
(26, 'Tickets', '0005_ticket_auteur', '2025-05-18 18:49:48.214940');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('b9wjbu3psfh2vh3idwoh15jgwh2ai2an', '.eJxVjMsOwiAQRf-FtSFA5VGX7vsNZIYZpGogKe3K-O_apAvd3nPOfYkI21ri1nmJM4mLCOL0uyGkB9cd0B3qrcnU6rrMKHdFHrTLqRE_r4f7d1Cgl289MHgIhCYpHyAHh5kwKauNR6s4kzfgmFEhk9IjOEo4nAfQXlk3ZhDvDxoNORE:1uGiop:WQjvqQDKJZQmM0BrIeUaH9-kFY7HK7YadzplCjAMu_I', '2025-06-01 18:33:03.505505'),
('co7h58ap6h22qwnhfxbod4rec47unfev', '.eJxVjDsOwjAQBe_iGlm2s_5R0ucM1tq74ABypDipEHeHSCmgfTPzXiLhtta0dV7SROIstDj9bhnLg9sO6I7tNssyt3WZstwVedAux5n4eTncv4OKvX5rH8hqdIRkAZ3ijExekeGAgCbEAUAXKCYG7yLHEiAUZ62yCvk6RBTvD-8HN98:1uK0Lg:0dUSYj4CPsUlPChV1RV9x3_8JkC2ypexnPO2HmeMx3M', '2025-06-10 19:52:32.726280'),
('dk52idoq4i7g8l58mzfkcqa9aaaqwezb', '.eJxVjDkOwjAUBe_iGln-juzElPScwfqbSQDZUpYKcXeIlALaNzPvZTJu65i3Rec8iTkbMKffjZAfWncgd6y3ZrnVdZ7I7oo96GKvTfR5Ody_gxGX8VtrTOoH4B6hcEIKmDrHiTuXoC-xFN9LHJhUSLqBwAuVKCEG79ApePP-AP9EOI8:1uDOTY:c4iJS4qXEeMdMagtkj_2s2pCfSvE2m2ZojRNFoprzZQ', '2025-05-23 14:13:20.268704'),
('qal51yqc53bt209nkb7nc954b3betwgi', '.eJxVjDsOwjAQBe_iGlm2s_5R0ucM1tq74ABypDipEHeHSCmgfTPzXiLhtta0dV7SROIstDj9bhnLg9sO6I7tNssyt3WZstwVedAux5n4eTncv4OKvX5rH8hqdIRkAZ3ijExekeGAgCbEAUAXKCYG7yLHEiAUZ62yCvk6RBTvD-8HN98:1uGiPa:bL1jyuy5Fkdb4A_aCsM_wdVF1f_dL7iIDybyHBXIBNk', '2025-06-01 18:06:58.046312');

-- --------------------------------------------------------

--
-- Structure de la table `tickets_accounts`
--

CREATE TABLE `tickets_accounts` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `password` varchar(128) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tickets_message`
--

CREATE TABLE `tickets_message` (
  `id` bigint(20) NOT NULL,
  `contenu` longtext NOT NULL,
  `date_envoi` datetime(6) NOT NULL,
  `auteur_id` int(11) DEFAULT NULL,
  `ticket_id` bigint(20) NOT NULL,
  `pseudo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tickets_message`
--

INSERT INTO `tickets_message` (`id`, `contenu`, `date_envoi`, `auteur_id`, `ticket_id`, `pseudo`) VALUES
(51, 'yo qlq pour m\'aider?', '2025-05-18 18:54:00.767781', 1, 17, NULL),
(75, 'oui moi', '2025-05-22 21:04:12.057798', NULL, 17, 'admin'),
(76, 'bonjour', '2025-05-28 17:28:03.258962', 1, 25, NULL),
(77, 'salut', '2025-05-28 17:28:17.972339', NULL, 25, 'mehdi'),
(78, 'saaaaaaaalut', '2025-05-28 17:28:41.188370', 4, 25, NULL),
(79, 'decris moi le problème', '2025-05-28 17:28:52.612046', 1, 25, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `tickets_ticket`
--

CREATE TABLE `tickets_ticket` (
  `id` bigint(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `auteur_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tickets_ticket`
--

INSERT INTO `tickets_ticket` (`id`, `title`, `description`, `status`, `created_at`, `updated_at`, `auteur_id`) VALUES
(17, 'Problème de bougie', 'j\'ai un problème avec ma bougie en je sais pas quoi , elle s\'eteint vite', 'open', '2025-05-18 18:53:47.554885', '2025-05-18 18:53:47.554885', 1),
(25, 'problème de connection', 'j\'ai appuyé sur entrer ça marche pas', 'open', '2025-05-28 17:27:39.658003', '2025-05-28 17:27:39.658003', 1),
(26, 'Likely agreement between what.', 'True arrive finish sound cultural common. Without student affect knowledge during explain. Could suddenly may ask. Point past trade interest movement paper. Themselves television meet focus forward serve good.', 'open', '2025-05-28 18:43:58.457536', '2025-05-28 18:43:58.457536', 4),
(27, 'Will college draw explain open recognize.', 'Billion guess most sport. Pressure several out own. College nearly wide front strong. Often traditional rich rich friend order scene matter. Tv require out letter value. Someone but art form.', 'open', '2025-05-28 18:44:50.148401', '2025-05-28 18:44:50.148401', 13),
(28, 'Woman skin onto they bank money.', 'Model office great environmental. Strategy catch argue realize not else. To end sort second west after brother. Economy hear music development be.', 'closed', '2025-05-28 18:44:50.149401', '2025-05-28 18:44:50.149401', 2),
(29, 'College pay minute type.', 'Effort speak certain evening. Possible citizen speak list send bring list. Manager increase girl remember energy. Seat drive already from. Final child each artist condition care wind choice. Law animal share traditional according. Audience point language my.', 'closed', '2025-05-28 18:44:50.150401', '2025-05-28 18:44:50.150401', 8),
(30, 'Family technology make take win edge by.', 'Society policy own role. Matter along yes develop evening blood born. Hair scene onto walk meet international. Happen someone difficult per. Serve former democratic meeting. Place question find reduce new get.', 'closed', '2025-05-28 18:44:50.150401', '2025-05-28 18:44:50.150401', 5),
(31, 'Improve answer wife inside.', 'Positive party hard trip. Chair boy the room available certain stop. Treatment break through.', 'open', '2025-05-28 18:44:50.150401', '2025-05-28 18:44:50.150401', 1),
(32, 'Side star space tree defense character.', 'Week risk push any. Near different relate skill economic attention send thank. Ability record affect PM green. Before prevent describe they indeed find somebody. Nature light idea language positive what.', 'closed', '2025-05-28 18:44:50.151401', '2025-05-28 18:44:50.151401', 6),
(33, 'Team whom arm community.', 'Far understand high none. Crime agency like enjoy. Red may thank. Give cup risk space sound can budget. Of at agree or.', 'open', '2025-05-28 18:44:50.151401', '2025-05-28 18:44:50.151401', 5),
(34, 'Think nearly hundred me room.', 'Movement wish have other staff become. Young early respond son school get party. Week how indeed daughter. Explain scientist understand tend throughout skin meeting by. Whether then break.', 'open', '2025-05-28 18:44:50.152401', '2025-05-28 18:44:50.152401', 12),
(35, 'Economic manager take garden everybody off statement.', 'Compare agree start. Could trial we behavior. Today page bed table.', 'closed', '2025-05-28 18:44:50.152401', '2025-05-28 18:44:50.152401', 5),
(36, 'Sound establish large woman world shoulder talk.', 'Country support play minute bag. However single late room study. None that source stuff check. Year people suffer none believe. Building campaign that resource tree fear room. West local how develop too.', 'closed', '2025-05-28 18:44:50.152401', '2025-05-28 18:44:50.152401', 7),
(37, 'Middle lead door for community.', 'Two international stage Democrat include drug. Increase girl recent network vote dark something. Sort usually our weight. Such last major nature hear. Man large on black main the.', 'closed', '2025-05-28 18:44:50.153401', '2025-05-28 18:44:50.153401', 6),
(38, 'Drive many relationship school impact.', 'Always national day marriage recognize our tough. Participant quality give main court. Always morning sea recent west wear. Morning color front through we wind help. Memory agency message explain as can necessary mother. Painting resource would house.', 'open', '2025-05-28 18:44:50.153401', '2025-05-28 18:44:50.153401', 3),
(39, 'Respond hope author his into.', 'Work begin move dark red pick. Move parent particular mind. Support fund be identify hope shoulder end. Consumer door visit executive. Continue which cultural. Owner line pattern life movie.', 'open', '2025-05-28 18:44:50.153401', '2025-05-28 18:44:50.153401', 7),
(40, 'Available drop modern money he reveal eat.', 'Laugh charge film suggest office baby. Myself country small. Either act lawyer property able movement occur. Hit agent receive. Marriage miss full their question person hand control. Store great road behind film material special truth.', 'closed', '2025-05-28 18:44:50.154401', '2025-05-28 18:44:50.154401', 13),
(41, 'Official behind surface customer.', 'Head realize contain discover participant both could. Investment reason several five nothing fast. Community information brother government art Mrs. Maybe magazine low body. Back spend turn save federal according pattern.', 'closed', '2025-05-28 18:44:50.154401', '2025-05-28 18:44:50.154401', 7),
(42, 'Throw person share popular morning black.', 'Treat himself yet nice high article. Down treatment machine expert. Cultural unit hour. Evening traditional training various.', 'open', '2025-05-28 18:44:50.154401', '2025-05-28 18:44:50.154401', 11),
(43, 'Him husband agent act time first.', 'Statement human which think cover trouble. Throw sign national ten sport walk investment. Outside feeling society turn west whose. Trade point law eye. Police particular of face. Approach fight investment through little usually.', 'closed', '2025-05-28 18:44:50.155401', '2025-05-28 18:44:50.155401', 12),
(44, 'Street though note building.', 'Hospital knowledge wrong everybody. Company ask important travel citizen commercial. Also station explain grow difficult for.', 'closed', '2025-05-28 18:44:50.155401', '2025-05-28 18:44:50.155401', 5),
(45, 'Page government sign task just during success.', 'Major contain why list direction first son. Federal likely gas give leg be. Coach left never administration.', 'open', '2025-05-28 18:44:50.155401', '2025-05-28 18:44:50.155401', 3),
(46, 'Data own movie.', 'Movement part individual like computer. Remain cell trip why while. Or morning itself material enjoy father. Serious in upon conference one firm physical country. Power just level board parent. We goal describe maintain film.', 'closed', '2025-05-28 18:44:50.156401', '2025-05-28 18:44:50.156401', 9);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Index pour la table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Index pour la table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Index pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Index pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Index pour la table `tickets_accounts`
--
ALTER TABLE `tickets_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Index pour la table `tickets_message`
--
ALTER TABLE `tickets_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tickets_message_ticket_id_221def8a_fk_Tickets_ticket_id` (`ticket_id`),
  ADD KEY `Tickets_message_auteur_id_fc59f95d_fk_auth_user_id` (`auteur_id`);

--
-- Index pour la table `tickets_ticket`
--
ALTER TABLE `tickets_ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tickets_ticket_auteur_id_e68836d8_fk_auth_user_id` (`auteur_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `tickets_accounts`
--
ALTER TABLE `tickets_accounts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tickets_message`
--
ALTER TABLE `tickets_message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pour la table `tickets_ticket`
--
ALTER TABLE `tickets_ticket`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `tickets_accounts`
--
ALTER TABLE `tickets_accounts`
  ADD CONSTRAINT `Tickets_accounts_user_id_85d56dcd_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `tickets_message`
--
ALTER TABLE `tickets_message`
  ADD CONSTRAINT `Tickets_message_auteur_id_fc59f95d_fk_auth_user_id` FOREIGN KEY (`auteur_id`) REFERENCES `auth_user` (`id`),
  ADD CONSTRAINT `Tickets_message_ticket_id_221def8a_fk_Tickets_ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `tickets_ticket` (`id`);

--
-- Contraintes pour la table `tickets_ticket`
--
ALTER TABLE `tickets_ticket`
  ADD CONSTRAINT `Tickets_ticket_auteur_id_e68836d8_fk_auth_user_id` FOREIGN KEY (`auteur_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
