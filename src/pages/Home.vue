<template>


<main class="bg-gray-100 flex-1 relative pb-8 z-0 overflow-y-auto">
    <page-header />

      <div class="text-left">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900">Sidste 30 dage</h2>
          <div>
            <dl class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
              <div v-for="stat in overview_data" :key="stat" class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900">
                  {{ stat.name }}
                </dt>
                <dd v-if="overview_data" class="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {{numberFormatter(stat.thismonth)}}
                    <span class="ml-2 text-sm font-medium text-gray-500">
                      from {{numberFormatter(stat.lastmonth)}}
                    </span>
                  </div>


                  <div v-if="stat.thismonth < stat.lastmonth" class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                    <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">
                      Decreased by
                    </span>
                    {{ numberFormatter(((stat.thismonth-stat.lastmonth)/stat.lastmonth * 100).toFixed(2)) }}%
                  </div>

                  <div v-if="stat.thismonth > stat.lastmonth" class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                    <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                    {{ numberFormatter(((stat.thismonth-stat.lastmonth)/stat.lastmonth * 100).toFixed(2)) }}%
                  </div>

                  <div v-if="stat.thismonth == stat.lastmonth" class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 md:mt-2 lg:mt-0">
                    0%
                  </div>
                </dd>
              </div>
            
            <div v-if="isLoading.overview" v-for="n in 3" :key="n" class="px-4 py-5 sm:p-6">
                <dt class="text-base font-normal text-gray-900">
                  <div class="grid grid-cols-2 h-5 gap-1 w-full">
                    <div class="col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                  </div>
                </dt>
              </div>
            </dl>
          </div>
        </div>

        <h2 class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Seneste udgifter
        </h2>
        <!-- Activity table (small breakpoint and up) -->
        <div class="hidden sm:block">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col mt-2">
              <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Udgiftsnavn 
                      </th>
                      <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Beløb
                      </th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                        Moms
                      </th>
                      <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Betalingsdato
                      </th>
                    </tr>
                  </thead>

                  <!-- Viser sig kun når den fetcher/henter data fra api'en -->
                  <tbody v-if="isLoading.expenses" class="bg-white divide-y divide-gray-200">
                    <tr v-for="(n) in 4" :key="n" class="bg-white">
                      <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="flex">
                          <a class="group inline-flex space-x-2 truncate text-sm w-full">
                            <div class="grid grid-cols-10 h-5 gap-1 w-full">
                              <div class="col-span-3 rounded-sm bg-gray-200 animate-pulse"></div>
                              <div class=" col-span-4 rounded-sm bg-gray-200 animate-pulse"></div>
                              <div class=" col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                            </div>
                          </a>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <div class="grid grid-cols-2 h-5 gap-1 w-full">
                          <div class="col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                        </div>
                      </td>
                      <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <div class="grid grid-cols-2 h-5 gap-1 w-full">
                          <div class="col-span-2 rounded-sm bg-gray-200 animate-pulse"></div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <div class="grid grid-cols-3 h-5 gap-1 w-full">
                          <div class="col-span-3 rounded-sm bg-gray-200 animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <!-- 
                    Viser table body når den har indhentet data fra Apien. 
                    Det gør den vha et if statement (v-if). Man bruger "v" som prefix, for at Vue ser det som noget den skal kompile.
                    Altså, Direktiver er specielle attributter med "v-" præfikset. Direktivattributværdier forventes at være et enkelt 
                    JavaScript-udtryk (med undtagelse af v-for, som kommer om lidt). Et direktivs opgave er at anvende Reaktiv forandringer 
                    reaktivt på DOM, når værdien af ​​dets udtryk ændres.
                    I denne er det altså hvis variablen expenses har en værdi at den vises.
                  -->
                  <tbody v-if="expenses" class="bg-white divide-y divide-gray-200">
                    <!--
                      Vi kan bruge "v-for" direktivet til at gengive en liste over emner baseret på et array. Den v-for direktivet kræver en 
                      speciel syntaks i form af "item in items", hvor "items" er datakilden fra et array og "item" et alias for array elementet der er 
                      itererede på
                    -->
                    <tr  v-for="(expense, idx) in expenses" :key="expense" class="bg-white">
                      <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div class="flex">
                          <router-link :to="{ name: 'expense', params: { id: expense.id }}" class="group inline-flex space-x-2 truncate text-sm">
                            <!-- Heroicon name: solid/cash -->
                            <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                            </svg>
                            <p class="text-gray-500 truncate group-hover:text-gray-900">
                              <!--
                                Den mest grundlæggende form for databinding er tekstinterpolering ved hjælp af syntaksen "Mustache" (double curly brackets)
                                som ses nedenfor. Mustache koden erstattes med værdien af expense.name property'en på det tilsvarende dataobjekt. Det opdateres også, 
                                når dataobjektets expense.name property'en ændres.
                              -->
                              {{  expense.expense_name }}
                            </p>
                          </router-link>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <span class="text-gray-900 font-medium">{{expense.amount}} DKK </span>
                      </td>
                      <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span class="text-gray-900 font-medium">{{expense.tax}} DKK </span>
                      </td>
                      <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <time datetime="2020-07-11">{{ dateFormatter(expense.due_date, 'DD-MM/YY') }}</time>
                      </td>
                    </tr>

                    <!-- More items... -->
                  </tbody>
                </table>
                <!-- Pagination -->
                <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Viser
                      <span class="font-medium">{{expenses.length}}</span>
                      resultat(er)
                    </p>
                  </div>
                  <div class="flex-1 flex justify-between sm:justify-end">
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>


