import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import styles from '@/styles/Home.module.css';
import newsStyles from '@/styles/News.module.css';

// Interface para os dados de notícias
interface NewsData {
  title: string;
  date: string;
  image: string;
  content: string;
}

export default function Comemoracao3Anos() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [news, setNews] = useState<NewsData>({
    title: 'Comemoração de 3 anos da Tribos Capoeira',
    date: '15 de Abril de 2024',
    image: 'https://imgix.cosmicjs.com/702a1e70-18ae-11f0-adcb-894bf25a5bd9-WhatsApp-Image-2025-04-12-at-12-43-29.jpeg',
    content: `No último sábado, celebramos com muita alegria o terceiro aniversário da Tribos Capoeira! Foi um dia especial repleta de energia, música, camaradagem e demonstrações da nossa arte.\nO evento contou com a presença de alunos de todas as unidades da Tribos Capoeira, além de convidados especiais e amigos que vieram prestigiar nossa comemoração. A roda de capoeira teve a participação de Mestre Canhoto, Mestrando Bandola, Contramestre Paulo Quebrado, Professor Fininho, Professor Careca, Instrutor Bruce e muitos convidados. A roda foi conduzida pelo Mestrando Tyson, fundador da Tribos, que compartilhou palavras inspiradoras sobre a jornada dos últimos três anos.\nDestaques do evento:\nApresentação de todos os alunos, desde as crianças até os adultos mais graduados\nDemonstração de movimentos e sequências especiais\nRoda de capoeira animada com participação de todos os presentes\nDiscurso emocionante do Mestrando Tyson sobre a trajetória da Tribos Capoeira\nConfraternização com comidas típicas e bolo de aniversário\n\"Três anos se passaram desde que iniciamos esse projeto com o sonho de difundir a capoeira e formar não apenas capoeiristas, mas cidadãos. Hoje vemos o fruto desse trabalho em cada aluno, em cada conquista, em cada sorriso. A Tribos Capoeira é mais que um grupo, é uma família\", declarou Mestrando Tyson durante o evento.\nAgradecemos a todos que fizeram parte dessa história até aqui e que continuam acreditando e apoiando nosso trabalho. Que venham muitos mais anos de axé, ginga e camaradagem!`
  });
  const [loading, setLoading] = useState(true);

  // Efeito para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Simular carregamento de dados do CMS
  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>{news.title} | Tribos Capoeira</title>
        <meta name="description" content="Celebração de 3 anos da Tribos Capoeira com roda, apresentações e confraternização." />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content="Celebração de 3 anos da Tribos Capoeira com roda, apresentações e confraternização." />
        <meta property="og:image" content={news.image} />
      </Head>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.navbar}`}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoImageWrapper}>
              <Image
                src="/logo-tribos.png"
                alt="Tribos Capoeira Logo"
                width={80}
                height={80}
                priority
                className={styles.logoImage}
              />
            </Link>
          </div>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <nav>
            <ul className={`${styles.navLinks} ${menuActive ? styles.active : ""}`}>
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/#quem-somos">Quem Somos</Link>
              </li>
              <li>
                <Link href="/#noticias">Notícias</Link>
              </li>
              <li>
                <Link href="/#galeria">Galeria</Link>
              </li>
              <li>
                <Link href="/#contato">Contato</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className={newsStyles.main}>
        <div className={newsStyles.newsContainer} style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: 24 }}>
          <div className={newsStyles.newsHeader} style={{ textAlign: 'center' }}>
            <h1 className={newsStyles.newsTitle} style={{ marginBottom: 8 }}>{news.title || 'Título da Notícia'}</h1>
            <p className={newsStyles.newsDate} style={{ color: '#888', marginBottom: 24 }}>{news.date || '15 de Abril de 2024'}</p>
          </div>
          <div className={newsStyles.newsFeaturedImage} style={{ width: '100%', height: 'auto', position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
            <Image
              src={news.image}
              alt={news.title}
              width={800}
              height={400}
              style={{ objectFit: 'cover', borderRadius: 12, width: '100%', height: 'auto', maxHeight: 500 }}
            />
          </div>
          <div className={newsStyles.newsContent} style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            {news.content.split('\n').map((par, idx) => {
              if (par.startsWith('Destaques do evento:')) {
                return (
                  <div key={idx} style={{ margin: '32px 0 16px 0' }}>
                    <h2 style={{ color: '#d35400', fontSize: '1.2rem', marginBottom: 12 }}>Destaques do evento:</h2>
                    <ul style={{ paddingLeft: 24, marginBottom: 0 }}>
                      <li>Apresentação de todos os alunos, desde as crianças até os adultos mais graduados</li>
                      <li>Demonstração de movimentos e sequências especiais</li>
                      <li>Roda de capoeira animada com participação de todos os presentes</li>
                      <li>Discurso emocionante do Mestrando Tyson sobre a trajetória da Tribos Capoeira</li>
                      <li>Confraternização com comidas típicas e bolo de aniversário</li>
                    </ul>
                  </div>
                );
              }
              return <p key={idx} style={{ marginBottom: 18 }}>{par}</p>;
            })}
          </div>
          {/* Nossas Unidades Instagram */}
          <div style={{ background: '#fafafa', borderRadius: 12, padding: '24px 16px', margin: '40px 0 0 0', borderLeft: '5px solid #e74c3c' }}>
            <div style={{ fontWeight: 700, color: '#e74c3c', fontSize: '1.3rem', marginBottom: 16 }}>Nossas Unidades:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <a href="https://instagram.com/tribos_capoeiraoficial" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@tribos_capoeiraoficial
              </a>
              <a href="https://instagram.com/triboscapoeirarj" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@triboscapoeirarj
              </a>
              <a href="https://instagram.com/triboscapoeirapa" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@triboscapoeirapa
              </a>
              <a href="https://instagram.com/tribos_capoeira_dourados" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@tribos_capoeira_dourados
              </a>
              <a href="https://instagram.com/tribos_capoeira_ao" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@tribos_capoeira_ao
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0 0 0' }}>
            <a href="/" className={styles.instagramButton} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '12px 32px', borderRadius: 24 }}>
              Voltar à página principal
            </a>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>Links Rápidos</h3>
              <ul>
                <li><Link href="/">Início</Link></li>
                <li><Link href="/#quem-somos">Quem Somos</Link></li>
                <li><Link href="/#noticias">Notícias</Link></li>
                <li><Link href="/#galeria">Galeria</Link></li>
                <li><Link href="/#contato">Contato</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>Redes Sociais</h3>
              <div className={styles.socialLinks}>
                <a href="https://facebook.com/triboscapoeira" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com/tribos_capoeiraoficial" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} Tribos Capoeira. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 