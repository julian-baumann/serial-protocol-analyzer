import { Component } from "@angular/core";
import { Router } from "@angular/router";

import {CompareService} from "../../services/compare.service";
import { SerialCommunicationRecording } from "../../services/entities/serial-communication-recording";

@Component({
    selector: "app-start",
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.scss"]
})
export class StartComponent {
    protected filesForProtocolAnalysis: Map<string, SerialCommunicationRecording> = new Map();
    protected filesToConcatenate: File[] = [];

    public constructor(
        private compareService: CompareService,
        private router: Router
    ) {
    }

    public selectFiles(type: "concatenate"|"analyze"): void {
        if (type == "concatenate") {
            document.getElementById("concatenateFileInput")?.click();
        } else {
            document.getElementById("fileInput")?.click();
        }
    }
    public async fileChanged(event: any, type: "concatenate"|"analyze"): Promise<void> {
        const files: File[]|null = event.target?.files as File[];

        if (files == null || files.length == 0) {
            return;
        }

        for (const file of files) {
            if (type == "concatenate") {
                this.filesToConcatenate.push(file);
            } else {
                this.filesForProtocolAnalysis.set(file.name, await this.compareService.loadCombinedProtocol(file));
            }
        }
    }

    public async concatenate(): Promise<void> {
        if (this.filesToConcatenate && this.filesToConcatenate.length > 0) {
            this.compareService.downloadCombinedProtocol(await this.compareService.merge(...this.filesToConcatenate));
        }
    }

    public async start(): Promise<void> {
        if (this.filesForProtocolAnalysis && [...this.filesForProtocolAnalysis.values()].length > 0) {
            this.compareService.recordingsForAnalysis = [...this.filesForProtocolAnalysis.values()];
            await this.router.navigate(["/protocol"]);
        }
    }
}
