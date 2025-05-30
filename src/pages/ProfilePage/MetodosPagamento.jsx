import "./MetodosPagamento.css";
import boleto from '../../assets/invoice.svg'
import credit from '../../assets/credit-card.svg'
import pix from '../../assets/pix-logo.svg'

export default function MetodosPagamentoPage() {
  return (
    <>
      <main className="pagamento-wrapper">
        <h1>Métodos de Pagamento</h1>
        <section className="pagamento-opcoes">
          <div className="opcao">
            <img src={boleto} alt="Boleto Bancário" />
            <h2>Boleto Bancário</h2>
            <p>Pague em qualquer banco ou aplicativo até o vencimento.</p>
          </div>

          <div className="opcao">
            <img src={credit} alt="Cartão de Crédito" />
            <h2>Cartão de Crédito</h2>
            <p>Parcele suas compras em até 10x sem juros.</p>
          </div>

          <div className="opcao">
            <img src={pix} alt="Pix" />
            <h2>Pix</h2>
            <p>Transferência instantânea, 24h por dia, todos os dias.</p>
          </div>
        </section>
      </main>
    </>
  );
}
