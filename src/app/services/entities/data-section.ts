import { StructuredFile } from "./structured-file";

export class DataSection {
    public issue: number = 0;
    public header: string = "";
    public content: string = "";
    public file: StructuredFile = null!;

    public constructor(issue: number = 0, header?: string, content?: string) {
        this.issue = issue;
        this.header = header ?? "";
        this.content = content ?? "";
    }
}
