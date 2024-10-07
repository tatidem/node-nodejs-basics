const parseArgs = () => {
  const args = process.argv.slice(2);
  const result = {};

  for (let i = 0; i < args.length; i += 2) {
      const key = args[i].replace('--', '');
      const value = args[i + 1];
      result[key] = value;
  }

  for (const [key, value] of Object.entries(result)) {
      console.log(`${key} is ${value}`);
  }
};

parseArgs();