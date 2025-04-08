# Tribos Capoeira - Site Oficial

## Integração com Cosmic JS CMS

Este projeto utiliza o [Cosmic JS](https://www.cosmicjs.com/) como CMS (Content Management System) para permitir que o cliente atualize facilmente o conteúdo do site sem precisar modificar o código.

### Estrutura do Bucket no Cosmic JS

O bucket "triboscapoeira-production" foi configurado com os seguintes Object Types:

1. **Configuração do Site** (slug: `configuracao-do-site`)
   - Contém configurações gerais do site
   - Metadados para seções específicas como notícias, quem somos, unidades e contato

2. **Galeria** (slug: `galeria`)
   - Gerencia as imagens da galeria do site
   - Permite adicionar ou remover imagens facilmente

### Endpoints da API

Os principais endpoints utilizados no projeto são:

#### 1. Configuração do Site:
```
https://api.cosmicjs.com/v3/buckets/triboscapoeira-production/objects/67f474cfcbb3fe972a6384d7?pretty=true&read_key=QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA&depth=1&props=slug,title,metadata,type
```

Este endpoint retorna dados como:
```json
{
  "object": {
    "slug": "configuracao-do-site",
    "title": "Configuração do Site",
    "type": "configuracao",
    "metadata": {
      "imagem_fundo": null,
      "noticias": {
        "imagem_da_noticia": null,
        "titulo_da_noticia": "insira um titulo para a noticia",
        "descricao_da_noticia": "Insira uma descrição para a noiticia"
      },
      "quem_somos": {
        "quem_somos": "Insira a historia da tribos capoeira"
      },
      "nossas_unidades": {
        "nome_da_unidade": "Insira o nome nova nova unidade",
        "endereco": "Insira o endereço da nova unidade",
        "telefone": "Insira o telefone da nova unidade",
        "instagram_da_unidade": null
      },
      "contato": {
        "telefone": "Insira o novo telefone para contato",
        "email": "Insira o novo email",
        "endereco": "Insira o novo endereço"
      }
    }
  }
}
```

#### 2. Galeria:
```
https://api.cosmicjs.com/v3/buckets/triboscapoeira-production/objects/67f474e0cbb3fe972a6384d9?pretty=true&read_key=QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA&depth=1&props=slug,title,metadata,type
```

Este endpoint retorna dados como:
```json
{
  "object": {
    "slug": "galeria",
    "title": "Galeria",
    "type": "galeria",
    "metadata": {
      "imagem": []
    }
  }
}
```

### Implementação no Projeto

Vamos criar um serviço para consumir estas APIs do Cosmic JS e fornecer os dados para as páginas do site.

## Como Utilizar

### Criando o serviço de API

Implementamos um serviço para conectar com a API do Cosmic JS e buscar os dados. O código abaixo mostra como isso foi feito:

```javascript
// src/services/cosmicService.js
import axios from 'axios';

const READ_KEY = 'QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA';
const BUCKET_SLUG = 'triboscapoeira-production';
const API_URL = `https://api.cosmicjs.com/v3/buckets/${BUCKET_SLUG}`;

export async function getConfiguracao() {
  try {
    const response = await axios.get(
      `${API_URL}/objects/67f474cfcbb3fe972a6384d7?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type`
    );
    return response.data.object;
  } catch (error) {
    console.error('Erro ao buscar configuração:', error);
    return null;
  }
}

export async function getGaleria() {
  try {
    const response = await axios.get(
      `${API_URL}/objects/67f474e0cbb3fe972a6384d9?read_key=${READ_KEY}&depth=1&props=slug,title,metadata,type`
    );
    return response.data.object;
  } catch (error) {
    console.error('Erro ao buscar galeria:', error);
    return null;
  }
}

// Função para buscar todas as imagens da galeria
export async function getImagens() {
  try {
    const galeria = await getGaleria();
    return galeria?.metadata?.imagem || [];
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
    return [];
  }
}
```

### Utilizando os dados na página inicial

Na página inicial, os dados do CMS são carregados e utilizados:

```javascript
// src/pages/index.js
import { useEffect, useState } from 'react';
import { getConfiguracao, getImagens } from '@/services/cosmicService';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const configData = await getConfiguracao();
        const imagensData = await getImagens();
        
        setConfig(configData);
        setImagens(imagensData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Renderizar o conteúdo usando config e imagens
}
```

## Atualizando o Conteúdo (Para o Cliente)

### Como atualizar a seção "Quem Somos"

1. Acesse o painel administrativo do Cosmic JS
2. Navegue até o bucket "triboscapoeira-production"
3. Encontre o objeto "Configuração do Site"
4. Clique para editar
5. Na seção "quem_somos", atualize o texto no campo "quem_somos"
6. Salve as alterações

### Como adicionar imagens à Galeria

1. Acesse o painel administrativo do Cosmic JS
2. Navegue até o bucket "triboscapoeira-production"
3. Encontre o objeto "Galeria"
4. Clique para editar
5. Na seção "imagem", clique em "Add Repeating Item"
6. Faça upload da nova imagem
7. Preencha os metadados da imagem (título, descrição, etc.)
8. Salve as alterações

## Considerações de segurança

- A chave de leitura (READ_KEY) está exposta no cliente, mas isso é aceitável já que apenas permite leitura dos dados
- Para operações de escrita, seria necessário implementar um backend seguro com a chave de escrita (WRITE_KEY) protegida

## Próximos Passos

- Implementar autenticação para permitir que o cliente faça login e atualize o conteúdo diretamente pelo site
- Adicionar cache para melhorar a performance
- Implementar um sistema de preview para que o cliente veja as alterações antes de publicá-las
