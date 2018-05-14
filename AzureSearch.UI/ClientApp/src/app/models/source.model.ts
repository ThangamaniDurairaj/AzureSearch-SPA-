export class Source {
    constructor(id?: string, file?: string, website?: string, tags?: string, keywords?: string, links?: string,
        description?: string) {

        this.id = id;
        this.file = file;
        this.website = website;
        this.tags = tags;
        this.keywords = keywords;
        this.links = links;
        this.description = description;
    }

    public id: string;
    public file: string;
    public website: string;
    public tags: string;
    public keywords: string;
    public links: string;
    public description: string;
}
