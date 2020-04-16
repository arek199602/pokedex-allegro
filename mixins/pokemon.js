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
    pokemonDetails: { required: true, type: Object },
    color: { required: true, type: String },
    attack: { required: true, type: Function }
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
    }
  }
}
