import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Checkout() {
  return (
    <>
      <Header />
      <main className="p-4">
        <h2 className="text-xl font-semibold mb-4">Finalizar Compra</h2>
        {/* Formulário de dados pessoais, entrega e pagamento */}
        <button className="btn btn-primary mt-4">Realizar Pagamento</button>
      </main>
      <Footer />
    </>
  );
}
