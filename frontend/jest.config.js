module.exports = {
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true
      }
    }
  },
  // moduleNameMapper: {
  //   "\\.(css|scss)$": "<rootDir>/node_modules/react-toastify/ReactToastify.css"
  // },
  // Setup Enzyme
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/src/setupEnzyme.ts"]
};
