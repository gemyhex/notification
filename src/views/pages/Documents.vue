<template>
  <div class="container">
    <v-row justify="space-around">
      <v-col>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Add Document</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add Document</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="group">Document Group</label>
                        <select v-model="document.document_group_id" id="group" class="form-select">
                          <option disabled selected>Select Group</option>
                          <option v-for="group in groups" :key="group.id" :value="group.id">
                            {{ group.name }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="document_name">Name</label>
                        <v-text-field
                          id="document_name"
                          v-model="document.name"
                          outlined
                          dense
                          placeholder="Document Name"
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
    <v-row v-if="documents">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="documents"
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
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiMinus,
        mdiPlus,
      },
      document: {
        name: null,
        document_group_id: null,
      },
      groups: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
      ],
      documents: null,
    }
  },
  mounted() {
    axios.get('/documents').then(res => {
      this.documents = res.data.response
    })
    axios
      .get('/documents-groups')
      .then(res => {
        this.groups = res.data.response
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    async onSend() {
      await axios
        .post('/documents/store', this.document)
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
