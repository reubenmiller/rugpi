import React from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import HomepageFeatures from "@site/src/components/HomepageFeatures"
import Admonition from "@theme/Admonition"

import DebianLogo from "@site/static/img/logos/debian.svg"
import AlpineLinuxLogo from "@site/static/img/logos/alpine-linux.svg"

import styles from "./index.module.css"

const SupportedDistributions: React.FC<{}> = () => {
  return (
    <>
      <h3 className="text-center">Supported Distributions</h3>
      <p className="text-center">
        Rugix Bakery allows you to build upon proven distributions such as{" "}
        <a href="https://www.debian.org/" target="_blank">
          Debian
        </a>
        ,{" "}
        <a href="https://alpinelinux.org/" target="_blank">
          Alpine Linux
        </a>
        , and{" "}
        <a href="https://www.raspberrypi.com/software/" target="_blank">
          Raspberry Pi OS
        </a>
        .
      </p>
      <div className="rounded-xl mb-4 mx-auto py-5 px-10 w-fit bg-gray-200">
        <div className="flex flex-wrap space-x-10 justify-center items-center">
          <a href="https://www.debian.org/" target="_blank" className="h-20">
            <DebianLogo className="h-full w-fit" />
          </a>
          <a
            href="https://alpinelinux.org/"
            target="_blank"
            className="flex items-center h-20"
          >
            <AlpineLinuxLogo
              viewBox="0 0 665 162"
              className="h-12"
              width="200"
            />
          </a>
          <a
            href="https://www.raspberrypi.com/"
            target="_blank"
            className="h-20"
          >
            <img
              src={require("@site/static/img/logos/raspios.png").default}
              className="h-full"
            />
          </a>
        </div>
      </div>
      <p className="text-center">
        It can also be used with root filesystems generated by other tools,
        e.g.,{" "}
        <a href="https://www.yoctoproject.org/" target="_blank">
          Yocto Project
        </a>{" "}
        or{" "}
        <a href="https://buildroot.org/" target="_blank">
          Buildroot
        </a>
        .
      </p>
    </>
  )
}

function HomepageHeader() {
  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner, styles.hero)}
    >
      <div className="container">
        <h1 className="hero__title">
          Robust Building Blocks for Embedded Linux Devices
        </h1>
        <p className="text-xl">
          An open-source tool suite to build <em>reliable</em> embedded Linux
          devices with <em>efficient and secure over-the-air</em> update
          capabilities.
        </p>
        <p style={{ maxWidth: "80ch", margin: "1.5em auto" }}>
          <strong>
            Companies around the world use Rugix as a basis for their connected
            products.
          </strong>{" "}
          Currently, the tool suite consists of two main tools:{" "}
          <em>Rugix Ctrl</em>, a tool for installing over-the-air updates and
          managing state, and <em>Rugix Bakery</em>, a flexible, user-friendly
          build system for bespoke Linux distributions. Rugix simplifies the
          development of embedded Linux devices,{" "}
          <strong>
            enabling you to focus on what provides value to your users instead
            of system-level details
          </strong>
          . With Rugix, you get better results faster and at a lower cost.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get Started 🚀
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <HomepageHeader />
      <main className="py-16 space-y-16">
        <section>
          <h2 className="text-center">Rugix Ctrl: The Update Mechanism</h2>
          <p className="text-center">Rugix Ctrl has all features you would expect from a state-of-the-art update solution and more:</p>
          <ul className="list-none mx-auto w-fit">
            <li>
              ✅ <strong>Atomic A/B system updates</strong> with popular bootloaders out of the box.
            </li>
            <li>
              ✅ <strong>Streaming updates</strong> as well as <strong>adaptive delta updates</strong> out of the box.
            </li>
            <li>
              ✅ Builtin <strong>cryptographic integrity checks</strong> <em>before</em> installing anything anywhere.
            </li>
            <li>
              ✅ Supports <strong>any update scenario</strong>, including <strong>non-A/B updates and incremental updates</strong>.
            </li>
            <li>
              ✅ Supports <strong>any bootloader and boot process</strong> through <a href="https://rugix.org/docs/ctrl/advanced/boot-flows">custom <em>boot flows</em></a>.
            </li>
            <li>
              ✅ <strong>Robust state management mechanism</strong> inspired by container-based architectures.
            </li>
            <li>
              ✅ Integrates well with <a href="https://rugix.org/docs/ctrl/advanced/fleet-management">different fleet management solutions</a> (avoids vendor lock-in).
            </li>
            <li>✅ Provides powerful interfaces to built your own update workflow upon.</li>
          </ul>
          <p className="mx-auto max-w-[75ch] text-center">Rugix Ctrl <strong>supports or can be adapted to almost any requirements you may have</strong> when it comes to robust and secure updates of your entire system as well as its individual components.</p>
        </section>
        <section>
          <h2 className="text-center">Rugix Bakery: The Development Tool</h2>
          <p className="max-w-[80ch] text-center mx-auto">You wrote your application and now need to integrate it into a full system ready to be flashed onto your device or deployed as an update? Rugix Bakery makes this process (almost) <strong>as easy as writing a Dockerfile, enabling you to focus on what provides value to your users</strong> instead of system-level details.</p>
          <SupportedDistributions />
          <h3 className="text-center">Feature Highlights</h3>
          <ul className="list-none mx-auto w-fit">
            <li>
              ✅ <strong>Over-the-air update capabilities</strong> powered by Rugix Ctrl out of the box.
            </li>
            <li>
              ✅ Build everything <strong>from source to image in a container-based environment.</strong>
            </li>
            <li>
              ✅ Define <strong>multiple system variants</strong>, including variants for testing.
            </li>
            <li>
              ✅ Builtin <strong>system testing framework</strong> and <strong>support for running VMs</strong>.
            </li>
          </ul>
          <p className="mx-auto max-w-[80ch] text-center">With Rugix Bakery, you get a <strong>comprehensive tool to build, test, and run your system</strong> similar to what you will find with modern software development tooling, like <a href="https://doc.rust-lang.org/cargo">Cargo</a> (Rust) or <a href="https://docs.astral.sh/uv/">uv</a> (Python).</p>
        </section>
        {/* <section>
          <h2 className="text-center">Rugix: The Tool Suite</h2>
          <p>
            <HomepageFeatures />
          </p>
        </section> */}
      </main>
    </Layout>
  )
}
