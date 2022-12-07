import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CombinedProtocolComponent } from "./pages/combined-protocol/combined-protocol.component";
import { StartComponent } from "./pages/start/start.component";
import { RouterOutlet } from "@angular/router";

@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
        CombinedProtocolComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
