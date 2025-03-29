import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/Galeria.module.css";
import Link from "next/link";

// Definição das imagens da galeria
const galeriaImagens = [
  {
    id: 1,
    src: "/tribos.jpeg",
    alt: "Roda de Capoeira",
    title: "Roda de Capoeira",
    categoria: "rodas"
  },
  {
    id: 2,
    src: "/tribos2.jpeg",
    alt: "Apresentação",
    title: "Apresentação",
    categoria: "apresentacoes"
  },
  {
    id: 3,
    src: "/mestrandotyson.jpeg",
    alt: "Mestrando Tyson",
    title: "Mestrando Tyson",
    categoria: "mestres"
  },
  {
    id: 4,
    src: "/mestres.jpeg",
    alt: "Mestres",
    title: "Nossos Mestres",
    categoria: "mestres"
  },
  {
    id: 5,
    src: "/triboskids.jpeg",
    alt: "Capoeira Kids",
    title: "Tribos Kids",
    categoria: "treinos"
  },
  {
    id: 6,
    src: "/trocacordas.jpeg",
    alt: "Troca de Cordas",
    title: "Batizado e Troca de Cordas",
    categoria: "eventos"
  },
  {
    id: 7,
    src: "/graduacao.jpeg",
    alt: "Graduação",
    title: "Cerimônia de Graduação",
    categoria: "eventos"
  },
  {
    id: 8,
    src: "/para.jpeg",
    alt: "Roda no Pará",
    title: "Encontro no Pará",
    categoria: "eventos"
  },
  {
    id: 9,
    src: "/evento.jpeg",
    alt: "Evento Especial",
    title: "Evento Especial Tribos Capoeira",
    categoria: "eventos"
  },
  {
    id: 10,
    src: "/canhoto.jpeg",
    alt: "Mestre Canhoto",
    title: "Mestre Canhoto",
    categoria: "mestres"
  },
  {
    id: 11,
    src: "/mestres_touro.jpeg",
    alt: "Mestres com Touro",
    title: "Encontro de Mestres com Touro",
    categoria: "mestres"
  }
];

// Categorias disponíveis
const categorias = [
  { id: "todas", nome: "Todas" },
  { id: "rodas", nome: "Rodas" },
  { id: "eventos", nome: "Eventos" },
  { id: "treinos", nome: "Treinos" },
  { id: "apresentacoes", nome: "Apresentações" },
  { id: "mestres", nome: "Mestres" }
];

