/**
 *  The param example needed to pass to GUIHelperUI and GUIHelperWorker.
 */

const GUIHelperParams = {
  color: {
    type: 'colour',
    value: 0x2173c1,
  },
  emissive: {
    type: 'colour',
    value: 0x481d49,
  },
  roughness: {
    type: 'float',
    value: 0.4,
    max: 1,
    min: 0,
  },
  metalness: {
    type: 'float',
    value: 0.05,
    max: 1,
    min: 0,
  },
  reflectivity: {
    type: 'float',
    value: 0.6,
    max: 1,
    min: 0,
  },
  clearcoat: {
    type: 'float',
    value: 0.30,
    max: 1,
    min: 0,
  },
  clearcoatRoughness: {
    type: 'float',
    value: 0.90,
    max: 1,
    min: 0,
  },
  test: {
    type: 'string',
    value: 'test string',
  },
  transparency: {
    type: 'select',
    value: [1, 0.75, 0.5, 0.25, 0],
  },
};
export default GUIHelperParams;
