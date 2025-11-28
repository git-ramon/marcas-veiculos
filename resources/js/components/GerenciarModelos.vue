<template>
    <div class="container container-modelo">
        <div class="row justify-content-center">
            <div class="col-md-10">

                <!-- início do card de busca -->
                <card-component titulo="Busca de modelos">
                    <template v-slot:conteudo>
                        <div class="form-row">

                            <div class="col mb-3">
                                <input-container-component titulo="ID" id="inputId" id-help="idHelp" texto-ajuda="Opcional. Informe o ID do modelo">
                                    <input type="number" class="form-control" id="inputId" aria-describedby="idHelp" placeholder="ID" v-model="busca.id">
                                </input-container-component>
                            </div>

                            <div class="col mb-3">
                                <input-container-component titulo="Nome do modelo" id="inputNome" id-help="nomeHelp" texto-ajuda="Opcional. Informe o nome do modelo">
                                    <input type="text" class="form-control" id="inputNome" aria-describedby="nomeHelp" placeholder="Nome do modelo" v-model="busca.nome">
                                </input-container-component>
                            </div>

                            <div class="col mb-3">
                                <input-container-component titulo="Marca" id="inputMarca" id-help="inputMarcaHelp" texto-ajuda="Opcional. Filtrar pela marca">
                                    <select class="form-control" v-model="busca.marca_id">
                                        <option value="">Todas</option>
                                        <option v-for="m in marcas" :key="m.id" :value="m.id">
                                            {{ m.nome }}
                                        </option>
                                    </select>
                                </input-container-component>
                            </div>

                        </div>
                    </template>

                    <template v-slot:rodape>
                        <button type="submit" class="btn btn-primary btn-sm float-right" @click="pesquisar()">Pesquisar</button>
                    </template>
                </card-component>
                <!-- fim do card de busca -->


                <!-- início do card de listagem -->
                <card-component titulo="Relação de modelos">
                    <template v-slot:conteudo>
                        <table-component 
                            :dados="modelos.data"
                            :visualizar="{visivel: true, dataToggle: 'modal', dataTarget: '#modalModeloVisualizar'}"
                            :atualizar="{visivel: true, dataToggle: 'modal', dataTarget: '#modalModeloAtualizar'}"
                            :remover="{visivel: true, dataToggle: 'modal', dataTarget: '#modalModeloRemover'}"
                            :titulos="{
                                id: {titulo: 'ID', tipo: 'texto'},
                                nome: {titulo: 'Modelo', tipo: 'texto'},
                                marca: { titulo: 'Marca', tipo: 'relacao' },
                                imagem: {titulo: 'Imagem', tipo: 'imagem'},
                                numero_portas: {titulo: 'Portas', tipo: 'texto'},
                                lugares: {titulo: 'Lugares', tipo: 'texto'},
                                air_bag: {titulo: 'AirBag', tipo: 'booleano'},
                                abs: {titulo: 'ABS', tipo: 'booleano'},
                                created_at: {titulo: 'Criação', tipo: 'data'},
                            }"
                        ></table-component>
                    </template>

                    <template v-slot:rodape>
                        <div class="row">
                            <div class="col-10">
                                <paginate-component>
                                    <li v-for="l, key in modelos.links" :key="key" 
                                        :class="l.active ? 'page-item active' : 'page-item'" 
                                        @click="paginacao(l)"
                                    >
                                        <a class="page-link" v-html="l.label"></a>
                                    </li>
                                </paginate-component>
                            </div>
                            
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalModelo">
                                Adicionar
                            </button>
                            
                        </div>
                    </template>
                </card-component>
                <!-- fim do card de listagem -->
            </div>
        </div>



        <!-- Modal Adicionar Modelo -->
        <modal-component id="modalModelo" titulo="Adicionar modelo">

            <template v-slot:alertas>
                <alert-component tipo="success" :detalhes="transacaoDetalhes" titulo="Cadastro realizado com sucesso" v-if="transacaoStatus == 'adicionado'"></alert-component>
                <alert-component tipo="danger" :detalhes="transacaoDetalhes" titulo="Erro ao tentar cadastrar o modelo" v-if="transacaoStatus == 'erro'"></alert-component>
            </template>

            <template v-slot:conteudo>
                <div class="form-group">
                    <input-container-component titulo="Nome do modelo">
                        <input type="text" class="form-control" v-model="form.nome">
                    </input-container-component>
                </div>

                <div class="form-group">
                    <input-container-component titulo="Marca">
                        <select class="form-control" v-model="form.marca_id">
                            <option value="" disabled>Selecione a marca</option>
                            <option v-for="m in marcas" :key="m.id" :value="m.id">{{ m.nome }}</option>
                        </select>
                    </input-container-component>
                </div>

                <div class="form-group">
                    <input-container-component titulo="Imagem">
                        <input type="file" class="form-control-file" @change="arquivoImagem = $event.target.files">
                    </input-container-component>
                </div>

                <div class="form-row">
                    <div class="col mb-3">
                        <input-container-component titulo="Número de portas">
                            <input type="number" class="form-control" v-model="form.numero_portas">
                        </input-container-component>
                    </div>

                    <div class="col mb-3">
                        <input-container-component titulo="Lugares">
                            <input type="number" class="form-control" v-model="form.lugares">
                        </input-container-component>
                    </div>
                </div>

                <div class="form-row">
                    <div class="col mb-3">
                        <input-container-component titulo="Possui AirBag?">
                            <select class="form-control" v-model="form.air_bag">
                                <option :value="1">Sim</option>
                                <option :value="0">Não</option>
                            </select>
                        </input-container-component>
                    </div>

                    <div class="col mb-3">
                        <input-container-component titulo="Possui ABS?">
                            <select class="form-control" v-model="form.abs">
                                <option :value="1">Sim</option>
                                <option :value="0">Não</option>
                            </select>
                        </input-container-component>
                    </div>
                </div>
            </template>

            <template v-slot:rodape>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="salvar()">Salvar</button>
            </template>
        </modal-component>
        <!-- fim modal adicionar -->



        <!-- Modal Visualizar -->
        <modal-component id="modalModeloVisualizar" titulo="Visualizar modelo">
            <template v-slot:conteudo>

                <input-container-component titulo="ID">
                    <input type="text" class="form-control" :value="$store.state.item.id" disabled>
                </input-container-component>

                <input-container-component titulo="Modelo">
                    <input type="text" class="form-control" :value="$store.state.item.nome" disabled>
                </input-container-component>

                <input-container-component titulo="Marca" v-if="$store.state.item.marca">
                    <input type="text" class="form-control" :value="$store.state.item.marca.nome" disabled>
                </input-container-component>

                <input-container-component titulo="Imagem">
                    <img :src="'storage/'+$store.state.item.imagem" v-if="$store.state.item.imagem">
                </input-container-component>

                <div class="row">

                <div class="col-md-3">
                    <input-container-component titulo="Portas">
                        <input type="text" class="form-control" :value="$store.state.item.numero_portas" disabled>
                    </input-container-component>
                </div>

                <div class="col-md-3">
                    <input-container-component titulo="Lugares">
                        <input type="text" class="form-control" :value="$store.state.item.lugares" disabled>
                    </input-container-component>
                </div>

                <div class="col-md-3">
                    <input-container-component titulo="AirBag">
                        <input type="text" class="form-control" :value="$store.state.item.air_bag ? 'Sim' : 'Não'" disabled>
                    </input-container-component>
                </div>

                <div class="col-md-3">
                    <input-container-component titulo="ABS">
                        <input type="text" class="form-control" :value="$store.state.item.abs ? 'Sim' : 'Não'" disabled>
                    </input-container-component>
                </div>

            </div>


            </template>

            <template v-slot:rodape>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </template>
        </modal-component>



        <!-- Modal Remover -->
        <modal-component id="modalModeloRemover" titulo="Remover modelo">

            <template v-slot:alertas>
                <alert-component tipo="success" titulo="Transação realizada com sucesso" :detalhes="$store.state.transacao" v-if="$store.state.transacao.status == 'sucesso'"></alert-component>
                <alert-component tipo="danger" titulo="Erro na transação" :detalhes="$store.state.transacao" v-if="$store.state.transacao.status == 'erro'"></alert-component>
            </template>

            <template v-slot:conteudo>

                <input-container-component titulo="ID">
                    <input type="text" class="form-control" :value="$store.state.item.id" disabled>
                </input-container-component>

                <input-container-component titulo="Nome">
                    <input type="text" class="form-control" :value="$store.state.item.nome" disabled>
                </input-container-component>

            </template>

            <template v-slot:rodape>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-danger" @click="remover()">Remover</button>
            </template>
        </modal-component>



        <!-- Modal Atualizar -->
        <modal-component id="modalModeloAtualizar" titulo="Atualizar modelo">

             <template v-slot:alertas>
                <alert-component tipo="success" titulo="Transação realizada com sucesso" :detalhes="$store.state.transacao" v-if="$store.state.transacao.status == 'sucesso'"></alert-component>
                <alert-component tipo="danger" titulo="Erro na transação" :detalhes="$store.state.transacao" v-if="$store.state.transacao.status == 'erro'"></alert-component>
            </template>

            <template v-slot:conteudo>

                <input-container-component titulo="Modelo">
                    <input type="text" class="form-control" v-model="$store.state.item.nome">
                </input-container-component>

                <input-container-component titulo="Marca">
                    <select class="form-control" v-model="$store.state.item.marca_id">
                        <option v-for="m in marcas" :key="m.id" :value="m.id">
                            {{ m.nome }}
                        </option>
                    </select>
                </input-container-component>

                <input-container-component titulo="Imagem">
                    <input type="file" class="form-control-file" @change="carregarImagem($event)">
                </input-container-component>

                <input-container-component titulo="Portas">
                    <input type="number" class="form-control" v-model="$store.state.item.numero_portas">
                </input-container-component>

                <input-container-component titulo="Lugares">
                    <input type="number" class="form-control" v-model="$store.state.item.lugares">
                </input-container-component>

                <input-container-component titulo="AirBag">
                    <select class="form-control" v-model="$store.state.item.air_bag">
                        <option :value="1">Sim</option>
                        <option :value="0">Não</option>
                    </select>
                </input-container-component>

                <input-container-component titulo="ABS">
                    <select class="form-control" v-model="$store.state.item.abs">
                        <option :value="1">Sim</option>
                        <option :value="0">Não</option>
                    </select>
                </input-container-component>

            </template>

            <template v-slot:rodape>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="atualizar()">Atualizar</button>
            </template>
        </modal-component>

    </div>
