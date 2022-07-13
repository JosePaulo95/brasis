import { shallowMount } from '@vue/test-utils'
import { assert, describe, expect, it } from 'vitest'
import Board from '../../components/Board.vue'

describe('board component', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Board, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
