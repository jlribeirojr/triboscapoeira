import React, { useState, useEffect } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import newsStyles from "@/styles/News.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";

// Interface para os dados de notícias
interface NewsData {
  title: string;
  date: string;
  image: string;
  content: string;
}

export default function WorkshopMestres() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Efeito para simular carregamento de dados de um CMS
  useEffect(() => {
    // Simular carregamento de dados de um CMS
    setTimeout(() => {
      setNews({
        title: "Workshop com Mestres 2024",
        date: "15 e 16 de Maio de 2024",
        image: "/mestres.jpeg",
        content: "Workshop com Mestres internacionais do Grupo Tribos Capoeira, uma oportunidade única para aprender com mestres experientes.",
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Workshop com Mestres 2024 | Tribos Capoeira</title>
        <meta name="description" content="Workshop com Mestres Internacionais do Grupo Tribos Capoeira, realizado em Maio de 2024." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
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

        {/* Conteúdo da Notícia */}
        <main className={newsStyles.main}>
          <div className={newsStyles.newsContainer}>
            {/* Conteúdo da notícia mantido igual */}
            <section className={newsStyles.newsSection}>
              <div className={newsStyles.newsBreadcrumb}>
                <Link href="/">Início</Link> &gt; <Link href="/noticias">Notícias</Link> &gt; Workshop com Mestres 2024
              </div>
              <h1 className={newsStyles.newsTitle}>Workshop com Mestres 2024</h1>
              <div className={newsStyles.newsDate}>Publicado em: 10 de Abril de 2024</div>
              
              <div className={newsStyles.newsFeaturedImage}>
                <Image
                  src="/mestres_touro.jpeg"
                  alt="Workshop com Mestres 2024"
                  className={newsStyles.featuredImage}
                  width={1000}
                  height={500}
                  priority
                  style={{ objectFit: 'contain', width: '100%', height: 'auto', background: '#fff' }}
                />
              </div>
              
              <div className={newsStyles.newsContent}>
                <p>
                  O Grupo Tribos Capoeira tem o prazer de anunciar o Workshop com Mestres 2024, um evento único que reunirá grandes mestres da capoeira para compartilhar conhecimentos, técnicas e a rica história dessa arte-luta brasileira.
                </p>
                <p>
                  O workshop acontecerá nos dias 15 e 16 de junho em nossa sede principal, com a participação especial dos Mestres Canhoto, Pepeu e Pernilongo, três das maiores referências da capoeira contemporânea.
                </p>
                <h2>Programação</h2>
                <p><strong>Dia 15 (Sábado):</strong></p>
                <ul>
                  <li>9h - 11h: Workshop com Mestre Canhoto - Fundamentos e movimentos básicos</li>
                  <li>11h - 13h: Workshop com Mestrando Tyson - Sequências e combinações</li>
                  <li>15h - 17h: Workshop com Contramestre Paulo Quebrado - Musicalidade e ritmos</li>
                  <li>19h: Roda de capoeira com todos os mestres</li>
                </ul>
                <p><strong>Dia 16 (Domingo):</strong></p>
                <ul>
                  <li>9h - 11h: Palestra sobre a história da capoeira</li>
                  <li>11h - 13h: Mesa redonda com perguntas e respostas</li>
                  <li>15h: Roda de encerramento</li>
                </ul>
                <p>
                  Este workshop é aberto para todos os níveis, desde iniciantes até capoeiristas avançados. É uma oportunidade única de aprender com mestres que dedicaram suas vidas à arte da capoeira.
                </p>
                <p>
                  As inscrições estão abertas e as vagas são limitadas. Entre em contato conosco para garantir sua participação neste evento especial.
                </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                <a href="/" className={styles.instagramButton} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}>
                  Voltar à página principal
                </a>
              </div>
              
              <div className={newsStyles.newsUnidades}>
                <h3>Nossas Unidades:</h3>
                <div className={newsStyles.unidadesLinks}>
                  <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer">
                    <i><FaInstagram /></i> @tribos_capoeiraoficial
                  </a>
                  <a href="https://www.instagram.com/triboscapoeirarj/" target="_blank" rel="noopener noreferrer">
                    <i><FaInstagram /></i> @triboscapoeirarj
                  </a>
                  <a href="https://www.instagram.com/triboscapoeirapa/" target="_blank" rel="noopener noreferrer">
                    <i><FaInstagram /></i> @triboscapoeirapa
                  </a>
                  <a href="https://www.instagram.com/triboscapoeira_dourados/" target="_blank" rel="noopener noreferrer">
                    <i><FaInstagram /></i> @triboscapoeira_dourados
                  </a>
                  <a href="https://www.instagram.com/tribos_capoeira_ao/" target="_blank" rel="noopener noreferrer">
                    <i><FaInstagram /></i> @tribos_capoeira_ao
                  </a>
                </div>
              </div>
            </section>
            
            {/* Navegação entre notícias */}
            <div className={newsStyles.newsNav}>
              <div className={newsStyles.newsNavPrev}>
                <a href="/noticias/encontro-internacional">
                  <span className={newsStyles.newsNavLabel}>Notícia Anterior</span>
                  <span className={newsStyles.newsNavTitle}>Encontro Internacional de Capoeira</span>
                </a>
              </div>
              <div className={newsStyles.newsNavHome}>
                <a href="/noticias">
                  <span className={newsStyles.newsNavHomeIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </span>
                  <span>Todas as Notícias</span>
                </a>
              </div>
              <div className={newsStyles.newsNavNext}>
                <a href="/noticias/batizado-troca-cordas-2024">
                  <span className={newsStyles.newsNavLabel}>Próxima Notícia</span>
                  <span className={newsStyles.newsNavTitle}>Batizado e Troca de Cordas 2024</span>
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
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
              <p>&copy; 2024 Tribos Capoeira. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 