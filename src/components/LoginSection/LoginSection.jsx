import './LoginSection.css'
import Gmail from '../../assets/gmail.png'
import Face from '../../assets/face.png'

import Login1 from '../../../public/login1.png'
import Login2 from '../../../public/login2.png'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

export function SectionLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError("Email ou senha inválidos")
            return
        }

        // ✅ Redireciona para rota protegida
        navigate("/pedidos/meus-pedidos")
    }

    return (
        <section className='section-login'>
            <div className='forms-content'>
                <form className="form" onSubmit={handleLogin}>
                    <h1>Acesse sua conta</h1>
                    <p>Novo cliente? Então registre-se <a href="/register">aqui</a>.</p>

                    <label htmlFor="login">Login*</label>
                    <input
                        type="text"
                        id="login"
                        name="login"
                        placeholder="Insira seu login ou email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Senha*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Insira sua senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <a href="/forgot-password" className="forgot-password">Esqueci minha senha</a>

                    <button type="submit">Acessar a Conta</button>

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                    <div className='login-rede-sociais'>
                        <span>Ou faça login com</span>
                        <img src={Gmail} className='sapatos-login' alt="Gmail Icon" />
                        <img src={Face} className='sapatos-login' alt="Facebook Icon" />
                    </div>
                </form>
            </div>

            <div className='image-sapatos'>
                <img src={Login1} className='sapatos-login1' alt="sapatos" />
                <img src={Login2} className='sapatos-login2' alt="sapatos" />
            </div>
        </section>
    )
}
