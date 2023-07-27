import fs from "fs";
import path from "path";

export default function Blog() {
  // get all blog posts from public folder

  let posts: string[] = [];
  if (fs.existsSync(path.join(process.cwd(), "public", "_blog"))) {
    console.log("blog folder exists");
    posts = fs.readdirSync(path.join(process.cwd(), "public", "_blog"));
  } else {
    console.log("blog folder does not exist");
  }

  console.log(posts);

  return (
    <div className="bg-blue-400 flex-1 flex flex-col">
      <h1>Content</h1>
    </div>
  );
}
