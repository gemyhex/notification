<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-img
          :src="require('@/assets/images/logos/logo.svg')"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--primary">{{ $t('Dashboard') }}</h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list expand shaped class="vertical-nav-menu-items pr-5">
      <nav-menu-link :title="$t('Dashboard')" :to="{ name: 'dashboard' }" :icon="icons.mdiHomeOutline"></nav-menu-link>
      <!-- <nav-menu-link title="Users" :to="{ name: 'users' }" :icon="icons.mdiAccount"></nav-menu-link> -->
      <!-- <nav-menu-group title="Pages" :icon="icons.mdiFileOutline">
        <nav-menu-link title="Login" :to="{ name: 'login' }"></nav-menu-link>
        <nav-menu-link title="Register" :to="{ name: 'register' }"></nav-menu-link>
        <nav-menu-link title="Error" :to="{ name: 'error-404' }"></nav-menu-link>
      </nav-menu-group> -->
      <!-- <nav-menu-section-title title="USER INTERFACE"></nav-menu-section-title> -->
      <nav-menu-link
        :title="$t('Clients')"
        v-show="permissions.includes('get-clients') || permissions.includes('administrator')"
        :to="{ name: 'clients' }"
        :icon="icons.mdiAccountGroup"
      ></nav-menu-link>
      <nav-menu-link
        :title="$t('Document_Groups')"
        v-show="permissions.includes('get-document-groups') || permissions.includes('administrator')"
        :to="{ name: 'doc-groups' }"
        :icon="icons.mdiFileDocumentOutline"
      ></nav-menu-link>
      <nav-menu-link
        :title="$t('Companies')"
        v-show="permissions.includes('get-companies') || permissions.includes('administrator')"
        :to="{ name: 'companies' }"
        :icon="icons.mdiOfficeBuilding"
      ></nav-menu-link>
      <nav-menu-link
        :title="$t('Company_Types')"
        v-show="permissions.includes('get-company-types') || permissions.includes('administrator')"
        :to="{ name: 'company_types' }"
        :icon="icons.mdiPlaylistPlus"
      ></nav-menu-link>
      <nav-menu-link
        :title="$t('Employees')"
        v-show="permissions.includes('get-employees') || permissions.includes('administrator')"
        :to="{ name: 'employees' }"
        :icon="icons.mdiAccountGroupOutline"
      ></nav-menu-link>
      <nav-menu-link
        :title="$t('Documents')"
        v-show="permissions.includes('get-documents') || permissions.includes('administrator')"
        :to="{ name: 'documents' }"
        :icon="icons.mdiFileDocumentOutline"
      ></nav-menu-link>
      <nav-menu-link
        :title="$t('Employee_Documents')"
        v-show="permissions.includes('get-notification') || permissions.includes('administrator')"
        :to="{ name: 'employeedocuments' }"
        :icon="icons.mdiFolderAccountOutline"
      ></nav-menu-link>
      <nav-menu-link :title="$t('Roles')" :to="{ name: 'roles' }" :icon="icons.mdiFolderAccountOutline"></nav-menu-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAccount,
  mdiAccountGroup,
  mdiFileDocumentOutline,
  mdiOfficeBuilding,
  mdiPlaylistPlus,
  mdiAccountGroupOutline,
  mdiFolderAccountOutline,
} from '@mdi/js'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    // NavMenuSectionTitle,
    // NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
    permissions: {
      type: Array,
      default: null,
    },
    client_id: {
      type: String,
    },
  },
  data() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAccount,
        mdiAccountGroup,
        mdiFileDocumentOutline,
        mdiOfficeBuilding,
        mdiPlaylistPlus,
        mdiAccountGroupOutline,
        mdiFolderAccountOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
