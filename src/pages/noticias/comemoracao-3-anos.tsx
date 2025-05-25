import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import styles from '@/styles/Home.module.css';
import newsStyles from '@/styles/News.module.css';
import { getFirstNewsData } from '@/services/cosmicService';

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
  const [news, setNews] = useState<NewsData | null>(null);
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

  // Buscar dados do Cosmic CMS
  useEffect(() => {
    async function fetchNews() {
      const data = await getFirstNewsData();
      setNews({
        title: data.titulo || 'Comemoração de 3 anos da Tribos Capoeira',
        date: '15 de Abril de 2024', // Se quiser, pode buscar uma data dinâmica do CMS
        image: data.imagem,
        content: data.descricao,
      });
      setLoading(false);
    }
    fetchNews();
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  if (loading || !news) {
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
            <Link href="/" className={styles.logoTitleLink} style={{ textDecoration: 'none', marginLeft: 10 }}>
              <span className={styles.logoTitleText}>
                <span className={styles.logoTitleWhite}>Tribos&nbsp;</span>
                <span className={styles.logoTitleOrange}>Capoeira</span>
              </span>
            </Link>
          </div>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </button>
          <ul className={`${styles.navLinks} ${menuActive ? styles.active : ""}`}> 
            <li>
              <Link href="/#quem-somos" onClick={() => setMenuActive(false)}>
                Quem Somos
              </Link>
            </li>
            <li>
              <Link href="/noticias" onClick={() => setMenuActive(false)}>
                Notícias
              </Link>
            </li>
            <li>
              <Link href="/#galeria" onClick={() => setMenuActive(false)}>
                Galeria
              </Link>
            </li>
            <li>
              <Link href="/#contato" onClick={() => setMenuActive(false)}>
                Contato
              </Link>
            </li>
          </ul>
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
              <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@tribos_capoeiraoficial
              </a>
              <a href="https://www.instagram.com/triboscapoeirarj/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@triboscapoeirarj
              </a>
              <a href="https://www.instagram.com/triboscapoeirapa/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@triboscapoeirapa
              </a>
              <a href="https://www.instagram.com/triboscapoeira_dourados/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <i className="fab fa-instagram" style={{ marginRight: 8 }}></i>@triboscapoeira_dourados
              </a>
              <a href="https://www.instagram.com/tribos_capoeira_ao/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 24, padding: '8px 20px', fontWeight: 500, color: '#222', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
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