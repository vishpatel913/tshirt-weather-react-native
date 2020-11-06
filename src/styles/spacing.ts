type Arg = number | 'auto';

const createSpacing = (first = 1, ...args: Arg[]) => {
  const base = 16;
  const init = typeof first === 'number' ? `${first * base}px` : first;

  return args.reduce(
    (acc, c, i) =>
      typeof c === 'number' ? `${acc} ${c * base}px` : `${acc} ${c}`,
    init,
  );
};

export default createSpacing;
