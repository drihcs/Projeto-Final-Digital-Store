import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

export default function Confirmacao() {
  return (
    <>
      <Header />
      <main className="p-4 text-center">
        <h2 className="text-xl font-bold text-green-600">Compra Realizada com Sucesso!</h2>
        <p>Resumo da compra, dados pessoais e do pagamento.</p>
        <Link to="/boleto" className="text-blue-600 underline">Imprimir Boleto</Link>
        <br />
        <Link to="/" className="btn btn-warning mt-4">Voltar para Home</Link>
      </main>
      <Footer />
    </>
  );
}
