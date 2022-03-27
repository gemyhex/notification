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
                        <label id="lbl_inp" for="employee">Employee</label>
                        <select v-model="document.employee_id" id="employee" class="form-select">
                          <option disabled selected>Select Employee</option>
                          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                            {{ emp.name }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="document">Document</label>
                        <select v-model="document.document_id" id="document" class="form-select">
                          <option disabled selected>Select Document</option>
                          <option v-for="doc in documents" :key="doc.id" :value="doc.id">
                            {{ doc.name }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="document_name">Type</label>
                        <select v-model="document.type" id="type" class="form-select">
                          <option disabled selected>Select Type</option>
                          <option value="year">Yearly</option>
                          <option value="month">Monthly</option>
                          <option value="quarter">Quarterly</option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="document_name">Date</label>
                        <!-- <v-date-picker
                          v-model="document.due_date"
                          :allowed-dates="allowedDates"
                          min="2016-01-01"
                          max="2100-01-01"
                        ></v-date-picker> -->
                        <input type="date" v-model="document.due_date" class="form-select" />
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
        employee_id: null,
        document_id: null,
        type: null,
        due_date: null,
      },
      employees: null,
      documents: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Employee', value: 'employee' },
        { text: 'Name', value: 'document' },
        { text: 'Date', value: 'due_date' },
        { text: 'Type', value: 'type' },
      ],
      docs: null,
    }
  },
  mounted() {
    axios.get('/employees/get/notifications').then(res => {
      this.docs = res.data.response
      console.log(res.data.response);
    })
    axios.get('/employees').then(res => {
      this.employees = res.data.response
    })
    axios.get('/documents').then(res => {
      this.documents = res.data.response
    })
  },
  methods: {
    onSend() {
      axios
        .post(`/employees/assign-documents/${this.document.employee_id}`, this.document)
        .then(res => {
          console.log(res)
          location.reload()
        })
        .catch(() => {
          console.error()
        })
    },
  },
}
</script>
