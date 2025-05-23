import './UserRegister.css';

export function UserCad() {
    return (
        <div className="container">
            <div className="criar-conta">
                <h3>Criar Conta</h3>
            </div>
            <form className="form-container1">
                <div className="title-pessoal">
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
            </form>

            <form className="form-container2">
                <div className="title-entrega">
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
                        <input type="text" id="complemento" placeholder="Insira complemento" required />
                    </div>
                </div>
            </form>

            <div className="container-checkbox">
                <input className="custon-checkbox" type="checkbox" />
                <p className="paragraph">
                    Quero receber por email ofertas e novidades das lojas da Digital Store. A frequência de envios pode <br />
                    variar de acordo com a interação do cliente.
                </p>
            </div>

            <button>Criar Conta</button>
        </div>
    );
}