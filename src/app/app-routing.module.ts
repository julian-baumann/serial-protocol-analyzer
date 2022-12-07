import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CombinedProtocolComponent } from "./pages/combined-protocol/combined-protocol.component";
import { StartComponent } from "./pages/start/start.component";


const routes: Routes = [
    { path: "", component: StartComponent },
    { path: "protocol", component: CombinedProtocolComponent }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
        CommonModule
    ]
})
export class AppRoutingModule { }
