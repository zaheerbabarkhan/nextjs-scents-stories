"use server";
import { ProductData } from "@/components/homePageProductRow";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function fetchProducts() {
  try {
    const response = await axios.get(`${URL}/products`);

    if (response.data?.products.length) {
      const products: ProductData[] = [];
      response.data.products.forEach(
        (product: {
          description: any;
          id: any;
          image: any;
          onSale: any;
          price: any;
          salePrice: any;
          title: any;
          smallImages: any;
          largeImages: any;
        }) => {
          products.push({
            description: product.description,
            id: product.id,
            imageURL: product.image,
            onSale: product.onSale,
            price: product.price,
            salePrice: product.salePrice,
            title: product.title,
            smallImages: product.smallImages,
            largeImages: product.largeImages,
          });
        }
      );
      return products;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function fetchSingleProduct(id: string) {
  try {
    const response = await axios.get(`${URL}/products/${id}`);

    if (response.data) {
      const productData = response.data;
      const product: ProductData = {
        description: productData.description,
        id: productData.id,
        imageURL: productData.image,
        onSale: productData.onSale,
        price: productData.price,
        salePrice: productData.salePrice,
        title: productData.title,
        smallImages: productData.smallImages,
        largeImages: productData.largeImages,
      };
      return product;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchUserData(email: string, password: string) {
  try {
    const response = await axios.post(`${URL}/auth/login`, {
      password,
      username: email,
    });

    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("this is error here",(error as any).message);
    return null;
  }
}
