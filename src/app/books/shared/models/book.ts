export interface Book {
    id: string;
    image: string;
    name: string;
    author: string;
    price: number;
    qty: number;
    description: string;
    genre: string[];
    publicationYear: number;
    ratings: Rating[];
  }
  
  export interface Rating {
    username: string;
    score: number;
  }
  