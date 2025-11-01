"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../../ui/theme-toggle";

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false)
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-4 lg:gap-0">
            <div className="flex w-full items-center justify-between gap-12">
              <Link
                href="/"
                aria-label="home"
                className="group flex items-center space-x-3 transition-all">
                <div className="rounded-lg bg-primary p-2 shadow-lg shadow-primary/20 transition-all group-hover:shadow-primary/40">
                  <Icon
                    parentColor={header.color!}
                    data={{
                      name: header.icon!.name,
                      color: "white",
                      style: header.icon!.style,
                    }}
                  />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  {header.name}
                </span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer rounded-lg p-2.5 transition-colors hover:bg-muted lg:hidden">
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex items-center gap-8">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                        <span className="relative">
                          {item!.label}
                          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <ThemeToggle />
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-background/95 in-data-[state=active]:block mb-6 hidden w-full rounded-2xl border border-border p-6 shadow-xl backdrop-blur-xl lg:m-0 lg:hidden lg:w-fit lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-4">
                  {header.nav!.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item!.href!}
                        className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
                        <span>{item!.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2 flex justify-center">
                    <ThemeToggle />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
