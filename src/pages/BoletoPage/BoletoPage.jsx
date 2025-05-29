import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Boleto() {
  return (
    <>
      <Header />
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Boleto da Compra</h2>
        {/* Aqui virá o visual fake estilizado do boleto */}
        <div className="border p-4 bg-white shadow rounded">
          <p><strong>Loja:</strong> Digital Store</p>
          <p><strong>Valor:</strong> R$ 219,00</p>
          <p><strong>Vencimento:</strong> 10 dias úteis</p>
          <p><strong>Linha digitável:</strong> 00190.00009 01234.567894 12345.678901 1 12340000021900</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
