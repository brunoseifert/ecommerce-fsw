import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";
import PromoBannerDesktop from "./components/promo-banner-desktop";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        className=" lg:hidden"
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
      />
      <div className="mx-auto w-full max-w-[1920px]">
        <PromoBannerDesktop
          src="/banner-desktop.png"
          alt="Banner Desktop"
          className="hidden w-full lg:mx-auto lg:block"
        />
      </div>
      <div className="flex flex-col gap-8 py-8 lg:container lg:gap-12">
        <div className="px-5">
          <Categories />
        </div>

        <div>
          <SectionTitle>Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        <div className="flex">
          {" "}
          <PromoBanner
            src="/banner-home-02.png"
            alt="Até 55% de desconto em mouses!"
            className="lg:w-1/2"
          />
          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 20% de desconto em fones!"
            className="hidden lg:block lg:w-1/2"
          />
        </div>

        <div>
          <SectionTitle>Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <div>
          <PromoBanner
            src="/banner-home-03.png"
            alt="Até 20% de desconto em fones!"
            className="lg:hidden"
          />
          <PromoBanner
            src="/banner-fretegrátis.png"
            alt="Frete grátis em todo o site!"
            className="hidden lg:mx-auto lg:block lg:w-full"
          />
        </div>

        <div>
          <SectionTitle>Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </div>
  );
}
