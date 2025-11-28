/*
import Swal from 'sweetalert2';

const { default: axios } = require('axios');

window._ = require('lodash');


try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}


window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


axios.interceptors.request.use(
    config => {

        //deinifir para todas as requisições os parâmetros de accept e autorization
        config.headers['Accept'] = 'application/json'

        //recuperando o token de autorização dos cookies
        let token = document.cookie.split(';').find(indice => {
            return indice.includes('token=')
        })

        token = token.split('=')[1]
        token = 'Bearer ' + token

        config.headers.Authorization = token

        console.log('Interceptando o request antes do envio', config)
        return config
    },
    error => {
        console.log('Erro na requisição: ', error)

        return Promise.reject(error)
    }
)

// interceptar os responses da aplicação
axios.interceptors.response.use(
    response => {
        console.log('Interceptando a resposta antes da aplicação', response)
        return response
    },
    error => {
        console.log('Erro na resposta: ', error.response)

        if(error.response.status == 401 && error.response.data.message == 'Token has expired') {
            console.log('Fazer uma nova requisição para rota refresh')

            axios.post('http://localhost:8000/api/refresh')
                .then(response => {
                    console.log('Refresh com sucesso: ', response)

                    document.cookie = 'token='+response.data.token
                    console.log('Token atualizado: ', response.data.token)
                    window.location.reload()
                })

                .catch(refreshError => {

                    console.log('Erro no refresh: ', refreshError)

                    // SE O REFRESH TAMBÉM FALHAR → SESSÃO REALMENTE EXPIRADA
                    Swal.fire({
                        icon: 'warning',
                        title: 'Sessão Expirada',
                        text: 'Sua sessão expirou. Faça login novamente.',
                        confirmButtonText: 'OK'
                    }).then(() => {

                        // remove token
                        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

                        // redireciona para login
                        window.location.href = '/login';
                    });
                })
        }

        return Promise.reject(error)
    }
)
*/

/**
 * Bootstrap JS para Laravel + Axios + SweetAlert2
 */

import _ from 'lodash';
window._ = _;

import Swal from 'sweetalert2';
window.Swal = Swal;

/**
 * Configuração do Axios
 */
import axios from 'axios';
window.axios = axios;

// Sempre enviar este cabeçalho
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Token CSRF
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token não encontrado. Verifique a tag <meta name="csrf-token"> no seu layout.');
}

/**
 * Interceptor GLOBAL – captura 401 e força logout
 */


let isHandling401 = false; // evita múltiplos popups/requests simultâneos

window.axios.interceptors.response.use(
  response => response,
  async error => {
    // se não houver resposta (timeout, network), deixa seguir
    if (!error.response) return Promise.reject(error);

    const status = error.response.status;

    // Se já estamos tratando um 401, rejeita silenciosamente
    if (status === 401 && isHandling401) {
      return Promise.reject(error);
    }

    if (status === 401) {
      isHandling401 = true;

      try {
        // Primeiro: se houver mensagem do backend informando token expirado,
        // podemos tentar refresh — MAS seu objetivo é forçar logout, então vamos direto para o logout WEB.
        // Tenta derrubar a sessão Laravel via rota POST /force-logout (deve existir em web.php)
        try {
          // Chama rota web para destruir session (CSRF header já configurado)
          await window.axios.post('/force-logout');
        } catch (e) {
          // se der erro, ignora - ainda vamos seguir removendo token e redirecionando
          console.warn('Erro ao chamar /force-logout (pode ser ok):', e);
        }

        // Remove o token do cookie (JWT)
        deleteCookie('token');
        // Também remove de localStorage caso vc use lá
        localStorage.removeItem('token');

        // Exibe alerta pro usuário e redireciona após confirmação
        await Swal.fire({
          icon: 'warning',
          title: 'Sessão expirada',
          text: 'Sua sessão expirou. Faça login novamente.',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false
        });

        // Redirecionamento definitivo para login
        window.location.replace('/login');

        // Rejeita a promise para bloquear o .then do componente
        return Promise.reject(new Error('Sessão expirada - redirecionando'));
      } finally {
        isHandling401 = false;
      }
    }

    return Promise.reject(error);
  }
);


// helpers de cookie
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

window.axios.interceptors.request.use(
  config => {
    config.headers['Accept'] = 'application/json';

    const raw = getCookie('token');
    if (raw) {
      // se token existe no cookie, espera formato puro (sem 'Bearer ')
      // ajuste se o cookie já salva 'Bearer <token>'
      let token = raw;
      if (!token.startsWith('Bearer ')) token = 'Bearer ' + token;
      config.headers['Authorization'] = token;
    } else {
      // garante não enviar header Authorization vazio
      delete config.headers['Authorization'];
    }

    return config;
  },
  error => Promise.reject(error)
);


