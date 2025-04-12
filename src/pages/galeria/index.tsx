import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Galeria.module.css";
import { getGaleriaImages } from "@/services/cosmicService";

interface GaleriaItem {
  url?: string;
  imgix_url?: string;
  titulo?: string;
  descricao?: string;
}

export default function Galeria() {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [tituloSelecionado, setTituloSelecionado] = useState<string | null>(null);
  const [descricaoSelecionada, setDescricaoSelecionada] = useState<string | null>(null);
  const [galeriaImages, setGaleriaImages] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [indexAtual, setIndexAtual] = useState<number>(-1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Carregar imagens da galeria
  useEffect(() => {
    async function loadGaleriaImages() {
      try {
        setLoading(true);
        const images = await getGaleriaImages() as GaleriaItem[];
        setGaleriaImages(images || []);
      } catch (error) {
        console.error('Erro ao carregar imagens da galeria:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadGaleriaImages();
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Função para abrir o modal com a imagem selecionada
  const abrirModal = (src: string, titulo?: string, descricao?: string, index?: number) => {
    setImagemSelecionada(src);
    setTituloSelecionado(titulo || null);
    setDescricaoSelecionada(descricao || null);
    setIndexAtual(index !== undefined ? index : -1);
    // Impedir a rolagem da página quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setImagemSelecionada(null);
    setTituloSelecionado(null);
    setDescricaoSelecionada(null);
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
      setDescricaoSelecionada(imagem.descricao || null);
    }
  };

  const imagemAnterior = () => {
    if (indexAtual >= 0 && galeriaImages.length > 0) {
      const novoIndex = (indexAtual - 1 + galeriaImages.length) % galeriaImages.length;
      const imagem = galeriaImages[novoIndex];
      setIndexAtual(novoIndex);
      setImagemSelecionada(imagem.imgix_url || imagem.url || '');
      setTituloSelecionado(imagem.titulo || null);
      setDescricaoSelecionada(imagem.descricao || null);
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

  // Renderiza as imagens da galeria
  const renderGaleriaItems = () => {
    if (loading) {
      return <div className={styles.loading}>Carregando imagens...</div>;
    }

    if (galeriaImages.length === 0) {
      return <div className={styles.noImages}>Nenhuma imagem encontrada na galeria.</div>;
    }

    return galeriaImages.map((item, index) => {
      const imageUrl = item.imgix_url || item.url || '';
      const titulo = item.titulo || `Imagem ${index + 1}`;
      
      return (
        <div className={styles.galeriaItem} key={index} onClick={() => abrirModal(imageUrl, titulo, item.descricao, index)}>
          <Image
            src={imageUrl}
            alt={titulo}
            className={styles.galeriaImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            quality={90}
          />
          <div className={styles.galeriaOverlay}>
            <span>{titulo}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Galeria | Tribos Capoeira</title>
        <meta
          name="description"
          content="Galeria de fotos do grupo Tribos Capoeira. Veja nossas atividades, eventos e momentos marcantes."
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
              <Link href="/" className={styles.logoLink}>
                Tribos Capoeira
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
                <Link href="/" onClick={() => setMenuActive(false)}>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#quem-somos" onClick={() => setMenuActive(false)}>
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/#noticias" onClick={() => setMenuActive(false)}>
                  Notícias
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
          <section className={styles.galeriaSection}>
            <div className="container">
              <h1 className={styles.pageTitle}>Galeria de Fotos</h1>
              
              <div className={styles.galeriaControles}>
                <Link 
                  href="/" 
                  className={`${styles.btnVoltar}`}
                >
                  Voltar para Página Inicial
                </Link>
              </div>

              <div className={styles.galeriaGrid}>
                {renderGaleriaItems()}
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
            {descricaoSelecionada && <p className={styles.modalDescricao}>{descricaoSelecionada}</p>}
            
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
              {indexAtual >= 0 ? `${indexAtual + 1} / ${galeriaImages.length}` : ''}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 