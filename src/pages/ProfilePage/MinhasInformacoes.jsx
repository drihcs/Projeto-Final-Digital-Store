import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import './MinhasInformacoes.css'

export default function MinhasInformacoes() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Usuário não autenticado");
        setLoading(false);
        return;
      }

      // Busca os dados na tabela "usuarios" pelo ID do usuário autenticado
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erro ao buscar dados do usuário:", error.message);
      } else {
        setUserData(data);
      }

      setLoading(false);
    }

    fetchUserData();
  }, []);

  if (loading) return <p>Carregando informações...</p>;

  if (!userData) return <p>Não foi possível carregar seus dados.</p>;

  return (
    <div className="info-container">
      <h2 className="info-title">Minhas Informações</h2>
      <h2 className="info-personal">Informações Pessoais</h2>
      <p><strong>Nome:</strong> {userData.nome}</p>
      <p><strong>CPF:</strong> {userData.cpf}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Celular:</strong> {userData.celular || "Não informado"}</p>
      <h2 className="info-delivery">Informações de Entrega</h2>
      <p><strong>Endereço:</strong> {userData.endereco}</p>
      <p><strong>Bairro:</strong> {userData.bairro}</p>
      <p><strong>Cidade:</strong> {userData.cidade}</p>
      <p><strong>CEP:</strong> {userData.cep}</p>
      <p><strong>Complemento:</strong> {userData.complemento || "Não informado"}</p>
    </div>
  );
}
