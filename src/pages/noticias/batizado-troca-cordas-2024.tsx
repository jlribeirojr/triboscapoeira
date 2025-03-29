import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/News.module.css";

export default function BatizadoTrocaCordas() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <>
      <Head>
        <title>Batizado e Troca de Cordas 2024 - Tribos Capoeira</title>
        <meta name="description" content="Nosso evento anual de Batizado e Troca de Cordas ocorreu em dezembro, e foi um sucesso." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        {/* Header */}
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
          <div className={`container ${styles.navbar}`}>
            <div className={styles.logo}>
              <Link href="/" title="Voltar para a página inicial">
                <div className={styles.logoImageWrapper}>
                  <Image
                    src="/logo-tribos.png" 
                    alt="Tribos Capoeira Logo" 
                    width={80} 
                    height={80} 
                    priority
                    className={styles.logoImage}
                  />
                </div>
              </Link>
            </div>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
            <ul className={`${styles.navLinks} ${menuActive ? styles.active : ''}`}>
              <li><Link href="/#quem-somos" onClick={() => setMenuActive(false)}>Quem Somos</Link></li>
              <li><Link href="/#noticias" onClick={() => setMenuActive(false)}>Notícias</Link></li>
              <li><Link href="/#galeria" onClick={() => setMenuActive(false)}>Galeria</Link></li>
              <li><Link href="/#contato" onClick={() => setMenuActive(false)}>Contato</Link></li>
            </ul>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.newsContainer}>
            <div className={styles.newsHeader}>
              <h1 className={styles.newsTitle}>Batizado e Troca de Cordas 2024</h1>
              <div className={styles.newsDate}>15 de Março de 2024</div>
              <div className={styles.newsBreadcrumb}>
                <Link href="/">Home</Link> / <Link href="/#noticias">Notícias</Link> / <span>Batizado e Troca de Cordas 2024</span>
              </div>
            </div>
            
            <div className={styles.newsFeaturedImage}>
              <Image 
                src="/trocacordas.jpeg" 
                alt="Evento de Batizado e Troca de Cordas 2024" 
                width={1200} 
                height={600}
                className={styles.newsImage}
              />
            </div>
            
            <div className={styles.newsContent}>
              <p>Nosso evento anual de Batizado e Troca de Cordas aconteceu em dezembro e foi um grande sucesso! Gostaríamos de agradecer a todos que participaram e contribuíram para tornar este evento incrível e inesquecível.</p>
              
              <h2>Um momento especial</h2>
              <p>O Batizado é um dos momentos mais importantes na vida de um capoeirista, representando sua iniciação oficial no mundo da capoeira. Já a Troca de Cordas simboliza a evolução e o progresso técnico do praticante na arte.</p>
              
              <p>Durante o evento, tivemos a honra de contar com a presença de mestres renomados de diferentes grupos de capoeira, que compartilharam seu conhecimento e experiência com nossos alunos e convidados.</p>
              
              <h2>Destaques do evento</h2>
              <ul>
                <li>Cerimônia de Batizado para novos alunos</li>
                <li>Troca de Cordas para alunos que avançaram de graduação</li>
                <li>Rodas de capoeira com mestres convidados</li>
                <li>Apresentações culturais</li>
                <li>Workshop de movimentos avançados</li>
                <li>Confraternização entre todos os participantes</li>
              </ul>
              
              <p>Este evento não apenas celebra a evolução técnica dos praticantes, mas também reforça os laços de amizade, respeito e união que são fundamentais na capoeira.</p>
              
              <h2>Agradecimentos</h2>
              <p>Agradecemos a todos os alunos, familiares, mestres convidados e à comunidade em geral pelo apoio e participação. Um agradecimento especial aos patrocinadores e voluntários que tornaram este evento possível.</p>
              
              <p>Estamos ansiosos para continuar este trabalho de preservação e difusão da capoeira como arte, cultura e filosofia de vida.</p>
              
              <div className={styles.newsGallery}>
                <h3>Galeria de Fotos</h3>
                <div className={styles.newsGalleryGrid}>
                  <div className={styles.galleryItem}>
                    <Image src="/tribos.jpeg" alt="Roda de Capoeira" width={300} height={200} />
                  </div>
                  <div className={styles.galleryItem}>
                    <Image src="/tribos2.jpeg" alt="Batizado" width={300} height={200} />
                  </div>
                  <div className={styles.galleryItem}>
                    <Image src="/mestres.jpeg" alt="Mestres" width={300} height={200} />
                  </div>
                </div>
              </div>
              
              <div className={styles.newsShare}>
                <p>Compartilhe:</p>
                <div className={styles.socialLinks}>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagram}`}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
              
              <div className={styles.newsUnidades}>
                <h3>Nossas Unidades:</h3>
                <div className={styles.unidadesLinks}>
                  <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> @tribos_capoeiraoficial
                  </a>
                  <a href="https://www.instagram.com/triboscapoeirarj/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> @triboscapoeirarj
                  </a>
                  <a href="https://www.instagram.com/triboscapoeirapara/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> @triboscapoeirapara
                  </a>
                  <a href="https://www.instagram.com/triboscapoeira_dourados/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> @triboscapoeira_dourados
                  </a>
                  <a href="https://www.instagram.com/tribos_capoeira_ao/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i> @tribos_capoeira_ao
                  </a>
                </div>
              </div>
              
              <div className={styles.newsNav}>
                <div className={styles.newsNavPrev}>
                  <Link href="/noticias/workshop-mestres">
                    <span className={styles.newsNavLabel}>Notícia Anterior</span>
                    <span className={styles.newsNavTitle}>Workshop com Mestres</span>
                  </Link>
                </div>
                <div className={styles.newsNavHome}>
                  <Link href="/#noticias">
                    <span className={styles.newsNavHomeIcon}>•••</span>
                  </Link>
                </div>
                <div className={styles.newsNavNext}>
                  {/* Este é o mais recente, então não há próxima notícia */}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerContent}>
              <div className={styles.footerColumn}>
                <h3 className={styles.footerTitle}>Tribos Capoeira</h3>
                <p>Arte, cultura e tradição brasileira em um grupo comprometido com a preservação e difusão da capoeira.</p>
              </div>
              <div className={styles.footerColumn}>
                <h3 className={styles.footerTitle}>Links Rápidos</h3>
                <ul className={styles.footerLinks}>
                  <li><Link href="/#quem-somos">Quem Somos</Link></li>
                  <li><Link href="/#noticias">Notícias</Link></li>
                  <li><Link href="/#galeria">Galeria</Link></li>
                  <li><Link href="/#contato">Contato</Link></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h3 className={styles.footerTitle}>Redes Sociais</h3>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagram}`}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.copyright}>
              &copy; {new Date().getFullYear()} Tribos Capoeira. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 