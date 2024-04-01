import BillBoard from "@/components/navbar/billboard";
import Container from "@/components/navbar/container";
import Productlist from "@/components/product/productlist";

const HomePage = async () => {
  // const products = await getProduct();
  const products = [
    {
      id: "1",
      name: "Deluxe Room",
      price: 100.0,
      category: "Premium",
      isArchived: false,
      createdAt: "2024-04-01T08:00:00.000Z",
      bookings: [],
      images: [
        {
          id: "1",
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1117210179713518752/original/18fe28a4-77d0-4ad1-acc7-0928e5b311e5.jpeg?im_w=720",
          createdAt: "2024-04-01T08:00:00.000Z",
        },
        {
          id: "2",
          url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1117210179713518752/original/c4f81f01-c543-4660-9bdd-953d29d1b116.jpeg?im_w=1200",
          createdAt: "2024-04-01T08:00:00.000Z",
        },
      ],
    },
  ];

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillBoard />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <Productlist title="Exclusive Rooms" items={products}></Productlist>
      </div>
    </Container>
  );
};

export default HomePage;
