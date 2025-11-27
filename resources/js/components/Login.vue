<template>
    
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login User</div>
                    <div class="card-body">
                        <form method="POST" action="" @submit.prevent="login($event)">
                            <input type="hidden" name="_token" :value="csrf_token">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-mail</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" value="" required autocomplete="email" autofocus v-model="email">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Senha</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password" v-model="password">
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                        <label class="form-check-label" for="remember">
                                            Mantenha-me conectado
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                
                                    <a class="btn btn-link" href="#">
                                        Esqueci a senha
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    props: ['csrf_token'],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login(e) {

                let url = 'http://localhost:8000/api/login'
                let configuracao = {
                    method: 'post',
                    body: new URLSearchParams({
                        'email': this.email,
                        'password': this.password
                    })
                }

                fetch(url, configuracao)
                    .then(response => response.json())
                    .then(data => {
                        if(data.token) {
                            document.cookie = 'token='+data.token+';SameSite=Lax'
                        }

                //dar sequência no envio do form de autenticação por sessão
                e.target.submit()

                })  
            }
        }
    }

</script>


<!--<script>
/*
export default {
    props: ['csrf_token'],
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login(e) {
            e.preventDefault() // impede envio automático do form

            const url = 'http://localhost:8000/api/login'

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    },
                    body: new URLSearchParams({
                        email: this.email,
                        password: this.password
                    })
                })

                const data = await response.json()
                console.log('Resposta do login:', data)

                if (data.token) {
                    // salva o token como cookie com path global
                    document.cookie = 'token=' + data.token + '; path=/'
                    console.log('Token salvo nos cookies:', data.token)

                    // redireciona manualmente
                    window.location.href = '/home';
                } else {
                    alert('Usuário ou senha inválido!')
                }

            } catch (error) {
                console.error('Erro ao tentar logar:', error)
                alert('Erro de conexão com o servidor.')
            }
        }
    }
}
*/
</script>-->


