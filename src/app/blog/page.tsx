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
  const lines = fileContents.split("\r\n");

  let meta: {
    title: string;
    date: string;
    tag: string[];
    draft: boolean;
  } = {
    title: "",
    date: "",
    tag: [],
    draft: true,
  };
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
    // divide meta line into key and value
    // split by first :
    const metaLineSplit = metaLine.split(":");
    const key = metaLineSplit[0].trim();
    const value = metaLineSplit.slice(1).join(":").trim().replaceAll('"', "");

    if (key === "date") {
      meta[key] = new Date(value).toISOString();
    } else if (key === "tag") {
      meta[key] = value.split(" ");
    } else if (key === "draft") {
      meta[key] = value === "true" ? true : false;
    }
  });

  return meta;
}

export default function Blog() {
  const posts = getPostsPath();
  const postMetas = posts.map((post) => getPostMeta(post));

  return (
    <div className="bg-blue-400 flex-1 flex flex-col overflow-auto">
      <h1>Content</h1>
      <div className="flex-1 flex flex-col">
        {postMetas.map((postMeta) =>
          postMeta.draft === false ? (
            <div key={postMeta.title}>
              <p>{postMeta.title}</p>
              <p>{postMeta.date}</p>
              {postMeta.tag.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
