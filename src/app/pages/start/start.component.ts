import { Component } from "@angular/core";
import { Router } from "@angular/router";

import {CompareService} from "../../services/compare.service";
import { StructuredFile } from "../../services/entities/structured-file";

@Component({
    selector: "app-start",
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.scss"]
})
export class StartComponent {
    private readsFile?: StructuredFile;
    private writesFile?: StructuredFile;

    protected readsFileName?: string;
    protected writesFileName?: string;

    public constructor(
        private compareService: CompareService,
        private router: Router
    ) {
    }

    public selectFile(type: "reads"|"writes"): void {
        document.getElementById(`${type}FileInput`)?.click();
    }
    public async fileChanged(event: any, type: "reads"|"writes"): Promise<void> {
        const files: File[]|null = event.target?.files as File[];

        if (files == null || files.length == 0) {
            return;
        }

        const file: File = files[0];

        if (type == "reads") {
            this.readsFile = await this.compareService.loadFile(file);
            this.readsFileName = file.name;
        } else if (type == "writes") {
            this.writesFile = await this.compareService.loadFile(file);
            this.writesFileName = file.name;
        }
    }

    public async start(): Promise<void> {
        if (this.readsFile && this.writesFile) {
            this.compareService.currentProtocol = this.compareService.compare(this.readsFile, this.writesFile);
            await this.router.navigate(["/protocol"]);
        }
    }
}
