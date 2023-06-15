#!/usr/bin/env -S npx ts-node-script

import FS from "node:fs/promises";
import Path from "node:path";

import { ghLogError } from "../lib/ghlog";
console.log("");

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
interface ReportEntry {
	body?: string;
	children?: ReportEntry[];
	summary: string;
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
async function generateReport(basePath: string): Promise<ReportEntry> {
	const folderContents = await FS.readdir(basePath, "utf8");
	const result = await FS.readFile(`${basePath}/result.txt`, "utf8");

	return {
		summary: `${Path.parse(basePath).name} results (${result.trim()})`,
		children: await Promise.all(
			folderContents
				.filter((path) => path.endsWith(".log"))
				.map(
					async (path): Promise<ReportEntry> => ({
						summary: Path.parse(path).name,
						body: await FS.readFile(Path.join(basePath, path), "utf8"),
					})
				)
		),
	};
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function serializeReports(reports: readonly ReportEntry[]): string[] {
	return reports.flatMap((report): string[] => {
		return [
			`<details><summary>${report.summary}</summary><blockquote>`,
			...(report.body ? ["<pre>", report.body.trim(), "</pre>"] : []),
			...(report.children?.length ? serializeReports(report.children) : []),
			"</blockquote></details>",
		].filter((line) => !!line.trim());
	});
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* istanbul ignore if */
if (require.main === module) {
	(async (): ReturnType<typeof generateReport> => {
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		const args = process.argv.slice(2);

		if (args.length !== 1) {
			throw new Error(
				`Invalid number of arguments!\n${JSON.stringify({ args })}`
			);
		}

		return generateReport(args[0]);
	})()
		.then((result) => {
			process.stdout.write(serializeReports([result]).join("\n") + "\n");
		})
		.catch((error) => {
			if (error instanceof Error) {
				ghLogError(error.stack ?? error.message, __filename);
			} else {
				ghLogError(String(error), __filename);
			}
			process.exit(1);
		});
}
