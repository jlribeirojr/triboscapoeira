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
    content: ''
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
        <div className={newsStyles.newsContainer}>
          <div className={newsStyles.newsBreadcrumb}>
            <Link href="/">Início</Link> &gt; <Link href="/#news">Notícias</Link> &gt; {news.title}
          </div>

          <div className={newsStyles.newsHeader}>
            <h1 className={newsStyles.newsTitle}>{news.title || 'Título da Notícia'}</h1>
            <p className={newsStyles.newsDate}>{news.date || '15 de Abril de 2024'}</p>
          </div>

          <div className={newsStyles.newsFeaturedImage}>
            <Image
              src={news.image || '/tribos.jpeg'}
              alt={news.title}
              width={1200}
              height={675}
              className={newsStyles.featuredImage}
              priority
            />
          </div>

          <div className={newsStyles.newsContent}>
            <p>
              No último sábado, celebramos com muita alegria o terceiro aniversário da Tribos Capoeira! Foi uma noite especial repleta de energia, música, camaradagem e demonstrações da nossa arte.
            </p>

            <p>
              O evento contou com a presença de alunos de todas as unidades da Tribos Capoeira, além de convidados especiais e amigos que vieram prestigiar nossa comemoração. A roda de capoeira foi conduzida pelo Mestre John, fundador da Tribos, que compartilhou palavras inspiradoras sobre a jornada dos últimos três anos.
            </p>

            <h2>Destaques do evento:</h2>
            <ul>
              <li>Apresentação de todos os alunos, desde as crianças até os adultos mais graduados</li>
              <li>Demonstração de movimentos e sequências especiais</li>
              <li>Roda de capoeira animada com participação de todos os presentes</li>
              <li>Discurso emocionante do Mestre John sobre a trajetória da Tribos Capoeira</li>
              <li>Confraternização com comidas típicas e bolo de aniversário</li>
            </ul>

            <p>
              "Três anos se passaram desde que iniciamos esse projeto com o sonho de difundir a capoeira e formar não apenas capoeiristas, mas cidadãos. Hoje vemos o fruto desse trabalho em cada aluno, em cada conquista, em cada sorriso. A Tribos Capoeira é mais que um grupo, é uma família", declarou Mestre John durante o evento.
            </p>

            <p>
              Agradecemos a todos que fizeram parte dessa história até aqui e que continuam acreditando e apoiando nosso trabalho. Que venham muitos mais anos de axé, ginga e camaradagem!
            </p>
          </div>

          <div className={newsStyles.newsShare}>
            <p>Compartilhe:</p>
            <div className={newsStyles.socialLinks}>
              <Link href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://triboscapoeira.com/noticias/comemoracao-3-anos')}`} className={`${newsStyles.socialIcon}`} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </Link>
              <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://triboscapoeira.com/noticias/comemoracao-3-anos')}&text=${encodeURIComponent(news.title)}`} className={`${newsStyles.socialIcon}`} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </Link>
              <Link href={`https://www.instagram.com/triboscapoeira`} className={`${newsStyles.socialIcon} ${newsStyles.instagram}`} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </Link>
              <Link href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${news.title} - https://triboscapoeira.com/noticias/comemoracao-3-anos`)}`} className={`${newsStyles.socialIcon}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </Link>
            </div>
          </div>

          <div className={newsStyles.newsUnidades}>
            <h3>Nossas Unidades no Instagram</h3>
            <div className={newsStyles.unidadesLinks}>
              <Link href="https://www.instagram.com/triboscapoeira.matriz" target="_blank" rel="noopener noreferrer">
                <i><FaInstagram /></i>
                <span>@triboscapoeira.matriz</span>
              </Link>
              <Link href="https://www.instagram.com/triboscapoeira.kids" target="_blank" rel="noopener noreferrer">
                <i><FaInstagram /></i>
                <span>@triboscapoeira.kids</span>
              </Link>
              <Link href="https://www.instagram.com/triboscapoeira.zona2" target="_blank" rel="noopener noreferrer">
                <i><FaInstagram /></i>
                <span>@triboscapoeira.zona2</span>
              </Link>
            </div>
          </div>

          <div className={newsStyles.newsNav}>
            <div className={newsStyles.newsNavPrev}>
              <Link href="/noticias/workshop-mestres">
                <span className={newsStyles.newsNavLabel}><FaArrowLeft /> Anterior</span>
                <span className={newsStyles.newsNavTitle}>Workshop Internacional com Mestres</span>
              </Link>
            </div>
            <div className={newsStyles.newsNavHome}>
              <Link href="/#news">
                <FaHome className={newsStyles.newsNavHomeIcon} />
                <span>Voltar para Notícias</span>
              </Link>
            </div>
            <div className={newsStyles.newsNavNext}>
              <Link href="/noticias/batizado-troca-cordas-2024">
                <span className={newsStyles.newsNavLabel}>Próximo <FaArrowRight /></span>
                <span className={newsStyles.newsNavTitle}>Batizado e Troca de Cordas 2024</span>
              </Link>
            </div>
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