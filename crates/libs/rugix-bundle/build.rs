fn main() {
    let dir = std::env::var("CARGO_MANIFEST_DIR").unwrap();
    sidex_build_rs::configure()
        .with_bundle(dir)
        .generate()
        .expect("Failed to generate code for Sidex bundles.");
}
