import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { getConfiguracao, getQuemSomosInfo, getContatoInfo, getGaleriaImages } from "@/services/cosmicService";

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
  
  // Estado para dados do CMS com tipos corretos
  const [configData, setConfigData] = useState<ConfigData | null>(null);
  const [quemSomosData, setQuemSomosData] = useState<QuemSomosData | null>(null);
  const [contatoData, setContatoData] = useState<ContatoData | null>(null);
  const [galeriaImages, setGaleriaImages] = useState<GaleriaItem[]>([]);
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
    async function loadCMSData() {
      try {
        // Carregar dados do CMS
        const config = await getConfiguracao() as ConfigData;
        const quemSomos = await getQuemSomosInfo() as QuemSomosData;
        const contato = await getContatoInfo() as ContatoData;
        const galeria = await getGaleriaImages() as GaleriaItem[];
        
        // Atualizar estados com o tipo correto
        setConfigData(config || null);
        setQuemSomosData(quemSomos || null);
        setContatoData(contato || null);
        setGaleriaImages(galeria || []);
        
        // Verificar e atualizar URL da imagem de fundo
        if (config?.metadata?.imagem_fundo?.imgix_url) {
          setFundoUrl(config.metadata.imagem_fundo.imgix_url);
        } else if (config?.metadata?.imagem_fundo?.url) {
          setFundoUrl(config.metadata.imagem_fundo.url);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do CMS:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadCMSData();
  }, []);

  // Função para determinar a altura da imagem com base no tamanho da tela
  const getImageHeight = () => {
    if (windowWidth < 576) return "250px";
    if (windowWidth < 768) return "300px";
    return "400px";
  };

  // Se quisermos usar o texto "Quem Somos" do CMS (quando disponível)
  const renderQuemSomosText = () => {
    // Se temos dados do CMS e o campo não está vazio, usamos ele
    if (quemSomosData?.quem_somos && quemSomosData.quem_somos.trim() !== "") {
      return quemSomosData.quem_somos;
    }
    
    // Caso contrário, usamos o texto padrão
    return `A Tribos Capoeira é muito mais do que um grupo: somos um movimento cultural e social que 
      transforma vidas por meio da arte da capoeira. Fundada em Brasília-DF pelo Mestrando Tyson, somos 
      uma instituição sem fins lucrativos com a missão de preservar, difundir e fortalecer essa manifestação 
      genuinamente brasileira, unindo tradição, cultura e inclusão.`;
  };

  // Função para abrir o modal com a imagem selecionada
  const abrirModal = (src: string, titulo?: string) => {
    setImagemSelecionada(src);
    setTituloSelecionado(titulo || null);
    // Impedir a rolagem da página quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setImagemSelecionada(null);
    setTituloSelecionado(null);
    // Reativar a rolagem da página
    document.body.style.overflow = 'auto';
  };

  // Determinar qual classe do Hero usar com base na disponibilidade da imagem de fundo
  const heroStyle = fundoUrl ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fundoUrl})`,
    className: styles.heroDynamic
  } : {
    className: styles.hero
  };

  // Renderiza as imagens da galeria do Cosmic ou usa as imagens padrão
  const renderGaleriaItems = () => {
    if (galeriaImages && galeriaImages.length > 0) {
      // Limitar para mostrar apenas as primeiras 6 imagens na página inicial
      return galeriaImages.slice(0, 6).map((item, index) => {
        const imageUrl = item.imgix_url || item.url || '';
        const titulo = item.titulo || `Imagem ${index + 1}`;
        
        return (
          <div className={styles.galleryItem} key={index} onClick={() => abrirModal(imageUrl, titulo)}>
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
          <div className={styles.galleryItem} onClick={() => abrirModal("/tribos.jpeg", "Grupo Tribos Capoeira em Angola")}>
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
          <div className={styles.galleryItem} onClick={() => abrirModal("/tribos2.jpeg", "Apresentação de Capoeira do Grupo Tribos")}>
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
          <div className={styles.galleryItem} onClick={() => abrirModal("/mestrandotyson.jpeg", "Mestrando Tyson")}>
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
          <div className={styles.galleryItem} onClick={() => abrirModal("/graduacao.jpeg", "Cerimônia de Graduação e Entrega de Cordas")}>
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
          <div className={styles.galleryItem} onClick={() => abrirModal("/triboskids.jpeg", "Tribos Kids - Aula de Capoeira para Crianças")}>
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
          <div className={styles.galleryItem} onClick={() => abrirModal("/evento.jpeg", "Evento de Integração do Grupo Tribos Capoeira")}>
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
          className={heroStyle.className}
          style={fundoUrl ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${fundoUrl})` } : {}}
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
                <div
                  className={styles.newsCard}
                  onMouseEnter={() => setHoverCard1(true)}
                  onMouseLeave={() => setHoverCard1(false)}
                >
                  <Link
                    href="/noticias/batizado-troca-cordas-2024"
                    className={styles.newsImageContainer}
                  >
                    <Image
                      src="/trocacordas.jpeg"
                      alt="Batizado e Troca de Cordas"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 600px"
                      className={styles.newsImage}
                    />
                    <div className={styles.newsImageOverlay}>
                      Clique para ler mais sobre o Batizado e Troca de Cordas
                      2024
                    </div>
                  </Link>
                  <div className={styles.newsContent}>
                    <div className={styles.newsDate}>15 de Março de 2024</div>
                    <h3 className={styles.newsTitle}>
                      Batizado e Troca de Cordas 2024
                    </h3>
                    <p className={styles.newsExcerpt}>
                      Nosso evento anual de Batizado e Troca de Cordas ocorreu
                      em dezembro, e foi um sucesso. Agradecemos a todos que
                      participaram e contribuíram para este evento incrível.
                    </p>
                    <a
                      href="/noticias/batizado-troca-cordas-2024"
                      className={styles.newsLink}
                    >
                      Leia mais
                    </a>
                  </div>
                </div>
                <div
                  className={styles.newsCard}
                  onMouseEnter={() => setHoverCard2(true)}
                  onMouseLeave={() => setHoverCard2(false)}
                >
                  <Link
                    href="/noticias/workshop-mestres"
                    className={styles.newsImageContainer}
                  >
                    <Image
                      src="/mestres_touro.jpeg"
                      alt="Mestres com Touro"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 600px"
                      className={styles.newsImage}
                      style={{
                        objectPosition: "50% 35%",
                      }}
                    />
                    <div className={styles.newsImageOverlay}>
                      Clique para ler mais sobre o Workshop com Mestres
                    </div>
                  </Link>
                  <div className={styles.newsContent}>
                    <div className={styles.newsDate}>
                      10 de Fevereiro de 2024
                    </div>
                    <h3 className={styles.newsTitle}>Nossos Mestres</h3>
                    <p className={styles.newsExcerpt}>
                      Workshop com mestres Nacionais e Internacionais foi um
                      sucesso! Agradecemos a todos que participaram e
                      contribuíram para este evento incrível.
                    </p>
                    <a
                      href="/noticias/workshop-mestres"
                      className={styles.newsLink}
                    >
                      Leia mais
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quem Somos */}
          <section id="quem-somos" className={`${styles.about} section`}>
            <div className="container">
              <h2 className="section-title">Quem Somos</h2>
              <div className={styles.aboutContent}>
                <div className={styles.aboutText}>
                  <p>{renderQuemSomosText()}</p>
                  <p>
                    💪 Com atuação em diversos estados do Brasil e também em Angola, na África, levamos a capoeira a 
                    comunidades de diferentes realidades, sempre com foco no impacto social, no desenvolvimento 
                    humano e na formação de novos talentos.
                  </p>
                  <p>
                    🎯 Nossa missão é clara: utilizar a capoeira como uma poderosa ferramenta de transformação social e 
                    valorização cultural.
                  </p>
                  <p>
                    👥 Nossa Equipe<br />
                    ✅ Mestre Canhoto – Supervisor Geral e Coordenador no Pará<br />
                    ✅ Mestrando Tyson – Fundador e Coordenador no Distrito Federal<br />
                    ✅ Mestrando Bandola – Auxiliar no Distrito Federal<br />
                    ✅ Contramestre Paulo Quebrado – Coordenador em Marituba, Pará<br />
                    ✅ Professor Fininho – Coordenador em Dourados, Mato Grosso do Sul<br />
                    ✅ Instrutor Bruce – Coordenador em Angola, África<br />
                    ✅ Professor Careca – Coordenador no Rio de Janeiro
                  </p>
                  <p>
                    Seja para se exercitar, fazer parte de uma comunidade vibrante ou se reconectar com as raízes culturais 
                    do Brasil, a Tribos Capoeira é o seu lugar!
                  </p>
                </div>
                <div className={styles.aboutImage}>
                  <Image
                    src="/mestrandotyson.jpeg"
                    alt="Mestrando Tyson"
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
                        Endereço - QR 314, S/N Conjunto 8 Loja 2<br />
                        Samambaia Sul
                        <br />
                        Brasília - DF
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
                        <a href="tel:+5561912345678">(61) 91234-5678</a>
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
                        <a href="mailto:triboscapoeiraoficial@gmail.com">
                          triboscapoeiraoficial@gmail.com
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
            {tituloSelecionado && <h3 className={styles.modalTitle}>{tituloSelecionado}</h3>}
            <div className={styles.modalImageContainer}>
              <Image
                src={imagemSelecionada}
                alt={tituloSelecionado || "Imagem ampliada"}
                fill
                className={styles.modalImage}
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
