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
    protected files: StructuredFile[] = [];

    public constructor(
        private compareService: CompareService,
        private router: Router
    ) {
    }

    public selectFiles(): void {
        document.getElementById("fileInput")?.click();
    }
    public async fileChanged(event: any): Promise<void> {
        const files: File[]|null = event.target?.files as File[];

        if (files == null || files.length == 0) {
            return;
        }

        for (const file of files) {
            this.files?.push(await this.compareService.loadFile(file));
        }
    }

    public async start(): Promise<void> {
        if (this.files && this.files.length > 0) {
            this.compareService.currentProtocol = this.compareService.compare(...this.files);
            await this.router.navigate(["/protocol"]);
        }
    }
}
