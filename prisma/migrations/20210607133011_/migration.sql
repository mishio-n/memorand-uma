-- CreateTable
CREATE TABLE `Betting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `race` INTEGER NOT NULL,
    `betType` ENUM('WIN', 'PLACE', 'QUINELLA_PLACE', 'BRACKET_QUINELLA', 'QUINELLA', 'EXACTA', 'TRIO', 'TRIFECTA') NOT NULL,
    `markCardType` ENUM('NORMAL', 'WHEEL', 'BOX', 'FORMATION') NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `confidence` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `bettingId` INTEGER NOT NULL,
    `column` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compoundId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `providerType` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191),
    `accessToken` LONGTEXT,
    `accessTokenExpires` DATETIME(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Account.compoundId_unique`(`compoundId`),
    INDEX `providerAccountId`(`providerAccountId`),
    INDEX `providerId`(`providerId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Session.sessionToken_unique`(`sessionToken`),
    UNIQUE INDEX `Session.accessToken_unique`(`accessToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191),
    `email` VARCHAR(191),
    `emailVerified` DATETIME(3),
    `image` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `VerificationRequest.token_unique`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Betting` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horse` ADD FOREIGN KEY (`bettingId`) REFERENCES `Betting`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
