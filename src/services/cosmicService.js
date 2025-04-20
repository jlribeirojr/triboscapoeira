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
    url: "/tribos.jpeg",
    imgix_url: "/tribos.jpeg",
    titulo: "Grupo Tribos Capoeira em Angola",
    descricao: "Alunos e professores do Grupo Tribos Capoeira em Angola"
  },
  {
    url: "/tribos2.jpeg",
    imgix_url: "/tribos2.jpeg",
    titulo: "Apresentação de Capoeira do Grupo Tribos",
    descricao: "Roda de capoeira durante evento do Grupo Tribos"
  },
  {
    url: "/mestrandotyson.jpeg",
    imgix_url: "/mestrandotyson.jpeg",
    titulo: "Mestrando Tyson",
    descricao: "Mestrando Tyson em evento do Grupo Tribos Capoeira"
  },
  {
    url: "/graduacao.jpeg",
    imgix_url: "/graduacao.jpeg",
    titulo: "Cerimônia de Graduação e Entrega de Cordas",
    descricao: "Cerimônia de entrega de cordas aos alunos do Grupo Tribos Capoeira"
  },
  {
    url: "/triboskids.jpeg",
    imgix_url: "/triboskids.jpeg",
    titulo: "Tribos Kids - Aula de Capoeira para Crianças",
    descricao: "Crianças durante aula de capoeira do programa Tribos Kids"
  },
  {
    url: "/evento.jpeg",
    imgix_url: "/evento.jpeg",
    titulo: "Evento de Integração do Grupo Tribos Capoeira",
    descricao: "Integrantes do Grupo Tribos Capoeira reunidos em evento de integração"
  },
  {
    id: "estatica-7",
    url: "/mestres.jpeg",
    imgix_url: "/mestres.jpeg",
    titulo: "Mestres",
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
 * Busca as configurações gerais do site usando fetch (alternativa)
 * Esta função é uma alternativa usando fetch diretamente caso o axios tenha problemas
 * @returns {Promise<Object>} Objeto com as configurações do site
 */
export async function getConfiguracaoFetch() {
  try {
    console.log('Buscando configurações do site com fetch...');
    
    const url = `https://api.cosmicjs.com/v3/buckets/triboscapoeira-production/objects/67f474cfcbb3fe972a6384d7?pretty=true&read_key=QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA&depth=1&props=slug,title,metadata,type`;
    console.log(`URL fetch: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Falha ao buscar configurações: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Dados recebidos via fetch:', JSON.stringify(data, null, 2));
    
    // Verificar se os dados têm a estrutura esperada
    if (data && data.object && data.object.metadata) {
      console.log('Dados de configuração extraídos com sucesso via fetch');
      return data.object;
    } else {
      console.warn('Estrutura de dados inesperada na resposta via fetch:', data);
    }
    
    return {};
  } catch (error) {
    console.error('Erro ao buscar configurações do site via fetch:', error);
    return {};
  }
}

// Modificar a função getConfiguracao para usar a nova função fetch como fallback
export async function getConfiguracao() {
  try {
    console.log('Buscando configurações do site com axios...');
    
    // Log da URL completa para verificação
    console.log(`URL da API: ${API_URL}/objects/67f474cfcbb3fe972a6384d7?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type`);
    
    try {
      const response = await axios.get(
        `${API_URL}/objects/67f474cfcbb3fe972a6384d7?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type`
      );
      
      // Exibir resposta bruta para verificar exatamente o formato dos dados
      console.log('Estrutura bruta da resposta:', Object.keys(response));
      console.log('Estrutura bruta dos dados:', Object.keys(response.data || {}));
      console.log('Resposta da API Cosmic (configuração):', JSON.stringify(response.data, null, 2));
      
      // Verificar se os dados têm a estrutura esperada
      if (response.data && response.data.object && response.data.object.metadata) {
        console.log('Dados de configuração extraídos com sucesso via axios');
        return response.data.object;
      } else {
        console.warn('Estrutura de dados inesperada na resposta via axios:', response.data);
        console.log('Tentando método fetch alternativo...');
        return await getConfiguracaoFetch();
      }
    } catch (axiosError) {
      console.error('Erro ao buscar configurações via axios:', axiosError);
      console.log('Tentando método fetch alternativo...');
      return await getConfiguracaoFetch();
    }
  } catch (error) {
    console.error('Erro ao buscar configurações do site:', error);
    return {};
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
    console.log('Buscando informações de contato...');
    const config = await getConfiguracao();
    
    console.log('Dados de configuração para Contato:', JSON.stringify(config?.metadata?.contato || {}, null, 2));
    
    if (config && config.metadata && config.metadata.contato) {
      return config.metadata.contato;
    }
    
    return {};
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
    console.log('Buscando informações de Quem Somos...');
    const config = await getConfiguracaoFetch(); // Usar diretamente fetch para garantir
    
    console.log('Dados brutos recebidos para Quem Somos:', config);
    console.log('Estrutura de metadata:', config?.metadata ? Object.keys(config.metadata) : 'metadata não encontrado');
    console.log('Estrutura de quem_somos:', config?.metadata?.quem_somos ? Object.keys(config.metadata.quem_somos) : 'quem_somos não encontrado');
    console.log('Dados de configuração para Quem Somos:', JSON.stringify(config?.metadata?.quem_somos || {}, null, 2));
    
    // Verifica se os dados têm a estrutura esperada e retorna apenas o texto puro
    if (config && config.metadata && config.metadata.quem_somos) {
      // Texto completo para verificação
      const textoCompleto = config.metadata.quem_somos.quem_somos;
      console.log('Texto de Quem Somos encontrado:', textoCompleto ? 'sim, com ' + textoCompleto.length + ' caracteres' : 'não encontrado');
      
      // Retorna diretamente o texto do Cosmic
      return {
        quem_somos: textoCompleto || ""
      };
    } else {
      console.warn('Estrutura esperada para "quem_somos" não encontrada nos dados do CMS');
    }
    
    return { quem_somos: "" };
  } catch (error) {
    console.error('Erro ao buscar informações de Quem Somos:', error);
    return { quem_somos: "" };
  }
}

/**
 * Busca as informações das unidades
 * @returns {Promise<Object>} Objeto com as informações das unidades
 */
export async function getUnidadesInfo() {
  try {
    console.log('Buscando informações das unidades...');
    const config = await getConfiguracao();
    
    console.log('Dados de configuração para Unidades:', JSON.stringify(config?.metadata?.nossas_unidades || {}, null, 2));
    
    if (config && config.metadata && config.metadata.nossas_unidades) {
      return config.metadata.nossas_unidades;
    }
    
    return {};
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

export async function getGaleriaImages() {
  try {
    console.log('Buscando imagens da galeria...');
    
    const response = await axios.get(
      `${API_URL}/objects/67f474e0cbb3fe972a6384d9?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type`
    );
    
    console.log('Resposta da API Cosmic (galeria):', response.status);
    
    // Array para armazenar as imagens do Cosmic
    let imagensDoCosmic = [];
    
    // Verificar a estrutura de dados retornada pelo Cosmic
    if (response.data && response.data.object && response.data.object.metadata) {
      const metadata = response.data.object.metadata;
      
      // Nova estrutura: array de objetos com "imagem" e "descricao_da_foto"
      if (metadata.imagem && Array.isArray(metadata.imagem)) {
        imagensDoCosmic = metadata.imagem.map((item, index) => {
          // Verificar se o item tem a estrutura correta com objeto "imagem" dentro
          if (item.imagem && (item.imagem.url || item.imagem.imgix_url)) {
            return {
              url: item.imagem.url || '',
              imgix_url: item.imagem.imgix_url || item.imagem.url || '',
              titulo: item.descricao_da_foto || `Imagem ${index + 1}`,
              descricao: ''
            };
          }
          // Caso seja o formato antigo
          return {
            url: item.url || '',
            imgix_url: item.imgix_url || item.url || '',
            titulo: item.titulo || `Imagem ${index + 1}`,
            descricao: item.descricao || ''
          };
        });
      }
      // Estrutura de imagem única (objeto na raiz do metadata)
      else if (metadata.imagem && (metadata.imagem.url || metadata.imagem.imgix_url)) {
        imagensDoCosmic = [{
          url: metadata.imagem.url || '',
          imgix_url: metadata.imagem.imgix_url || metadata.imagem.url || '',
          titulo: metadata.descricao_da_foto || response.data.object.title || 'Imagem da Galeria',
          descricao: ''
        }];
      }
      // Estrutura antiga de galeria (se ainda existir)
      else if (metadata.galeria && Array.isArray(metadata.galeria)) {
        imagensDoCosmic = metadata.galeria;
      }
    }
    
    console.log(`Encontradas ${imagensDoCosmic.length} imagens no Cosmic`);
    console.log('Imagens do Cosmic:', JSON.stringify(imagensDoCosmic));
    
    // Combinar com as imagens estáticas
    const todasImagens = [
      ...imagensDoCosmic,
      ...IMAGENS_ESTATICAS.map(img => ({
        url: img.url,
        imgix_url: img.imgix_url,
        titulo: img.titulo,
        descricao: img.descricao
      }))
    ];
    
    return todasImagens;
  } catch (error) {
    console.error('Erro ao buscar imagens da galeria:', error);
    // Em caso de erro, retornar as imagens estáticas
    return IMAGENS_ESTATICAS.map(img => ({
      url: img.url,
      imgix_url: img.imgix_url,
      titulo: img.titulo,
      descricao: img.descricao
    }));
  }
}

// Função para obter os dados da primeira notícia
export async function getFirstNewsData() {
  try {
    console.log('Buscando dados da primeira notícia...');
    const config = await getConfiguracao();
    
    console.log('Dados de configuração para notícias:', JSON.stringify(config?.metadata?.noticias || {}, null, 2));
    
    // Verificar se temos os dados da notícia atualizada
    if (config && config.metadata && config.metadata.noticias) {
      const noticiasData = config.metadata.noticias;
      
      // Log detalhado da estrutura de dados de notícias para verificar
      console.log('Estrutura detalhada da notícia:', {
        temImagem: !!noticiasData.imagem_da_noticia,
        imagemUrl: noticiasData.imagem_da_noticia?.url,
        imagemImgixUrl: noticiasData.imagem_da_noticia?.imgix_url,
        titulo: noticiasData.titulo_da_noticia,
        descricao: noticiasData.descricao_da_noticia
      });
      
      // Construir o objeto com os dados da notícia
      const newsResult = {
        imagem: noticiasData.imagem_da_noticia?.imgix_url || noticiasData.imagem_da_noticia?.url || '',
        titulo: noticiasData.titulo_da_noticia || 'Comemoração de 3 anos da Tribos Capoeira',
        descricao: noticiasData.descricao_da_noticia || ''
      };
      
      console.log('Retornando dados de notícia do CMS:', newsResult);
      return newsResult;
    } else {
      console.log('Nenhum dado de notícia encontrado no CMS, usando dados padrão');
    }
    
    // Retorna dados padrão se não houver dados no Cosmic - ATUALIZADO para Comemoração de 3 anos
    return {
      imagem: 'https://imgix.cosmicjs.com/702a1e70-18ae-11f0-adcb-894bf25a5bd9-WhatsApp-Image-2025-04-12-at-12-43-29.jpeg',
      titulo: 'Comemoração de 3 anos da Tribos Capoeira',
      descricao: 'No último sábado, o Grupo Tribos Capoeira celebrou com muita alegria e energia seus 3 anos de existência, em uma roda especial repleta de axé, música e movimento. O evento reuniu alunos, familiares e apaixonados pela arte da capoeira, em um momento de celebração da história construída até aqui.'
    };
  } catch (error) {
    console.error('Erro ao buscar dados da primeira notícia:', error);
    return {
      imagem: 'https://imgix.cosmicjs.com/702a1e70-18ae-11f0-adcb-894bf25a5bd9-WhatsApp-Image-2025-04-12-at-12-43-29.jpeg',
      titulo: 'Comemoração de 3 anos da Tribos Capoeira',
      descricao: 'No último sábado, o Grupo Tribos Capoeira celebrou com muita alegria e energia seus 3 anos de existência, em uma roda especial repleta de axé, música e movimento. O evento reuniu alunos, familiares e apaixonados pela arte da capoeira, em um momento de celebração da história construída até aqui.'
    };
  }
} 