import { shallowMount, mount } from '@vue/test-utils'
import Board from '@/components/Board.vue'

describe('board component', () => {
  it('renders a nxn board', async () => {
    const board = [
      [0,0],
      [0,0]
    ]
    const wrapper = mount(Board, {
      props: { board }
    })
    
    expect(wrapper.element.querySelectorAll(".cell").length).toBe(4)
  })
})
