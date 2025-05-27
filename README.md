# Tribos Capoeira - Site Oficial

Este projeto é o site oficial do Grupo Tribos Capoeira, desenvolvido com Next.js e integrado ao Cosmic JS CMS para gerenciamento de conteúdo dinâmico.

## Descrição

O site Tribos Capoeira foi criado para apresentar o grupo, suas atividades, eventos e notícias. Ele permite que o administrador atualize facilmente o conteúdo (como notícias, galeria de fotos e informações de contato) através do painel do Cosmic JS, sem necessidade de alterar o código.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **React**: Biblioteca JavaScript para construção de interfaces.
- **TypeScript**: Superset tipado de JavaScript para maior segurança e manutenibilidade.
- **Axios**: Cliente HTTP para realizar requisições à API do Cosmic JS.
- **CSS Modules**: Para estilização modular e isolada dos componentes.
- **Cosmic JS**: CMS headless para gerenciamento de conteúdo.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **src/pages**: Contém as páginas do site, como a página inicial (`index.tsx`), a página de notícias (`noticias/index.tsx`), a página de galeria (`galeria/index.tsx`) e a página de contato (`contato/index.tsx`).
- **src/services**: Contém o serviço de integração com o Cosmic JS (`cosmicService.js`), responsável por buscar os dados do CMS.
- **src/styles**: Contém os arquivos CSS modulares para estilização das páginas e componentes.
- **public**: Contém arquivos estáticos, como imagens e ícones, utilizados no site.

## Como Rodar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/triboscapoeira.git
   cd triboscapoeira
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse o site em `http://localhost:3000`.

## Integração com o Cosmic JS CMS

O site utiliza o Cosmic JS como CMS para gerenciar o conteúdo dinâmico. A integração é feita através do serviço `cosmicService.js`, que busca os dados do CMS e os disponibiliza para as páginas do site.

### Estrutura do Bucket no Cosmic JS

O bucket "triboscapoeira-production" foi configurado com os seguintes Object Types:

1. **Configuração do Site** (slug: `configuracao-do-site`)
   - Contém configurações gerais do site, como metadados para seções específicas (notícias, quem somos, unidades e contato).

2. **Galeria** (slug: `galeria`)
   - Gerencia as imagens da galeria do site, permitindo adicionar ou remover imagens facilmente.

### Endpoints da API

Os principais endpoints utilizados no projeto são:

- **Configuração do Site**:
  ```
  https://api.cosmicjs.com/v3/buckets/triboscapoeira-production/objects/67f474cfcbb3fe972a6384d7?pretty=true&read_key=QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA&depth=1&props=slug,title,metadata,type
  ```

- **Galeria**:
  ```
  https://api.cosmicjs.com/v3/buckets/triboscapoeira-production/objects/67f474e0cbb3fe972a6384d9?pretty=true&read_key=QPaf8PXfywhVJGuFWv9InKSuDZ7q2RPJzagHxDgGuXR0I0pMnA&depth=1&props=slug,title,metadata,type
  ```

## Como Atualizar o Conteúdo

### Atualizando a Seção "Quem Somos"

1. Acesse o painel administrativo do Cosmic JS.
2. Navegue até o bucket "triboscapoeira-production".
3. Encontre o objeto "Configuração do Site".
4. Clique para editar.
5. Na seção "quem_somos", atualize o texto no campo "quem_somos".
6. Salve as alterações.

### Adicionando Imagens à Galeria

1. Acesse o painel administrativo do Cosmic JS.
2. Navegue até o bucket "triboscapoeira-production".
3. Encontre o objeto "Galeria".
4. Clique para editar.
5. Na seção "imagem", clique em "Add Repeating Item".
6. Faça upload da nova imagem.
7. Preencha os metadados da imagem (título, descrição, etc.).
8. Salve as alterações.

## Considerações de Segurança

- A chave de leitura (READ_KEY) está exposta no cliente, mas isso é aceitável já que apenas permite leitura dos dados.
- Para operações de escrita, seria necessário implementar um backend seguro com a chave de escrita (WRITE_KEY) protegida.

## Próximos Passos

- Implementar autenticação para permitir que o cliente faça login e atualize o conteúdo diretamente pelo site.
- Adicionar cache para melhorar a performance.
- Implementar um sistema de preview para que o cliente veja as alterações antes de publicá-las.

## Contato

Para mais informações, entre em contato através do email: triboscapoeiraoficial@gmail.com
