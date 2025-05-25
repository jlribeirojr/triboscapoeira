import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';

export default function NoticiasIndex() {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.page}>
      <Head>
        <title>Notícias | Tribos Capoeira</title>
        <meta name="description" content="Veja todas as notícias do Grupo Tribos Capoeira." />
      </Head>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
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
          <ul className={`${styles.navLinks} ${menuActive ? styles.active : ''}`}>
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
      <main className={styles.main}>
        <section className={`${styles.news} section`}>
          <div className="container">
            <h2 className="section-title">Notícias</h2>
            <div className={styles.newsGrid}>
              {/* Card 1 - Comemoração de 3 anos */}
              <Link href="/noticias/comemoracao-3-anos" className={styles.newsCardLink}>
                <div className={styles.newsCard}>
                  <div className={styles.newsImageContainer}>
                    <Image
                      src="https://imgix.cosmicjs.com/702a1e70-18ae-11f0-adcb-894bf25a5bd9-WhatsApp-Image-2025-04-12-at-12-43-29.jpeg"
                      alt="Comemoração de 3 anos da Tribos Capoeira"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.newsImage}
                    />
                  </div>
                  <div className={styles.newsContent}>
                    <h3>Comemoração de 3 anos da Tribos Capoeira</h3>
                    <p>No último sábado, celebramos com muita alegria o terceiro aniversário da Tribos Capoeira! Foi um dia especial repleta de energia, música, camaradagem e demonstrações da nossa arte.</p>
                    <span className={styles.btnLeiaMais}>LEIA MAIS</span>
                  </div>
                </div>
              </Link>
              {/* Card 2 - Workshop Internacional */}
              <Link href="/noticias/workshop-mestres" className={styles.newsCardLink}>
                <div className={styles.newsCard}>
                  <div className={styles.newsImageContainer}>
                    <Image
                      src="/mestres.jpeg"
                      alt="Workshop Internacional com Mestres"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className={styles.newsImage}
                      style={{ objectFit: 'contain', objectPosition: 'center', background: '#fff' }}
                    />
                  </div>
                  <div className={styles.newsContent}>
                    <h3>Workshop Internacional com Mestres</h3>
                    <p>Nos dias 15 e 16 de maio, o Grupo Tribos Capoeira realizará um workshop internacional com a presença de mestres renomados da capoeira. Uma oportunidade única para aprender com os melhores!</p>
                    <span className={styles.btnLeiaMais}>LEIA MAIS</span>
                  </div>
                </div>
              </Link>
              {/* Card 3 - Batizado e Troca de Cordas */}
              <Link href="/noticias/batizado-troca-cordas-2024" className={styles.newsCardLink}>
                <div className={styles.newsCard}>
                  <div className={styles.newsImageContainer}>
                    <Image
                      src="/trocacordas.jpeg"
                      alt="Batizado e Troca de Cordas 2024"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.newsImage}
                    />
                  </div>
                  <div className={styles.newsContent}>
                    <h3>Batizado e Troca de Cordas 2024</h3>
                    <p>Venha participar do nosso evento anual de Batizado e Troca de Cordas que acontecerá em Julho de 2024. Este é um momento especial para todos os alunos e membros do grupo Tribos Capoeira.</p>
                    <span className={styles.btnLeiaMais}>LEIA MAIS</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 