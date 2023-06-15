// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const config = {
	groupDepth: 0,
};

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* istanbul ignore next */
// This function is not testable.
function ghLog(
	type: "debug" | "error" | "notice" | "warning",
	message: string,
	sourceFilePath?: string
): void {
	if (process.env.CI === "true" && process.env.GITHUB_WORKFLOW) {
		const escapedMessage = message
			.replace(/%/g, "%25")
			.replace(/\n/g, "%0A")
			.replace(/\r/g, "%0D");

		if (type == "debug") {
			// Debug doesn't support the file ref according to the docs, and I've not found the source code.
			process.stderr.write(`::${type}::${escapedMessage}\n`);
			return;
		}
		// We are executing from within a GitHub Workflow.
		process.stderr.write(
			`::${type} file=${sourceFilePath ?? ""}::${escapedMessage}\n`
		);
	} else {
		process.stderr.write(
			`${"\t".repeat(config.groupDepth)}${type.toUpperCase()}: ${message}\n`
		);
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * On local machines writes to stderr a log grouping message. On GitHub Actions stop causing subsequent messages to appear in the current group.
 *
 */
/* istanbul ignore next */
// This function is not testable.
export function ghLogGroupEnd(): void {
	if (process.env.CI === "true" && process.env.GITHUB_WORKFLOW) {
		process.stderr.write(`::endgroup::\n`);
	} else {
		process.stderr.write(`${"\t".repeat(config.groupDepth)}</group>\n`);
	}
	--config.groupDepth;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * On local machines writes to stderr a log grouping message. On GitHub Actions it will cause subsequent messages to appear in a nested expandable entry.
 *
 * @param title The title of the group.
 */
/* istanbul ignore next */
// This function is not testable.
export function ghLogGroupStart(title: string): void {
	if (process.env.CI === "true" && process.env.GITHUB_WORKFLOW) {
		const escapedTitle = title
			.replace(/%/g, "%25")
			.replace(/\n/g, "%0A")
			.replace(/\r/g, "%0D");

		process.stderr.write(`::group::${escapedTitle}\n`);
	} else {
		process.stderr.write(
			`${"\t".repeat(config.groupDepth)}<group title="${title}">\n`
		);
	}
	++config.groupDepth;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * On local machines writes to stderr. On GitHub Actions it will format the message to appear in the actions log.
 *
 * @param message The message you want to send to the log.
 */
/* istanbul ignore next */
// This function is not testable.
export function ghLogDebug(message: string, sourceFilePath?: string): void {
	return ghLog("debug", message, sourceFilePath);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * On local machines writes to stderr. On GitHub Actions it will format the message to appear in the actions log.
 *
 * @param message The message you want to send to the log.
 */
/* istanbul ignore next */
// This function is not testable.
export function ghLogError(message: string, sourceFilePath?: string): void {
	return ghLog("error", message, sourceFilePath);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * On local machines writes to stderr. On GitHub Actions it will format the message to appear in the actions log.
 *
 * @param message The message you want to send to the log.
 */
/* istanbul ignore next */
// This function is not testable.
export function ghLogNotice(message: string, sourceFilePath?: string): void {
	return ghLog("notice", message, sourceFilePath);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * On local machines writes to stderr. On GitHub Actions it will format the message to appear in the actions log.
 *
 * @param message The message you want to send to the log.
 */
/* istanbul ignore next */
// This function is not testable.
export function ghLogWarn(message: string, sourceFilePath?: string): void {
	return ghLog("warning", message, sourceFilePath);
}
