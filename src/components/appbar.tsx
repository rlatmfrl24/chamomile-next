import { MenuItemType } from "@/lib/typeDef";
import Link from "next/link";

const menuList: MenuItemType[] = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "About",
    path: "/about",
  },
  {
    id: 3,
    name: "Project",
    path: "/project",
  },
  {
    id: 4,
    name: "Blog",
    path: "/blog",
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

const Appbar = () => {
  return (
    <>
      <div className="flex justify-center items-center px-4 py-2 bg-gray-800 text-white gap-4 absolute w-full">
        {menuList.map((item) => (
          <div key={item.id}>
            <Link href={item.path}>{item.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Appbar;
