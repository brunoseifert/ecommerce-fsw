import { prismaClient } from "@/lib/prisma";
import ProductImagesProps from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

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
  });

  if (!product) {
    return null;
  }

  return (
    <div>
      <ProductImagesProps name={product.name} imageUrls={product.imageUrls} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  );
};

export default ProductDetailsPage;