</template>


<!--
<script>
import Paginate from './Paginate.vue'

export default {
    components: { Paginate },

    data() {
            return {
                urlBase: 'http://localhost:8000/api/v1/modelo',
                urlPaginacao: '',
                urlFiltro: '',
                nomeModelo: '',
                arquivoImagem: [],
                transacaoStatus: '',
                transacaoDetalhes: {},
                modelos: { data: [] },

                // ADICIONE AQUI
                marcas: [],

                busca: { id: '', nome: '', marca_id: '' },
                form: {
                    nome: '',
                    marca_id: '',
                    imagem: null,
                    numero_portas: '',
                    lugares: '',
                    air_bag: '',
                    abs: ''
                }
            }
        },

    methods: {
        atualizar() {
            let formData = new FormData()
            formData.append('_method', 'patch')
            formData.append('nome', this.$store.state.item.nome)
            formData.append('marca_id', this.$store.state.item.marca_id)
            formData.append('ano', this.$store.state.item.ano)

            if (this.arquivoImagem[0]) {
                formData.append('imagem', this.arquivoImagem[0])
            }

            let url = this.urlBase + '/' + this.$store.state.item.id

            axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                this.$store.state.transacao.status = 'sucesso'
                this.$store.state.transacao.mensagem = 'Modelo atualizado com sucesso!'
                this.carregarLista()
            })
            .catch(errors => {
                this.$store.state.transacao.status = 'erro'
                this.$store.state.transacao.mensagem = errors.response.data.message
                this.$store.state.transacao.dados = errors.response.data.errors
            })
        },

        remover() {
            if (!confirm('Tem certeza que deseja remover este modelo?')) return

            let formData = new FormData()
            formData.append('_method', 'delete')

            let url = this.urlBase + '/' + this.$store.state.item.id

            axios.post(url, formData)
            .then(response => {
                this.$store.state.transacao.status = 'sucesso'
                this.$store.state.transacao.mensagem = response.data.msg
                this.carregarLista()
            })
            .catch(errors => {
                this.$store.state.transacao.status = 'erro'
                this.$store.state.transacao.mensagem = errors.response.data.erro
            })
        },

        pesquisar() {
            let filtro = ''

            for (let chave in this.busca) {
                if (this.busca[chave]) {

                    if (filtro !== '') {
                        filtro += ';'
                    }

                    filtro += chave + ':like:' + this.busca[chave]
                }
            }

            if (filtro !== '') {
                this.urlPaginacao = 'page=1'
                this.urlFiltro = '&filtro=' + filtro
            } else {
                this.urlFiltro = ''
            }

            this.carregarLista()
        },

        paginacao(l) {
            if (l.url) {
                this.urlPaginacao = l.url.split('?')[1]
                this.carregarLista()
            }
        },

        carregarLista() {
            let url = this.urlBase + '?' + this.urlPaginacao + this.urlFiltro
                
            axios.get(url)
                .then(response => {
                    this.modelos = response.data
                })
                .catch(errors => {
                    console.log(errors)
                })
        },

        carregarImagem(e) {
            this.arquivoImagem = e.target.files
        },

        carregarMarcas() {
            axios.get('http://localhost:8000/api/v1/marca-todas')
                .then(response => {
                    this.marcas = response.data;
                })
                .catch(error => {
                    console.log('Erro ao carregar marcas:', error);
                });
        },

        salvar() {
            let formData = new FormData()
            formData.append('nome', this.form.nome)
            formData.append('marca_id', this.form.marca_id)
            formData.append('imagem', this.form.imagem)

            formData.append('numero_portas', this.form.numero_portas)
            formData.append('lugares', this.form.lugares)
            formData.append('air_bag', this.form.air_bag)
            formData.append('abs', this.form.abs)

            axios.post(this.urlBase, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                this.$store.state.transacao.status = 'sucesso'
                this.$store.state.transacao.mensagem = 'Modelo cadastrado com sucesso!'
                this.carregarLista()
            })
            .catch(errors => {
                this.transacaoStatus = 'erro'
                this.transacaoDetalhes = {
                    mensagem: errors.response.data.message,
                    dados: errors.response.data.errors
                }
            })
        }
    },

    mounted() {
        this.carregarLista()
        this.carregarMarcas()
    }
}
</script>-->

