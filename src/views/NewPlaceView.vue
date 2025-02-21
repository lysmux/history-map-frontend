<script setup lang="ts">
import { reactive, computed } from 'vue'

import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minValue, maxValue } from '@vuelidate/validators'

import { MdEditor, config } from 'md-editor-v3'
import RU from '@vavt/cm-extension/dist/locale/ru'
import 'md-editor-v3/lib/style.css'

config({
  editorConfig: {
    languageUserDefined: {
      ru: RU,
    },
  },
})

const formData = reactive({
  id: '',
  latitude: 0,
  longitude: 0,
  name: '',
  preview: '',
  coverImage: '',
  article: '',
})

const blobMap: { url: string; file: string }[] = []

const formRules = computed(() => ({
  name: {
    required,
    maxLength: maxLength(100),
  },
  latitude: {
    required,
    min: minValue(-90),
    max: maxValue(90),
  },
  longitude: {
    required,
    min: minValue(-180),
    max: maxValue(180),
  },
  preview: {
    required,
    maxLength: maxLength(300),
  },
  coverImage: {
    required,
  },
  article: {
    required,
  },
}))
const validator = useVuelidate(formRules, formData)

const onUploadImg = async (
  files: Array<File>,
  callback: (urls: string[] | { url: string; alt: string; title: string }[]) => void,
) => {
  const imgs = await Promise.all(
    files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const blob = new Blob([file], { type: file.type })
          const url = URL.createObjectURL(blob)
          const b64data = reader.result as string
          blobMap.push({ url: url, file: b64data })
          return resolve(url)
        }
        reader.onerror = (error) => reject(error)
      })
    }),
  )

  callback(imgs)
}

const handlePreviewImgUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files) return

  const file = target.files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    formData.coverImage = reader.result as string
  }
}

const submitForm = async () => {
  if (!(await validator.value.$validate())) return

  crypto.randomUUID()
  formData.id = crypto.randomUUID()
  const data = Object.assign({}, formData)

  blobMap.forEach((el) => {
    data.article = data.article.replace(el.url, el.file)
  })

  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = `${data.id}.json`
  link.click()
}
</script>

<template>
  <div class="mx-auto my-10 p-10 w-4/5 bg-white rounded-xl shadow-lg h-full">
    <form class="flex gap-20 h-full" @submit.prevent="submitForm">
      <div class="w-1/3 flex flex-col gap-3">
        <div>
          <label for="name" class="mb-2 text-lg font-medium">Название</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="border border-gray-300 text-sm rounded-lg w-full p-2.5"
            :class="{ 'border-red-300 border-3': validator.name.$error }"
            placeholder="НИУ ИТМО"
          />
          <div v-for="error of validator.name.$errors" :key="error.$uid">
            <div class="text-red-400">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label for="latitude" class="mb-2 text-lg font-medium">Широта</label>
          <input
            v-model="formData.latitude"
            type="number"
            step="0.000001"
            id="latitude"
            class="border border-gray-300 text-sm rounded-lg w-full p-2.5"
            :class="{ 'border-red-300 border-3': validator.latitude.$error }"
            placeholder="59.956285"
          />
          <div v-for="error of validator.latitude.$errors" :key="error.$uid">
            <div class="text-red-400">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label for="longitude" class="mb-2 text-lg font-medium">Долгота</label>
          <input
            v-model="formData.longitude"
            type="number"
            step="0.000001"
            id="longitude"
            class="border border-gray-300 text-sm rounded-lg w-full p-2.5"
            :class="{ 'border-red-300 border-3': validator.longitude.$error }"
            placeholder="30.309839"
          />
          <div v-for="error of validator.longitude.$errors" :key="error.$uid">
            <div class="text-red-400">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label for="preview" class="mb-2 text-lg font-medium">Превью</label>
          <textarea
            v-model="formData.preview"
            type="text"
            id="preview"
            class="border border-gray-300 text-sm rounded-lg w-full p-2.5"
            :class="{ 'border-red-300 border-3': validator.preview.$error }"
          />
          <div v-for="error of validator.preview.$errors" :key="error.$uid">
            <div class="text-red-400">{{ error.$message }}</div>
          </div>
        </div>
        <div>
          <label
            for="preview-image"
            class="flex flex-col justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer"
            :class="{ 'border-red-300 border-3': validator.coverImage.$error }"
          >
            <img v-if="formData.coverImage" :src="formData.coverImage" />
            <div v-if="!formData.coverImage" class="flex flex-col items-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">Нажмите, чтобы загрузить</span> или перетащите сюда
              </p>
              <p class="text-xs text-gray-500">SVG, PNG, JPG или GIF</p>
            </div>
            <input
              id="preview-image"
              type="file"
              class="opacity-0 absolute"
              @change="handlePreviewImgUpload"
            />
          </label>
          <div v-for="error of validator.coverImage.$errors" :key="error.$uid">
            <div class="text-red-400">{{ error.$message }}</div>
          </div>
        </div>
        <button
          type="submit"
          class="bg-slate-200 hover:bg-indigo-300 font-medium rounded-lg text-md px-5 py-2.5 text-center w-full"
        >
          Скачать JSON
        </button>
      </div>
      <div class="w-full">
        <label for="article" class="block mb-2 text-lg font-medium">Статья</label>
        <div
          class="h-[95%]"
          :class="{ '!border-red-300 !border-3 !border': validator.article.$error }"
        >
          <MdEditor
            id="article"
            v-model="formData.article"
            language="ru"
            @onUploadImg="onUploadImg"
            :toolbarsExclude="['save', 'pageFullscreen', 'htmlPreview', 'catalog', 'github']"
            class="!h-full"
          />
        </div>
        <div v-for="error of validator.article.$errors" :key="error.$uid">
          <div class="text-red-400">{{ error.$message }}</div>
        </div>
      </div>
    </form>
  </div>
</template>
