"use client";

import { MenuItemType } from "@/lib/typeDef";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [currentMenu, setCurrentMenu] = useState<number>(1);

  useEffect(() => {
    const path = window.location.pathname;
    const firstDepth = "/" + path.split("/")[1];

    const menu = menuList.find((item) => item.path === firstDepth);
    if (menu !== undefined) {
      setCurrentMenu(menu.id);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center px-4 py-2 bg-gray-800 text-white gap-8 absolute w-full z-50">
        {menuList.map((item) => (
          <div key={item.id}>
            <Link
              href={item.path}
              className={` ${currentMenu === item.id ? "text-blue-400 " : ""}`}
              onClick={() => {
                setCurrentMenu(item.id);
              }}
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Appbar;
