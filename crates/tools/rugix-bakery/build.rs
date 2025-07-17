fn main() {
    sidex_build_rs::configure()
        .with_bundle(env!("CARGO_MANIFEST_DIR"))
        .generate()
        .expect("Failed to generate code for Sidex bundles.");
}
