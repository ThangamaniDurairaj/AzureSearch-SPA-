export class Search {
    constructor(text?: string, fields?: string, facet?: string, filter?: string) {

        this.text = text;
        this.fields = fields;
        this.facet = facet;
        this.filter = filter;
    }

    public text: string;
    public fields: string;
    public facet: string;
    public filter: string;
}
