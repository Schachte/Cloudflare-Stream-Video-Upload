import { handleTusCreatorUpload } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleTusCreatorUpload(event.request))
})
