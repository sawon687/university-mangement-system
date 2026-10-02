import React from "react";
import Link from "next/link";
import Logo from "../../../assets/Logo";

const Footer = () => {
  const productLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  const companyLinks = [
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 md:grid-cols-4 md:py-16">
          {/* Brand */}
          <div className="md:col-span-2">
       
              <Logo flexColRow="flex-row" />
            

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Build better experiences with simple, powerful and modern
              solutions designed for everyone.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="GitHub"
              >
                GH
              </Link>

              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="LinkedIn"
              >
                in
              </Link>

              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Twitter"
              >
                X
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>

            <ul className="mt-4 space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">Company</h3>

            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>

          <p>
            Built with <span className="font-medium text-foreground">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;