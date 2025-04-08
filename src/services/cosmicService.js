import axios from 'axios';

// Cosmic CMS API - Atualizando para usar a v3 conforme URL fornecida
const READ_KEY = 'QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA';
const BUCKET_SLUG = 'triboscapoeira-production';
const API_URL = `https://api.cosmicjs.com/v3/buckets/${BUCKET_SLUG}`;

/**
 * Lista de imagens estáticas para usar como fallback
 * Estas imagens serão combinadas com as do CMS
 */
const IMAGENS_ESTATICAS = [
  {
    id: "estatica-1",
    url: "/tribos.jpeg",
    imgix_url: "/tribos.jpeg",
    titulo: "Roda de Capoeira",
    descricao: "Roda de capoeira do grupo Tribos"
  },
  {
    id: "estatica-2",
    url: "/tribos2.jpeg",
    imgix_url: "/tribos2.jpeg",
    titulo: "Apresentação de Capoeira",
    descricao: "Apresentação de capoeira do grupo Tribos"
  },
  {
    id: "estatica-3",
    url: "/mestrandotyson.jpeg",
    imgix_url: "/mestrandotyson.jpeg",
    titulo: "Mestrando Tyson",
    descricao: "Mestrando Tyson do grupo Tribos Capoeira"
  },
  {
    id: "estatica-4",
    url: "/graduacao.jpeg",
    imgix_url: "/graduacao.jpeg",
    titulo: "Graduação de Capoeira",
    descricao: "Evento de graduação do grupo Tribos Capoeira"
  },
  {
    id: "estatica-5",
    url: "/triboskids.jpeg",
    imgix_url: "/triboskids.jpeg",
    titulo: "Tribos Kids",
    descricao: "Turma infantil do grupo Tribos Capoeira"
  },
  {
    id: "estatica-6",
    url: "/evento.jpeg",
    imgix_url: "/evento.jpeg",
    titulo: "Evento de Capoeira",
    descricao: "Evento realizado pelo grupo Tribos Capoeira"
  },
  {
    id: "estatica-7",
    url: "/mestres_touro.jpeg",
    imgix_url: "/mestres_touro.jpeg",
    titulo: "Mestres com Touro",
    descricao: "Mestres do grupo Tribos Capoeira"
  },
  {
    id: "estatica-8",
    url: "/trocacordas.jpeg",
    imgix_url: "/trocacordas.jpeg",
    titulo: "Troca de Cordas",
    descricao: "Evento de troca de cordas do grupo Tribos Capoeira"
  }
];

/**
 * Verifica se as credenciais do Cosmic CMS estão configuradas corretamente
 * @returns {Promise<boolean>} Verdadeiro se conseguir conectar com sucesso
 */
async function verificarConexaoCosmic() {
  try {
    console.log('Verificando conexão com o Cosmic CMS...');
    
    const response = await axios.get(
      `${API_URL}?read_key=${READ_KEY}`
    );
    
    if (response.status === 200) {
      console.log('Conexão com o Cosmic CMS estabelecida com sucesso!');
      return true;
    } else {
      console.error('Erro ao conectar ao Cosmic CMS. Status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Erro ao verificar conexão com o Cosmic CMS:', error.message);
    return false;
  }
}

/**
 * Busca as configurações gerais do site
 * @returns {Promise<Object>} Objeto com as configurações do site
 */
export async function getConfiguracao() {
  try {
    // Buscar do Cosmic, mas com fallback para dados estáticos
    const response = await axios.get(
      `${API_URL}/objects/67f474cfcbb3fe972a6384d7?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type`
    );
    return response.data.object;
  } catch (error) {
    console.log('Usando configurações estáticas (fallback)');
    return {
      metadata: {
        contato: {},
        quem_somos: {},
        nossas_unidades: {},
        noticias: {}
      }
    };
  }
}

/**
 * Busca todas as imagens da galeria
 * @param {boolean} skipCache - Se verdadeiro, adiciona um timestamp para evitar cache
 * @returns {Promise<Array>} Array com as imagens da galeria e as estáticas
 */
export async function getImagens(skipCache = false) {
  try {
    // Tentar buscar imagens do CMS
    const conexaoOk = await verificarConexaoCosmic();
    let imagensCMS = [];
    
    if (conexaoOk) {
      console.log('Buscando imagens do CMS...');
      
      // Adiciona um parâmetro de tempo para evitar cache se solicitado
      const cacheParam = skipCache ? `&timestamp=${Date.now()}` : '';
      
      try {
        const response = await axios.get(
          `${API_URL}/objects/67f474e0cbb3fe972a6384d9?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type${cacheParam}`
        );
        
        console.log('Resposta do CMS recebida:', response.status);
        
        if (response.data && response.data.object && response.data.object.metadata && 
            response.data.object.metadata.imagem && Array.isArray(response.data.object.metadata.imagem)) {
          
          const imagens = response.data.object.metadata.imagem;
          console.log(`Encontradas ${imagens.length} imagens no CMS`);
          
          imagensCMS = imagens.map((item, index) => {
            // Verificar se o item tem o campo 'imagem' com as URLs
            if (item.imagem && (item.imagem.url || item.imagem.imgix_url)) {
              return {
                id: `cms-${index}`,
                url: item.imagem.url || '',
                imgix_url: item.imagem.imgix_url || item.imagem.url || '',
                titulo: item.titulo || 'Imagem da Galeria',
                descricao: item.descricao || ''
              };
            }
            return null;
          }).filter(img => img !== null);
          
          console.log(`Processadas ${imagensCMS.length} imagens válidas do CMS`);
        }
      } catch (error) {
        console.error('Erro ao buscar imagens do CMS:', error.message);
      }
    }
    
    // Combinar as imagens do CMS com as estáticas
    console.log(`Combinando ${imagensCMS.length} imagens do CMS com ${IMAGENS_ESTATICAS.length} imagens estáticas`);
    const todasImagens = [...imagensCMS, ...IMAGENS_ESTATICAS];
    
    return todasImagens;
  } catch (error) {
    console.error('Erro ao buscar imagens:', error.message);
    return IMAGENS_ESTATICAS; // Retorna as imagens estáticas em caso de erro
  }
}

/**
 * Busca as informações de contato
 * @returns {Promise<Object>} Objeto com as informações de contato
 */
export async function getContatoInfo() {
  try {
    const config = await getConfiguracao();
    return config?.metadata?.contato || {};
  } catch (error) {
    console.error('Erro ao buscar informações de contato:', error);
    return {};
  }
}

/**
 * Busca as informações da seção "Quem Somos"
 * @returns {Promise<Object>} Objeto com as informações de "Quem Somos"
 */
export async function getQuemSomosInfo() {
  try {
    const config = await getConfiguracao();
    return config?.metadata?.quem_somos || {};
  } catch (error) {
    console.error('Erro ao buscar informações de Quem Somos:', error);
    return {};
  }
}

/**
 * Busca as informações das unidades
 * @returns {Promise<Object>} Objeto com as informações das unidades
 */
export async function getUnidadesInfo() {
  try {
    const config = await getConfiguracao();
    return config?.metadata?.nossas_unidades || {};
  } catch (error) {
    console.error('Erro ao buscar informações das unidades:', error);
    return {};
  }
}

/**
 * Busca as informações de notícias
 * @returns {Promise<Object>} Objeto com as informações de notícias
 */
export async function getNoticiasInfo() {
  try {
    const config = await getConfiguracao();
    return config?.metadata?.noticias || {};
  } catch (error) {
    console.error('Erro ao buscar informações de notícias:', error);
    return {};
  }
} 