</template>

<script>
/*eslint no-mixed-spaces-and-tabs: "error"*/

// @ Er alias for mappen /src
// import axios from 'axios';
// import moment from 'moment'

// Her indhenter vi vores PageHeader template fra vores componeter
import PageHeader from '@/components/PageHeader'
export default {
  components: {
      // Her indskriver vi at vi har tænkt os at anvende den i vores html.
      PageHeader
  },
  // Vores navn på nuværende component eller page
  name: 'Home',

  /**
   * Type: Function
   * Detaler:  
   * Data er en funktion, der returnerer et dataobjekt til component instance'en. 
   * I data, anbefales det typisk ikke bruge deres egen statefulde opførsel 
   * som browser API objekter og prototype egenskaber. En god idé ville være at 
   * have her bare et almindeligt objekt, der repræsenterer komponentdata.
   */
  data() {
    return {
      isLoading: {
        overview: true,
        expenses: true,
      },
      overview_data: null,
      expenses: [],
      errors: [],
    }
  },

 
  // Lifecycle hooks
  /**
   * Created
   * Type: Function 
   * Kaldes sunkront, efter at component instancen er lavet . På dette stadium er 
   * instancen færdig med at behandle indstillingerne, hvilket betyder, at 
   * følgende er konfigureret: data observation, computed properties, methods, 
   * watch/event callbacks. Imidlertid er monteringsfasen ikke startet, og 
   * $el property'en vil ikke være tilgængelig endnu.
   * 
   * Det er derfor vi kalder funktionerne for at de allerede sættes igang inden
   * componentet er færdigbrygget. Det gør altså vi asynkront kan indhente data
   * fra fx en API.
   */
  created() {
    this.getOverview();
    this.getExpenses();
  },

methods: {
    getExpenses(){
      this.isLoading.expenses = true,
      this.$axios.get("/expenses")
      .then((res) => {
          this.expenses = res.data
          console.log(res);
      })
      .catch((error) => {
          this.error = true;
          console.log(error)
      }).finally(() => {
          this.isLoading.expenses =  false
      });
    },
  
    async getOverview() {
      this.isLoading.overview = true,
      this.$axios.get("/expenses/overview")
      .then((res) => {
          this.overview_data = res.data
          console.log(res);
      })
      .catch((error) => {
          this.error = true;
          console.log(error)
      }).finally(() => {
          this.isLoading.overview =  false
      });

    },
    // async getExpenses() {
    //   try {
    //     const response = await this.$axios.get("/expenses")
    //     this.expenses = response.data
    //     console.log(response.data);
    //   } catch (err) {
    //     this.errors.push(err)
    //   }
    // },
    // getOverview() {
    //   this.$axios
    //     .get("/expenses-overview")
    //     .then(response => {
    //     this.overview_data = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.errored = true
    //   })
    //   .finally(() => this.loading = false)

    // },

  }
}
</script>