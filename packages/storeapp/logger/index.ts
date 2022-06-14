import 'colors';

const info = (message: string) => {
  console.log(`[${'info'.blue}] ${message}`);
};

const success = (message: string) => {
  console.log(`[${'success'.green}] ${message}`);
};

const error = (message: string) => {
  console.log(`[${'error'.red}] ${message}`);
};

const warn = (message: string) => {
  console.log(`[${'warn'.yellow}] ${message}`);
};

const dev = (message: string) => {
  console.log(`[${'dev'.gray}] ${message}`);
};

export { info, success, error, warn, dev };
