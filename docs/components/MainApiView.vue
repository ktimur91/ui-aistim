<script setup>
// Props
const props = defineProps(['title', 'description', 'type', 'rows'])

// Cols props
const cols = {
  props: [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'types',
      name: 'Types'
    },
    {
      key: 'value',
      name: 'Value'
    },
    {
      key: 'default',
      name: 'Default value'
    }
  ],
  events: [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'description',
      name: 'Description'
    }
  ],
  slots: [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'props',
      name: 'Props'
    }
  ],
  methods: [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'arguments',
      name: 'Arguments'
    },
    {
      key: 'returns',
      name: 'Return'
    }
  ],
  styles: [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'value',
      name: 'Value'
    },
    {
      key: 'default',
      name: 'Default'
    }
  ],
  variables: [
    {
      key: 'name',
      name: 'Name'
    },
    {
      key: 'description',
      name: 'Description'
    },
    {
      key: 'value',
      name: 'Value'
    }
  ]
}
</script>

<template>
  <div v-if="props.title || props.description" class="grid ggap-5 mb-20">
    <h3 v-if="props.title" class="title">{{ props.title }}</h3>
    <div v-if="props.description" class="c-grey-ed">{{ props.description }}</div>
  </div>

  <table class="tabl mb-50">
    <thead class="tabl__head">
      <th v-for="col of cols[type]" :key="col.key" class="tabl__cell">{{ col.name }}</th>
    </thead>

    <tbody class="tabl__body">
      <tr v-for="row of props.rows" :key="row.name" class="tabl__row">
        <td v-for="col of cols[type]" :key="col.key" class="tabl__cell">
          <slot :row="row" :cell="row[col.key]" :name="col.key">{{ row[col.key] || '—' }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.tabl {
  padding: 0;
  border-collapse: collapse;
  width: 100%;
  border: var(--b1);
  background-color: var(--box);

  &__head {
    font-size: 14px;
    text-align: left;
    background-color: var(--grey);
  }

  &__row {
    background-color: transparent;

    &:hover {
      background-color: var(--grey-el);
    }
  }

  &__cell {
    border-right: var(--b1);
    border-bottom: var(--b1);
    padding: 10px 15px;

    &:last-child {
      border-right: 0;
    }
  }
}
</style>
