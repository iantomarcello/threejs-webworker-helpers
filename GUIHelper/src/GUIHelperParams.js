/**
 *  The param example needed to pass to GUIHelperUI and GUIHelperWorker.
 */

const GUIHelperParams = {
  color: {
    type: 'colour',
    value: 0xf50502,
  },
  roughness: {
    type: 'float',
    value: 0.1,
    max: 1,
    min: 0,
  },
  metalness: {
    type: 'float',
    value: 0.1,
    max: 1,
    min: 0,
  },
  reflectivity: {
    type: 'float',
    value: 0.5,
    max: 1,
    min: 0,
  },
  clearcoat: {
    type: 'float',
    value: 0.1,
    max: 1,
    min: 0,
  },
  clearcoatRoughness: {
    type: 'float',
    value: 0.1,
    max: 1,
    min: 0,
  },
  test: {
    type: 'string',
    value: 'test string',
  },
};
export default GUIHelperParams;
