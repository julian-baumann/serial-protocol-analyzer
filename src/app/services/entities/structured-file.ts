import { DataSection } from "./data-section";

export class StructuredFile {
    public name: string = "";
    public sections: DataSection[] = [];

    public constructor(name: string) {
        this.name = name;
    }
}
