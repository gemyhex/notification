<template>
  <div class="container">
    <v-row justify="space-around">
      <v-col>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Add Employee</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add Employee</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="client">Company</label>
                        <select v-model="employee.company_id" id="client" class="form-select">
                          <option disabled selected>Select Company</option>
                          <option v-for="company in companies" :key="company.id" :value="company.id">
                            {{ company.name }}
                          </option>
                        </select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <label id="lbl_inp" for="employee_name">Name</label>
                        <v-text-field
                          id="employee_name"
                          v-model="employee.name"
                          outlined
                          dense
                          placeholder="Employee Name"
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
    <v-row v-if="employees">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="employees"
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
      employee: {
        name: null,
        company_id: null,
      },
      companies: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
      ],
      employees: null,
    }
  },
  beforeCreate() {
    axios.get('/employees').then(res => {
      this.employees = res.data.response
    })
    axios
      .get('/companies')
      .then(res => {
        this.companies = res.data.response
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    onSend() {
      axios
        .post('/employees/store', this.employee)
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
