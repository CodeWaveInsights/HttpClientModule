export interface Coffee {
	id: number;
    title: string;
    price: number;
	category: string;
    description: string;
    image: string;
    rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}