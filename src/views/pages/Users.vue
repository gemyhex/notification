<template>
  <div class="container">
    <v-row justify="space-around">
      <v-col>
        <v-dialog transition="dialog-top-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">Add User</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>Add User</v-toolbar>
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-form>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          id="username"
                          v-model="user.username"
                          outlined
                          dense
                          placeholder="Username"
                          hide-details
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          id="email"
                          v-model="user.email"
                          outlined
                          dense
                          placeholder="Email"
                          hide-details
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          id="password"
                          v-model="user.password"
                          type="password"
                          outlined
                          dense
                          placeholder="Password"
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="primary" type="submit"> Save </v-btn>
                <v-btn color="danger" @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="users"
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

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiMinus,
        mdiPlus,
      },
      user: {
        username: null,
        email: null,
        password: null,
      },
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
      ],
      users: [
        {
          id: '1',
          name: 'Frozen Yogurt',
        },
        {
          id: '2',
          name: 'Ice cream sandwich',
        },
        {
          id: '3',
          name: 'Eclair',
        },
        {
          id: '4',
          name: 'Cupcake',
        },
        {
          id: '5',
          name: 'Gingerbread',
        },
        {
          id: '6',
          name: 'Jelly bean',
        },
      ],
    }
  },
}
</script>
