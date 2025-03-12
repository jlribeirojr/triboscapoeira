import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        <title>Tribos Capoeira - Grupo de Capoeira</title>
        <meta name="description" content="Site oficial do grupo Tribos Capoeira. Conheça nossa história, eventos, galeria de fotos e entre em contato." />
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
              <li><a href="#quem-somos" onClick={() => setMenuActive(false)}>Quem Somos</a></li>
              <li><a href="#noticias" onClick={() => setMenuActive(false)}>Notícias</a></li>
              <li><a href="#galeria" onClick={() => setMenuActive(false)}>Galeria</a></li>
              <li><a href="#contato" onClick={() => setMenuActive(false)}>Contato</a></li>
            </ul>
          </div>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroLogo}>
              <Image
                src="/logopng.png"
                alt="Tribos Capoeira Logo"
                width={500}
                height={250}
                className={styles.heroLogoImage}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            {/* <h1 className={styles.heroTitle}>Tribos Capoeira</h1> */}
            <p className={styles.heroSubtitle}>"Nosso jogo, nossa história, nossa tribo"</p>
            <div className={styles.heroButtons}>
              <a href="#quem-somos" className={styles.heroButton}>Conheça-nos</a>
              <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer" className={styles.heroButtonSecondary}>
                <i className="fab fa-instagram"></i> Siga-nos
              </a>
            </div>
          </div>
          <div className={styles.heroOverlay}></div>
        </section>

        <main className={styles.main}>
          {/* Quem Somos */}
          <section id="quem-somos" className={`${styles.about} section`}>
            <div className="container">
              <h2 className="section-title">Quem Somos</h2>
              <div className={styles.aboutContent}>
                <div className={styles.aboutText}>
                  <p>O Grupo Tribos Capoeira foi fundado com o objetivo de preservar e difundir a arte da capoeira, mantendo viva a tradição e cultura brasileira. Nossa missão é promover a inclusão social através da capoeira, desenvolvendo valores como respeito, disciplina e trabalho em equipe.</p>
                  <p>Sob a liderança do Mestrando Tyson, nosso grupo tem se destacado em eventos nacionais e internacionais, levando a arte da capoeira para diversas comunidades e formando novos talentos.</p>
                  <p>Oferecemos aulas para todas as idades e níveis, desde iniciantes até avançados, em um ambiente acolhedor e respeitoso, onde todos podem aprender e crescer juntos.</p>
                </div>
                <div className={styles.aboutImage}>
                  <Image src="/mestrandotyson.jpeg" alt="Mestrando Tyson" width={500} height={400} />
                </div>
              </div>
            </div>
          </section>

          {/* Notícias */}
          <section id="noticias" className={`${styles.news} section`}>
            <div className="container">
              <h2 className="section-title">Notícias</h2>
              <div className={styles.newsGrid}>
                <div className={styles.newsCard}>
                  <Image src="/tribos2.jpeg" alt="Evento de Batizado" className={styles.newsImage} width={400} height={200} />
                  <div className={styles.newsContent}>
                    <div className={styles.newsDate}>15 de Março de 2024</div>
                    <h3 className={styles.newsTitle}>Batizado e Troca de Cordas 2024</h3>
                    <p className={styles.newsExcerpt}>Nosso evento anual de Batizado e Troca de Cordas acontecerá nos dias 20 e 21 de Abril. Contaremos com a presença de mestres renomados e muitas atividades.</p>
                    <a href="#" className={styles.newsLink}>Leia mais</a>
                  </div>
                </div>
                <div className={styles.newsCard}>
                  <Image src="/mestres.jpeg" alt="Workshop de Capoeira" className={styles.newsImage} width={400} height={200} />
                  <div className={styles.newsContent}>
                    <div className={styles.newsDate}>10 de Fevereiro de 2024</div>
                    <h3 className={styles.newsTitle}>Workshop Internacional</h3>
                    <p className={styles.newsExcerpt}>Workshop com mestres internacionais foi um sucesso! Agradecemos a todos que participaram e contribuíram para este evento incrível.</p>
                    <a href="#" className={styles.newsLink}>Leia mais</a>
                  </div>
                </div>
                <div className={styles.newsCard}>
                  <Image src="/triboskids.jpeg" alt="Capoeira Kids" className={styles.newsImage} width={400} height={200} />
                  <div className={styles.newsContent}>
                    <div className={styles.newsDate}>5 de Janeiro de 2024</div>
                    <h3 className={styles.newsTitle}>Novas Turmas de Capoeira Kids</h3>
                    <p className={styles.newsExcerpt}>Estamos com novas turmas de Capoeira Kids para crianças de 4 a 12 anos. Traga seu filho para conhecer os benefícios da capoeira!</p>
                    <a href="#" className={styles.newsLink}>Leia mais</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Galeria */}
          <section id="galeria" className={`${styles.gallery} section`}>
            <div className="container">
              <h2 className="section-title">Galeria</h2>
              <div className={styles.galleryGrid}>
                <div className={styles.galleryItem}>
                  <Image src="/tribos.jpeg" alt="Roda de Capoeira" className={styles.galleryImage} width={300} height={250} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>+</span>
                  </div>
                </div>
                <div className={styles.galleryItem}>
                  <Image src="/tribos2.jpeg" alt="Apresentação" className={styles.galleryImage} width={300} height={250} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>+</span>
                  </div>
                </div>
                <div className={styles.galleryItem}>
                  <Image src="/mestrandotyson.jpeg" alt="Mestrando Tyson" className={styles.galleryImage} width={300} height={250} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>+</span>
                  </div>
                </div>
                <div className={styles.galleryItem}>
                  <Image src="/mestres.jpeg" alt="Mestres" className={styles.galleryImage} width={300} height={250} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>+</span>
                  </div>
                </div>
                <div className={styles.galleryItem}>
                  <Image src="/triboskids.jpeg" alt="Capoeira Kids" className={styles.galleryImage} width={300} height={250} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>+</span>
                  </div>
                </div>
                <div className={styles.galleryItem}>
                  <Image src="/tribos.jpeg" alt="Evento" className={styles.galleryImage} width={300} height={250} />
                  <div className={styles.galleryOverlay}>
                    <span className={styles.galleryIcon}>+</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Instagram */}
          <section className={`${styles.instagram} section`}>
            <div className="container">
              <h2 className="section-title">Siga-nos no Instagram</h2>
              <div className={styles.instagramContent}>
                <div className={styles.instagramIcon}>
                  <i className="fab fa-instagram"></i>
                </div>
                <h3 className={styles.instagramHandle}>@tribos_capoeiraoficial</h3>
                <p className={styles.instagramText}>Acompanhe nosso dia a dia, eventos e novidades!</p>
                <a 
                  href="https://www.instagram.com/tribos_capoeiraoficial/" 
              target="_blank"
              rel="noopener noreferrer"
                  className={styles.instagramButton}
            >
                  Seguir
            </a>
          </div>
            </div>
          </section>

          {/* Contato */}
          <section id="contato" className={`${styles.contact} section`}>
            <div className="container">
              <h2 className="section-title">Contato</h2>
              <div className={styles.contactContent}>
                <div className={styles.contactInfo}>
                  <div className={styles.contactInfoItem}>
                    <span className={styles.contactIcon}><i className="fas fa-map-marker-alt"></i></span>
                    <div>
                      <h3>Endereço</h3>
                      <p>Rua da Capoeira, 123 - Centro</p>
                      <p>São Paulo - SP, 01234-567</p>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <span className={styles.contactIcon}><i className="fas fa-phone-alt"></i></span>
                    <div>
                      <h3>Telefone</h3>
                      <p>(11) 98765-4321</p>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <span className={styles.contactIcon}><i className="fas fa-envelope"></i></span>
                    <div>
                      <h3>E-mail</h3>
                      <p>contato@triboscapoeira.com.br</p>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <span className={styles.contactIcon}><i className="fas fa-clock"></i></span>
                    <div>
                      <h3>Horário de Funcionamento</h3>
                      <p>Segunda a Sexta: 9h às 21h</p>
                      <p>Sábado: 9h às 14h</p>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <span className={styles.contactIcon}><i className="fab fa-instagram"></i></span>
                    <div>
                      <h3>Instagram</h3>
                      <p><a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer">@tribos_capoeiraoficial</a></p>
                    </div>
                  </div>
                </div>
                <div className={styles.contactForm}>
                  <form>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>Nome</label>
                      <input type="text" id="name" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>E-mail</label>
                      <input type="email" id="email" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="subject" className={styles.formLabel}>Assunto</label>
                      <input type="text" id="subject" className={styles.formInput} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="message" className={styles.formLabel}>Mensagem</label>
                      <textarea id="message" className={styles.formTextarea} required></textarea>
                    </div>
                    <button type="submit" className={styles.formButton}>Enviar Mensagem</button>
                  </form>
                </div>
              </div>
            </div>
          </section>
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
                  <li><a href="#quem-somos">Quem Somos</a></li>
                  <li><a href="#noticias">Notícias</a></li>
                  <li><a href="#galeria">Galeria</a></li>
                  <li><a href="#contato">Contato</a></li>
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
