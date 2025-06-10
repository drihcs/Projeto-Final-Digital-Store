import React from "react";
import { Description } from "../../components/Description/Description.jsx";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import Layout from "../Layout/Layout.jsx";

export function ProductViewPage() {
  return (
    <>
      <Layout>
        <Description />
        <ProductCard quantidadeProdutos={4} />
      </Layout>
    </>
  );
}
