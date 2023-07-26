"use client";

import { useAppBarStore } from "@/app/store";
import { MenuItemType } from "@/lib/typeDef";
import { useLayoutEffect, useState } from "react";
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
  // {
  //   id: 4,
  //   name: "Blog",
  //   path: "/blog",
  // },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

const Appbar = () => {
  const currentMenu = useAppBarStore((state) => state.appBarState);
  const setCurrentMenu = useAppBarStore((state) => state.setAppBarState);

  const NavButton = ({ item }: { item: MenuItemType }) => {
    const [buttonClassName, setButtonClassName] = useState<string>("");
    useLayoutEffect(() => {
      if (currentMenu.id === item.id) {
        setButtonClassName("text-blue-400");
      } else {
        setButtonClassName("text-gray-400");
      }
    }, [item]);

    return (
      <Link
        href={item.path}
        className={`${buttonClassName} hover:text-blue-400 font-bold`}
        onClick={() => {
          setCurrentMenu(item);
        }}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <div className="flex justify-center items-center px-4 py-2 bg-gray-800 text-white gap-8 w-full z-50">
        {menuList.map((item) => (
          <div key={item.id}>
            <NavButton item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Appbar;
