import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CompareService } from "../../services/compare.service";
import { DataSection } from "../../services/entities/data-section";
import { SerialCommunicationRecording } from "../../services/entities/serial-communication-recording";
import { CombinedProtocol } from "./entities/combined-protocol";

@Component({
    selector: "app-combined-protocol",
    templateUrl: "./combined-protocol.component.html",
    styleUrls: ["./combined-protocol.component.scss"]
})
export class CombinedProtocolComponent {
    protected combinedProtocols: CombinedProtocol[] = [];
    protected inSynchronizationMode: boolean = false;

    public constructor(
        private compareService: CompareService,
        private router: Router
    ) {
        if (compareService.recordingsForAnalysis.length <= 0) {
            this.router.navigate([""]).then();
            return;
        }

        this.combinedProtocols = compareService.recordingsForAnalysis.map((element: SerialCommunicationRecording) => new CombinedProtocol(element));
    }

    public startSynchronizationPointSelection(): void {
        this.inSynchronizationMode = true;
    }

    public synchronizeRecordings(): void {
        this.inSynchronizationMode = false;
        let baseTopPosition: number|undefined;

        for (const protocol of this.combinedProtocols) {
            if (baseTopPosition == undefined && protocol.synchronizationTopPosition != undefined) {
                baseTopPosition = protocol.synchronizationTopPosition;
            } else if (baseTopPosition != undefined
                && protocol.synchronizationElement != undefined
                && protocol.synchronizationTopPosition != undefined
                && protocol.synchronizationElement.parentElement != undefined) {
                const newPosition: number = baseTopPosition - protocol.synchronizationTopPosition;
                protocol.synchronizationElement.parentElement.style.transform = `translateY(${newPosition}px)`;
            }
        }

        if (this.combinedProtocols[0]?.synchronizationElement != undefined) {
            this.combinedProtocols[0].synchronizationElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }

    public selectSynchronizationPoint(combinedProtocol: CombinedProtocol, section: DataSection, event: Event): void {
        if (!this.inSynchronizationMode) {
            return;
        }

        if (combinedProtocol.synchronizationSection == section) {
            combinedProtocol.synchronizationSection = undefined;
        } else {
            combinedProtocol.synchronizationSection = section;
            const targetElement: HTMLDivElement = event.target as HTMLDivElement;
            combinedProtocol.synchronizationTopPosition = targetElement.offsetTop;
            combinedProtocol.synchronizationElement = targetElement;

            console.log(targetElement.offsetTop);
        }
    }
}
