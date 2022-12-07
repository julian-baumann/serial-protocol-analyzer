import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { StartComponent } from './pages/start/start.component';
import { CombinedProtocolComponent } from './pages/combined-protocol/combined-protocol.component';

@NgModule({
    declarations: [
        AppComponent,
        StartComponent,
        CombinedProtocolComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