<script>
import Paginate from './Paginate.vue'

export default {
    components: { Paginate },

    data() {
        return {
            urlBase: 'http://localhost:8000/api/v1/modelo',
            urlPaginacao: '',
            urlFiltro: '',
            nomeModelo: '',
            arquivoImagem: [],               // arquivos selecionados
            transacaoStatus: '',
            transacaoDetalhes: {},
            modelos: { data: [], links: [] }, // garante estrutura esperada pelo table-component

            marcas: [],

            busca: { id: '', nome: '', marca_id: '' },
            form: {
                nome: '',
                marca_id: '',
                imagem: null,
                numero_portas: '',
                lugares: '',
                air_bag: 1,
                abs: 1
            }
        }
    },

    methods: {
        atualizar() {
            let formData = new FormData()
            formData.append('_method', 'patch')
            formData.append('nome', this.$store.state.item.nome)
            formData.append('marca_id', this.$store.state.item.marca_id)
            formData.append('numero_portas', this.$store.state.item.numero_portas)
            formData.append('lugares', this.$store.state.item.lugares)
            formData.append('air_bag', this.$store.state.item.air_bag)
            formData.append('abs', this.$store.state.item.abs)

            if (this.arquivoImagem[0]) {
                formData.append('imagem', this.arquivoImagem[0])
            }

            let url = this.urlBase + '/' + this.$store.state.item.id

            axios.post(url, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                this.$store.state.transacao.status = 'sucesso'
                this.$store.state.transacao.mensagem = 'Modelo atualizado com sucesso!'
                this.carregarLista()
            })
            .catch(errors => {
                this.$store.state.transacao.status = 'erro'
                this.$store.state.transacao.mensagem = errors.response?.data?.message || 'Erro'
                this.$store.state.transacao.dados = errors.response?.data?.errors || {}
            })
        },

       /* remover() {
            if (!confirm('Tem certeza que deseja remover este modelo?')) return

            let formData = new FormData()
            formData.append('_method', 'delete')

            let url = this.urlBase + '/' + this.$store.state.item.id

            axios.post(url, formData)
            .then(response => {
                this.$store.state.transacao.status = 'sucesso'
                this.$store.state.transacao.mensagem = response.data.msg
                this.carregarLista()
            })
            .catch(errors => {
                this.$store.state.transacao.status = 'erro'
                this.$store.state.transacao.mensagem = errors.response?.data?.erro || 'Erro'
            })
        },*/

        remover() {
            let url = this.urlBase + '/' + this.$store.state.item.id

            axios.delete(url)
                .then(response => {
                    this.$store.state.transacao.status = 'sucesso'
                    this.$store.state.transacao.mensagem = 'Modelo removido com sucesso!'
                    this.carregarLista()
                })
                .catch(errors => {
                    this.$store.state.transacao.status = 'erro'
                    this.$store.state.transacao.mensagem = errors.response?.data?.erro || 'Erro ao remover o modelo.'
                })
        },


        pesquisar() {
            let filtro = ''

            for (let chave in this.busca) {
                if (this.busca[chave]) {
                    if (filtro !== '') filtro += ';'
                    filtro += chave + ':like:' + this.busca[chave]
                }
            }

            if (filtro !== '') {
                this.urlPaginacao = 'page=1'
                this.urlFiltro = '&filtro=' + filtro
            } else {
                this.urlFiltro = ''
            }

            this.carregarLista()
        },

        paginacao(l) {
            if (l.url) {
                this.urlPaginacao = l.url.split('?')[1]
                this.carregarLista()
            }
        },

        carregarLista() {
            const url = this.urlBase + '?' + this.urlPaginacao + this.urlFiltro

            axios.get(url)
                .then(response => {
                    const data = response.data

                    // Se a API retornar já um objeto paginado (com data e links), usa direto.
                    if (data && data.data && Array.isArray(data.data)) {
                        this.modelos = data
                    } else if (Array.isArray(data)) {
                        // Se retornar array simples, adapta para a estrutura esperada pelo table-component
                        this.modelos = { data: data, links: [] }
                    } else {
                        // fallback
                        this.modelos = { data: [], links: [] }
                    }
                })
                .catch(errors => {
                    console.log(errors)
                    this.modelos = { data: [], links: [] }
                })
        },

        carregarImagem(e) {
            this.arquivoImagem = e.target.files
        },

        carregarMarcas() {
            axios.get('/api/v1/marca-todas')
                .then(response => {
                    this.marcas = response.data || []
                })
                .catch(error => {
                    console.log('Erro ao carregar marcas:', error)
                    this.marcas = []
                })
        },

        salvar() {
            // usa os campos vinculados ao `form` do template
            let formData = new FormData()
            formData.append('nome', this.form.nome)
            formData.append('marca_id', this.form.marca_id)
            formData.append('numero_portas', this.form.numero_portas)
            formData.append('lugares', this.form.lugares)
            formData.append('air_bag', this.form.air_bag)
            formData.append('abs', this.form.abs)

            if (this.arquivoImagem[0]) {
                formData.append('imagem', this.arquivoImagem[0])
            }

            axios.post(this.urlBase, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                // sucesso: exibe alerta dentro do modal e recarrega a lista
                this.transacaoStatus = 'adicionado'
                this.transacaoDetalhes = { mensagem: 'ID do modelo cadastrado: ' + response.data.id }

                // limpa formulário (mantém modal aberto para exibir alerta)
                this.form.nome = ''
                this.form.marca_id = ''
                this.form.numero_portas = ''
                this.form.lugares = ''
                this.form.air_bag = 1
                this.form.abs = 1
                this.arquivoImagem = []
                // limpar input file visual (se quiser)
                const fileInputs = document.querySelectorAll('#modalModelo input[type="file"]')
                fileInputs.forEach(i => i.value = '')

                // atualiza lista
                this.carregarLista()
            })
            .catch(errors => {
                this.transacaoStatus = 'erro'
                this.transacaoDetalhes = {
                    mensagem: errors.response?.data?.message || 'Erro ao cadastrar',
                    dados: errors.response?.data?.errors || {}
                }
                console.log('Erro na resposta: ', errors.response || errors)
            })
        }
    },

    mounted() {
        this.urlPaginacao = 'page=1'
        this.carregarLista()
        this.carregarMarcas()
    },

    watch: {
            transacaoStatus(novo) {
                if (novo !== null && novo !== '') {
                    setTimeout(() => {
                        this.transacaoStatus = null;
                        this.transacaoDetalhes = null;
                    }, 5000); // 5 segundos
                }
            }
        }
}
</script>

