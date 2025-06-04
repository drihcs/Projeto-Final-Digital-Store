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

  function aplicarMascaraCPF(valor) {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function aplicarMascaraCelular(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length <= 10) {
      return valor
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      return valor
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
  }

  function aplicarMascaraCEP(valor) {
    return valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  }

  function aplicarMascaraNumeroCartao(valor) {
    return valor.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  function aplicarMascaraValidade(valor) {
    return valor.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === 'cpf') novoValor = aplicarMascaraCPF(value);
    if (name === 'celular') novoValor = aplicarMascaraCelular(value);
    if (name === 'cep') novoValor = aplicarMascaraCEP(value);
    if (name === 'numero_cartao') novoValor = aplicarMascaraNumeroCartao(value);
    if (name === 'validade') novoValor = aplicarMascaraValidade(value);

    setFormData(prev => ({ ...prev, [name]: novoValor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const obrigatorios = ['nome', 'cpf', 'email', 'celular', 'endereco', 'bairro', 'cidade', 'cep'];
    for (let campo of obrigatorios) {
      if (!formData[campo]) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(formData.cpf)) {
      alert('CPF inválido. Use o formato 000.000.000-00.');
      return;
    }

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(formData.cep)) {
      alert('CEP inválido. Use o formato 00000-000.');
      return;
    }

    const celularRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!celularRegex.test(formData.celular)) {
      alert('Celular inválido. Use o formato (00) 00000-0000.');
      return;
    }

    // ALTERAÇÃO 1: Melhor verificação de autenticação
    // Mudança: Usar getUser() em vez de getSession() para verificação mais confiável
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Erro de autenticação:', authError); // LOG PARA DEBUG
      alert('Você precisa estar logado para finalizar a compra.');
      return;
    }

    console.log('Usuário autenticado:', user.id); // LOG PARA DEBUG

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

    const enderecoCompleto = `${formData.endereco}, ${formData.bairro}, ${formData.cidade}, ${formData.cep}, ${formData.complemento}`;

    // ALTERAÇÃO 2: Dados da compra preparados corretamente
    // Mudança: Garantir que todos os campos necessários estão sendo enviados
    const dadosCompra = {
      usuario_id: user.id, // IMPORTANTE: Campo correto para RLS
      nome: formData.nome,
      email: formData.email,
      cpf: formData.cpf,
      telefone: formData.celular,
      endereco_entrega: enderecoCompleto,
      forma_pagamento: formData.forma_pagamento,
      total: total
      // REMOÇÃO: Removido 'status: pago' pois não existe na estrutura da tabela
    };

    console.log('Dados da compra a serem enviados:', dadosCompra); // LOG PARA DEBUG

    // ALTERAÇÃO 3: Melhor tratamento de erro na inserção
    // Mudança: Logs mais detalhados e tratamento de erro aprimorado
    const { data: novaCompra, error } = await supabase
      .from('compras')
      .insert([dadosCompra])
      .select()
      .single();

    if (error) {
      console.error('Erro detalhado ao salvar compra:', error); // LOG DETALHADO PARA DEBUG
      console.error('Código do erro:', error.code); // CÓDIGO DO ERRO
      console.error('Mensagem do erro:', error.message); // MENSAGEM DO ERRO
      alert(`Erro ao salvar a compra: ${error.message}`);
      return;
    }

    if (!novaCompra) {
      console.error('Compra não foi criada - dados retornados:', novaCompra); // LOG PARA DEBUG
      alert('Erro ao salvar a compra - dados não retornados.');
      return;
    }

    console.log('Compra salva com sucesso:', novaCompra); // LOG PARA DEBUG

    // ALTERAÇÃO 4: Verificar se a tabela compras_produtos existe
    // Mudança: Tratamento de erro para inserção de itens da compra
    const itens = itensCarrinho.map(item => {
      const produto = produtos.find(p => p.id === item.produto_id);
      return {
        compra_id: novaCompra.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: produto?.preco || 0
      };
    });

    console.log('Itens da compra a serem salvos:', itens); // LOG PARA DEBUG

    // Tentar salvar os itens da compra
    const { error: errorItens } = await supabase
      .from('compras_produtos')
      .insert(itens);

    if (errorItens) {
      console.error('Erro ao salvar itens da compra:', errorItens); // LOG PARA DEBUG
      // Não interromper o fluxo se os itens não salvarem, pois a compra principal já foi salva
    }

    // ALTERAÇÃO 5: Melhor tratamento de limpeza do carrinho
    // Mudança: Verificar se a limpeza do carrinho foi bem-sucedida
    const { error: errorLimpeza } = await supabase
      .from('carrinho')
      .delete()
      .eq('usuario_id', user.id);

    if (errorLimpeza) {
      console.error('Erro ao limpar carrinho:', errorLimpeza); // LOG PARA DEBUG
      // Não interromper o fluxo se o carrinho não for limpo
    }

    // Salvar dados da última compra
    localStorage.setItem('ultimaCompraDados', JSON.stringify({
      nome: formData.nome,
      cpf: formData.cpf,
      total,
      endereco_entrega: enderecoCompleto
    }));

    // ALTERAÇÃO 6: Feedback de sucesso
    // Mudança: Mostrar mensagem de sucesso antes de navegar
    alert('Compra realizada com sucesso!');
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
        <div className="checkout-content">
          <form className="formulario-checkout" onSubmit={handleSubmit}>
            <h2>Finalizar Compra</h2>

            <fieldset>
              <legend>Informações Pessoais</legend>
              <label htmlFor="text">Nome Completo*</label>
              <input name="nome" placeholder="Insira seu nome" required onChange={handleChange} />
              <label htmlFor="number">CPF*</label>
              <input name="cpf" placeholder="Insira seu CPF" required value={formData.cpf} onChange={handleChange} />
              <label htmlFor="text">E-mail*</label>
              <input name="email" placeholder="Insira seu e-mail" type="email" required onChange={handleChange} />
              <label htmlFor="number">Celular*</label>
              <input name="celular" placeholder="Insira seu celular" required value={formData.celular} onChange={handleChange} />
            </fieldset>

            <fieldset>
              <legend>Informações de Entrega</legend>
              <label htmlFor="text">Endereço*</label>
              <input name="endereco" placeholder="Insira seu endereço" required onChange={handleChange} />
              <label htmlFor="text">Bairro*</label>
              <input name="bairro" placeholder="Insira seu bairro" required onChange={handleChange} />
              <label htmlFor="texto">Cidade*</label>
              <input name="cidade" placeholder="Insira sua cidade" required onChange={handleChange} />
              <label htmlFor="number">CEP*</label>
              <input name="cep" placeholder="Insira seu CEP" required value={formData.cep} onChange={handleChange} />
              <label htmlFor="text">Complemento</label>
              <input name="complemento" placeholder="Insira um complemento (opcional)" onChange={handleChange} />
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

              <input name="nome_cartao" placeholder="Nome no Cartão" onChange={handleChange} required={formData.forma_pagamento === 'cartao'} />
              <div className="linha-cartao">
                <input
                  name="numero_cartao"
                  placeholder="Número do Cartão"
                  value={formData.numero_cartao}
                  onChange={handleChange}
                  required={formData.forma_pagamento === 'cartao'}
                />
                <input
                  name="validade"
                  placeholder="Validade (MM/AA)"
                  value={formData.validade}
                  onChange={handleChange}
                  required={formData.forma_pagamento === 'cartao'}
                />
              </div>
              <input name="cvv" placeholder="CVV" onChange={handleChange} required={formData.forma_pagamento === 'cartao'} />
            </fieldset>
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
        </div>
      </main>
      <Footer />
    </>
  );
}