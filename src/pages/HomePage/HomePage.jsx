import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { CardSection } from "../../components/CardSection/CardSection.jsx";
import { Section } from "../../components/Category/Category.jsx";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import { OfertSection } from "../../components/SpecialOffer/SpecialOffer.jsx";
import Layout from "../Layout/Layout.jsx";

export function HomePage() {
  return (
    <>
      <Layout>
        <Carousel />
        <CardSection />
        <Section />
        <ProductCard />
        <OfertSection />
      </Layout>
    </>
  );
}
