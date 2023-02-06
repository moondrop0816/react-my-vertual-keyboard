const path = require("path"); // path 모듈 불러옴
const TerserWebpackPlugin = require("terser-webpack-plugin"); // 추가 설치한 압축 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html 설정
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // html에 css inject
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css 압축
module.exports = {
  entry: "./src/js/index.js", // 자바스크립트 파일의 진입점을 나타냄
  output: {
    // build시 번들 파일관련 속성 지정
    filename: "bundle.js", // 번들 파일 이름 지정
    path: path.resolve(__dirname, "./dist"), // 번들될 파일이 생성될 경로
    // 경로는 상대경로 입력시 웹팩에서 찾을 수 없기때문에 절대경로로 입력
    clean: true, // 번들 파일이 생성될 경로에 다른 파일이 있다면 다른 파일을 지우고 새로 생성
  },
  devtool: "source-map", // build한 파일과 원본 파일을 연결시켜줌
  mode: "development", // 파일에 대한 압축을 제공하는지 (기본 기능 외에 추가 압축 플러그인 사용할것임 - terser-webpack-plugin)
  devServer: {
    host: "localhost",
    port: 8080,
    open: true, // 서버가 열릴때마다 새창으로 열기
    watchFiles: "index.html", // index.html이 변경될때마다 리로드 해주기
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard", // title 설정
      template: "./index.html", // 템플릿이 될 파일
      inject: "body", // 파일을 빌드했을때 자바스크립트 파일을 넣을 위치.
      favicon: "./favicon.ico", // 파비콘 설정
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // css 파일을
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 이 로더를 사용해서 읽어들이겠다
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
