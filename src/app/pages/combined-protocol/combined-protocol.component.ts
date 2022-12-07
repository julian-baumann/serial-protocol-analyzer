import { Component } from "@angular/core";

import { CompareService } from "../../services/compare.service";
import { CombinedProtocol } from "../../services/entities/combined-protocol";
import { Router } from "@angular/router";

@Component({
    selector: "app-combined-protocol",
    templateUrl: "./combined-protocol.component.html",
    styleUrls: ["./combined-protocol.component.scss"]
})
export class CombinedProtocolComponent {
    public combinedProtocol: CombinedProtocol = null!;
    public constructor(
        private compareService: CompareService,
        private router: Router
    ) {
        if (compareService.currentProtocol == null) {
            this.router.navigate([""]).then();
            return;
        }

        this.combinedProtocol = compareService.currentProtocol;
    }

}
