<template>
  <div class="container">
    <!-- <v-row justify="space-around">
      <v-col>
        <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
          <v-card>
            <v-toolbar color="primary" dark> Add Client </v-toolbar>
            <v-card-text class="mt-5">
              <v-form @submit.prevent="onSend">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      id="Fullname"
                      v-model.trim="$v.client.name.$model"
                      outlined
                      dense
                      placeholder="Fullname"
                      hide-details
                      aria-required="true"
                      :class="{ 'is-invalid': validateStatus($v.client.name) }"
                    ></v-text-field>
                    <div v-if="!$v.client.name.required" class="invalid-feedback">The fullname field is required.</div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      id="phone"
                      v-model.trim="$v.client.phone.$model"
                      outlined
                      type="number"
                      dense
                      placeholder="Phone"
                      hide-details
                      aria-required="true"
                      :class="{ 'is-invalid': validateStatus($v.client.phone) }"
                    ></v-text-field>
                    <div v-if="!$v.client.phone.required" class="invalid-feedback">The phone field is required.</div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      id="address"
                      v-model.trim="$v.client.address.$model"
                      type="text"
                      outlined
                      dense
                      placeholder="Address"
                      hide-details
                      :class="{ 'is-invalid': validateStatus($v.client.address) }"
                    ></v-text-field>
                    <div v-if="!$v.client.address.required" class="invalid-feedback">
                      The address field is required.
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn v-if="!isLoading" color="primary" type="submit" @click="onSend"> Save </v-btn>
              <v-btn v-else type="submit" color="primary">
                <button class="btn" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Saving...
                </button>
              </v-btn>
              <v-btn color="danger" @click="dialog = false"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row> -->
    <div v-if="clients.length">
      <v-data-table :headers="headers" :items="clients" sort-by="id" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Clients</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> New Client </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-form @submit.prevent>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            id="Fullname"
                            v-model.trim="$v.client.name.$model"
                            outlined
                            dense
                            placeholder="Fullname"
                            hide-details
                            aria-required="true"
                            :class="{ 'is-invalid': validateStatus($v.client.name) }"
                          ></v-text-field>
                          <div v-if="!$v.client.name.required" class="invalid-feedback">
                            The fullname field is required.
                          </div>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            id="phone"
                            v-model.trim="$v.client.phone.$model"
                            outlined
                            type="number"
                            dense
                            placeholder="Phone"
                            hide-details
                            aria-required="true"
                            :class="{ 'is-invalid': validateStatus($v.client.phone) }"
                          ></v-text-field>
                          <div v-if="!$v.client.phone.required" class="invalid-feedback">
                            The phone field is required.
                          </div>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-text-field
                            id="address"
                            v-model.trim="$v.client.address.$model"
                            type="text"
                            outlined
                            dense
                            placeholder="Address"
                            hide-details
                            :class="{ 'is-invalid': validateStatus($v.client.address) }"
                          ></v-text-field>
                          <div v-if="!$v.client.address.required" class="invalid-feedback">
                            The address field is required.
                          </div>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
                  <v-btn color="blue darken-1" type="submit" text @click.stop="save" v-if="!isLoading"> Save </v-btn>
                  <v-btn v-else type="submit" color="blue darken-1">
                    <button type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Saving...
                    </button>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm($event)" v-if="!isDeleteing">OK</v-btn>
                  <v-btn v-else type="submit" color="blue darken-1">
                    <button type="button" disabled>
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Deleteing...
                    </button>
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.id="{ item }">
          {{ clients.indexOf(item) + 1 }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> {{ icons.mdiPencil }} </v-icon>
          <v-icon small @click="deleteItem(item, $event)"> {{ icons.mdiDelete }} </v-icon>
        </template>
      </v-data-table>
    </div>
    <v-row v-else>
      <div class="alert alert-warning" role="alert" v-if="isError">
        <div class="alert-cont">
          <v-icon class="icon" @click="isError = !isError">{{ icons.mdiClose }}</v-icon>
          <p>If the data didn't load yet , please sign out and try again !</p>
        </div>
      </div>
      <v-col class="liquid">
        <svg
          id="logoLoading"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          fill="none"
          width="675.4px"
          height="224.2px"
          viewBox="0 0 675.4 224.2"
          style="overflow: visible; enable-background: new 0 0 675.4 224.2"
          xml:space="preserve"
        >
          <defs></defs>
          <g>
            <g>
              <g>
                <g>
                  <path class="st0" d="M104,166.5c-0.1-11.1,17.5-11.1,17.4,0C121.7,178,103.7,178,104,166.5z" />
                </g>
                <g>
                  <path class="st1" d="M82.2,166.6c-0.1-11.1,17.4-11.2,17.4-0.1C99.9,178,81.9,178.1,82.2,166.6z" />
                </g>
                <g>
                  <path class="st0" d="M78.3,166.7c0.1,11.4-17.8,11.3-17.4-0.1C60.8,155.3,78.4,155.4,78.3,166.7z" />
                </g>
              </g>
              <g>
                <path
                  class="st0"
                  d="M90,29.8c0.2,3.5,4.6,3.6,5.1,0.2c-0.3-9.5,0.7-19.4-0.4-28.7c-2.1-2.5-5.2-1.1-4.7,2.2
				C90,12.2,89.9,21,90,29.8z"
                />
                <path
                  class="st0"
                  d="M126.5,31.9c6.1-6.8,9.6-16.2,14.7-23.9c0.9-1.5,0.7-3.2-0.5-3.9c-3.7-1.8-5.1,4.6-6.9,6.8
				C132.8,14.9,117.8,32.1,126.5,31.9z"
                />
                <path
                  class="st0"
                  d="M58.1,25.4c0.9,1.6,2,3.8,3.5,4.6c2.6,0,3.7-1.9,2.7-3.6c-4.3-7.6-8.7-15.1-13.1-22.6
				c-1-1.8-2.5-2.4-3.9-1.5C43.7,5.6,56.5,20.5,58.1,25.4z"
                />
                <path
                  class="st0"
                  d="M176.9,103.4c-2.7-2.2-5.8-2.4-7.3-2.3c0.3-14.3,1.2-27.5-13-25.8c-0.2,0.1-25.8,0-26.8,0.1
				c-3.7-10.3-20.3-7.3-20,3.8c-0.3,11.5,17,14.1,20.2,3.3c2.4,0,22.5,0,24.3,0c1.9,0.1,6-0.4,6.8,0.3c0.7,0.7,1.7,3.3,1.4,13.8
				l0,4.6c-8.5,0.9-41.5-2.3-44.3,1.9c-2.9,3.6-0.9,8.6-1.4,12.6c-10.7,3.4-7.9,20.4,3.5,20.1c11.3,0.3,14.2-16.5,3.6-20
				c0-1.2,0-6.4-0.1-7.6c8.2-0.3,36.8,0.3,45.9,0.1c0.5-0.1,1.3-0.3,2.7,0.6c3.6,2.8,1.2,24.4,1.8,28.7c1.1,11-22.3,13.4-21.6-1.2
				c10.6-3.5,7.8-20.4-3.5-20.1c-11.3-0.3-14.1,16.6-3.6,20.1c-0.6,23.6,36.5,22.1,35.8,1.2C180.4,129.9,184.2,108.3,176.9,103.4z
				 M120.2,82.5c-4.2,0.1-4.2-6.6,0-6.5C124.4,75.9,124.4,82.6,120.2,82.5z M120.2,128.7c-4.2,0.1-4.2-6.6,0-6.5
				C124.4,122.1,124.4,128.8,120.2,128.7z M149,123.4c4.2-0.1,4.2,6.6,0,6.5C144.8,129.9,144.8,123.3,149,123.4z"
                />
                <path
                  class="st0"
                  d="M152.1,186.8c-23.3,28.4-64.9,36-97.9,19.8c-15.4-8.1-30.6-5.2-45.6,2c0-18.2,0-33.8,0-52
				c-4.7-1.5-7-4.2-8.6-8.5V220c1,3.5,4.9,4.8,7.5,2c24.7-25.6,45.8-1.2,72.4,0.9c46.8,5.9,89-25.9,99.1-70.4
				c-4.8,4.7-8.1,4.8-10.1,5C165.6,167.8,160,177.6,152.1,186.8z"
                />
                <path
                  class="st0"
                  d="M93.1,122.5v7.3h6.4c0-1.7,0-67.5,0-71.3c0-7.4,6-13.3,13.3-13.3c22.3-1.1,27.2,2.3,25.9,25.2l6.4,0.2
				c1.7-26.1-6.6-33.5-32.3-31.8c-10.9,0-19.8,8.9-19.8,19.8V122.5z"
                />
                <path
                  class="st0"
                  d="M17.7,153.7c11.1,1.5,19.8-9.5,18.8-17.4c10.6-3.5,7.8-20.4-3.6-20.1c-11.3-0.3-14.1,16.6-3.5,20.1
				c0.6,14.6-22.7,12.2-21.6,1.2c0.7-4.4-1.8-25.8,1.8-28.7c1.4-0.9,2.2-0.7,2.7-0.6c9.3,0.3,37.6-0.4,45.9-0.1
				c-0.1,1.1,0,6.4-0.1,7.6c-10.5,3.6-7.6,20.4,3.6,20c11.4,0.3,14.1-16.7,3.5-20.1c-0.6-4.1,1.5-9-1.4-12.6
				c-2.7-4.2-35.9-1-44.3-1.9c0,0,0-4.6,0-4.6c-0.4-10.4,0.7-13.1,1.4-13.8c0.9-0.8,4.9-0.3,6.8-0.3c1.7,0,22,0,24.3,0
				c3.2,10.9,20.5,8.3,20.2-3.3c0.3-11.2-16.2-14.2-20-3.8c-1.1,0-26.6,0-26.8-0.1c-14.2-1.8-13.3,11.5-13,25.8
				c-16.6-1.4-10.8,26.4-11.7,36.4C0.7,143,4.2,153.3,17.7,153.7z M33,123.4c4.2-0.1,4.2,6.6,0,6.5C28.7,129.9,28.7,123.3,33,123.4z
				 M61.8,128.7c-4.2,0.1-4.2-6.6,0-6.5C66,122.1,66,128.8,61.8,128.7z M61.8,76c4.2-0.1,4.2,6.6,0,6.5C57.6,82.6,57.6,75.9,61.8,76
				z"
                />
                <path
                  class="st0"
                  d="M43.2,58.5c0.4-14.6,15.2-13.7,25.9-13.3c7.4,0,13.3,6,13.3,13.3c0,4.1,0,69.2,0,71.3h6.4
				c0-1.7,0-67.5,0-71.3c0-10.9-8.9-19.8-19.8-19.8C43.4,37,35.1,44.4,36.8,70.5l6.4-0.2V58.5z"
                />
              </g>
            </g>
            <g>
              <g>
                <path
                  class="st0"
                  d="M241.2,169.1c-14.9,0-25.9-5.1-33-15.3l12.9-7.7c12.9,18,50.9,7.3,32.9-16.1c-7.6-6.3-29.1-11.2-35.3-18.4
				c-10.4-8.6-9.1-29.8,1.7-37.9c14.2-12.3,43.6-9.5,53,7.5v14.1c0,1.4,0.1,1.4-1.3,1.5c-12.9-0.8-11.5,3.7-11.4-8.7
				c-10.6-17.1-47.2-3.6-27.9,15.6c8.2,6.5,28.5,10,35,17.7c10.1,8.9,8.7,32-2,39.9C259.8,166.7,251.1,168.5,241.2,169.1z"
                />
                <path
                  class="st0"
                  d="M401.4,165.5c0,1.4,0.1,1.4-1.3,1.5c-0.6-0.1-14,0.3-14-0.3c-0.8-1.4,0-74-0.3-75.5L356,133.1
				c-0.7,0.8-1.5,1.2-2.4,1.2c-2-0.4-11.8,1.1-13-1.2c0,0-29.9-42-29.9-42c-0.3,1.5,0.5,74.3-0.3,75.6c0.1,0.6-13.5,0.1-14,0.3
				c-1.4-0.1-1.3-0.1-1.3-1.5c0,0,0-85.1,0-85.1h-10.1c-1.4-0.1-1.3-0.1-1.3-1.5c0.2-0.8-0.3-9.6,0.3-10.1c0.1-0.1,0.5-0.3,1.2-0.3
				h26.5c1.1,0,1.9,0.4,2.4,1.2l34.5,49.7L383,69.8c0.7-0.8,1.5-1.2,2.4-1.2h14.9c3.9-0.6,0.3,95.1,1.5,96.8L401.4,165.5z"
                />
                <path
                  class="st0"
                  d="M429,165.9c-0.3,0.9-0.9,1.3-2,1.3c-0.5-0.1-14,0.3-14-0.3c-0.8-1.4,34.2-85.1,34.2-86.5
				c-13.1-0.7-11.4,3.9-11.4-10.3c0.1-1.4,0.1-1.4,1.5-1.5c0,0,28.2,0,28.2,0c0.8,0.1,1.3-0.2,1.7,0.3c0.6,2.1,39.1,95.5,38.7,97.8
				c0.1,0.6-13.7-0.2-14.1,0.1c-2.1,2.5-11.5-28-12.2-28.3h-40.6l-10.3,27L429,165.9z M444.3,125.7h30.5l-15.2-39.2L444.3,125.7z"
                />
                <path
                  class="st0"
                  d="M510.5,80.2c-1.4-0.1-1.4-0.1-1.5-1.5c0.1-0.8-0.3-9.7,0.3-10.1c0.9-0.8,48.7,0,49.8-0.3
				c30.3-0.4,38.8,42.7,10.1,53l21.9,44c0.6,1.4,0.5,1.3-0.9,1.3c0,0-12.9,0-12.9,0c-1.2,0-1.9-0.4-2.1-1.3l-20.5-42h-18.1v41.9
				c0,1.4,0.1,1.4-1.3,1.5c-0.5-0.1-14,0.3-14-0.3c-0.8-1.3,0-84.9-0.3-86.3H510.5z M556.2,110.3c12.2,0.4,20-15.8,10.6-24.4
				c-5.4-6.9-23.1-3.4-30.5-4.2v28.6H556.2z"
                />
                <path
                  class="st0"
                  d="M611.3,82.6v15.7c-0.1,1.4-0.1,1.4-1.5,1.5c0,0-10.2,0-10.2,0c-1.4-0.1-1.4-0.1-1.5-1.5c0,0,0-28.3,0-28.3
				c0-0.7,0.1-1.1,0.3-1.2c1.3-0.8,74,0,75.5-0.3c1.4,0,1.4-0.1,1.5,1.3c0,0,0,28.3,0,28.3c0,1.4,0.1,1.4-1.3,1.5c0,0-10.3,0-10.3,0
				c-1.4-0.1-1.4-0.1-1.5-1.5c0,0,0-15.7,0-15.7h-17.5c-0.3,1.7,0.5,82.5-0.3,84.1c0.1,0.6-13.5,0.1-14,0.3
				c-1.4-0.1-1.3-0.1-1.3-1.5c0,0,0-82.8,0-82.8L611.3,82.6z"
                />
              </g>
              <g>
                <path
                  class="st0"
                  d="M211.1,190.2c-0.2,0.4,0.6,7.2-0.5,6.7c-0.4-0.2-2.7,0.5-2.4-0.5c0,0,0-8.9,0-8.9c0-0.2,0-0.4,0.1-0.4
				c0.4-0.3,25.5,0,26-0.1c1.2-0.8,0.3,9.1,0.5,9.4c0.3,1-2,0.3-2.4,0.5c-1.1,0.5-0.3-6.3-0.5-6.7h-8.6v32.9c0.3,1-2.5,0.3-3,0.5
				c-1.4,0.2,0-32.9-0.5-33.4L211.1,190.2z"
                />
                <path
                  class="st0"
                  d="M248,189.8c-0.4-0.2-4.8,0.6-4.4-0.5c0.2-0.5-0.5-2.5,0.5-2.3c0,0,23.2,0,23.2,0c1.1-0.3,0.4,2.2,0.5,2.7
				c0,0.5,0,0.5-0.5,0.5c0,0-15.8,0-15.8,0v13.1h14.7c1-0.2,0.4,2.1,0.5,2.5c0.8,1.2-15.1,0.3-15.3,0.5v13.9H268
				c1.1-0.3,0.4,2.2,0.5,2.7c0,0.5,0,0.5-0.5,0.5c0,0-19.5,0-19.5,0C247.1,223.6,248.5,190.4,248,189.8z"
                />
                <path
                  class="st0"
                  d="M299,224c-16.5,0.9-25-21.8-13.5-32.7c7.6-7.9,22.2-6.5,28.5,2.5c-0.2,0.4,0.6,7.6-0.5,7.1
				c-0.3,0-2.1,0.1-2.3-0.1c-0.1-0.1,0-5.5,0-5.7c-14.5-16.9-37.5,4.8-22.8,21c6.5,7.3,17.2,5,23.3-0.8c0.2,0.3,3.1,1.2,2.2,1.9
				C310.2,221.5,304.6,224.1,299,224z"
                />
                <path
                  class="st0"
                  d="M328.1,189.8c-0.3-0.1-4.6,0.1-4.7-0.1c-0.1-0.5-0.1-2.3,0-2.7c0.4-0.2,7.7-0.1,8.1-0.1
				c0.3,0.4,0,15.9,0.1,16.4h19.8c0.3-0.5-0.7-16.9,0.5-16.5c0.5,0.3,3.3-0.6,3,0.5c0,0,0,35.6,0,35.6c0.3,1-2.5,0.3-3,0.5
				c-0.5,0-0.5,0-0.5-0.5c0,0,0-16.5,0-16.5h-19.8c0,0.5,0.1,16.6,0,17c-0.5-0.1-3.8,0.5-3.4-0.5
				C328.3,222.8,328.1,189.8,328.1,189.8z"
                />
                <path
                  class="st0"
                  d="M372.6,223.5c-1.4,0.2,0-33.3-0.5-33.8c-0.5-0.2-4.7,0.6-4.4-0.5c0.2-0.5-0.5-2.5,0.5-2.3
				c0.5,0.1,8.7-0.4,8.8,0.4c0,0,22.6,31.9,22.6,31.9v-31.8c0-0.5,0-0.5,0.5-0.5c0.5,0.3,3.2-0.6,3,0.5c0,0,0,35.6,0,35.6
				c0,0.5,0,0.5-0.5,0.5c-0.6-0.2-4,0.4-4.3-0.4c0,0-22.7-31.9-22.7-31.9v31.8c0.3,1-2.5,0.3-3,0.5L372.6,223.5z"
                />
                <path
                  class="st0"
                  d="M449.5,191.6c17.5,17.6-9.3,44.4-26.8,26.8C405.2,200.9,432,174.1,449.5,191.6z M451.6,205.1
				c0.1-20.6-31-20.7-30.9,0C420.6,225.7,451.6,225.7,451.6,205.1L451.6,205.1z"
                />
                <path
                  class="st0"
                  d="M466,189.7c-1,0.2-0.3-1.9-0.5-2.3c-0.5-1.2,7.1-0.3,7.5-0.5c1.5-0.4,0.1,32.8,0.5,33.4h13.6
				c1.1-0.3,0.4,2.2,0.5,2.7c0,0.5,0,0.5-0.5,0.5c0,0-16.6,0-16.6,0c-1.4,0.2,0-33.2-0.5-33.8h-3.9L466,189.7z"
                />
                <path
                  class="st0"
                  d="M529.8,191.6c17.5,17.6-9.3,44.4-26.8,26.8C485.4,200.9,512.2,174.1,529.8,191.6z M531.8,205.1
				c0.1-20.6-31-20.7-30.9,0C500.8,225.7,531.9,225.7,531.8,205.1L531.8,205.1z"
                />
                <path
                  class="st0"
                  d="M565.4,186.3c6,0,12.1,2.6,15.5,7.6c-0.2,0.4,0.6,6.4-0.5,5.8c-0.3,0-2.2,0.1-2.4-0.1c-0.1,0,0-4.3,0-4.5
				c-8.1-11.6-28.3-4.9-27.5,9.5c-0.9,14.6,18.8,21.9,27.8,10.8v-9.1h-11.9c-0.5,0-0.5,0-0.5-0.5c0.1-0.3-0.1-2.4,0.1-2.5
				c0.7-0.3,14.6,0,15.3-0.1c0.5,0,0.5,0,0.5,0.5c0,0,0,12.6,0,12.6c-5.3,9.8-22.3,10.3-29.4,2.3c-11.3-11.2-3.5-33.3,13.2-32.4
				L565.4,186.3z"
                />
                <path
                  class="st0"
                  d="M594.2,189.7c-1,0.2-0.4-1.9-0.5-2.3c0-0.5,0-0.5,0.5-0.5c0.4,0.2,7.9-0.6,7.4,0.5c-0.5,0.5,1,36.5-0.5,36.1
				c-0.5-0.3-3.2,0.6-3-0.5c0,0,0-33.3,0-33.3L594.2,189.7z"
                />
                <path
                  class="st0"
                  d="M618.7,189.8c-0.4-0.2-4.8,0.6-4.4-0.5c0.2-0.5-0.5-2.5,0.5-2.3c0,0,23.2,0,23.2,0c1.1-0.3,0.4,2.2,0.5,2.7
				c0,0.5,0,0.5-0.5,0.5c0,0-15.8,0-15.8,0v13.1h14.7c1-0.2,0.4,2.1,0.5,2.5c0.8,1.2-15.1,0.3-15.3,0.5v13.9h16.5
				c1.1-0.3,0.4,2.2,0.5,2.7c0,0.5,0,0.5-0.5,0.5c0,0-19.5,0-19.5,0C617.8,223.6,619.2,190.4,618.7,189.8z"
                />
                <path
                  class="st0"
                  d="M662.2,224.1c-5.1,0-9-1.8-11.5-5.5l2.9-1.7c5.2,8.8,22.6,2.1,14.8-7.6c-2.7-2.6-11.7-4.3-14.1-7.2
				c-10.5-12.3,11.6-22.4,18.9-11.1c0,0.3,0.1,5.6,0,5.7c-0.5,0.1-2.3,0.1-2.8,0c-0.2-0.1,0-3.8-0.1-4c-4.5-7.6-21-0.9-12.9,7.4
				c2.8,2.6,11.8,4.2,14.1,7.2C677.5,213.9,671.6,225,662.2,224.1L662.2,224.1z"
                />
              </g>
            </g>
          </g>
        </svg>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <v-col>
        <v-dialog v-model="errorDialog" max-width="350">
          <v-card>
            <v-card-title class="text-h5">
              <v-icon size="40">
                {{ icons.mdiAlertCircleOutline }}
              </v-icon>
              Oops !
            </v-card-title>

            <v-card-text>
              <ul>
                <li v-for="(err, i) in errors" v-if="errors.length > 1" :key="i" class="py-3 text-center">
                  {{ err[0] }}
                </li>
                <li v-if="errors.length == 1" class="py-3 text-center">
                  {{ errors[0] }}
                </li>
              </ul>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error lighten-1" text @click="errorDialog = false"> Close </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  mdiArrowLeft,
  mdiArrowRight,
  mdiChevronLeft,
  mdiChevronRight,
  mdiAlertCircleOutline,
  mdiClose,
  mdiPencil,
  mdiDelete,
} from '@mdi/js'
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Clients',
  data() {
    return {
      isLoading: false,
      dialog: false,
      perPage: 5,
      currentPage: 1,
      errors: ['Something Went Wrong !'],
      errorDialog: false,
      successDialog: false,
      isError: false,
      editedIndex: -1,
      dialogDelete: false,
      isDeleteing: false,
      icons: {
        mdiArrowLeft,
        mdiArrowRight,
        mdiChevronLeft,
        mdiChevronRight,
        mdiAlertCircleOutline,
        mdiClose,
        mdiPencil,
        mdiDelete,
      },
      client: {
        name: null,
        phone: null,
        address: null,
      },
      headers: [
        {
          text: 'Id',
          align: 'start',
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Phone', value: 'phone' },
        { text: 'Address', value: 'address' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      clients: [],
    }
  },
  computed: {
    rows() {
      return this.clients.length
    },
    Clients() {
      return this.clients
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    axios
      .get('/clients')
      .then(res => {
        this.clients = res.data.response
      })
      .catch(error => {
        this.isError = true
      })
  },
  methods: {
    editItem(item) {
      this.editedIndex = item.id
      this.dialog = true
    },

    deleteItem(item, ev) {
      this.editedIndex = item.id
      // this.selected = ev.target.parentElement
      console.log(ev.target.parentElement.parentElement.parentElement.children[0].innerText)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.isDeleteing = true
      await axios
        .delete(`/clients/${this.editedIndex}`)
        .then(res => {
          // this.clients.slice(this.editedIndex, 1)
          this.isDeleteing = false
        })
        .catch(error => {
          console.log(error)
          this.isDeleteing = false
        })
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        // console.log('edit client')
      } else {
        // this.desserts.push(this.editedItem)
        // console.log('send new client')
        this.onSend()
      }
    },
    validateStatus(validation) {
      return typeof validation != 'undefined' ? validation.$error : false
    },
    async onSend() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isLoading = true
        await axios
          .post('/clients/store', this.client)
          .then(res => {
            if (res.data.errors) {
              this.errors = res.data.errors
              this.errorDialog = true
              this.isLoading = false
            } else {
              this.clients.push(res.data.response)
              this.close()
              this.isLoading = false
            }
          })
          .catch(error => {
            this.error = error.response
            this.isLoading = false
          })
      }
    },
  },
  validations: {
    client: {
      name: { required },
      phone: { required },
      address: { required },
    },
  },
}
</script>
