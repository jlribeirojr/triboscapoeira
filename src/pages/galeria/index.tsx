import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "@/styles/Galeria.module.css";
import Link from "next/link";
import { getImagens } from "@/services/cosmicService";

interface ImagemGaleria {
  id: string;
  url: string;
  imgix_url: string;
  titulo: string;
  descricao: string;
}

export default function Galeria() {
  const [imagens, setImagens] = useState<ImagemGaleria[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [atualizando, setAtualizando] = useState(false);

  const carregarImagens = async (skipCache = false) => {
    try {
      setLoading(true);
      console.log("Carregando imagens...");
      const imagensData = await getImagens(skipCache);
      console.log(`Recebidas ${imagensData.length} imagens`);
      
      setImagens(imagensData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
      setLoading(false);
    }
  };

  const forcarAtualizacao = async () => {
    setAtualizando(true);
    await carregarImagens(true);
    setTimeout(() => {
      setAtualizando(false);
    }, 1000);
  };

  useEffect(() => {
    carregarImagens();
  }, []);

  const abrirModal = (src: string) => {
    setImagemSelecionada(src);
    // Impedir a rolagem da página quando o modal estiver aberto
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const fecharModal = () => {
    setImagemSelecionada(null);
    // Reativar a rolagem da página
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  };

  // Verifica se a URL é válida
  const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    
    try {
      // Se começar com uma barra, é um caminho relativo do site
      if (url.startsWith('/')) return true;
      
      // Caso contrário, deve ser uma URL válida
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <Head>
        <title>Galeria | Tribos Capoeira</title>
        <meta
          name="description"
          content="Galeria de fotos do grupo Tribos Capoeira."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.galeriaPage}>
        <div className="container">
          <h1 className={styles.title}>Galeria de Fotos</h1>
          
          <div className={styles.atualizarContainer}>
            <button 
              onClick={forcarAtualizacao} 
              className={styles.btnAtualizar}
              disabled={atualizando || loading}
            >
              {atualizando ? 'Atualizando...' : 'Atualizar Galeria'}
            </button>
          </div>
          
          {loading ? (
            <div className={styles.loading}>Carregando imagens...</div>
          ) : (
            <>
              <div className={styles.galeriaGrid}>
                {imagens.map(img => {
                  const imageUrl = img.imgix_url || img.url;
                  
                  // Verificar se a URL é válida antes de renderizar
                  if (!isValidImageUrl(imageUrl)) {
                    console.log(`URL inválida ignorada: ${imageUrl}`);
                    return null;
                  }
                  
                  return (
                    <div key={img.id} className={styles.galeriaItem} onClick={() => abrirModal(imageUrl)}>
                      <Image
                        src={imageUrl}
                        alt={img.titulo}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.galeriaImage}
                        priority={img.id === "estatica-1" || img.id === "estatica-2" || img.id === "estatica-3" || img.id === "cms-0"}
                      />
                      <div className={styles.imagemInfo}>
                        <h3>{img.titulo}</h3>
                        {img.descricao && <p>{img.descricao}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className={styles.verMais}>
                <Link href="#" className={styles.btnVerMais}>
                  VER GALERIA COMPLETA
                </Link>
              </div>
            </>
          )}
          
          <div className={styles.backLink}>
            <Link href="/" className={styles.button}>
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>

      {/* Modal para exibir a imagem em tamanho ampliado */}
      {imagemSelecionada && (
        <div className={styles.modal} onClick={fecharModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.fecharModal} onClick={fecharModal}>&times;</span>
            <div className={styles.modalImageContainer}>
              <Image
                src={imagemSelecionada}
                alt="Imagem ampliada"
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