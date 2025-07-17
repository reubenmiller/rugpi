fn main() {
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    sidex_build_rs::configure()
        .with_bundle(path)
        .generate()
        .expect("Failed to generate code for Sidex bundles.");
}
