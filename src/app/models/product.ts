export class Product {
    id: number;
    name: string;
    categoryId: number;
    image: string;
    authorId: number;
    source: string;
    view: number;
    download: number;
    products?: any[];
    constructor(
        id: number,
        name: string,
        categoryId: number,
        image: string,
        authorId: number,
        source: string,
        view: number,
        download: number,
        products?: any[]) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.image = image;
        this.authorId = authorId;
        this.source = source;
        this.view = view;
        this.download = download;
        this.products = products;
    }
}
