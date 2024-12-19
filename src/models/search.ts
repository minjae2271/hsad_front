export interface ProductInfo {
  product_name: string;
  // href: string;
  price: string;
  five_reviews?: string[];
  one_reviews?: string[];
  five_star_summary?: { product_name: string, summary: string };
  one_star_summary?: { product_name: string, summary: string }; 
}


export interface ProductData {
  [asin: string]: ProductInfo;
}