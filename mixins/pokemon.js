import Icons from '~/components/pokemon/Icons'
import PokeImage from '~/components/pokemon/PokeImage'
import Type from '~/components/pokemon/Type'

export const pokemon = {
  components: {
    Icons,
    PokeImage,
    Type
  },
  props: {
    pokemonDetails: {
      type: Object,
      default: () => ({})
    },
    color: { type: String, default: '' }
  },
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
    },
    attack(stats) {
      return stats.find((el) => el.stat.name === 'attack').base_stat
    }
  }
}
