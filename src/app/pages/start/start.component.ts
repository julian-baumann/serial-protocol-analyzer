import { Component } from "@angular/core";

import {CompareService} from "../../services/compare.service";

@Component({
    selector: "app-start",
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.scss"]
})
export class StartComponent {
    private readsFile?: File;
    private writesFile?: File;

    protected readsFileName?: string;
    protected writesFileName?: string;

    public constructor(
        private compareService: CompareService
    ) {
    }

    public selectFile(type: "reads"|"writes"): void {
        document.getElementById(`${type}FileInput`)?.click();
    }
    public fileChanged(event: any, type: "reads"|"writes"): void {
        const files: File[]|null = event.target?.files as File[];

        if (files == null || files.length == 0) {
            return;
        }

        const file: File = files[0];

        if (type == "reads") {
            this.readsFile = file;
            this.compareService.loadFile(this.readsFile);
            this.readsFileName = file.name;
        } else if (type == "writes") {
            this.writesFile = file;
            this.writesFileName = file.name;
        }
    }

    public start(): void {
        if (this.readsFile && this.writesFile) {
            this.compareService.loadFile(this.readsFile);
        }
    }
}
