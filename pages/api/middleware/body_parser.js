import bodyParser from "body-parser";

const withBodyParserMiddleware = (handler) => (req, res) => {
    bodyParser.json()(req, res, () => {
      bodyParser.urlencoded({ extended: true })(req, res, () => {
        handler(req, res);
      });
    });
  };

export default withBodyParserMiddleware