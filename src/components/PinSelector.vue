<template>
  <div class="lightbox" v-if="showLightbox">
    <div class="lightbox-content">
      <h2>Pin Change</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <label for="currPin">Current pin</label>
        <input type="number" id="currPin" v-model.number="curentPin"  required/>
        <label for="newpin">New Pin</label>
        <input type="password" id="newpin" v-model.number="newPin" name="pin" required/>
        <div class="escapeOptions">
          <button type="submit" >Submit</button>
          <button @click="handleCancel">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
export interface PinData {
  currPin: number,
  newPin: number
}
export default {
  name: "pinSelector",
  props: {
    pin: {
      required: true,
    },
    showLightbox: {
      required: true,
    }
  },
  data() {
    return {
      curentPin:<number> null,
      newPin :<number> null
    }
  },
  methods: {
    handleSubmit(e:Event) {
      e.preventDefault();
      this.$emit('data', <PinData>{
        currPin: this.curentPin,
        newPin: this.newPin,
      });
      this.clearFields();
    },
    handleCancel() {
      this.$emit("cancel");
      this.clearFields();
    },
    clearFields() {
      this.curentPin = null
      this.newPin = null
    }
  },
};
</script>

<style>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-content {
  background-color: white;
  padding: 20px;
}

.lightbox input {
  display: block;
  margin-bottom: 10px;
}

.escapeOptions {
  display:flex;
  justify-content: space-between;
}
</style>
