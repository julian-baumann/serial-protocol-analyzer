import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CompareService } from "../../services/compare.service";
import { CombinedProtocol } from "../../services/entities/combined-protocol";

@Component({
    selector: "app-combined-protocol",
    templateUrl: "./combined-protocol.component.html",
    styleUrls: ["./combined-protocol.component.scss"]
})
export class CombinedProtocolComponent {
    protected combinedProtocol: CombinedProtocol = null!;
    protected primaryFileName: string = "";

    public constructor(
        private compareService: CompareService,
        private router: Router
    ) {
        if (compareService.currentProtocol == null) {
            this.router.navigate([""]).then();
            return;
        }

        this.combinedProtocol = compareService.currentProtocol;
        this.primaryFileName = this.combinedProtocol.sections[0].fileName;
    }

}
