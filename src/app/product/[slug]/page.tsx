import { prismaClient } from "@/lib/prisma";
import ProductImagesProps from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/app/(home)/components/product-list";

interface ProductDetailsPageProps {
  params: { slug: string };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container">
      <div className="lg: flex flex-col gap-8 pb-8 lg:mt-10 lg:grid lg:grid-cols-2 ">
        <div className=" lg:mt-1 lg:rounded-md lg:bg-accent">
          <ProductImagesProps
            name={product.name}
            imageUrls={product.imageUrls}
          />
        </div>
        <div className="lg:mt-1  lg:rounded-md lg:bg-accent lg:px-4">
          <ProductInfo product={computeProductTotalPrice(product)} />
        </div>
      </div>
      <h1 className="-mb-4 ml-4 text-base font-bold uppercase">
        Produtos Recomendados
      </h1>
      <ProductList products={product.category.products} />
    </div>
  );
};

export default ProductDetailsPage;
