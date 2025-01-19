interface CornOptions {
  origin: Array<string>;
  methods: string;
  optionsSuccessStatus: number;
}

const origins: Array<string> = process.env.ORIGINS.split(",");

const CORN_OPTIONS: CornOptions = {
  origin: origins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

export default CORN_OPTIONS;
