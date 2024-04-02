import BillBoard from "@/components/navbar/billboard";
import Container from "@/components/navbar/container";
import Productlist from "@/components/product/productlist";
import { db } from "@/lib/db";

const HomePage = async () => {
  
  const products = await db.product.findMany({});

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillBoard />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <Productlist title="Exclusive Rooms" items={products}></Productlist>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
