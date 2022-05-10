<template>
  <div class="timeline">
    <div class="arrows d-none d-lg-flex d-md-flex">
      <div class="arr-wrap" v-for="(emp, i) in empLine" :key="i">
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
      <div class="divid">
        <div class="arr-wrap-sm" v-for="(emp, i) in empLine" :key="i">
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
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['empLine'],
}
</script>
