import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProdutoDetalhes() {
  return (
    <>
      <Header />
      <main className="p-4">
        <h1 className="text-xl font-bold">Nome do Produto</h1>
        {/* Imagem, descrição, preço, botão adicionar ao carrinho */}
      </main>
      <Footer />
    </>
  );
}
