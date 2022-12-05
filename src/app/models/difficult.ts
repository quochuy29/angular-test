export class Difficult {
    id: number;
    name: string;
    products?: any[];
    constructor(id: number, name: string, products: any[] = []) {
        this.id = id;
        this.name = name;
        this.products = products;
    }
}
