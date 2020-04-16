export const colors = {
  methods: {
    getColor(name) {
      switch (name) {
        case 'white':
          return 'blue-grey'
        case 'gray':
        case 'black':
          return 'grey'
        default:
          return name
      }
    }
  }
}
