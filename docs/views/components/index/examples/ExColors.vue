<template>
  <main class="grid ggap-30">
    <!-- Title -->
    <section class="grid ggap-10 gtc-4">
      <h1 class="title">Title</h1>
      <h2 class="title">Title</h2>
      <h3 class="title">Title</h3>
      <h4 class="title">Title</h4>
    </section>

    <!-- Text -->
    <section class="grid ggap-10 gtc-2">
      <div class="grid ggap-10">
        <div class="text">text</div>
        <div class="text-l">text-l</div>
        <div class="text-el">text-el</div>
      </div>

      <div class="grid ggap-10">
        <small class="text">text</small>
        <small class="text-l">text-l</small>
        <small class="text-el">text-el</small>
      </div>
    </section>

    <!-- Box -->
    <section class="grid ggap-10 gtc-3">
      <div class="box p-20">box</div>
      <div class="box-l p-20">box-l</div>
      <div class="box-el p-20">box-el</div>
    </section>

    <!-- Form -->
    <section class="grid ggap-10 gtc-3">
      <div class="grid ggap-10">
        <div class="form p-20">form</div>
        <div class="form-hover p-20">form hover</div>
        <div class="form-active p-20">form active</div>
        <div class="form-focus p-20">form focus</div>
        <div class="form-disabled p-20">form disabled</div>
      </div>
      <div class="form-l p-20">form</div>
      <div class="form-el p-20">form</div>
    </section>
  </main>
</template>

<style lang="scss">
.form {
  background-color: var(--form);

  @at-root {
    &-l {
      background-color: var(--form-l);
    }
    &-el {
      background-color: var(--form-el);
    }

    // States
  }
}
</style>
