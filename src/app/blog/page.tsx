import fs from "fs";
import path from "path";

function getPostsPath() {
  let posts: string[] = [];
  if (fs.existsSync(path.join(process.cwd(), "public", "_blog"))) {
    const postDirectory = fs
      .readdirSync(path.join(process.cwd(), "public", "_blog"))
      .filter((directoryName) => directoryName !== "backup");
    postDirectory.forEach((post) => {
      let postPath = path.join(process.cwd(), "public", "_blog", post);
      if (fs.lstatSync(postPath).isDirectory()) {
        const postFiles = fs.readdirSync(postPath);
        postFiles.forEach((postFile) => {
          posts.push(path.join(postPath, postFile));
        });
      }
    });
  }

  return posts;
}

function getPostMeta(postPath: string) {
  //get meta data from Markdown file
  //get read lines start with --- and end with ---
  const fileContents = fs.readFileSync(postPath, "utf8");
  const lines = fileContents.split("\n");
  let meta: any = {};
  let metaStart = false;
  let metaEnd = false;
  let metaLines: string[] = [];
  lines.forEach((line) => {
    if (line === "---") {
      if (metaStart) {
        metaEnd = true;
      }
      metaStart = !metaStart;
    } else if (metaStart && !metaEnd) {
      metaLines.push(line);
    }
  });
  metaLines.forEach((metaLine) => {
    const [key, value] = metaLine.split(":");
    meta[key.trim()] = value.trim();
  });
  return meta;
}

export default function Blog() {
  const posts = getPostsPath();
  const postMeta = getPostMeta(posts[0]);
  console.log(postMeta);

  return (
    <div className="bg-blue-400 flex-1 flex flex-col overflow-auto">
      <h1>Content</h1>
      <div className="flex-1 flex flex-col">
        {posts.map((post) => (
          <div key={post}>{post}</div>
        ))}
      </div>
    </div>
  );
}
