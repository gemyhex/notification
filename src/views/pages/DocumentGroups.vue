<template>
  <div class="container">
    <v-row justify="space-around">
      <v-col>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Add Document Group</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add Document Group</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          id="groupName"
                          v-model="doc.name"
                          outlined
                          dense
                          placeholder="Group Name"
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
    <v-row v-if="docs">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="docs"
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
      doc: {
        name: null,
      },
      docs: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
      ],
    }
  },
  mounted() {
    axios.get('/documents-groups').then(res => {
      this.docs = res.data.response
    })
  },
  methods: {
    async onSend() {
      await axios
        .post('/documents-groups/store', this.doc)
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
