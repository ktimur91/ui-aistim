<template>
  <div class="grid ggap-20">
    <section class="box p-20 pos-r">
      <UiLoading size="50" position="pos-a" overlay="white-transparent" radius />
      <h1 class="title">Some title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam blanditiis sit ipsa quis, saepe id reiciendis
        dolorum at pariatur sint, reprehenderit, ex perferendis nesciunt voluptas mollitia delectus dolor magni minus?
      </p>
    </section>

    <section class="box p-20 pos-r">
      <UiLoading size="100" position="pos-a" overlay="white" />
      <h1 class="title">Some title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam blanditiis sit ipsa quis, saepe id reiciendis
        dolorum at pariatur sint, reprehenderit, ex perferendis nesciunt voluptas mollitia delectus dolor magni minus?
      </p>
    </section>

    <section class="box p-20 pos-r flex fw ggap-10">
      <button class="btn md primary">
        <UiLoading size="24" position="pos-r" overlay="transparent" color="white" />
        Some btn
      </button>
      <button class="btn md red">
        <UiLoading size="24" position="pos-r" overlay="transparent" color="white" />
        Some btn
      </button>
      <button class="btn md yellow">
        Some btn
        <UiLoading size="24" position="pos-r" overlay="transparent" color="white" />
      </button>
      <button class="btn md green">
        <UiLoading size="24" position="pos-r" overlay="transparent" color="white" />
        Some btn
      </button>
      <button class="btn md outline">
        Some btn
        <UiLoading size="24" position="pos-r" overlay="transparent" color="primary" />
      </button>
      <button class="btn md grey">
        <UiLoading size="24" position="pos-r" overlay="transparent" color="red" />
        Some btn
      </button>
      <button class="btn md primary" disabled>
        <UiLoading size="24" position="pos-r" overlay="transparent" color="white" />
        Some btn
      </button>
    </section>
  </div>
</template>
