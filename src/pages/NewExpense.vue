<template>
<main class="bg-gray-100 flex-1 relative pb-8 z-0 overflow-y-auto ">
    <page-header />
    <form id="new-expense" v-on:submit.prevent="submitForm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white text-left shadow overflow-hidden sm:rounded-lg ">
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
            Opret udgift
            </h3>
        </div>
        <div class="border-t border-gray-200">
            <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class=" p-2 text-sm font-medium text-gray-500">
                Navn
                </dt>
                <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input v-model="form.expense_name" type="text" name="expense_name" id="expense_name" class="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Udgifts navn">
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class=" p-2 text-sm font-medium text-gray-500">
                Note
                </dt>
                <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input v-model="form.expense_notes" type="text" name="expense_notes" id="expense_notes" class="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Udgifts note">
                </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                Udgiftskategori
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select v-model="form.expense_category" id="expense_category" name="expense_category" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option selected>Administrationsomkostninger (DK)</option>
                    <option >Lokaleomkostninger (DK)</option>
                    <option >Salgsomkostninger (DK)</option>
                    <option >Transportomkostninger (DK)</option>
                    <option >Vareforbrug (DK)</option>
                  </select>
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                Udgiftsdato
                </dt>
                <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input v-model="form.due_date" type="text" name="due_date" id="due_date" class="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="2021-01-22">
                </dd>

            </div>
            

            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                Udgiftsbeløb
                </dt>
                <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input @change="calcVat()" v-model="form.amount" type="text" name="amount" id="amount" class="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="100">
                </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                Moms
                </dt>
                <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input disabled v-model="form.tax" type="text" name="tax" id="tax" class="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="0">
                </dd>
            </div>
            </dl>
        </div>
        <div class=" border-t border-gray-200 px-4 py-5 sm:px-6">
            <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Tilføj udgift
            </button>
        </div>
        </div>
    </div>
    </form>
</main>

</template>

<script>
import PageHeader from '@/components/PageHeader'


export default {
  components: {
    PageHeader,
  },
  data () {
    return {
      form:{
      },
      errors: [],
    }
  },
  methods: {
    calcVat (){
      this.form.tax = (this.form.amount / 0.80) - this.form.amount
    },
    submitForm(){
      this.$axios.post('/new/expense', this.form)
            .then((res) => {
                //Perform Success Action
                console.log(res)
                this.$router.push("/");
            })
            .catch((error) => {
                // error.response.status Check status code
                console.log(error)
            }).finally(() => {
                //Perform action in always
            });
    }

  }
}
</script>