import './UserRegister.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';

export function UserCad() {
    const navigate = useNavigate();

    async function handleCreateUser(e) {
        e.preventDefault();

        const nome = document.getElementById('name').value;
        const cpf = document.getElementById('number').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const cep = document.getElementById('cep').value;
        const complemento = document.getElementById('complemento').value;

        const { error } = await supabase.from('usuarios').insert([
            { nome, cpf, email, celular, endereco, bairro, cidade, cep, complemento }
        ]);

        if (error) {
            alert('Erro ao criar conta: ' + error.message);
        } else {

            navigate('/pedidos');
        }
    }

    return (
        <div className="container">
            <div className="criar-conta">
                <h3>Criar Conta</h3>
            </div>

            <form onSubmit={handleCreateUser}>
                <div className="form-card-pessoal"> <div className="title-pessoal">
                    <p>Informações Pessoais</p>
                </div>
                    <div className="form-input-label1">
                        <span className="linha"></span>
                        <div className="input-group">
                            <label htmlFor="name">Nome Completo*</label>
                            <input type="text" id="name" placeholder="Insira seu nome" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="number">CPF*</label>
                            <input type="text" id="number" placeholder="Insira seu CPF" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">E-mail*</label>
                            <input type="text" id="email" placeholder="Insira seu email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="celular">Celular*</label>
                            <input type="text" id="celular" placeholder="Insira seu celular" />
                        </div>
                    </div>
                </div> <div className="form-card-entrega"> <div className="title-entrega">
                    <p>Informações de Entrega</p>
                </div>
                    <div className="form-input-label2">
                        <span className="linha"></span>
                        <div className="input-group">
                            <label htmlFor="endereco">Endereço*</label>
                            <input type="text" id="endereco" placeholder="Insira seu endereço" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="bairro">Bairro*</label>
                            <input type="text" id="bairro" placeholder="Insira seu bairro" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="cidade">Cidade*</label>
                            <input type="text" id="cidade" placeholder="Insira sua cidade" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="cep">CEP*</label>
                            <input type="text" id="cep" placeholder="Insira seu CEP" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="complemento">Complemento</label>
                            <input type="text" id="complemento" placeholder="Insira complemento" />
                        </div>
                    </div>
                </div> <div className="container-checkbox">
                    <input className="custon-checkbox" type="checkbox" />
                    <p className="paragraph">
                        Quero receber por email ofertas e novidades das lojas da Digital Store.
                    </p>
                </div>

                <button onClick={handleCreateUser}>Criar Conta</button>
            </form>
        </div>
    );
}
