<template>
    <div class="container-fluid mt-0 py-0">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card shadow-sm mb-4">
                    <div class="card-header bg-primary text-white text-center py-1">
                        <h4>Bem-vindo ao Sistema</h4>
                    </div>

                    <div class="card-body text-center">
                        <p class="mb-2">Confira abaixo os principais indicadores do sistema:</p>

                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <div class="card border-0 shadow-sm h-100">
                                    <div class="card-body bg-info text-white rounded">
                                        <h5 class="card-title">Marcas</h5>
                                        <h2 class="fw-bold">{{ indicadores.marcas }}</h2>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3">
                                <div class="card border-0 shadow-sm h-100">
                                    <div class="card-body bg-success text-white rounded">
                                        <h5 class="card-title">Modelos</h5>
                                        <h2 class="fw-bold">{{ indicadores.modelos }}</h2>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3">
                                <div class="card border-0 shadow-sm h-100">
                                    <div class="card-body bg-warning text-dark rounded">
                                        <h5 class="card-title">Usuários</h5>
                                        <h2 class="fw-bold">{{ indicadores.usuarios }}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p class="text-muted mb-2">
                            Dados atualizados automaticamente a cada acesso.
                        </p>
                    </div>

                    <div class="row mt-5">
                    <div class="col-md-6">
                        <div class="card p-3 shadow-sm border-0 rounded-4">
                        <div class="card-body">
                            <h5 class="card-title mb-3 text-center">Distribuição de Marcas</h5>
                            <div class="chart-container">
                            <canvas id="polarChart"></canvas>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card p-3 shadow-sm border-0 rounded-4">
                            <div class="card-body">
                                <h5 class="card-title mb-3 text-center">indicadores de Cadastro</h5>
                                <div class="chart-container">
                                    <canvas id="graficoPizza"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Chart, registerables } from 'chart.js'
    Chart.register(...registerables)

    export default {
    data() {
        return {
        indicadores: { marcas: 0, modelos: 0, usuarios: 0 }
        }
    },
    mounted() {
        fetch('http://localhost:8000/api/v1/dashboard/indicadores')
        .then(response => response.json())
        .then(data => {
            this.indicadores = data
            this.criarGraficos()
        })
        .catch(err => console.error('Erro ao carregar indicadores:', err))
    },
    methods: {
        criarGraficos() {
        const labels = ['Marcas', 'Modelos', 'Usuários']
        const valores = [
            this.indicadores.marcas,
            this.indicadores.modelos,
            this.indicadores.usuarios
        ]

        // Gráfico de barras
        const ctxPolar = document.getElementById('polarChart').getContext('2d');
        const polarChart = new Chart(ctxPolar, {
            type: 'polarArea',
            data: {
            labels: ['Fiat', 'Chevrolet', 'Toyota', 'Volkswagen', 'Honda'],
            datasets: [{
                label: 'Marcas',
                data: [12, 9, 5, 7, 10],
                backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
                ],
                borderWidth: 1
            }]
            },
            options: {
            responsive: true,
            maintainAspectRatio: false
            }
        });

        // Gráfico de pizza
        new Chart(document.getElementById('graficoPizza'), {
            type: 'pie',
            data: {
            labels,
            datasets: [{
                data: valores,
                backgroundColor: ['#6cb2eb', '#1cc88a', '#ffed4a']
            }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        })
        }
    }
    }
</script>

<style scoped>
    .chart-container {
    position: relative;
    height: 400px;
    width: 100%;
    }

    canvas {
    width: 100% !important;
    height: 100% !important;
    }
</style>