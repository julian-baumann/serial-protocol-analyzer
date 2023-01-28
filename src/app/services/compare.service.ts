import { Injectable } from "@angular/core";

import { DataSection } from "./entities/data-section";
import { SerialCommunicationRecording } from "./entities/serial-communication-recording";
import { StructuredFile } from "./entities/structured-file";

@Injectable({
    providedIn: "root"
})
export class CompareService {
    private readonly separatorRegex: RegExp = /(\d{5,6}: \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:,\d*)? [+\-]\d{1,3},\d{7})/;
    private recordingsForAnalysisBacking: SerialCommunicationRecording[] = [];

    public get recordingsForAnalysis(): SerialCommunicationRecording[] {
        if (this.recordingsForAnalysisBacking.length > 0) {
            return this.recordingsForAnalysisBacking;
        }

        const storedString: string|null = localStorage.getItem("combined-protocol");

        if (storedString) {
            const storedProtocol: SerialCommunicationRecording[]|undefined = JSON.parse(storedString) as SerialCommunicationRecording[]|undefined;

            if (storedProtocol) {
                return storedProtocol;
            }
        }

        return [];
    }

    public set recordingsForAnalysis(value: SerialCommunicationRecording[]) {
        if (value) {
            this.recordingsForAnalysisBacking = value;
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

    public async loadCombinedProtocol(rawFile: File): Promise<SerialCommunicationRecording> {
        return JSON.parse(await this.readText(rawFile)) as SerialCommunicationRecording;
    }

    public async loadFile(rawFile: File, secondary: boolean): Promise<StructuredFile> {
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
                    currentFileSection.secondary = secondary;
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

        return file;
    }

    public async merge(...files: File[]): Promise<SerialCommunicationRecording> {
        const serialCommunicationRecording: SerialCommunicationRecording = new SerialCommunicationRecording();
        serialCommunicationRecording.sections = [];

        let secondary: boolean = false;

        for (const file of files) {
            serialCommunicationRecording.sections.push(...(await this.loadFile(file, secondary)).sections);
            secondary = !secondary;
        }

        serialCommunicationRecording.sections = serialCommunicationRecording.sections.sort((a: DataSection, b: DataSection) => (a.issue > b.issue) ? 1 : -1);

        return serialCommunicationRecording;
    }

    public downloadCombinedProtocol(protocol: SerialCommunicationRecording): void {
        const data: string = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(protocol))}`;

        const anchor: HTMLAnchorElement = window.document.createElement("a");
        anchor.download = "protocol.json";
        anchor.href = data;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(anchor.href);
    }
}
