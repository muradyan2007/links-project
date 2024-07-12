import { API_URL } from "../../config";

export class Link {
    static links: Link[] = [];

    id: number;
    _longLink: string;
    _shortLink: string;

    constructor({ id, longLink }: { id: number; longLink: string }) {
        this.id = id;
        this._longLink = longLink;
        this._shortLink = `${API_URL}/l/${id}`;
    }

    get shortLink() {
        return this._shortLink;
    }

    get longLink() {
        return this._longLink;
    }

    static getOne(linkId: number): Link | undefined {
        return Link.links.find(link => link.id === linkId);
    }

    static getAll(page: number = 1, pageSize: number = 10): Link[] {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return Link.links.slice(start, end);
    }

    static createOne(longLink: string): Link {
        const id = +new Date();
        const newLink = new Link({ id, longLink });
        Link.links.push(newLink);
        return newLink;
    }

    static deleteOne(linkId: number): boolean {
        const index = Link.links.findIndex(link => link.id === linkId);
        if (index !== -1) {
            Link.links.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    static updateOne(linkId: number, longLink: string): Link | null {
        const link = Link.getOne(linkId);
        if (link) {
            link._longLink = longLink;
            link._shortLink = `${API_URL}/l/${link.id}`;
            return link;
        }
        return null;
    }
}
