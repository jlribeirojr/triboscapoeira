import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "@/styles/News.module.css";

export default function WorkshopMestres() {
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
        <title>Workshop com Mestres - Tribos Capoeira</title>
        <meta name="description" content="Workshop com mestres Nacionais e Internacionais foi um sucesso! Conheça mais sobre este evento incrível." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        {/* Header */}
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
          <div className={`container ${styles.navbar}`}>
            <div className={styles.logo}>
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
              <h1 className={styles.newsTitle}>Workshop com Mestres Nacionais e Internacionais</h1>
              <div className={styles.newsDate}>10 de Fevereiro de 2024</div>
              <div className={styles.newsBreadcrumb}>
                <Link href="/">Home</Link> / <Link href="/#noticias">Notícias</Link> / <span>Workshop com Mestres</span>
              </div>
            </div>
            
            <div className={styles.newsFeaturedImage}>
              <Image 
                src="/mestres.jpeg" 
                alt="Workshop com Mestres" 
                width={1200} 
                height={600}
                className={styles.newsImage}
              />
            </div>
            
            <div className={styles.newsContent}>
              <p>Nos dias 8 e 9 de fevereiro, tivemos a honra de receber em nossa academia mestres de capoeira nacionais e internacionais para um workshop especial. O evento foi um verdadeiro sucesso, reunindo praticantes de diferentes níveis e idades, proporcionando uma experiência única de aprendizado e troca cultural.</p>
              
              <h2>Mestres Convidados</h2>
              <p>Contamos com a presença de mestres renomados, incluindo:</p>
              <ul>
                <li>Mestre João - Bahia</li>
                <li>Mestre Carlos - Rio de Janeiro</li>
                <li>Mestre Pierre - França</li>
                <li>Mestre Michael - Estados Unidos</li>
              </ul>
              
              <p>Cada mestre trouxe sua própria experiência e estilo, enriquecendo o workshop com diferentes perspectivas e técnicas da capoeira.</p>
              
              <h2>Atividades Realizadas</h2>
              <p>Durante os dois dias de evento, foram realizadas diversas atividades:</p>
              <ul>
                <li>Treinamento técnico de movimentos básicos e avançados</li>
                <li>Workshops sobre a história e fundamentos da capoeira</li>
                <li>Treino específico de musicalidade e instrumentos</li>
                <li>Rodas de capoeira com participação de todos os presentes</li>
                <li>Palestras sobre a importância cultural da capoeira no mundo</li>
              </ul>
              
              <h2>Intercâmbio Cultural</h2>
              <p>Um dos aspectos mais enriquecedores do workshop foi o intercâmbio cultural promovido. Os mestres internacionais compartilharam como a capoeira é praticada em seus países, os desafios encontrados e as adaptações necessárias para preservar a essência desta arte brasileira em diferentes contextos culturais.</p>
              
              <p>Por outro lado, os mestres brasileiros reafirmaram a importância de manter as raízes e tradições da capoeira, garantindo que sua essência não se perca com o tempo ou com a internacionalização.</p>
              
              <h2>Agradecimento</h2>
              <p>Agradecemos a todos os participantes, especialmente aos mestres que se disponibilizaram a compartilhar seu conhecimento. Eventos como este são fundamentais para fortalecer nossa comunidade e manter viva a tradição da capoeira.</p>
              
              <p>Fiquem atentos às nossas redes sociais para informações sobre os próximos eventos e workshops!</p>
              
              <div className={styles.newsGallery}>
                <h3>Galeria de Fotos</h3>
                <div className={styles.newsGalleryGrid}>
                  <div className={styles.galleryItem}>
                    <Image src="/tribos.jpeg" alt="Workshop" width={300} height={200} />
                  </div>
                  <div className={styles.galleryItem}>
                    <Image src="/tribos2.jpeg" alt="Roda de Capoeira" width={300} height={200} />
                  </div>
                  <div className={styles.galleryItem}>
                    <Image src="/mestrandotyson.jpeg" alt="Mestrando" width={300} height={200} />
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
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className={styles.socialIcon}>
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
              
              <div className={styles.newsNav}>
                <div className={styles.newsNavPrev}>
                  {/* Esta é a notícia mais antiga, então não há notícia anterior */}
                </div>
                <div className={styles.newsNavHome}>
                  <Link href="/#noticias">
                    <span className={styles.newsNavHomeIcon}>•••</span>
                  </Link>
                </div>
                <div className={styles.newsNavNext}>
                  <Link href="/noticias/batizado-troca-cordas-2024">
                    <span className={styles.newsNavLabel}>Próxima Notícia</span>
                    <span className={styles.newsNavTitle}>Batizado e Troca de Cordas 2024</span>
                  </Link>
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