export default function Galeria() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imagemAtiva, setImagemAtiva] = useState<number | null>(null);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todas");
  const [imagensFiltradas, setImagensFiltradas] = useState(galeriaImagens);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Filtrar imagens por categoria
  useEffect(() => {
    if (categoriaAtiva === "todas") {
      setImagensFiltradas(galeriaImagens);
    } else {
      const filtradas = galeriaImagens.filter(img => img.categoria === categoriaAtiva);
      setImagensFiltradas(filtradas);
    }
  }, [categoriaAtiva]);

  // Manipulador para abrir a visualização de imagem
  const abrirImagem = (id: number) => {
    setImagemAtiva(id);
    document.body.style.overflow = "hidden"; // Previne o rolamento da página
  };

  // Manipulador para fechar a visualização de imagem
  const fecharImagem = () => {
    setImagemAtiva(null);
    document.body.style.overflow = "auto"; // Restaura o rolamento da página
  };

  // Navegar para a próxima imagem
  const proximaImagem = () => {
    if (imagemAtiva !== null) {
      const imagensDisponiveis = imagensFiltradas;
      const indiceAtual = imagensDisponiveis.findIndex(img => img.id === imagemAtiva);
      const proximoIndice = (indiceAtual + 1) % imagensDisponiveis.length;
      setImagemAtiva(imagensDisponiveis[proximoIndice].id);
    }
  };

  // Navegar para a imagem anterior
  const imagemAnterior = () => {
    if (imagemAtiva !== null) {
      const imagensDisponiveis = imagensFiltradas;
      const indiceAtual = imagensDisponiveis.findIndex(img => img.id === imagemAtiva);
      const indiceAnterior = indiceAtual === 0 ? imagensDisponiveis.length - 1 : indiceAtual - 1;
      setImagemAtiva(imagensDisponiveis[indiceAnterior].id);
    }
  };

  // Manipulador de teclas para navegação
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (imagemAtiva === null) return;
      
      if (e.key === "Escape") fecharImagem();
      if (e.key === "ArrowRight") proximaImagem();
      if (e.key === "ArrowLeft") imagemAnterior();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagemAtiva, imagensFiltradas]);

  // Efeito para o scroll e header
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

  // Encontrar a imagem ativa
  const imagemAtivaObj = imagemAtiva 
    ? galeriaImagens.find(img => img.id === imagemAtiva) 
    : null;
    
  // Encontrar o índice da imagem atual para a paginação
  const indiceImagemAtiva = imagemAtiva && imagensFiltradas.findIndex(img => img.id === imagemAtiva) + 1;

  return (
    <>
      <Head>
        <title>Galeria - Tribos Capoeira</title>
        <meta name="description" content="Galeria de fotos do grupo Tribos Capoeira. Veja imagens de nossos eventos, rodas, apresentações e muito mais." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        {/* Header */}
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
          <div className={`container ${styles.navbar}`}>
            <div className={styles.logo}>
              <Link href="/" title="Página Inicial">
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
              <li><Link href="/galeria" onClick={() => setMenuActive(false)}>Galeria</Link></li>
              <li><Link href="/#contato" onClick={() => setMenuActive(false)}>Contato</Link></li>
            </ul>
          </div>
        </header>

        <main className={styles.main}>
          {/* Banner da Galeria */}
          <section className={styles.galeriaBanner}>
            <div className={styles.bannerContent}>
              <h1>Galeria de Fotos</h1>
              <p>Confira os melhores momentos do Grupo Tribos Capoeira</p>
            </div>
          </section>

          {/* Galeria de Fotos */}
          <section className={`${styles.galeriaContent} section`}>
            <div className="container">
              <h2 className="section-title">Nossas Imagens</h2>
              <p className={styles.galeriaIntro}>
                Clique nas imagens para visualizá-las em tamanho maior. Use as setas ou os botões para navegar entre as fotos.
              </p>
              
              {/* Filtro de categorias */}
              <div className={styles.categoriasFiltro}>
                {categorias.map(categoria => (
                  <button 
                    key={categoria.id}
                    className={`${styles.categoriaBtn} ${categoriaAtiva === categoria.id ? styles.categoriaAtiva : ''}`}
                    onClick={() => setCategoriaAtiva(categoria.id)}
                  >
                    {categoria.nome}
                  </button>
                ))}
              </div>

              <div className={styles.galeriaGrid}>
                {imagensFiltradas.length > 0 ? (
                  imagensFiltradas.map((imagem) => (
                    <div 
                      key={imagem.id} 
                      className={styles.galeriaItem}
                      onClick={() => abrirImagem(imagem.id)}
                    >
                      <Image 
                        src={imagem.src} 
                        alt={imagem.alt} 
                        className={styles.galeriaImage} 
                        width={300} 
                        height={250}
                      />
                      <div className={styles.galeriaOverlay}>
                        <span className={styles.galeriaIcon}>+</span>
                        <span className={styles.galeriaTitle}>{imagem.title}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles.nenhumaImagem}>Nenhuma imagem encontrada nesta categoria.</p>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* Modal de Visualização de Imagem */}
        {imagemAtiva !== null && imagemAtivaObj && (
          <div className={styles.imagemModal} onClick={fecharImagem}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button className={styles.fecharBtn} onClick={fecharImagem}>
                &times;
              </button>
              
              <div className={styles.imagemWrapper}>
                <Image 
                  src={imagemAtivaObj.src} 
                  alt={imagemAtivaObj.alt} 
                  width={1000} 
                  height={800}
                  className={styles.modalImage}
                />
                <h3 className={styles.imagemTitulo}>{imagemAtivaObj.title}</h3>
              </div>
              
              <button className={styles.navBtn + ' ' + styles.prevBtn} onClick={imagemAnterior}>
                &#10094;
              </button>
              <button className={styles.navBtn + ' ' + styles.nextBtn} onClick={proximaImagem}>
                &#10095;
              </button>
              
              <div className={styles.paginacao}>
                {indiceImagemAtiva} / {imagensFiltradas.length}
              </div>
            </div>
          </div>
        )}

        {/* Seção de Unidades */}
        <section className={styles.unidades}>
          <div className="container">
            <h2 className={styles.unidadesTitle}>Nossas Unidades</h2>
            <p className={styles.unidadesDesc}>O Grupo Tribos Capoeira está presente em diversos estados e países. Siga nossas redes sociais e conheça mais sobre nosso trabalho.</p>
            
            <div className={styles.unidadesGrid}>
              <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer" className={styles.unidadeCard}>
                <div className={styles.unidadeIcon}>
                  <i className="fab fa-instagram"></i>
                </div>
                <div className={styles.unidadeInfo}>
                  <h3>@tribos_capoeiraoficial</h3>
                  <p>Página Oficial</p>
                </div>
              </a>
              
              <a href="https://www.instagram.com/triboscapoeirarj/" target="_blank" rel="noopener noreferrer" className={styles.unidadeCard}>
                <div className={styles.unidadeIcon}>
                  <i className="fab fa-instagram"></i>
                </div>
                <div className={styles.unidadeInfo}>
                  <h3>@triboscapoeirarj</h3>
                  <p>Rio de Janeiro</p>
                </div>
              </a>
              
              <a href="https://www.instagram.com/triboscapoeirapara/" target="_blank" rel="noopener noreferrer" className={styles.unidadeCard}>
                <div className={styles.unidadeIcon}>
                  <i className="fab fa-instagram"></i>
                </div>
                <div className={styles.unidadeInfo}>
                  <h3>@triboscapoeirapara</h3>
                  <p>Pará</p>
                </div>
              </a>
              
              <a href="https://www.instagram.com/triboscapoeira_dourados/" target="_blank" rel="noopener noreferrer" className={styles.unidadeCard}>
                <div className={styles.unidadeIcon}>
                  <i className="fab fa-instagram"></i>
                </div>
                <div className={styles.unidadeInfo}>
                  <h3>@triboscapoeira_dourados</h3>
                  <p>Dourados</p>
                </div>
              </a>
              
              <a href="https://www.instagram.com/tribos_capoeira_ao/" target="_blank" rel="noopener noreferrer" className={styles.unidadeCard}>
                <div className={styles.unidadeIcon}>
                  <i className="fab fa-instagram"></i>
                </div>
                <div className={styles.unidadeInfo}>
                  <h3>@tribos_capoeira_ao</h3>
                  <p>Angola</p>
                </div>
              </a>
            </div>
            
            <div className={styles.unidadesShare}>
              <p>Compartilhe nossas fotos:</p>
              <div className={styles.socialLinks}>
                <a href="https://www.instagram.com/tribos_capoeiraoficial/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagram}`}>
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

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
                  <li><Link href="/galeria">Galeria</Link></li>
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