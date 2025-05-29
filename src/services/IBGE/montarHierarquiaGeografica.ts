// Este script Node.js melhora performance e estabilidade ao acessar a API do IBGE
// Estratégias:
// - Cache em disco para reduzir chamadas redundantes
// - Retry com backoff para erros temporários
// - Controle de paralelismo e delays
// - Estruturação otimizada de dados

// import fs from 'fs/promises';
// import fetch from 'node-fetch';

// const CACHE_DIR = './.ibge-cache';
// const RATE_DELAY = 300; // delay entre requisições em ms (evita limites de taxa)

// // Utilitário para cache
// async function fetchComCache(url) {
//   const key = url.replace(/\W+/g, '_');
//   const path = `${CACHE_DIR}/${key}.json`;

//   try {
//     await fs.mkdir(CACHE_DIR, { recursive: true });
//     const cached = await fs.readFile(path, 'utf-8');
//     return JSON.parse(cached);
//   } catch (_) {
//     // cache miss
//   }

//   let tentativas = 3;
//   while (tentativas > 0) {
//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`Erro ${res.status}`);
//       const json = await res.json();
//       await fs.writeFile(path, JSON.stringify(json, null, 2));
//       await new Promise((res) => setTimeout(res, RATE_DELAY));
//       return json;
//     } catch (err) {
//       tentativas--;
//       if (tentativas === 0) throw err;
//       await new Promise((res) => setTimeout(res, 1000));
//     }
//   }
// }

// // Funções para cada nível
// async function getRegioes() {
//   return await fetchComCache('https://servicodados.ibge.gov.br/api/v1/localidades/regioes');
// }

// async function getEstadosPorRegiao(idRegiao) {
//   return await fetchComCache(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${idRegiao}/estados`);
// }

// async function getMesorregioesPorEstado(idEstado) {
//   return await fetchComCache(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/mesorregioes`);
// }

// async function getMicrorregioesPorMesorregiao(idMeso) {
//   return await fetchComCache(`https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes/${idMeso}/microrregioes`);
// }

// async function getMunicipiosPorMicrorregiao(idMicro) {
//   return await fetchComCache(`https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/${idMicro}/municipios`);
// }

// // Função principal
// async function montarHierarquiaGeografica() {
//   const regioes = await getRegioes();
//   const resultado = [];

//   for (const regiao of regioes) {
//     const estados = await getEstadosPorRegiao(regiao.id);
//     const estadosCompletos = [];

//     for (const estado of estados) {
//       const mesorregioes = await getMesorregioesPorEstado(estado.id);
//       const mesorregioesCompletas = [];

//       for (const meso of mesorregioes) {
//         const microrregioes = await getMicrorregioesPorMesorregiao(meso.id);
//         const microrregioesCompletas = [];

//         for (const micro of microrregioes) {
//           const municipios = await getMunicipiosPorMicrorregiao(micro.id);
//           microrregioesCompletas.push({
//             id: micro.id,
//             nome: micro.nome,
//             municipios: municipios.map(m => ({ id: m.id, nome: m.nome }))
//           });
//         }

//         mesorregioesCompletas.push({
//           id: meso.id,
//           nome: meso.nome,
//           microrregioes: microrregioesCompletas
//         });
//       }

//       estadosCompletos.push({
//         id: estado.id,
//         sigla: estado.sigla,
//         nome: estado.nome,
//         mesorregioes: mesorregioesCompletas
//       });
//     }

//     resultado.push({
//       id: regiao.id,
//       sigla: regiao.sigla,
//       nome: regiao.nome,
//       estados: estadosCompletos
//     });
//   }

//   return resultado;
// }

// // Exemplo de uso
// montarHierarquiaGeografica().then(data => {
//   console.log(JSON.stringify(data, null, 2));
// }).catch(err => {
//   console.error('Erro ao montar hierarquia:', err);
// });
