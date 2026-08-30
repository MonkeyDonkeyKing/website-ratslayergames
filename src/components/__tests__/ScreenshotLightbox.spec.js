import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Lightbox from '../ScreenshotLightbox.vue'

const items = [
  { src: '/a.png', alt: 'Shot A' },
  { src: '/b.png', alt: 'Shot B' },
  { src: '/c.png', alt: 'Shot C' },
]

function mountLightbox(index) {
  return mount(Lightbox, {
    props: { items, index },
    attachTo: document.body,
  })
}

describe('Lightbox', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders nothing when index is null', () => {
    mountLightbox(null)
    expect(document.body.querySelector('.lightbox')).toBeNull()
  })

  it('renders the selected image full-size when open', () => {
    mountLightbox(1)
    const img = document.body.querySelector('.lb-figure img')
    expect(img).not.toBeNull()
    expect(img.getAttribute('src')).toBe('/b.png')
    expect(img.getAttribute('alt')).toBe('Shot B')
  })

  it('emits update:index(null) on close button click', async () => {
    const wrapper = mountLightbox(0)
    await document.body.querySelector('.lb-close').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:index')?.[0]).toEqual([null])
  })

  it('emits update:index(null) on backdrop click but not on image click', async () => {
    const wrapper = mountLightbox(0)
    const figure = document.body.querySelector('.lb-figure')
    await figure.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:index')).toBeUndefined()

    const backdrop = document.body.querySelector('.lightbox')
    await backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:index')?.[0]).toEqual([null])
  })

  it('navigates with next/prev buttons and wraps around', async () => {
    const wrapper = mountLightbox(0)
    await document.body.querySelector('.lb-next').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:index')?.[0]).toEqual([1])

    await wrapper.setProps({ index: 0 })
    await document.body.querySelector('.lb-prev').dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.emitted('update:index').at(-1)).toEqual([2])
  })

  it('closes on Escape and navigates with arrow keys', async () => {
    const wrapper = mountLightbox(0)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    expect(wrapper.emitted('update:index')?.[0]).toEqual([1])

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:index').at(-1)).toEqual([null])
  })
})
