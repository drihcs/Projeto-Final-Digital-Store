import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: '',
    pagamento: 'boleto'
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;
    if (!user) {
      alert('Você precisa estar logado para finalizar a compra.');
      return;
    }

    const { data: itensCarrinho } = await supabase
      .from('carrinho')
      .select('*')
      .eq('usuario_id', user.id);

    if (!itensCarrinho || itensCarrinho.length === 0) {
      alert('Seu carrinho está vazio.');
      return;
    }

    const produtoIds = itensCarrinho.map(i => i.produto_id);
    const { data: produtos } = await supabase
      .from('produtos')
      .select('*')
      .in('id', produtoIds);

    const total = itensCarrinho.reduce((acc, item) => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return acc + (produto?.preco || 0) * item.quantidade;
    }, 0);

    const { data: novaCompra, error } = await supabase.from('compras').insert([
      {
        usuario_id: user.id,
        nome: form.nome,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
        endereco_entrega: form.endereco,
        forma_pagamento: form.pagamento,
        total,
        status: 'pago' // ✅ status incluído
      }
    ]).select().single();

    if (error || !novaCompra) {
      console.error(error);
      alert('Erro ao salvar a compra.');
      return;
    }

    // Vincula os produtos na tabela compras_produtos
    const itens = itensCarrinho.map(item => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return {
        compra_id: novaCompra.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: produto?.preco || 0
      };
    });

    await supabase.from('compras_produtos').insert(itens);

    // Esvazia o carrinho
    await supabase.from('carrinho').delete().eq('usuario_id', user.id);

    navigate('/sucesso');
  }

  return (
    <>
      <Header />
      <main className="checkout-wrapper">
        <h1>Finalizar Compra</h1>
        <form className="formulario" onSubmit={handleSubmit}>
          <section>
            <h2>Informações Pessoais</h2>
            <input name="nome" placeholder="Nome completo" required onChange={handleChange} />
            <input name="email" placeholder="E-mail" type="email" required onChange={handleChange} />
            <input name="cpf" placeholder="CPF" required onChange={handleChange} />
            <input name="telefone" placeholder="Telefone" required onChange={handleChange} />
          </section>

          <section>
            <h2>Entrega</h2>
            <textarea name="endereco" placeholder="Endereço completo" required onChange={handleChange}></textarea>
          </section>

          <section>
            <h2>Pagamento</h2>
            <select name="pagamento" onChange={handleChange} value={form.pagamento}>
              <option value="boleto">Boleto Bancário</option>
              <option value="cartao">Cartão de Crédito</option>
              <option value="pix">Pix</option>
              <option value="debito">Cartão de Débito</option>
            </select>
          </section>

          <button className="btn-finalizar" type="submit">Realizar Pagamento</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
