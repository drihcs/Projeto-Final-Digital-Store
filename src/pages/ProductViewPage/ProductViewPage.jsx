import React from "react";
import { DescProduct } from "../../components/Description/Description.jsx";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
import Layout from "../Layout/Layout.jsx";

export function ProductViewPage() {
  return (
    <>
      <Layout>
        <DescProduct />
        <ProductCard quantidadeProdutos={4} />
      </Layout>
    </>
  );
}
