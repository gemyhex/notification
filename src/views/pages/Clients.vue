<template>
  <div class="container">
    <v-row justify="space-around">
      <v-col>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Add Client</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add Client</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-form @submit.prevent="onSend">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          id="Fullname"
                          v-model="client.name"
                          outlined
                          dense
                          placeholder="Fullname"
                          hide-details
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          id="phone"
                          v-model="client.phone"
                          outlined
                          type="number"
                          dense
                          placeholder="Phone"
                          hide-details
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          id="address"
                          v-model="client.address"
                          type="text"
                          outlined
                          dense
                          placeholder="Address"
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
    <v-row v-if="clients">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="clients"
          item-key="id"
          class="elevation-1"
          :mobile-breakpoint="0"
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
      perPage: 10,
      currentPage: 1,
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiMinus,
        mdiPlus,
      },
      client: {
        name: null,
        phone: null,
        address: null,
      },
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone' },
        { text: 'Address', value: 'address' },
      ],
      clients: null,
    }
  },
  mounted() {
    axios
      .get('/clients')
      .then(res => {
        this.clients = res.data.response
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    rows() {
      return this.clients.length
    },
  },
  methods: {
    async onSend() {
      await axios
        .post('/clients/store', this.client)
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