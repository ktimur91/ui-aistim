<script setup>
import { MainTemplate, MainExample } from '@/components'

// Examples
import ExColors from './examples/ExColors.vue'
import exRegisterComponentCode from './examples/ExRegisterComponent.txt?raw'
import exRegisterWindowsStyle from './examples/exRegisterWindowsStyle.vue?raw'

const exInstallCode = `npm i @telecom/ui-kit`
const exRegisterStyleCode = `import @telecom/ui-kit/css/ui-kit.css`
</script>

<template>
  <MainTemplate>
    <template #examples>
      <div class="p-20 mb-50">
        <ExColors />
      </div>

      <MainExample title="Installation" :code="exInstallCode" codeLanguage="bash" :hasView="false" />
      <MainExample
        title="Register Style"
        description="register Ui-Kit style in your app entry point (typically app.js or main.js):"
        :code="exRegisterStyleCode"
        codeLanguage="js"
        :hasView="false"
      />
      <MainExample
        title="Register Component"
        description="register component in example.vue"
        :code="exRegisterComponentCode"
        :hasView="false"
      />
      <MainExample
        title="For windows"
        description="Стили которые подключаются если клиентская система это Windows, скрипт нужно положить в файл App.vue а файл for-windows.css положить куда нибудь по типу папки assets"
        :code="exRegisterWindowsStyle"
        :hasView="false"
      />
    </template>
  </MainTemplate>
</template>
