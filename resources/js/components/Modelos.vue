<!--<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Modelos de Veículos</h2>

    <div class="row">
      <div v-for="modelo in modelos" :key="modelo.id" class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm border-0 rounded-4">
          <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 200px; object-fit: cover;" />
          <div class="card-body">
            <h5 class="card-title">{{ modelo.nome }}</h5>
            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Modelos",
  data() {
    return {
      modelos: [],
    };
  },
  mounted() {
    this.getModelos();
  },
  methods: {
    async getModelos() {
      try {
        const response = await axios.get("/api/v1/modelo");
        this.modelos = response.data;
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    },
  },
};
</script>-->

<template>
  <div class="carousel slide" id="carouselExampleControls" data-bs-ride="carousel">
    <h2 class="text-center mb-4">Modelos de Veículos</h2>
    
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 1" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      
      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 2" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 3" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 4" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 5" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

      </div>

      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 6" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

      </div>

      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 7" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

      </div>

      <div class="carousel-item">
        <div class="d-flex justify-content-center align-items-center" style="min-height: 50vh;">
            <div class="row">
            <div v-for="(modelo, index) in modelos" :key="modelo.id" v-if="modelo.id === 8" class="">
                <div class="card border-0">
                <img :src="'/storage/' + modelo.imagem" class="card-img-top" alt="Imagem do modelo" style="height: 35vh" />
                    <div class="card-body text-center" style="white-space: nowrap; overflow-x: auto;">
                        <h5 class="card-title mb-3">{{ modelo.nome }}</h5>
                        <div class="d-flex justify-content-center flex-wrap gap-3">
                            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
                            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
                            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
                            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden"><< Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Próximo >></span>
    </button>

    <!-- Card com informações -->
    <!--<div class="row">
      <div v-for="modelo in modelos" :key="modelo.id" class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm border-0 rounded-4">
   
          <div class="card-body">
            <h5 class="card-title">{{ modelo.nome }}</h5>
            <p><strong>Portas:</strong> {{ modelo.numero_portas }}</p>
            <p><strong>Lugares:</strong> {{ modelo.lugares }}</p>
            <p><strong>Airbag:</strong> {{ modelo.air_bag ? 'Sim' : 'Não' }}</p>
            <p><strong>ABS:</strong> {{ modelo.abs ? 'Sim' : 'Não' }}</p>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>


<script>
import axios from "axios";

export default {
    name: "Modelos",
    data() {
        return {
        modelos: [],
        indiceAtual: 0
        };
    },

  name: 'ModelosCarousel',
  mounted() {
    this.getModelos();

    this.$nextTick(() => {
      const el = document.getElementById('carouselExampleControls');
      if (!el) {
        console.warn('Elemento do carousel não encontrado');
        return;
      }

      if (window.bootstrap && window.bootstrap.Carousel) {
        try {
          // Destroi instância antiga, se houver
          const existing = window.bootstrap.Carousel.getInstance?.(el);
          if (existing) existing.dispose();

          // Cria nova instância
          this.carouselInstance = new window.bootstrap.Carousel(el, {
            interval: 3000,
            ride: 'carousel',
            touch: true,
            pause: 'hover'
          });

          console.log('Carousel inicializado com sucesso!');

          // Ativa manualmente os botões prev/next
          const prevBtn = el.querySelector('.carousel-control-prev');
          const nextBtn = el.querySelector('.carousel-control-next');

          if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.carouselInstance.prev());
            nextBtn.addEventListener('click', () => this.carouselInstance.next());
          }
        } catch (err) {
          console.error('Erro inicializando Carousel:', err);
        }
      } else {
        console.warn('Bootstrap JS não disponível no window.bootstrap');
      }
    });
  },
  beforeDestroy() {
    if (this.carouselInstance && this.carouselInstance.dispose) {
      this.carouselInstance.dispose();
    }
  },
  methods: {
    anterior() {
    this.indiceAtual =
      this.indiceAtual === 0 ? this.modelos.length - 1 : this.indiceAtual - 1;
    },
    proximo() {
        this.indiceAtual =
        this.indiceAtual === this.modelos.length - 1 ? 0 : this.indiceAtual + 1;
    },

    async getModelos() {
      try {
        const response = await axios.get("/api/v1/modelo");
        this.modelos = response.data;
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    },
  },
};
</script>


<style scoped>
.carousel {
  max-width: 800px;
  margin: 0 auto;
}

carousel-inner img {
  height: 500px; /* deixa a imagem grande */
  object-fit: cover; /* corta proporcionalmente */
  border-radius: 15px;
}

.carousel-control-prev-icon, .carousel-control-prev,
.carousel-control-next-icon, .carousel-control-next {
  color: #000000 !important;
  opacity: revert !important;
}

.carousel-control-prev {
    left: -200px;
}

.carousel-control-next {
    right: -200px;
}

.carousel-control-prev:hover {
    color: #000000 !important;
}

.container {
  max-width: 900px; /* centraliza e limita largura */
}

p {
    padding: 0.8rem;
}

</style>


