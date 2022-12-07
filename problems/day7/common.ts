class Dir {
  private readonly children: Record<string, Dir> = {};
  private contentSize: number = 0;
  readonly parent: Dir | null;

  constructor(parent: Dir | null) {
    this.parent = parent;
  }

  getChild(key: string): Dir {
    return this.children[key]!;
  }

  getSize(): number {
    return (
      this.contentSize +
      Object.values(this.children).reduce(
        (acc, child) => acc + child.getSize(),
        0
      )
    );
  }

  addChild(name: string) {
    this.children[name] = new Dir(this);
  }

  addFile(size: number) {
    this.contentSize += size;
  }

  getSizeTree(): number[] {
    return [
      this.getSize(),
      ...Object.values(this.children).flatMap((child) => child.getSizeTree()),
    ];
  }
}

export const initializeFileTree = (values: string[]): Dir => {
  const root = new Dir(null);
  let pwd = root;
  for (let i = 0; i < values.length; ) {
    const [, command, args = ""] = values[i].match(/\$ (\S+) ?(.*)?/)!;
    i++;

    if (command === "cd") {
      if (args === "/") pwd = root;
      else if (args === "..") pwd = pwd.parent!;
      else pwd = pwd.getChild(args);
    } else if (command === "ls") {
      while (values[i] && !/^\$/.test(values[i])) {
        const [first, second] = values[i].split(" ");
        if (first === "dir") {
          pwd.addChild(second);
        } else {
          pwd.addFile(+first);
        }
        i++;
      }
    }
  }
  return root;
};
