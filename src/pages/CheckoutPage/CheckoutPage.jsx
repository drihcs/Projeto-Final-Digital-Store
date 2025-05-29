import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const [carrinho, setCarrinho] = useState([]);
  const [formData, setFormData] = useState({
    nome: '', cpf: '', email: '', celular: '',
    endereco: '', bairro: '', cidade: '', cep: '', complemento: '',
    forma_pagamento: 'cartao',
    nome_cartao: '', numero_cartao: '', validade: '', cvv: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    carregarCarrinho();
  }, []);

  async function carregarCarrinho() {
    const { data: carrinhoRaw } = await supabase.from('carrinho').select('*');
    const ids = carrinhoRaw.map(item => item.produto_id);
    const { data: produtos } = await supabase.from('produtos').select('*').in('id', ids);

    const carrinhoCompleto = carrinhoRaw.map(item => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return { ...item, produto };
    });
    setCarrinho(carrinhoCompleto);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: userSession } = await supabase.auth.getSession();
    const user = userSession?.session?.user;
    if (!user) return alert("Usuário não autenticado");

    const enderecoCompleto = `${formData.endereco}, ${formData.bairro}, ${formData.cidade}, ${formData.cep}, ${formData.complemento}`;
    const subtotal = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
    const desconto = 30;
    const frete = 0;
    const total = subtotal - desconto + frete;

    // 1. Inserir na tabela compras
    const { data: compra, error: compraErro } = await supabase.from('compras').insert([
      {
        usuario_id: user.id,
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        telefone: formData.celular,
        endereco_entrega: enderecoCompleto,
        forma_pagamento: formData.forma_pagamento,
        total
      }
    ]).select().single();

    if (compraErro) {
      console.error(compraErro);
      return alert("Erro ao salvar compra");
    }

    // 2. Inserir produtos comprados
    const produtosCompra = carrinho.map(item => ({
      compra_id: compra.id,
      produto_id: item.produto.id,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco
    }));

    const { error: erroItens } = await supabase.from('compras_produtos').insert(produtosCompra);
    if (erroItens) {
      console.error(erroItens);
      return alert("Erro ao salvar itens da compra");
    }

    // 3. Limpar carrinho
    await supabase.from('carrinho').delete().eq('usuario_id', user.id);

    // 4. Redirecionar para sucesso
    navigate('/sucesso');
  }

  const subtotal = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
  const desconto = 30;
  const frete = 0;
  const total = subtotal - desconto + frete;

  return (
    <>
      <Header />
      <main className="checkout-wrapper">
        <form className="formulario-checkout" onSubmit={handleSubmit}>
          <h2>Finalizar Compra</h2>

          <fieldset>
            <legend>Informações Pessoais</legend>
            <input name="nome" placeholder="Nome Completo *" required onChange={handleChange} />
            <input name="cpf" placeholder="CPF *" required onChange={handleChange} />
            <input name="email" placeholder="E-mail *" required onChange={handleChange} />
            <input name="celular" placeholder="Celular *" required onChange={handleChange} />
          </fieldset>

          <fieldset>
            <legend>Informações de Entrega</legend>
            <input name="endereco" placeholder="Endereço *" required onChange={handleChange} />
            <input name="bairro" placeholder="Bairro *" required onChange={handleChange} />
            <input name="cidade" placeholder="Cidade *" required onChange={handleChange} />
            <input name="cep" placeholder="CEP *" required onChange={handleChange} />
            <input name="complemento" placeholder="Complemento" onChange={handleChange} />
          </fieldset>

          <fieldset>
            <legend>Informações de Pagamento</legend>
            <div className="forma-pagamento">
              <label>
                <input type="radio" name="forma_pagamento" value="cartao" checked={formData.forma_pagamento === 'cartao'} onChange={handleChange} />
                Cartão de Crédito
              </label>
              <label>
                <input type="radio" name="forma_pagamento" value="boleto" checked={formData.forma_pagamento === 'boleto'} onChange={handleChange} />
                Boleto Bancário
              </label>
            </div>

            <input name="nome_cartao" placeholder="Nome no Cartão" onChange={handleChange} />
            <div className="linha-cartao">
              <input name="numero_cartao" placeholder="Número do Cartão" onChange={handleChange} />
              <input name="validade" placeholder="Validade" onChange={handleChange} />
            </div>
            <input name="cvv" placeholder="CVV" onChange={handleChange} />
          </fieldset>

          <div className="resumo-mobile">
            <h3>Total</h3>
            <strong>R$ {total.toFixed(2)}</strong>
            <button className="btn-finalizar" type="submit">Realizar Pagamento</button>
          </div>
        </form>

        <aside className="resumo-checkout">
          <h3>RESUMO</h3>
          {carrinho.map(item => (
            <div key={item.id} className="produto-resumo">
              <img src={item.produto.imagem_url} alt={item.produto.nome} />
              <p>{item.produto.nome}</p>
            </div>
          ))}
          <p><span>Subtotal:</span><span>R$ {subtotal.toFixed(2)}</span></p>
          <p><span>Frete:</span><span>R$ {frete.toFixed(2)}</span></p>
          <p><span>Desconto:</span><span>R$ {desconto.toFixed(2)}</span></p>
          <p className="resumo-total"><strong>Total:</strong><strong>R$ {total.toFixed(2)}</strong></p>
          <p className="parcelado">ou 10x de R$ {(total / 10).toFixed(2)} sem juros</p>
          <button className="btn-finalizar" type="submit" onClick={handleSubmit}>
            Realizar Pagamento
          </button>
        </aside>
      </main>
      <Footer />
    </>
  );
}
