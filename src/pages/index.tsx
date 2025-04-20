import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { getConfiguracao, getQuemSomosInfo, getContatoInfo, getGaleriaImages, getFirstNewsData } from "@/services/cosmicService";

// Definindo tipos para os dados do CMS
interface ConfigData {
  metadata?: {
    imagem_fundo?: {
      url?: string;
      imgix_url?: string;
    };
    contato?: any;
    quem_somos?: any;
    nossas_unidades?: any;
    noticias?: any;
  };
}

interface QuemSomosData {
  quem_somos?: string;
}

interface ContatoData {
  telefone?: string;
  email?: string;
  endereco?: string;
}

interface GaleriaItem {
  url?: string;
  imgix_url?: string;
  titulo?: string;
  descricao?: string;
}

export default function Home() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverCard1, setHoverCard1] = useState(false);
  const [hoverCard2, setHoverCard2] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [tituloSelecionado, setTituloSelecionado] = useState<string | null>(null);
  const [indexAtual, setIndexAtual] = useState<number>(-1);
  
  // Estado para dados do CMS com tipos corretos
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [quemSomosData, setQuemSomosData] = useState<QuemSomosData | null>(null);
  const [contatoData, setContatoData] = useState<ContatoData | null>(null);
  const [galeriaImages, setGaleriaImages] = useState<GaleriaItem[]>([]);
  const [firstNewsData, setFirstNewsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fundoUrl, setFundoUrl] = useState<string | null>(null);

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

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Inicializar o windowWidth
    setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Efeito para carregar dados do CMS
  useEffect(() => {
    const loadConfig = async () => {
      setLoading(true);
      try {
        const configData = await getConfiguracao();
        console.log('Dados de configuração recebidos:', configData);
        if (configData && typeof configData === 'object' && 'metadata' in configData) {
          setConfigData(configData as ConfigData);
        }
        
        const contactData = await getContatoInfo();
        if (contactData) {
          setContatoData(contactData);
        }
        
        // Obter especificamente os dados da seção "Quem Somos"
        const quemSomosInfo = await getQuemSomosInfo();
        console.log('Dados de Quem Somos recebidos:', quemSomosInfo);
        if (quemSomosInfo && typeof quemSomosInfo === 'object' && 'quem_somos' in quemSomosInfo) {
          setQuemSomosData(quemSomosInfo as QuemSomosData);
        } else {
          console.error('Dados de Quem Somos não encontrados ou inválidos');
        }
        
        const images = await getGaleriaImages();
        console.log('Imagens da galeria recebidas:', images);
        setGaleriaImages(images);
        
        const newsData = await getFirstNewsData();
        console.log('Dados de notícias recebidos:', newsData);
        setFirstNewsData(newsData);
      } catch (error) {
        console.error('Erro ao carregar dados do CMS:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConfig();
  }, []);

  // Funções para obter a altura da imagem com base na largura da tela
  const getImageHeight = () => {
    if (windowWidth < 576) return '250px';
    if (windowWidth < 768) return '300px';
    return '400px';
  };

  // Função para abrir o modal com a imagem selecionada
  const abrirModal = (src: string, titulo?: string, index?: number) => {
    setImagemSelecionada(src);
    setTituloSelecionado(titulo || null);
    setIndexAtual(index !== undefined ? index : -1);
    // Impedir a rolagem da página quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setImagemSelecionada(null);
    setTituloSelecionado(null);
    setIndexAtual(-1);
    // Reativar a rolagem da página
    document.body.style.overflow = 'auto';
  };

  // Funções para navegar entre as imagens
  const proximaImagem = () => {
    if (indexAtual >= 0 && galeriaImages.length > 0) {
      const novoIndex = (indexAtual + 1) % galeriaImages.length;
      const imagem = galeriaImages[novoIndex];
      setIndexAtual(novoIndex);
      setImagemSelecionada(imagem.imgix_url || imagem.url || '');
      setTituloSelecionado(imagem.titulo || null);
    }
  };

  const imagemAnterior = () => {
    if (indexAtual >= 0 && galeriaImages.length > 0) {
      const novoIndex = (indexAtual - 1 + galeriaImages.length) % galeriaImages.length;
      const imagem = galeriaImages[novoIndex];
      setIndexAtual(novoIndex);
      setImagemSelecionada(imagem.imgix_url || imagem.url || '');
      setTituloSelecionado(imagem.titulo || null);
    }
  };
  
  // Adicionar evento de teclado para navegar e fechar o modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (imagemSelecionada) {
        if (e.key === 'Escape') {
          fecharModal();
        } else if (e.key === 'ArrowRight') {
          proximaImagem();
        } else if (e.key === 'ArrowLeft') {
          imagemAnterior();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imagemSelecionada, indexAtual, galeriaImages]);

  // Renderiza as imagens da galeria do Cosmic ou usa as imagens padrão
  const renderGaleriaItems = () => {
    if (galeriaImages && galeriaImages.length > 0) {
      // Limitar para mostrar apenas as primeiras 6 imagens na página inicial
      return galeriaImages.slice(0, 6).map((item, index) => {
        const imageUrl = item.imgix_url || item.url || '';
        const titulo = item.titulo || `Imagem ${index + 1}`;
        
        return (
          <div className={styles.galleryItem} key={index} onClick={() => abrirModal(imageUrl, titulo, index)}>
            <Image
              src={imageUrl}
              alt={titulo}
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span>{titulo}</span>
            </div>
          </div>
        );
      });
    } else {
      // Fallback para as imagens estáticas se não houver imagens no Cosmic
      return (
        <>
          <div className={styles.galleryItem} onClick={() => abrirModal("/tribos.jpeg", "Grupo Tribos Capoeira em Angola", 0)}>
            <Image
              src="/tribos.jpeg"
              alt="Grupo Tribos Capoeira em Angola"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span>Grupo Tribos Capoeira em Angola</span>
            </div>
          </div>
          <div className={styles.galleryItem} onClick={() => abrirModal("/tribos2.jpeg", "Apresentação de Capoeira do Grupo Tribos", 1)}>
            <Image
              src="/tribos2.jpeg"
              alt="Apresentação de Capoeira do Grupo Tribos"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span>Apresentação de Capoeira do Grupo Tribos</span>
            </div>
          </div>
          <div className={styles.galleryItem} onClick={() => abrirModal("/mestrandotyson.jpeg", "Mestrando Tyson", 2)}>
            <Image
              src="/mestrandotyson.jpeg"
              alt="Mestrando Tyson"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span className={styles.galleryIcon}>+</span>
            </div>
          </div>
          <div className={styles.galleryItem} onClick={() => abrirModal("/graduacao.jpeg", "Cerimônia de Graduação e Entrega de Cordas", 3)}>
            <Image
              src="/graduacao.jpeg"
              alt="Cerimônia de Graduação e Entrega de Cordas"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span>Cerimônia de Graduação e Entrega de Cordas</span>
            </div>
          </div>
          <div className={styles.galleryItem} onClick={() => abrirModal("/triboskids.jpeg", "Tribos Kids - Aula de Capoeira para Crianças", 4)}>
            <Image
              src="/triboskids.jpeg"
              alt="Tribos Kids - Aula de Capoeira para Crianças"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span>Tribos Kids - Aula de Capoeira para Crianças</span>
            </div>
          </div>
          <div className={styles.galleryItem} onClick={() => abrirModal("/evento.jpeg", "Evento de Integração do Grupo Tribos Capoeira", 5)}>
            <Image
              src="/evento.jpeg"
              alt="Evento de Integração do Grupo Tribos Capoeira"
              className={styles.galleryImage}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={100}
            />
            <div className={styles.galleryOverlay}>
              <span>Evento de Integração do Grupo Tribos Capoeira</span>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Tribos Capoeira - Grupo de Capoeira</title>
        <meta
          name="description"
          content="Site oficial do grupo Tribos Capoeira. Conheça nossa história, eventos, galeria de fotos e entre em contato."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.page}>
        {/* Header */}
        <header
          className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        >
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
            <ul
              className={`${styles.navLinks} ${
                menuActive ? styles.active : ""
              }`}
            >
              <li>
                <a href="#quem-somos" onClick={() => setMenuActive(false)}>
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#noticias" onClick={() => setMenuActive(false)}>
                  Notícias
                </a>
              </li>
              <li>
                <a href="#galeria" onClick={() => setMenuActive(false)}>
                  Galeria
                </a>
              </li>
              <li>
                <a href="#contato" onClick={() => setMenuActive(false)}>
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </header>

        {/* Hero Section com imagem dinâmica se disponível */}
        <section 
          className={styles.hero}
          style={fundoUrl ? { 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${fundoUrl})`,
            backgroundPosition: 'center 40%'
          } : {}}
        >
          <div className={styles.heroContent}>
            <div className={styles.heroLogo}>
              <Image
                src="/logopng.png"
                alt="Tribos Capoeira Logo"
                width={500}
                height={250}
                className={styles.heroLogoImage}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            {/* <h1 className={styles.heroTitle}>Tribos Capoeira</h1> */}
            <p className={styles.heroSubtitle}>
              "Nosso jogo, nossa história, nossa tribo"
            </p>
            <div className={styles.heroButtons}>
              <a href="#quem-somos" className={styles.heroButton}>
                Conheça-nos
            </a>
            <a
                href="https://www.instagram.com/tribos_capoeiraoficial/"
              target="_blank"
              rel="noopener noreferrer"
                className={styles.heroButtonSecondary}
            >
                <i className="fab fa-instagram"></i> Siga-nos
            </a>
            </div>
          </div>
          <div className={styles.heroOverlay}></div>
        </section>

        <main className={styles.main}>
          {/* Notícias */}
          <section id="noticias" className={`${styles.news} section`}>
            <div className="container">
              <h2 className="section-title">Notícias</h2>
              <div className={styles.newsGrid}>
                {/* Card 1 - Notícia do CMS */}
                <Link href="/noticias/comemoracao-3-anos" className={styles.newsCardLink}>
                  <div 
                    className={styles.newsCard} 
                    onMouseEnter={() => setHoverCard1(true)}
                    onMouseLeave={() => setHoverCard1(false)}
                  >
                    <div className={styles.newsImageContainer}>
                      <Image
                        src={firstNewsData?.imagem || "/tribos.jpeg"}
                        alt={firstNewsData?.titulo || "Comemoração de 3 anos da Tribos Capoeira"}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{
                          objectFit: 'cover',
                          objectPosition: '50% 35%',
                          transform: hoverCard1 ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.5s ease'
                        }}
                        className={styles.newsImage}
                      />
                    </div>
                    <div className={styles.newsContent}>
                      <h3>{firstNewsData?.titulo || "Comemoração de 3 anos da Tribos Capoeira"}</h3>
                      <p>
                        {firstNewsData?.descricao ? 
                          firstNewsData.descricao.length > 150 ? 
                            `${firstNewsData.descricao.substring(0, 150)}...` : 
                            firstNewsData.descricao
                          : 
                          "No último sábado, o Grupo Tribos Capoeira celebrou com muita alegria e energia seus 3 anos de existência, em uma roda especial repleta de axé, música e movimento..."
                        }
                      </p>
                      <span className={styles.btnLeiaMais}>
                        LEIA MAIS
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Card 2 - Notícia do Workshop Internacional (fixa) */}
                <Link href="/noticias/workshop-mestres" className={styles.newsCardLink}>
                  <div 
                    className={styles.newsCard}
                    onMouseEnter={() => setHoverCard2(true)}
                    onMouseLeave={() => setHoverCard2(false)}
                  >
                    <div className={styles.newsImageContainer}>
                      <Image
                        src="/mestres_touro.jpeg"
                        alt="Workshop Internacional com Mestres"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{
                          objectFit: 'cover',
                          objectPosition: '50% 40%',
                          transform: hoverCard2 ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.5s ease'
                        }}
                        className={styles.newsImage}
                      />
                    </div>
                    <div className={styles.newsContent}>
                      <h3>Workshop Internacional com Mestres</h3>
                      <p>
                        Nos dias 15 e 16 de maio, o Grupo Tribos Capoeira realizará um workshop internacional 
                        com a presença de mestres renomados da capoeira. Uma oportunidade única para aprender 
                        com os melhores!
                      </p>
                      <span className={styles.btnLeiaMais}>
                        LEIA MAIS
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Quem Somos */}
          <section id="quem-somos" className={`${styles.about} section`}>
            <div className="container">
              <h2 className="section-title">Quem Somos</h2>
              <div className={styles.aboutContent}>
                <div className={styles.aboutText}>
                  {quemSomosData?.quem_somos ? (
                    // Usar o dangerouslySetInnerHTML para renderizar as quebras de linha preservando os emojis
                    <div dangerouslySetInnerHTML={{ 
                      __html: quemSomosData.quem_somos
                        .replace(/\n/g, '<br />')
                        .replace(/🎯/g, '<span role="img" aria-label="alvo">🎯</span>')
                        .replace(/👥/g, '<span role="img" aria-label="pessoas">👥</span>')
                        .replace(/✅/g, '<span role="img" aria-label="check">✅</span>')
                        .replace(/💪/g, '<span role="img" aria-label="força">💪</span>')
                    }} />
                  ) : (
                    <p>Carregando informações...</p>
                  )}
                </div>
                <div className={styles.aboutImage}>
                  <Image
                    src="/mestrandotyson.jpeg"
                    alt="Mestrando Tyson - Fundador do Grupo Tribos Capoeira"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Galeria */}
          <section id="galeria" className={`${styles.gallery} section`}>
            <div className="container">
              <h2 className="section-title">Galeria</h2>
              <div className={styles.galleryGrid}>
                {renderGaleriaItems()}
              </div>
              <div className={styles.verMais}>
                <Link href="/galeria" className={styles.btnVerMais}>
                  VER GALERIA COMPLETA
                </Link>
              </div>
            </div>
          </section>

          {/* Instagram */}
          <section className={`${styles.instagram} section`}>
            <div className="container">
              <h2 className="section-title">Instagram</h2>
              <div className={styles.instagramContent}>
                <div className={styles.instagramMain}>
                  <div className={styles.instagramIcon}>
                    <i className="fab fa-instagram"></i>
                  </div>
                  <div className={styles.instagramHandle}>
                    @tribos_capoeiraoficial
                  </div>
                  <p className={styles.instagramText}>
                    Siga nosso perfil oficial no Instagram para ficar por dentro
                    das novidades, eventos e do dia a dia do Grupo Tribos
                    Capoeira.
                  </p>
                  <a
                    href="https://www.instagram.com/tribos_capoeiraoficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.instagramButton}
                  >
                    Seguir
                  </a>
                </div>

                <div className={styles.unidadesSection}>
                  <h2 className="section-title">Nossas Unidades</h2>
                  <p>
                    O Grupo Tribos Capoeira está presente em diversos estados e
                    países. Siga nossas redes sociais e conheça mais sobre nosso
                    trabalho.
                  </p>
                  <div className={styles.unidadesGrid}>
                    <a
                      href="https://www.instagram.com/tribos_capoeiraoficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.unidadeCard}
                    >
                      <div className={styles.unidadeIcon}>
                        <i className="fab fa-instagram"></i>
                      </div>
                      <div className={styles.unidadeInfo}>
                        <div className={styles.unidadeHandle}>
                          @tribos_capoeiraoficial
                        </div>
                        <div className={styles.unidadeLocation}>
                          Página Oficial
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://www.instagram.com/triboscapoeirarj/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.unidadeCard}
                    >
                      <div className={styles.unidadeIcon}>
                        <i className="fab fa-instagram"></i>
                      </div>
                      <div className={styles.unidadeInfo}>
                        <div className={styles.unidadeHandle}>
                          @triboscapoeirarj
                        </div>
                        <div className={styles.unidadeLocation}>
                          Rio de Janeiro
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://www.instagram.com/triboscapoeirapara/"
            target="_blank"
            rel="noopener noreferrer"
                      className={styles.unidadeCard}
                    >
                      <div className={styles.unidadeIcon}>
                        <i className="fab fa-instagram"></i>
                      </div>
                      <div className={styles.unidadeInfo}>
                        <div className={styles.unidadeHandle}>
                          @triboscapoeirapara
                        </div>
                        <div className={styles.unidadeLocation}>Pará</div>
                      </div>
          </a>
          <a
                      href="https://www.instagram.com/tribos_capoeira_dourados/"
            target="_blank"
            rel="noopener noreferrer"
                      className={styles.unidadeCard}
                    >
                      <div className={styles.unidadeIcon}>
                        <i className="fab fa-instagram"></i>
                      </div>
                      <div className={styles.unidadeInfo}>
                        <div className={styles.unidadeHandle}>
                          @triboscapoeira_dourados
                        </div>
                        <div className={styles.unidadeLocation}>Dourados</div>
                      </div>
          </a>
          <a
                      href="https://www.instagram.com/tribos_capoeira_ao/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.unidadeCard}
                    >
                      <div className={styles.unidadeIcon}>
                        <i className="fab fa-instagram"></i>
                      </div>
                      <div className={styles.unidadeInfo}>
                        <div className={styles.unidadeHandle}>
                          @tribos_capoeira_ao
                        </div>
                        <div className={styles.unidadeLocation}>Angola</div>
                      </div>
                    </a>
                  </div>
                </div>
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
                    <div className={styles.contactIcon}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h3>Onde Estamos</h3>
                      <p>
                        {contatoData?.endereco ? (
                          <span dangerouslySetInnerHTML={{ 
                            __html: contatoData.endereco.replace(/\n/g, '<br />') 
                          }} />
                        ) : (
                          <>
                            Endereço - QR 314, S/N Conjunto 8 Loja 2<br />
                            Samambaia Sul
                            <br />
                            Brasília - DF
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-phone"></i>
                    </div>
                    <div>
                      <h3>Telefone</h3>
                      <p>
                        <a href={`tel:${contatoData?.telefone?.replace(/[^0-9+]/g, '') || '+5561912345678'}`}>
                          {contatoData?.telefone || "(61) 91234-5678"}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className={styles.contactInfoItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h3>E-mail</h3>
                      <p>
                        <a href={`mailto:${contatoData?.email || 'triboscapoeiraoficial@gmail.com'}`}>
                          {contatoData?.email || "triboscapoeiraoficial@gmail.com"}
                        </a>
                      </p>
                    </div>
                  </div>
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
                <p>
                  Arte, cultura e tradição brasileira em um grupo comprometido
                  com a preservação e difusão da capoeira.
                </p>
              </div>
              <div className={styles.footerColumn}>
                <h3 className={styles.footerTitle}>Links Rápidos</h3>
                <ul className={styles.footerLinks}>
                  <li>
                    <a href="#quem-somos">Quem Somos</a>
                  </li>
                  <li>
                    <a href="#noticias">Notícias</a>
                  </li>
                  <li>
                    <a href="#galeria">Galeria</a>
                  </li>
                  <li>
                    <a href="#contato">Contato</a>
                  </li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h3 className={styles.footerTitle}>Redes Sociais</h3>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.instagram.com/tribos_capoeiraoficial/"
            target="_blank"
            rel="noopener noreferrer"
                    className={`${styles.socialIcon} ${styles.instagram}`}
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.copyright}>
              &copy; {new Date().getFullYear()} Tribos Capoeira. Todos os
              direitos reservados.
            </div>
          </div>
        </footer>
      </div>

      {/* Modal para exibir a imagem em tamanho ampliado */}
      {imagemSelecionada && (
        <div className={styles.modal} onClick={fecharModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.fecharModal} onClick={fecharModal}>&times;</span>
            <div className={styles.dica}>Pressione ESC para fechar</div>
            
            {tituloSelecionado && <h3 className={styles.modalTitle}>{tituloSelecionado}</h3>}
            
            <div className={styles.modalNavButtons}>
              <button className={`${styles.navButton} ${styles.prevButton}`} onClick={imagemAnterior}>&lt;</button>
              <button className={`${styles.navButton} ${styles.nextButton}`} onClick={proximaImagem}>&gt;</button>
            </div>
            
            <div className={styles.modalImageContainer}>
              <Image
                src={imagemSelecionada}
                alt={tituloSelecionado || "Imagem ampliada"}
                fill
                className={styles.modalImage}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
            
            <div className={styles.modalCounter}>
              {indexAtual >= 0 ? `${indexAtual + 1} / ${galeriaImages.length || 6}` : ''}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
