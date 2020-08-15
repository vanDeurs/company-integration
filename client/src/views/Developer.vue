<template>
  <div class="container">
    <h2 class="header">API nycklar</h2>
    <div class="info-row">
      <div class="about">
        <h3>Om</h3>
        <p>
          Vindens API tillåter dig att integrera Vinden funktioner i din egen
          applikation. För att authentisera dig så skapar du en API-nyckel nedan
          som du passar med i headers som x-auth.
        </p>
      </div>
      <div class="documentation">
        <h3>API dokumentation</h3>
        <p>Vi har en dokumentation som du som utvecklare kan använda för att integrera Vindens API i din applikation.
        </p>
        <button @click="readDocumentation()" class="success">
          API dokumentation
        </button>
      </div>
    </div>
    <div class="api-keys-wrapper">
      <div class="api-keys-info">
        <h3>Dina API nycklar</h3>
        <p>API-nycklar ger fullständig tillgång till ditt konto så håll dem säkra.</p>
      </div>
      <div v-if="keys.length == 0" class="no-keys-wrapper">
        <div class="ghost">
          <h2>Du har inga api-nycklar.</h2>
        </div>
        <div class="text-right">
          <button @click="createApiKey()" class="success">
            {{ this.creatingKey ? "Skapar API-nyckel..." : "Skapa API-nyckel" }}
          </button>
        </div>
      </div>
      <div v-else>
        <div class="api-keys">
          <div class="table column">
            <div>Skapad</div>
            <div>Användare</div>
            <div>Märkning</div>
            <div>API nyckel</div>
          </div>
          <div class="table row" v-for="key in keys" :key="key._id">
            <div>{{ key.created }}</div>
            <div>{{ key.owner }}</div>
            <div>{{ key.label }}</div>
            <div>{{ key.apiKey }}</div>
          </div>
        </div>
        <div class="create-key-button-wrapper">
          <button @click="createApiKey()" class="success">
            {{ this.creatingKey ? "Skapar API-nyckel..." : "Skapa API-nyckel" }}
          </button>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Developer",
  components: {},
  created () {
    this.fetchApiKeys();
  },
  data () {
   return {
      keys: [],
      creatingKey: false,
      fetchingKeys: false
    };
  },
  methods: {
    async fetchApiKeys () {
      this.fetchingKeys = true;
      try {
        const response = await api().get("/integrations");
        if (response) {
          console.log("response: ", response);
          this.keys = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createApiKey () {
      this.creatingKey = true;
      try {
        const response = await api().post("/integrations");
        if (response) {
          console.log("response: ", response);
          this.keys.push(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    readDocumentation () {

    }
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
  .info-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 60px;

    .about {
      display: flex;
      flex-direction: column;
      max-width: 400px;
    }
    .documentation {
      display: flex;
      flex-direction: column;
      max-width: 400px;
    }
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
      min-width: 70%;

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
