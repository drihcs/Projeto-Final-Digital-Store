import "./Footer.css";
import vectorImage from "../../assets/logo-footer.svg";
import FacebookIcon from "../../assets/facebook.svg";
import InstagramIcon from "../../assets/instagram.svg";
import TwitterIcon from "../../assets/twitter.svg";

const informacoes = [
  {
    titulo: "Informação",
    itens: [
      "Sobre Drip Store",
      "Segurança",
      "Wishlist",
      "Blog",
      "Trabalhe Conosco",
      "Meus Pedidos",
    ],
  },
  {
    titulo: "Categorias",
    itens: [
      "Camisetas",
      "Calças",
      "Bonés",
      "Headphones",
      "Tênis"
    ],
  },
  {
    titulo: "Contato",
    itens: [
      "Av. Santos Dumont, 1510 - 1", "andar - Aldeota, Fortaleza -",
      "CE, 60150-161.", "",

      "(85) 3051-3411",
    ],
  },
];

export function Footer() {
  return (
    <footer>
      <div className="container-1">
        <div className="container-logo">
          <img className="logo" src={vectorImage} alt="logo" />
        </div>
        <div className="text-container">
          Estilo, inovação e praticidade. A Digital Store conecta você aos produtos mais atuais com qualidade e atendimento de confiança.
        </div>
        <div className="icons-sociais">
          <a href="https://www.facebook.com/digitalcollegebr" target="_blank"><img src={FacebookIcon} alt="facebook" /></a>
          <a href="https://www.instagram.com/digitalcollegebr/" target="_blank"><img src={InstagramIcon} alt="instagram" /></a>
          <a href="https://x.com/eaicollegers" target="_blank"><img src={TwitterIcon} alt="twitter" /></a>
        </div>
      </div>
      <div className="container-2">
        {informacoes.map((info, index) => (
          <div key={index} className="container-info">
            <div className="conteudo">
              <div className="title">
                <span>{info.titulo}</span>
              </div>
              {info.itens.map((item, i) => (
                <a key={i} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>{item}</a>
              ))}

            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="data-footer">
        <span>@ 2025 Digital College</span>
      </div>
    </footer>
  );
}
