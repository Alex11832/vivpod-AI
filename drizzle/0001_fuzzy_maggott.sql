CREATE TABLE `agents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`vapiAssistantId` varchar(64),
	`name` varchar(255) NOT NULL,
	`voiceId` varchar(64) NOT NULL,
	`voiceName` varchar(64),
	`voiceProvider` varchar(32) DEFAULT '11labs',
	`industry` varchar(64),
	`subCategories` json,
	`systemPrompt` text,
	`firstMessage` text,
	`status` enum('active','paused','draft') NOT NULL DEFAULT 'draft',
	`totalCalls` int NOT NULL DEFAULT 0,
	`totalMinutes` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `callLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`agentId` int NOT NULL,
	`vapiCallId` varchar(64),
	`callerPhone` varchar(32),
	`duration` int DEFAULT 0,
	`status` enum('completed','missed','transferred','voicemail') NOT NULL DEFAULT 'completed',
	`summary` text,
	`transcript` text,
	`sentiment` enum('positive','neutral','negative'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `callLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`timezone` varchar(64) DEFAULT 'America/New_York',
	`emailSummary` boolean DEFAULT true,
	`emailMissedCalls` boolean DEFAULT true,
	`emailWeeklyReport` boolean DEFAULT true,
	`telegramEnabled` boolean DEFAULT false,
	`telegramChatId` varchar(64),
	`googleCalendarConnected` boolean DEFAULT false,
	`hubspotConnected` boolean DEFAULT false,
	`hubspotApiKey` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `userSettings_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `company` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `plan` enum('free','starter','pro','enterprise') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `trialMinutesUsed` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `trialMinutesTotal` int DEFAULT 30 NOT NULL;