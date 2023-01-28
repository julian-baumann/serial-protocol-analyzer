export class DataSection {
    public issue: number = 0;
    public header: string = "";
    public content: string = "";
    public secondary: boolean;

    public constructor(issue: number = 0, header?: string, content?: string, seconday: boolean = false) {
        this.issue = issue;
        this.header = header ?? "";
        this.content = content ?? "";
        this.secondary = seconday;
    }
}
