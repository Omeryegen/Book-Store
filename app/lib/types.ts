export interface User {
    id: number
    name: string,
    email: string,
    image: string | null,
    favourites: string[],
    basket: string[],
}

export interface Book {
        id:  number, 
        author: string,
        seller: string,
        sellerId: string,
        condition: number,
        titel: string,
        images: string[],
        price: number,
        publisher: string,  
        category: string    
}