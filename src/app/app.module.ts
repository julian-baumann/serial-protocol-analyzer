import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import * as SmoothScroll from "smoothscroll-polyfill";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CombinedProtocolComponent } from "./pages/combined-protocol/combined-protocol.component";
import { StartComponent } from "./pages/start/start.component";

SmoothScroll.polyfill();

@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
        CombinedProtocolComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        ComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
