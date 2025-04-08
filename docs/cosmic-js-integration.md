# Documentação da Integração com Cosmic JS

## Visão Geral

O site da Tribos Capoeira utiliza o Cosmic JS como CMS (Content Management System) para permitir que administradores do site atualizem facilmente conteúdos como informações de contato, texto de "Quem Somos", imagens da galeria e outros dados, sem precisar editar diretamente o código fonte.

## Configuração do Bucket no Cosmic JS

O bucket "triboscapoeira-production" foi configurado com as seguintes estruturas:

### 1. Object Type: Configuração do Site

**Slug**: `configuracao-do-site`

Metadados:
- `imagem_fundo`: Campo para imagem de fundo do site
- `noticias`: 
  - `imagem_da_noticia`: Campo para imagem das notícias
  - `titulo_da_noticia`: Campo para título das notícias
  - `descricao_da_noticia`: Campo para descrição das notícias
- `quem_somos`:
  - `quem_somos`: Campo de texto para a seção "Quem Somos"
- `nossas_unidades`:
  - `nome_da_unidade`: Campo para nome da unidade
  - `endereco`: Campo para endereço da unidade
  - `telefone`: Campo para telefone da unidade
  - `instagram_da_unidade`: Campo para link do Instagram da unidade
- `contato`:
  - `telefone`: Campo para telefone de contato
  - `email`: Campo para e-mail de contato
  - `endereco`: Campo para endereço de contato

### 2. Object Type: Galeria

**Slug**: `galeria`

Metadados:
- `imagem`: Campo de imagem repetível para a galeria

## Implementação Técnica

### 1. Serviço de API (`src/services/cosmicService.js`)

Criamos um serviço centralizado para gerenciar todas as chamadas à API do Cosmic JS:

```javascript
import axios from 'axios';

const READ_KEY = 'QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA';
const BUCKET_SLUG = 'triboscapoeira-production';
const API_URL = `https://api.cosmicjs.com/v3/buckets/${BUCKET_SLUG}`;

// Função para buscar configurações gerais
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

// Função para buscar dados da galeria
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

// Funções específicas para seções individuais
export async function getImagens() { ... }
export async function getContatoInfo() { ... }
export async function getQuemSomosInfo() { ... }
export async function getUnidadesInfo() { ... }
export async function getNoticiasInfo() { ... }
```

### 2. Utilização nos Componentes

Os componentes React utilizam o padrão de react hooks para buscar dados do CMS:

```javascript
import { useEffect, useState } from 'react';
import { getQuemSomosInfo } from '@/services/cosmicService';

export default function MeuComponente() {
  const [quemSomosData, setQuemSomosData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getQuemSomosInfo();
        setQuemSomosData(data || {});
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Renderização condicional com fallback para dados estáticos
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Quem Somos</h2>
      <p>{quemSomosData?.quem_somos || 'Texto padrão para quem somos...'}</p>
    </div>
  );
}
```

## Processo de Atualização de Conteúdo (Para Administradores)

### Acessando o Painel do Cosmic JS

1. Acesse [https://app.cosmicjs.com/login](https://app.cosmicjs.com/login)
2. Faça login com as credenciais fornecidas
3. Selecione o bucket "triboscapoeira-production"

### Atualizando Configurações do Site

1. No painel lateral, clique em "Objects"
2. Encontre e clique em "Configuração do Site"
3. Clique em "Edit Object"
4. Navegue pelas seções (contato, quem somos, etc.) e atualize os campos conforme necessário
5. Clique em "Save" para aplicar as mudanças

### Gerenciando a Galeria

1. No painel lateral, clique em "Objects"
2. Encontre e clique em "Galeria"
3. Clique em "Edit Object"
4. Para adicionar novas imagens:
   - Vá até a seção "imagem" e clique em "Add Repeating Item"
   - Faça upload da nova imagem
   - Preencha os campos de metadados (título, descrição)
   - Clique em "Add"
5. Para remover ou reordenar imagens:
   - Use os controles de arrastar e soltar para reordenar
   - Clique no ícone de lixeira para remover uma imagem
6. Clique em "Save" para aplicar as mudanças

## Considerações de Segurança

- A chave de leitura (READ_KEY) é usada apenas para acessar dados públicos
- Não há funcionalidades de escrita implementadas no frontend (apenas leitura)
- Para operações de escrita, seria necessário implementar um backend seguro com autenticação adequada

## Melhorias Futuras

1. **Implementação de Cache**:
   - Armazenar dados em localStorage para reduzir chamadas à API
   - Implementar estratégias de revalidação para manter dados atualizados

2. **Sistema de Preview**:
   - Integrar com webhooks do Cosmic JS para atualizar a interface quando o conteúdo é alterado
   - Criar uma funcionalidade de preview para visualizar alterações antes de publicar

3. **Painel Administrativo Personalizado**:
   - Desenvolver uma interface administrativa personalizada dentro do site
   - Implementar autenticação segura para acesso administrativo 