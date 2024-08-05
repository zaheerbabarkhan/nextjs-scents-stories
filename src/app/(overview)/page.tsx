import ContentHeader from "@/components/contentHeader";
import HomePageImage from "@/components/homePageImage";
import HomePageProductsRow, { ProductData } from "@/components/homePageProductRow";
import { fetchProducts } from "@/lib/data";
import Image from "next/image";

export default async function Home() {
  const products = await fetchProducts();
  return (
    <main className="">
      <HomePageImage />

      <div className="h-24"></div>
      <div className="max-w-[1500px] lg:w-3/4 md:w-full mx-auto flex flex-col gap-24">
        <div className="flex flex-col gap-10">
          <ContentHeader title="summer deals" URL="/collections/summer" />
          <HomePageProductsRow products={products as ProductData[]}/>
        </div>
        <div className="flex flex-col gap-10">
          <ContentHeader title="Winter deals" URL="/collections/winter" />
          <HomePageProductsRow products={products as ProductData[]}/>
        </div>
      </div>

    </main>
  );
}
