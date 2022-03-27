<template>
  <div class="container">
    <v-row justify="space-around">
      <v-col>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Add Company</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add Company</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="client">Client</label>
                        <select v-model="company.client_id" id="client" class="form-select">
                          <option disabled selected>Select Client</option>
                          <option v-for="client in clients" :key="client.id" :value="client.id">
                            {{ client.name }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="types">Company Type</label>
                        <select v-model="company.company_type_id" id="types" class="form-select">
                          <option disabled selected>Select Type</option>
                          <option v-for="type in types" :key="type.id" :value="type.id">{{ type.type }}</option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          id="company_name"
                          v-model="company.name"
                          outlined
                          dense
                          placeholder="Company Name"
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="primary" type="submit" @click="onSend"> Save </v-btn>
                <v-btn color="danger" @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row v-if="companies">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="companies"
          item-key="id"
          class="elevation-1"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: icons.mdiArrowLeft,
            lastIcon: icons.mdiArrowRight,
            prevIcon: icons.mdiMinus,
            nextIcon: icons.mdiPlus,
          }"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiArrowLeft, mdiArrowRight, mdiMinus, mdiPlus } from '@mdi/js'
import axios from 'axios'

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiMinus,
        mdiPlus,
      },
      company: {
        name: null,
        client_id: null,
        company_type_id: null,
      },
      clients: null,
      types: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
      ],
      companies: null,
    }
  },
  mounted() {
    axios
      .get('/companies')
      .then(res => {
        this.companies = res.data.response
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .get('/company-types')
      .then(res => {
        this.types = res.data.response
      })
      .catch(error => {
        console.log(error)
      })
    axios
      .get('/clients')
      .then(res => {
        this.clients = res.data.response
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    onSend() {
      axios
        .post('/companies/store', this.company)
        .then(() => {
          location.reload()
        })
        .catch(() => {
          console.error()
        })
    },
  },
}
</script>
