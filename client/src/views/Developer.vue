<template>
  <div class="container">
    <h2 class="header">API nycklar</h2>
    <div class="api-keys-wrapper">
      <div class="api-keys-info">
        <p>API-nycklar ger fullständig tillgång till ditt konto så håll dem säkra.</p>
      </div>
      <div v-if="keys.length == 0" class="no-keys-wrapper">
        <div>
          <h2>Du har inga api-nycklar.</h2>
        </div>
        <div>
          <button @click="createApiKey()">
            {{ this.creatingKey ? "Skapar API-nyckel..." : "Skapa API-nyckel" }}
          </button>
        </div>
      </div>
      <div v-else>
        <div class="api-keys">
          <div class="table column">
            <div>Skapad</div>
            <div>Användare</div>
            <div>API nyckel</div>
          </div>
          <div class="table row" v-for="key in keys" :key="key._id">
            <div>{{ new Date(key.created) }}</div>
            <div>{{ key.owner.name }}</div>
            <div>{{ key.apiKey }}</div>
            <button @click="deleteApiKey(key._id)">
              {{ deletingKey ? "Raderar..." : "Radera" }}
            </button>
          </div>
        </div>
        <div class="create-key-button-wrapper">
          <button @click="createApiKey()" class="success">
            {{ creatingKey ? "Skapar API-nyckel..." : "Skapa API-nyckel" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Developer",
  created () {
    this.fetchApiKeys();
  },
  data () {
   return {
      keys: [],
      creatingKey: false,
      fetchingKeys: false,
      deletingKey: false
    };
  },
  methods: {
    async fetchApiKeys () {
      this.fetchingKeys = true;
      try {
        const response = await api().get("/integrations");
        if (response) {
          this.keys = response.data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.fetchingKeys = false;
      }
    },
    async createApiKey () {
      this.creatingKey = true;
      try {
        const response = await api().post("/integrations");
        if (response) {
          this.keys.push(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.creatingKey = false;
      }
    },
    async deleteApiKey(id) {
      this.deletingKey = true;
      try {
        await api().delete(`/integrations/${id}`);
        const updatedKeys = this.keys.filter(key => key._id !== id);
        this.keys = updatedKeys;
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.deletingKey = false;
      }
    },
    readDocumentation () {}
  }
};
</script>

<style scoped lang="scss">
.container {
  line-height: 1.4;

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .api-keys-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    .api-keys-info {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    .no-keys-wrapper {
      border: 1px solid grey;
      border-radius: 5px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .api-keys {
      display: flex;
      flex-direction: column;
      border-top: 1px solid #dedddc;
      border-bottom: 1px solid #dedddc;
      margin-bottom: 30px;
      min-width: 100%;

      .table {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        width: 100%;

          div {
           flex: 1;
           padding: 12px 15px;
          }
        }
        .column {
          background: #e0e0decc;

          div {
            font-weight: 500;
            font-weight: 600;
          }
        }
        .row {
          border-top: 1px solid #dedddc;
        }
      }
      create-key-button-wrapper {
        width: 30%;
      }
  }
}
</style>
