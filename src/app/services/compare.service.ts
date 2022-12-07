import { Injectable } from "@angular/core";

import { CombinedProtocol } from "./entities/combined-protocol";
import { DataSection } from "./entities/data-section";
import { StructuredFile } from "./entities/structured-file";

@Injectable({
    providedIn: "root"
})
export class CompareService {
    private readonly separatorRegex: RegExp = /(\d{5,6}: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:,\d*)? [+\-]\d{1,3},\d{7})/;
    private currentProtocolBacking?: CombinedProtocol;

    public get currentProtocol(): CombinedProtocol|null {
        if (this.currentProtocolBacking) {
            return this.currentProtocolBacking;
        }

        const storedString: string|null = localStorage.getItem("combined-protocol");

        if (storedString) {
            const storedProtocol: CombinedProtocol|undefined = JSON.parse(storedString) as CombinedProtocol|undefined;

            if (storedProtocol) {
                return storedProtocol;
            }
        }

        return null;
    }

    public set currentProtocol(value: CombinedProtocol|null) {
        if (value) {
            this.currentProtocolBacking = value;
            localStorage.setItem("combined-protocol", JSON.stringify(value));
        }
    }

    private readText(file: File): Promise<string> {
        const reader: FileReader = new FileReader();

        return new Promise<string>((resolve: Function) => {
            reader.addEventListener("load", () => {
                resolve(reader.result);
            }, false);

            if (file) {
                reader.readAsText(file);
            }
        });
    }

    public async loadFile(rawFile: File): Promise<StructuredFile> {
        const file: StructuredFile = new StructuredFile(rawFile.name);
        const sections: string[] = (await this.readText(rawFile)).split(this.separatorRegex);

        let isHeader: boolean = true;
        let currentFileSection: DataSection = new DataSection();

        for (const section of sections) {
            if (!section) {
                continue;
            }

            if (isHeader) {
                isHeader = false;
                const splitHeader: string[] = section.split(":");

                if (splitHeader?.length > 0) {
                    currentFileSection.issue = parseInt(splitHeader[0], 10) || 0;
                    currentFileSection.header = section;
                    currentFileSection.fileName = file.name;
                    isHeader = false;
                }
            } else {
                currentFileSection.content = section.replaceAll(/\r\n\r\n /g, " ");
                isHeader = true;
            }

            if (currentFileSection.issue && currentFileSection.content) {
                file.sections.push(currentFileSection);
                currentFileSection = new DataSection();
            }
        }

        console.log(file);

        return file;
    }

    public compare(...files: StructuredFile[]): CombinedProtocol {
        const combinedProtocol: CombinedProtocol = new CombinedProtocol();
        combinedProtocol.sections = [];

        for (const file of files) {
            combinedProtocol.sections.push(...file.sections);
        }

        combinedProtocol.sections = combinedProtocol.sections.sort((a: DataSection, b: DataSection) => (a.issue > b.issue) ? 1 : -1);

        return combinedProtocol;
    }
}
