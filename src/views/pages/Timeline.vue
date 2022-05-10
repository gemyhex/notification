<template>
  <div class="timeline">
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item class="py-8">
          <div class="timeline" v-if="oldList">
            <div class="arrows d-none d-lg-flex d-md-flex">
              <div class="arr-wrap" v-for="(emp, i) in oldList" :key="i">
                <div class="content">
                  <div class="wrapper">
                    <div class="sep"></div>
                    <div class="texts">
                      <h5>{{ emp.employee }}</h5>
                      <span>{{ emp.document }}</span>
                    </div>
                  </div>
                </div>
                <div class="arrow step1">
                  <span>{{ emp.due_date | formatDate }}</span>
                </div>
              </div>
            </div>
            <div class="arrows-sm d-flex flex-column d-lg-none d-md-none justify-content-center">
              <div class="arr-wrap-sm" v-for="(emp, i) in oldList" :key="i">
                <div class="wrapp">
                  <div class="content">
                    <div class="wrapper">
                      <div class="sep"></div>
                      <div class="texts">
                        <h5>{{ emp.employee }}</h5>
                        <span>{{ emp.document }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="arrow step1">
                    <span>{{ emp.due_date | formatDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="no-arrows text-center" v-else>
            <p>There's no data right now.</p>
          </div>
        </v-tab-item>
        <v-tab-item class="py-8">
          <div class="timeline" v-if="newList">
            <div class="arrows d-none d-lg-flex d-md-flex">
              <div class="arr-wrap" v-for="(emp, i) in newList" :key="i">
                <div class="content">
                  <div class="wrapper">
                    <div class="sep"></div>
                    <div class="texts">
                      <h5>{{ emp.employee }}</h5>
                      <span>{{ emp.document }}</span>
                    </div>
                  </div>
                </div>
                <div class="arrow step1">
                  <span>{{ emp.due_date | formatDate }}</span>
                </div>
              </div>
            </div>
            <div class="arrows-sm d-flex flex-column d-lg-none d-md-none justify-content-center">
              <div class="arr-wrap-sm" v-for="(emp, i) in newList" :key="i">
                <div class="wrapp">
                  <div class="content">
                    <div class="wrapper">
                      <div class="sep"></div>
                      <div class="texts">
                        <h5>{{ emp.employee }}</h5>
                        <span>{{ emp.document }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="arrow step1">
                    <span>{{ emp.due_date | formatDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="no-arrows text-center" v-else>
            <p>There's no data right now.</p>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import axios from 'axios'
// import Timeline from '@/components/Timeline.vue'

export default {
  components: { Timeline },
  data() {
    return {
      tab: null,
      items: ['Old', 'New'],
      oldList: null,
      newList: null,
    }
  },
  mounted() {
    axios
      .get('employees/get/notifications', { params: { date_type: 'new' } })
      .then(res => {
        this.newList = res.data.response.data
        console.log('new', res.data.response.data)
      })
      .catch(err => {
        console.log(err)
      })
    axios
      .get('employees/get/notifications', { params: { date_type: 'old' } })
      .then(res => {
        this.oldList = res.data.response.data
        console.log(res.data.response.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>

<style lang="scss">
.arrows {
  width: 100%;
  position: relative;
  min-height: 220px;
  margin: auto;
  padding: 6px;
  display: flex;
  overflow-x: scroll;
  .arr-wrap {
    min-width: 220px;
    margin: 0 2%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content {
      display: flex;
      position: absolute;
      padding: 0 10px;
      .wrapper {
        position: relative;
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .texts {
        float: left;
        margin: 0 10px;
        h5 {
          font-size: 1.2rem;
          font-weight: bold;
        }
        span {
          font-weight: 100;
          color: #7d7d7d;
        }
      }
    }
    &:nth-child(odd) {
      .arrow {
        &:after {
          border-top: 22px solid transparent;
          border-bottom: 22px solid transparent;
          border-left: 17px solid #ff390c;
          content: '';
          height: 0;
          position: absolute;
          top: 0;
          right: -17px;
          width: 0;
          z-index: 2;
        }
      }
      .content {
        top: 0;
        left: 0;
        .sep {
          width: 1px;
          height: 100%;

          background: #ff390c;
          float: left;
          &:after {
            content: '';
            position: absolute;
            top: 5px;
            left: -2px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff390c;
          }
          &:before {
            content: '';
            position: absolute;
            bottom: 5px;
            left: -2px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff390c;
          }
        }
      }
    }
    &:nth-child(even) {
      .arrow {
        &:after {
          border-top: 22px solid transparent;
          border-bottom: 22px solid transparent;
          border-left: 17px solid #ff8000;
          content: '';
          height: 0;
          position: absolute;
          top: 0;
          right: -17px;
          width: 0;
          z-index: 2;
        }
      }
      .content {
        bottom: 0;
        left: 0;
        .sep {
          width: 1px;
          height: 100%;

          background: #ff8000;
          float: left;
          &:after {
            content: '';
            position: absolute;
            top: 5px;
            left: -2px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff8000;
          }
          &:before {
            content: '';
            position: absolute;
            bottom: 5px;
            left: -2px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #ff8000;
          }
        }
      }
    }
    &:last-child {
      .arrow {
        &:before {
          display: none;
        }
      }
    }
  }
}
.arrows-sm {
  width: 80%;
  margin: auto;
  //   overflow-x: scroll;
  .arr-wrap-sm {
    .wrapp {
      width: 50%;
      .content {
        .wrapper {
          display: flex;
          min-height: 60px;
          padding: 10px 0;
          .sep {
            width: 2px;
            min-height: 55px;
            background: #ff390c;
            position: relative;
            &:after {
              content: '';
              position: absolute;
              top: 0px;
              left: -2px;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: #ff390c;
            }
            &:before {
              content: '';
              position: absolute;
              bottom: 0px;
              left: -2px;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background: #ff390c;
            }
          }
          .texts {
            margin: 0 10px;
          }
        }
      }
    }
    &:nth-child(odd) {
      .wrapp {
        float: right;
      }
      .arrow {
        &:after {
          border-top: 22px solid transparent;
          border-bottom: 22px solid transparent;
          border-left: 17px solid #ff390c;
          content: '';
          height: 0;
          position: absolute;
          top: 0;
          right: -17px;
          width: 0;
          z-index: 2;
          //   border-left-color: #ff390c !important;
        }
      }
      .step1 {
        background: #ff390c;
      }
    }
    &:nth-child(even) {
      float: left;
      .wrapp {
        .content {
          .wrapper {
            justify-content: end;
            .sep {
              order: 2;
            }
          }
        }
      }
      .arrow {
        &:after {
          border-top: 22px solid transparent;
          border-bottom: 22px solid transparent;
          border-right: 17px solid #ff8000;
          content: '';
          height: 0;
          position: absolute;
          top: 0;
          left: -17px;
          width: 0;
          z-index: 2;
        }
      }
      .step1 {
        background: #ff8000;
      }
    }
  }
}
.arrow {
  min-width: 120px;
  min-height: 44px;
  max-height: 44px;
  padding: 10px 10px;
  position: relative;
  text-align: center;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    width: 55px;
    height: 3px;
  }
  span {
    span {
      color: #ffffff;
      position: relative;
      font-weight: bold;
    }
  }
}
</style>
