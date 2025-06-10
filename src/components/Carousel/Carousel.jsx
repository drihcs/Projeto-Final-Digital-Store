import { Link } from "react-router-dom";
import "./Carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ButtonSee } from "../Buttons/Button";
import "swiper/css";
import "swiper/css/pagination";
import TenisSlide from '../../../public/White-Sneakers.png';
import TenisSlide2 from '../../../public/Yellow-Sneakers.png';
import TenisSlide3 from '../../../public/Purple-Sneakers.png';
import TenisSlide4 from '../../../public/Blue-Sneakers.png';
import Ornament from '../../assets/Ornament.png'



const slides = [
  {
    title: "Melhores Ofertas Personalizadas",
    subtitle: "Queima de Estoque Nike 🔥",
    description:
      "Tênis Nike com até 30% OFF só hoje! Corra que a promoção está imperdível!",
    image: TenisSlide,
  },
  {
    title: "Melhores Ofertas Personalizadas",
    subtitle: "Promoção de Estoque Zero ⚡",
    description:
      "Aproveite a liquidação: Nike em promoção com preços especiais para zerar o nosso estoque!",
    image: TenisSlide2,
  },
  {
    title: "Melhores Ofertas Personalizadas",
    subtitle: "Os Melhores Descontos 🎾",
    description:
      "Últimos pares de Nike em oferta! Corra antes que acabe e garanta seu tênis com superdesconto.",
    image: TenisSlide3,
  },
  {
    title: "Melhores Ofertas Personalizadas",
    subtitle: "Garanta já o seu Tênis 🛹",
    description:
      "Descontos arrasadores em tênis Nike! Só esta semana, ofertas especiais direto do nosso estoque.",
    image: TenisSlide4,
  },
];

export function Carousel() {
  return (
    <Swiper
      loop
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      spaceBetween={30}
      modules={[Pagination, Autoplay]}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          <div className="slide-group">
            <div className="info-slide">
              <h5>{slide.title}</h5>
              <h1>{slide.subtitle}</h1>
              <p className="text-responsive">{slide.description}</p>
              <Link to="/products">
                <ButtonSee />
              </Link>
            </div>
            <img
              src={slide.image}
              className="slide-image float-animation"
              alt={`Slide ${index + 1}`}
            />
            <img src={Ornament}
              className="ornament" alt="Ornamento" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
