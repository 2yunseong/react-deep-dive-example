const Babel = require("@babel/standalone");
Babel.registerPlugin(
  "@babel/plugin-transform-react-jsx",
  require("@babel/plugin-transform-react-jsx")
);

const BABEL_CONFIG = {
  presets: [],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        throwIfNamespace: false,
        runtime: "automatic",
        importSource: "custom-jsx-library",
      },
    ],
  ],
};

const SOURCE_CODE = "const ComponentA = <A>hello</A>";

const { code } = Babel.transform(SOURCE_CODE, BABEL_CONFIG);

console.log(code);
