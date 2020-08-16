<template>
  <div class="container">
    <h2 class="header">Saker</h2>
    <div class="items-wrapper">
      <div class="items-info">
        <p>Här kan du skapa nya saker.</p>
      </div>
      <div v-if="items.length == 0" class="no-items-wrapper">
        <div>
          <h2>Du har inga saker.</h2>
        </div>
        <div>
          <input
            v-model="label"
            placeholder="Sak"
          />
          <button @click="createItem()">
            {{ this.creatingItem ? "Skapar sak" : "Skapa sak" }}
          </button>
        </div>
      </div>
      <div v-else>
        <div class="items">
          <div class="table column">
            <div>Skapad</div>
            <div>Användare</div>
            <div>Sak</div>
          </div>
          <div class="table row" v-for="item in items" :key="item._id">
            <div>{{ new Date(item.created) }}</div>
            <div>{{ item.owner.name }}</div>
            <div>{{ item.label }}</div>
            <button @click="deleteItem(item._id)">
              {{ deletingItem ? "Raderar..." : "Radera" }}
            </button>
          </div>
        </div>
        <div class="create-item-button-wrapper">
          <input
            v-model="label"
            placeholder="Sak"
          />
          <button @click="createItem()" class="success">
            {{ creatingItem ? "Skapar sak" : "Skapa sak" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "Items",
  created () {
    this.fetchItems();
  },
  data () {
   return {
      items: [],
      label: null,
      creatingItem: false,
      deletingItem: false
    };
  },
  methods: {
    async fetchItems () {
      try {
        const response = await api().get("/items");
        if (response) {
          this.items = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createItem () {
      this.creatingItem = true;
      try {
        const response = await api().post("/items", { label: this.label });
        if (response) {
          this.items.push(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.creatingItem = false;
      }
    },
    async deleteItem(id) {
      this.deletingItem = true;
      try {
        await api().delete(`/items/${id}`);
        const updatedItems = this.items.filter(item => item._id !== id);
        this.items = updatedItems;
      } catch (error) {
        console.log('error: ', error);
      } finally {
        this.deletingItem = false;
      }
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
  .items-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    .items-info {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }

    .no-items-wrapper {
      border: 1px solid grey;
      border-radius: 5px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .items {
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
      create-item-button-wrapper {
        width: 30%;
      }
  }
}
</style>
