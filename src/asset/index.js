import 'babylonjs-loaders';
import { SceneLoader } from '../babylon';
import Entity from '../entity';

export default {
  mixins: [Entity],

  props: {
    src: {
      type: String,
      default: null,
    },
  },

  watch: {
    src: {
      handler: 'loadAssetContainer',
      immediate: true,
    },
  },

  methods: {
    async loadAssetContainer() {
      if (!this.src) {
        return;
      }
      await this._$_sceneReady;
      let assetContainer = await SceneLoader.LoadAssetContainerAsync(this.src);
      await this._$_parentReady;
      if (assetContainer.meshes.length > 1) {
        this.$replace(assetContainer.createRootMesh());
      } else {
        this.$replace(assetContainer.meshes[0]);
      }
      assetContainer.addAllToScene();
    },
  },
};