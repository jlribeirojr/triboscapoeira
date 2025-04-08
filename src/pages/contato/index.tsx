import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Contato.module.css";
import Link from "next/link";
import { getContatoInfo } from "@/services/cosmicService";

interface ContatoData {
  telefone?: string;
  email?: string;
  endereco?: string;
  [key: string]: any;
}

export default function Contato() {
  const [contatoData, setContatoData] = useState<ContatoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContatoData() {
      try {
        const data = await getContatoInfo();
        setContatoData(data || {});
      } catch (error) {
        console.error("Erro ao carregar dados de contato:", error);
      } finally {
        setLoading(false);
      }
    }

    loadContatoData();
  }, []);

  // Função para obter o endereço do CMS ou usar o valor padrão
  const getEndereco = () => {
    if (contatoData?.endereco && contatoData.endereco.trim() !== "") {
      return contatoData.endereco;
    }
    return "QR 314, S/N Conjunto 8 Loja 2, Samambaia Sul, Brasília - DF";
  };

  // Função para obter o telefone do CMS ou usar o valor padrão
  const getTelefone = () => {
    if (contatoData?.telefone && contatoData.telefone.trim() !== "") {
      return contatoData.telefone;
    }
    return "(61) 91234-5678";
  };

  // Função para obter o email do CMS ou usar o valor padrão
  const getEmail = () => {
    if (contatoData?.email && contatoData.email.trim() !== "") {
      return contatoData.email;
    }
    return "triboscapoeiraoficial@gmail.com";
  };

  return (
    <>
      <Head>
        <title>Contato | Tribos Capoeira</title>
        <meta
          name="description"
          content="Entre em contato com o grupo Tribos Capoeira."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.contatoPage}>
        <div className="container">
          <h1 className={styles.title}>Entre em Contato</h1>
          
          {loading ? (
            <div className={styles.loading}>Carregando informações...</div>
          ) : (
            <div className={styles.contatoContent}>
              <div className={styles.contatoInfo}>
                <div className={styles.contatoItem}>
                  <div className={styles.contatoIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.contatoDetails}>
                    <h3>Endereço</h3>
                    <p>{getEndereco()}</p>
                  </div>
                </div>
                
                <div className={styles.contatoItem}>
                  <div className={styles.contatoIcon}>
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className={styles.contatoDetails}>
                    <h3>Telefone</h3>
                    <p><a href={`tel:${getTelefone().replace(/\D/g, '')}`}>{getTelefone()}</a></p>
                  </div>
                </div>
                
                <div className={styles.contatoItem}>
                  <div className={styles.contatoIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.contatoDetails}>
                    <h3>E-mail</h3>
                    <p><a href={`mailto:${getEmail()}`}>{getEmail()}</a></p>
                  </div>
                </div>
              </div>
              
              <div className={styles.infoMessage}>
                <p>
                  As informações de contato são gerenciadas pelo sistema CMS e podem ser 
                  atualizadas pelo administrador do site através do painel do Cosmic JS.
                </p>
              </div>
            </div>
          )}
          
          <div className={styles.backLink}>
            <Link href="/" className={styles.button}>
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 