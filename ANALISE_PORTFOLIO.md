# Análise do portfólio

Revisão em 21 de setembro de 2026. Fonte dos dados profissionais: `curriculo/Matheus_Silva_Gino_Curriculo_2026.pdf`, idêntico ao PDF enviado. As descrições e tecnologias dos projetos adicionais foram preservadas do portfólio existente; não foram deduzidos novos resultados, responsabilidades ou números.

## Diagnóstico e mudanças realizadas

| Problema encontrado | Mudança |
| --- | --- |
| Posicionamento como especialista e métricas sem comprovação no currículo: “3+ anos”, “15+ projetos” e “100% clientes satisfeitos”. | Apresentação como desenvolvedor de software em início de carreira e estudante; remoção dessas métricas, da idade e de promessas de senioridade. |
| Competências do currículo ausentes ou pouco visíveis. | Linguagens, front-end, back-end, dados e ferramentas organizados; SQL, SQL Server, Git, Excel e VS Code incluídos. |
| Certificação “Cisco Networking AWS” e experiência avançada em cloud não confirmadas pelo PDF. | Mantida AWS Academy Cloud Foundations — AWS Academy Graduate; removidas as alegações não documentadas. |
| Formação podia parecer concluída. | Bacharelado em andamento com conclusão prevista para dezembro de 2026. |
| Currículo antigo para download e e-mail divergente nos dados estruturados. | Links para o PDF enviado e e-mail unificado; URLs de identidade alinhadas ao portfólio indicado no PDF. |
| Desfoque fixo prejudicava textos e botões; conteúdo de projetos dependia de hover. | Tema escuro e dourado preservado com leitura nítida; descrições e ações sempre visíveis. |
| Seção Sobre escondia texto em rolagem interna. | Apresentação contínua, acessível e adaptada a telas pequenas. |
| Menu, filtros, carrossel e vídeos tinham limitações de teclado e comportamento. | Estados ARIA, controles de carrossel, filtros sem temporizadores concorrentes e diálogo de vídeo com Escape e retorno de foco. |
| Scripts externos e iframes carregavam conteúdo desnecessário. | Ícones SVG locais, fundo em CSS, remoção de iframes e vídeos sem reprodução automática ao entrar na página. |
| Links de PDF e vídeos em atributos HTML não eram empacotados pelo Vite. | Configuração de produção emite os arquivos e atualiza os caminhos dos links e do player. |

## O que ainda precisa de conteúdo seu

1. **Estudos de caso de Zync, Zenit e Nexus.** Registrar problema, contexto, sua participação individual, decisões técnicas e resultado verificável. Informar se cada projeto é acadêmico, pessoal ou profissional e suas datas.
2. **Links diretos para os repositórios.** Cada projeto deve levar ao código correspondente quando ele puder ser público. Um perfil geral do GitHub não substitui esse acesso. Para Zenit, complementar o vídeo com arquitetura, documentação de API, instruções de execução e evidências de testes.
3. **Resultados concretos.** Incluir entregas e melhorias de automação, interfaces e dashboards somente com números ou exemplos que possam ser confirmados.
4. **Credencial AWS verificável.** Acrescentar o link oficial da credencial e a data de emissão quando disponíveis. O currículo confirma o nome, mas não fornece o link.
5. **Recuperar a demonstração do Cronograma de Estudos.** A URL respondeu HTTP 402 nesta revisão; o card foi preservado e sinalizado como temporariamente indisponível. A resposta não permite concluir a causa.
6. **Reduzir o tamanho dos vídeos.** Os arquivos originais têm aproximadamente 53 MB, 74 MB e 98 MB. Foram preservados e carregam sob interação; exportações menores ajudariam em conexões móveis. Uma imagem de compartilhamento horizontal dedicada também pode melhorar a prévia nas redes.

## Verificação das demonstrações

Checagem HTTP em 21/09/2026, sem login ou alterações nos serviços:

- Nexus: HTTP 200 — https://a3-ter-a-blond.vercel.app/
- Xá das Cinco: HTTP 200 — https://xadascinco.vercel.app/
- The Six Mayfair: HTTP 200 — https://card5-thesix-coral.vercel.app/
- Zync: HTTP 200 — https://zync-navy-two.vercel.app/
- Cronograma de Estudos: HTTP 402 — https://cronograma-estudos-nine.vercel.app/

HTTP 200 confirma que a página respondeu, não que todas as funcionalidades ou integrações de cada projeto foram testadas. Nenhuma publicação foi realizada nesta revisão.
